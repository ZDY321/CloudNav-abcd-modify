import { AIConfig } from "../types";

const getGeminiEndpoint = (config: AIConfig): string => {
    const modelName = encodeURIComponent(config.model || 'gemini-2.5-flash');
    const baseUrl = (config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/$/, '');

    if (baseUrl.includes(':generateContent')) {
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}key=${encodeURIComponent(config.apiKey)}`;
    }

    return `${baseUrl}/models/${modelName}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
};

const extractGeminiText = (data: any): string => {
    const parts = data?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts)) return '';

    return parts
        .map((part: any) => typeof part?.text === 'string' ? part.text : '')
        .join('')
        .trim();
};

const callGemini = async (config: AIConfig, prompt: string): Promise<string> => {
    try {
        const response = await fetch(getGeminiEndpoint(config), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Gemini API Error:", err);
            return "";
        }

        const data = await response.json();
        return extractGeminiText(data);
    } catch (e) {
        console.error("Gemini Call Failed", e);
        return "";
    }
};

/**
 * Helper to call OpenAI Compatible API
 */
const callOpenAICompatible = async (config: AIConfig, systemPrompt: string, userPrompt: string): Promise<string> => {
    try {
        let baseUrl = config.baseUrl.replace(/\/$/, '');
        // If user didn't provide full path, assume /v1/chat/completions logic or just trust them
        // Common convention: if URL ends with /v1, append /chat/completions
        if (!baseUrl.includes('/chat/completions')) {
            if (baseUrl.endsWith('/v1')) {
                baseUrl += '/chat/completions';
            } else {
                // If it's just a domain like api.openai.com, usually implies /v1/chat/completions
                // But let's assume user might input full path or standard base. 
                // To be safe, let's append /chat/completions if not present
                baseUrl += '/chat/completions';
            }
        }

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("OpenAI API Error:", err);
            return "";
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || "";
    } catch (e) {
        console.error("OpenAI Call Failed", e);
        return "";
    }
};

/**
 * Uses configured AI to generate a description
 */
export const generateLinkDescription = async (title: string, url: string, config: AIConfig): Promise<string> => {
  if (!config.apiKey) {
    return "请在设置中配置 API Key";
  }

  const prompt = `
      Title: ${title}
      URL: ${url}
      Please write a very short description (max 15 words) in Chinese (Simplified) that explains what this website is for. Return ONLY the description text. No quotes.
  `;

  try {
    if (config.provider === 'gemini') {
        const result = await callGemini(config, `I have a website bookmark. ${prompt}`);
        return result || "无法生成描述";
    } else {
        // OpenAI Compatible
        const result = await callOpenAICompatible(
            config, 
            "You are a helpful assistant that summarizes website bookmarks.", 
            prompt
        );
        return result || "生成描述失败";
    }
  } catch (error) {
    console.error("AI generation error:", error);
    return "生成描述失败";
  }
};

/**
 * Suggests a category
 */
export const suggestCategory = async (title: string, url: string, categories: {id: string, name: string}[], config: AIConfig): Promise<string | null> => {
    if (!config.apiKey) return null;

    const catList = categories.map(c => `${c.id}: ${c.name}`).join('\n');
    const prompt = `
        Website: "${title}" (${url})

        Available Categories:
        ${catList}

        Return ONLY the 'id' of the best matching category. If unsure, return 'common'.
    `;

    try {
        if (config.provider === 'gemini') {
            const result = await callGemini(config, `Task: Categorize this website.\n${prompt}`);
            return result || null;
        } else {
             // OpenAI Compatible
            const result = await callOpenAICompatible(
                config,
                "You are an intelligent classification assistant. You only output the category ID.",
                prompt
            );
            return result || null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}
