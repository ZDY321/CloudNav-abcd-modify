interface Env {
  PASSWORD: string;
}

const MAX_REQUEST_BYTES = 10 * 1024 * 1024;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-auth-password',
};

const jsonResponse = (body: unknown, init: ResponseInit = {}) => {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...corsHeaders, ...init.headers },
  });
};

const requirePassword = (request: Request, env: Env): Response | null => {
  const serverPassword = env.PASSWORD;
  const providedPassword = request.headers.get('x-auth-password');

  if (!serverPassword) {
    return jsonResponse(
      { error: 'Server misconfigured: PASSWORD not set' },
      { status: 500 }
    );
  }

  if (!providedPassword || providedPassword !== serverPassword) {
    return jsonResponse({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
};

const normalizeWebDavBaseUrl = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl.trim());
    if (url.protocol !== 'https:') {
      return null;
    }

    if (!url.pathname.endsWith('/')) {
      url.pathname += '/';
    }

    return url.toString();
  } catch {
    return null;
  }
};

const normalizeBackupFilename = (filename?: string): string | null => {
  const safeFilename = filename || 'cloudnav_backup.json';
  return /^[A-Za-z0-9._-]+\.json$/.test(safeFilename) ? safeFilename : null;
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  const unauthorizedResponse = requirePassword(request, env);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: 'Request body too large' }, { status: 413 });
  }

  try {
    const body = await request.json() as any;
    const { operation, config, payload, filename } = body;

    if (!config || !config.url || !config.username || !config.password) {
      return jsonResponse({ error: 'Missing configuration' }, { status: 400 });
    }

    const baseUrl = normalizeWebDavBaseUrl(config.url);
    if (!baseUrl) {
      return jsonResponse({ error: 'WebDAV URL must be a valid HTTPS URL' }, { status: 400 });
    }

    const finalFilename = normalizeBackupFilename(filename);
    if (!finalFilename) {
      return jsonResponse({ error: 'Invalid backup filename' }, { status: 400 });
    }

    const fileUrl = new URL(finalFilename, baseUrl).toString();
    const authHeader = `Basic ${btoa(`${config.username}:${config.password}`)}`;

    let fetchUrl = baseUrl;
    let method = 'PROPFIND';
    const headers: Record<string, string> = {
      'Authorization': authHeader,
      'User-Agent': 'CloudNav/1.0',
    };
    let requestBody: string | undefined;

    if (operation === 'check') {
      headers['Depth'] = '0';
    } else if (operation === 'upload') {
      fetchUrl = fileUrl;
      method = 'PUT';
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(payload);
    } else if (operation === 'download') {
      fetchUrl = fileUrl;
      method = 'GET';
    } else {
      return jsonResponse({ error: 'Invalid operation' }, { status: 400 });
    }

    const response = await fetch(fetchUrl, {
      method,
      headers,
      body: requestBody,
    });

    if (operation === 'download') {
      if (!response.ok) {
        if (response.status === 404) {
          return jsonResponse({ error: 'Backup file not found' }, { status: 404 });
        }
        return jsonResponse({ error: `WebDAV Error: ${response.status}` }, { status: response.status });
      }

      const data = await response.json();
      return jsonResponse(data);
    }

    const success = response.ok || response.status === 207;
    return jsonResponse({ success, status: response.status });
  } catch (err: any) {
    return jsonResponse({ error: err.message || 'WebDAV request failed' }, { status: 500 });
  }
};
