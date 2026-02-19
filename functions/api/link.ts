
interface Env {
  CLOUDNAV_KV: any;
  PASSWORD: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Allow-Headers': 'Content-Type, x-auth-password',
  'Access-Control-Max-Age': '86400',
};

// 需要VPN访问的域名列表（中国大陆无法直接访问）
const VPN_REQUIRED_DOMAINS = [
  'google.com', 'google.co', 'googleapis.com', 'gstatic.com',
  'youtube.com', 'youtu.be', 'ytimg.com',
  'facebook.com', 'fb.com', 'fbcdn.net',
  'twitter.com', 'x.com', 'twimg.com',
  'instagram.com', 'cdninstagram.com',
  'whatsapp.com', 'whatsapp.net',
  'telegram.org', 't.me',
  'tiktok.com', // 国际版
  'reddit.com', 'redd.it',
  'wikipedia.org', 'wikimedia.org',
  'medium.com',
  'dropbox.com',
  'onedrive.live.com',
  'spotify.com',
  'netflix.com',
  'twitch.tv',
  'discord.com', 'discordapp.com',
  'slack.com',
  'notion.so',
  'figma.com',
  'openai.com', 'chatgpt.com',
  'anthropic.com', 'claude.ai',
  'perplexity.ai',
  'bard.google.com', 'gemini.google.com',
  'protonmail.com', 'proton.me',
  'duckduckgo.com',
  'archive.org',
  'nytimes.com',
  'bbc.com', 'bbc.co.uk',
  'cnn.com',
  'reuters.com',
  'bloomberg.com',
  'wsj.com',
  'theguardian.com',
  'vimeo.com',
  'dailymotion.com',
  'soundcloud.com',
  'pixiv.net',
  'tumblr.com',
  'pinterest.com',
  'flickr.com',
  'quora.com',
  'stackoverflow.com', // 有时可能受影响
  'github.com', // 有时可能受影响
  'npmjs.com',
  'docker.com', 'hub.docker.com',
];

// 检查域名是否需要VPN
const checkVpnRequired = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    return VPN_REQUIRED_DOMAINS.some(domain => {
      // 完全匹配或子域名匹配
      return hostname === domain || hostname.endsWith('.' + domain);
    });
  } catch {
    return false;
  }
};

// 检查响应是否来自Cloudflare防护
const checkCloudflareProtection = (response: Response, body?: string): boolean => {
  // 检查响应头
  const cfRay = response.headers.get('cf-ray');
  const server = response.headers.get('server');
  
  // 检查是否是Cloudflare服务器
  const isCloudflareServer = server?.toLowerCase().includes('cloudflare');
  
  // 检查是否是Cloudflare质询页面（403或503状态码）
  if ((response.status === 403 || response.status === 503) && cfRay) {
    return true;
  }
  
  // 检查响应体中是否有Cloudflare特征
  if (body) {
    const cloudflareIndicators = [
      'cf-browser-verification',
      'cloudflare',
      'checking your browser',
      'please wait',
      'ray id',
      'performance & security by cloudflare',
      'enable javascript and cookies',
      'ddos protection by cloudflare',
      'just a moment',
    ];
    
    const lowerBody = body.toLowerCase();
    return cloudflareIndicators.some(indicator => lowerBody.includes(indicator));
  }
  
  return false;
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

// GET 请求处理 - 用于连通性检测
export const onRequestGet = async (context: { request: Request; env: Env }) => {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  const isCheck = url.searchParams.get('check');

  // 如果是连通性检测请求
  if (isCheck === 'true' && targetUrl) {
    // 首先检查是否是需要VPN的网站
    const vpnRequired = checkVpnRequired(targetUrl);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

      // 先尝试HEAD请求
      let response = await fetch(targetUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      // 检查是否有Cloudflare防护（基于响应头）
      const cloudflare = checkCloudflareProtection(response);

      return new Response(JSON.stringify({ 
        online: response.ok,
        status: response.status,
        statusText: response.statusText,
        vpnRequired: vpnRequired,
        cloudflare: cloudflare
      }), {
        status: response.ok ? 200 : 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error: any) {
      // 如果 HEAD 请求失败，尝试 GET 请求
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(targetUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          },
          redirect: 'follow',
        });

        clearTimeout(timeoutId);

        // 尝试读取响应体来检测Cloudflare
        let body = '';
        let cloudflare = false;
        
        try {
          // 只读取前10KB来检测Cloudflare
          const reader = response.body?.getReader();
          if (reader) {
            let chunks = '';
            let bytesRead = 0;
            const maxBytes = 10240; // 10KB
            
            while (bytesRead < maxBytes) {
              const { done, value } = await reader.read();
              if (done) break;
              
              const chunk = new TextDecoder().decode(value);
              chunks += chunk;
              bytesRead += value.length;
            }
            
            body = chunks;
            cloudflare = checkCloudflareProtection(response, body);
          }
        } catch {
          // 忽略读取错误
        }

        return new Response(JSON.stringify({ 
          online: response.ok,
          status: response.status,
          statusText: response.statusText,
          vpnRequired: vpnRequired,
          cloudflare: cloudflare
        }), {
          status: response.ok ? 200 : 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      } catch (getError: any) {
        // 检查错误类型来确定可能的原因
        const errorMessage = getError.message || 'Connection failed';
        
        // 某些错误可能表示网络不可达（需要VPN）
        const networkErrors = ['network error', 'failed to fetch', 'dns', 'timeout', 'aborted'];
        const isNetworkError = networkErrors.some(err => errorMessage.toLowerCase().includes(err));
        
        return new Response(JSON.stringify({ 
          online: false,
          error: errorMessage,
          vpnRequired: vpnRequired || isNetworkError,
          cloudflare: false
        }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Invalid request' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
};

// HEAD 请求处理 - 用于连通性检测
export const onRequestHead = async (context: { request: Request; env: Env }) => {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  const isCheck = url.searchParams.get('check');

  // 如果是连通性检测请求
  if (isCheck === 'true' && targetUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

      const response = await fetch(targetUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'CloudNav Link Checker/1.0',
        },
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      return new Response(null, {
        status: response.ok ? 200 : 502,
        headers: corsHeaders,
      });
    } catch (error: any) {
      return new Response(null, {
        status: 502,
        headers: corsHeaders,
      });
    }
  }

  return new Response(null, {
    status: 400,
    headers: corsHeaders,
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  // 1. Auth Check
  const providedPassword = request.headers.get('x-auth-password');
  const serverPassword = env.PASSWORD;

  if (!serverPassword || providedPassword !== serverPassword) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const newLinkData = await request.json() as any;
    
    // Validate input
    if (!newLinkData.title || !newLinkData.url) {
        return new Response(JSON.stringify({ error: 'Missing title or url' }), { status: 400, headers: corsHeaders });
    }

    // 2. Fetch current data from KV
    const currentDataStr = await env.CLOUDNAV_KV.get('app_data');
    let currentData = { links: [], categories: [] };
    
    if (currentDataStr) {
        currentData = JSON.parse(currentDataStr);
    }

    // 3. Determine Category
    let targetCatId = '';
    let targetCatName = '';

    // 3a. Check for explicit categoryId from request
    if (newLinkData.categoryId) {
        const explicitCat = currentData.categories.find((c: any) => c.id === newLinkData.categoryId);
        if (explicitCat) {
            targetCatId = explicitCat.id;
            targetCatName = explicitCat.name;
        }
    }

    // 3b. Fallback: Auto-detect if no explicit category or explicit one not found
    if (!targetCatId) {
        if (currentData.categories && currentData.categories.length > 0) {
            // Try to find specific keywords
            const keywords = ['收集', '未分类', 'inbox', 'temp', 'later'];
            const match = currentData.categories.find((c: any) => 
                keywords.some(k => c.name.toLowerCase().includes(k))
            );

            if (match) {
                targetCatId = match.id;
                targetCatName = match.name;
            } else {
                // Fallback to 'common' if exists, else first category
                const common = currentData.categories.find((c: any) => c.id === 'common');
                if (common) {
                    targetCatId = 'common';
                    targetCatName = common.name;
                } else {
                    targetCatId = currentData.categories[0].id;
                    targetCatName = currentData.categories[0].name;
                }
            }
        } else {
            // No categories exist at all
            targetCatId = 'common';
            targetCatName = '默认';
        }
    }

    // 4. Create new link object
    const newLink = {
        id: Date.now().toString(),
        title: newLinkData.title,
        url: newLinkData.url,
        description: newLinkData.description || '',
        categoryId: targetCatId, 
        createdAt: Date.now(),
        pinned: false,
        icon: undefined
    };

    // 5. Append
    // @ts-ignore
    currentData.links = [newLink, ...(currentData.links || [])];

    // 6. Save back to KV
    await env.CLOUDNAV_KV.put('app_data', JSON.stringify(currentData));

    return new Response(JSON.stringify({ 
        success: true, 
        link: newLink,
        categoryName: targetCatName 
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};
