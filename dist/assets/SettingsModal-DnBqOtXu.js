const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jszip.min-Dlb6ltHU.js","assets/index-EDmou3hz.js","assets/index-CgU7aG08.css"])))=>i.map(i=>d[i]);
import{g as b,r as c,j as e,N as be,O as fe,X as Q,I as ve,n as ke,G as X,d as ye,Q as we,R as Ce,w as ee,V as te,H as R,Y as Ie,Z as je,$ as Ue,B as Le,_ as ae}from"./index-EDmou3hz.js";import{I as Se}from"./IconSelector-ChvYgoyO.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9",key:"c1nkhi"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9",key:"h65svq"}]],Ne=b("circle-pause",Me);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],Ae=b("key",Ee);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],Re=b("keyboard",Te);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1",key:"jqznyg"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1",key:"q5h2i8"}]],_e=b("layout-template",Be);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],De=b("refresh-cw",ze),$e=()=>{const d=Math.floor(Math.random()*360),m=70+Math.random()*20,p=45+Math.random()*15;return`hsl(${d}, ${m}%, ${p}%)`},Pe=(d,m,p)=>{let r="";d&&d.length>0?(r=d.charAt(0),/^[a-zA-Z]$/.test(r)&&(r="云")):r="云";const f="g_"+Math.random().toString(36).substr(2,9),v=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <defs>
            <linearGradient id="${f}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${m}"/>
                <stop offset="100%" stop-color="${p}"/>
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#${f})" rx="16"/>
        <text x="50%" y="50%" dy=".35em" fill="white" font-family="Arial, sans-serif" font-weight="bold" font-size="32" text-anchor="middle">${r}</text>
    </svg>`.trim();try{return`data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(v)))}`}catch(L){return console.error("SVG Icon Generation Failed",L),""}},Fe=({isOpen:d,onClose:m,config:p,siteSettings:r,onSave:f,links:v,categories:L,onUpdateLinks:re,authToken:S})=>{const[k,ne]=c.useState("site"),[u,B]=c.useState(p),[o,_]=c.useState(()=>({title:(r==null?void 0:r.title)||"CloudNav - 我的导航",navTitle:(r==null?void 0:r.navTitle)||"CloudNav",pinnedCategoryIcon:(r==null?void 0:r.pinnedCategoryIcon)||"LayoutGrid",favicon:(r==null?void 0:r.favicon)||"/favicon.png",cardStyle:(r==null?void 0:r.cardStyle)||"detailed",passwordExpiryDays:(r==null?void 0:r.passwordExpiryDays)??7})),[z,ie]=c.useState([]),[se,y]=c.useState(!1),[w,M]=c.useState({current:0,total:0}),C=c.useRef(!1),[N,oe]=c.useState(""),[E,D]=c.useState(!1),[$,le]=c.useState(""),[x,P]=c.useState("chrome"),[H,A]=c.useState(!1),[ce,I]=c.useState(!1),[T,O]=c.useState({}),F=t=>{const a=[];for(let n=0;n<6;n++){const i=$e(),l=`hsl(${(parseInt(i.split(",")[0].split("(")[1])+30+Math.random()*30)%360}, 70%, 50%)`;a.push(Pe(t,i,l))}ie(a)};c.useEffect(()=>{if(d){B(p);const t={title:(r==null?void 0:r.title)||"CloudNav - 我的导航",navTitle:(r==null?void 0:r.navTitle)||"CloudNav",pinnedCategoryIcon:(r==null?void 0:r.pinnedCategoryIcon)||"LayoutGrid",favicon:(r==null?void 0:r.favicon)||"/favicon.png",cardStyle:(r==null?void 0:r.cardStyle)||"detailed",passwordExpiryDays:(r==null?void 0:r.passwordExpiryDays)??7};_(t),z.length===0&&F(t.navTitle),y(!1),A(!1),M({current:0,total:0}),C.current=!1,D(!1),I(!1),le(window.location.origin);const a=localStorage.getItem("cloudnav_auth_token");a&&oe(a)}},[d,p,r]);const j=(t,a)=>{B(n=>({...n,[t]:a}))},g=async(t,a)=>{_(n=>{const i={...n,[t]:a};return t==="passwordExpiryDays"&&S&&K(i),i})},K=async t=>{try{const a=await fetch("/api/storage",{method:"POST",headers:{"Content-Type":"application/json","x-auth-password":S||""},body:JSON.stringify({saveConfig:"website",config:t})});a.ok||console.error("Failed to save website config to KV:",a.statusText)}catch(a){console.error("Error saving website config to KV:",a)}},de=()=>{f(u,o),S&&K(o),m()},ue=async()=>{if(!u.apiKey){alert("请先配置并保存 API Key");return}const t=v.filter(i=>!i.description);if(t.length===0){alert("所有链接都已有描述！");return}if(!confirm(`发现 ${t.length} 个链接缺少描述，确定要使用 AI 自动生成吗？这可能需要一些时间。`))return;y(!0),C.current=!1,M({current:0,total:t.length});let a=[...v];const{generateLinkDescription:n}=await ae(async()=>{const{generateLinkDescription:i}=await import("./geminiService-p6bqhxgA.js");return{generateLinkDescription:i}},[]);for(let i=0;i<t.length&&!C.current;i++){const s=t[i];try{const l=await n(s.title,s.url,u);a=a.map(h=>h.id===s.id?{...h,description:l}:h),re(a),M({current:i+1,total:t.length})}catch(l){console.error(`Failed to generate for ${s.title}`,l)}}y(!1)},G=(t,a)=>{navigator.clipboard.writeText(t),O(n=>({...n,[a]:!0})),setTimeout(()=>{O(n=>({...n,[a]:!1}))},2e3)},pe=(t,a)=>{const n=new Blob([a],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)},q=()=>{const t={manifest_version:3,name:(o.navTitle||"CloudNav")+" Pro",version:"7.6",minimum_chrome_version:"116",description:"CloudNav - 极速侧边栏与智能收藏",permissions:["activeTab","scripting","sidePanel","storage","favicon","contextMenus","notifications","tabs"],background:{service_worker:"background.js"},action:{default_title:"打开侧边栏 (Ctrl+Shift+E)"},side_panel:{default_path:"sidebar.html"},icons:{128:"icon.png"},commands:{_execute_action:{suggested_key:{default:"Ctrl+Shift+E",mac:"Command+Shift+E"},description:"打开 CloudNav 侧边栏"}}};return x==="firefox"&&(t.browser_specific_settings={gecko:{id:"cloudnav@example.com",strict_min_version:"109.0"}}),JSON.stringify(t,null,2)},V=JSON.stringify({apiBase:$,appUrl:typeof window<"u"?`${window.location.origin}${window.location.pathname}`:"",password:N}),W=`// background.js - CloudNav Assistant v7.6
const CONFIG = ${V};

let linkCache = [];
let categoryCache = [];
let cacheInitialized = false;

const DEFAULT_ACTION_TITLE = "打开侧边栏 (Ctrl+Shift+E)";
const SIDEBAR_PATH = 'sidebar.html';
const MULTI_PART_TLDS = new Set([
  'ac.jp', 'ac.uk',
  'co.jp', 'co.kr', 'co.uk',
  'com.au', 'com.br', 'com.cn', 'com.hk', 'com.mx', 'com.sg', 'com.tr', 'com.tw',
  'edu.cn', 'edu.hk',
  'gen.tr', 'go.jp', 'gov.cn', 'gov.hk', 'gov.uk',
  'idv.hk', 'idv.tw',
  'mil.cn',
  'ne.jp', 'ne.kr', 'net.au', 'net.cn', 'net.hk', 'net.sg', 'net.tw', 'net.uk',
  'or.jp', 'or.kr', 'org.au', 'org.cn', 'org.hk', 'org.mx', 'org.sg', 'org.tw', 'org.uk',
  're.kr'
]);

async function ensureSidePanelReady() {
  await Promise.allSettled([
    chrome.sidePanel.setOptions({ path: SIDEBAR_PATH, enabled: true }),
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  ]);
}

ensureSidePanelReady().catch(() => {});

chrome.runtime.onInstalled.addListener(async () => {
  await ensureSidePanelReady();
  refreshUiFromCache();
});

chrome.runtime.onStartup.addListener(async () => {
  await ensureSidePanelReady();
  refreshUiFromCache();
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.cloudnav_data) {
        refreshUiFromCache();
    }
});

async function refreshCache() {
    const data = await chrome.storage.local.get('cloudnav_data');
    linkCache = data && data.cloudnav_data && Array.isArray(data.cloudnav_data.links)
        ? data.cloudnav_data.links
        : [];
    categoryCache = data && data.cloudnav_data && Array.isArray(data.cloudnav_data.categories)
        ? data.cloudnav_data.categories
        : [];
    cacheInitialized = true;
    return;
}

async function ensureCache() {
    if (!cacheInitialized) {
        await refreshCache();
    }
}

async function refreshUiFromCache() {
    await refreshCache();
    buildMenus();
    await refreshAllTabBadges();
    await refreshActiveTabUi();
}

const windowPorts = {};

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'cloudnav_sidebar') return;
  port.onMessage.addListener((msg) => {
    if (msg.type === 'init' && msg.windowId) {
      windowPorts[msg.windowId] = port;
      port.onDisconnect.addListener(() => {
        if (windowPorts[msg.windowId] === port) {
          delete windowPorts[msg.windowId];
        }
      });
    }
  });
});

chrome.action.onClicked.addListener(async (tab) => {
    const windowId = tab.windowId;
    if (typeof windowId !== 'number') return;
    const existingPort = windowPorts[windowId];

    if (existingPort) {
        try {
            existingPort.postMessage({ action: 'close_panel' });
        } catch (e) {
            delete windowPorts[windowId];
            try {
                await ensureSidePanelReady();
                await chrome.sidePanel.open({ windowId });
            } catch (openError) {
                console.error('Failed to reopen sidebar', openError);
            }
        }
    } else {
        try {
            await ensureSidePanelReady();
            await chrome.sidePanel.open({ windowId: windowId });
        } catch (e) {
            console.error('Failed to open sidebar', e);
        }
    }
});

function buildMenus() {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: "cloudnav_root",
            title: "⚡ 保存到 CloudNav",
            contexts: ["page", "link", "action"]
        });

        chrome.contextMenus.create({
            id: "cloudnav_root_pin",
            title: "📌 保存并置顶",
            contexts: ["page", "link", "action"]
        });

        if (categoryCache.length > 0) {
            categoryCache.forEach(cat => {
                // 创建一级分类菜单
                chrome.contextMenus.create({
                    id: \`save_to_\${cat.id}\`,
                    parentId: "cloudnav_root",
                    title: cat.name,
                    contexts: ["page", "link", "action"]
                });
                chrome.contextMenus.create({
                    id: \`pin_to_\${cat.id}\`,
                    parentId: "cloudnav_root_pin",
                    title: cat.name,
                    contexts: ["page", "link", "action"]
                });
                
                // 如果有二级分类，创建子菜单
                if (cat.subcategories && cat.subcategories.length > 0) {
                    cat.subcategories.forEach(subCat => {
                        chrome.contextMenus.create({
                            id: \`save_to_\${cat.id}_\${subCat.id}\`,
                            parentId: \`save_to_\${cat.id}\`,
                            title: subCat.name,
                            contexts: ["page", "link", "action"]
                        });
                        chrome.contextMenus.create({
                            id: \`pin_to_\${cat.id}_\${subCat.id}\`,
                            parentId: \`pin_to_\${cat.id}\`,
                            title: subCat.name,
                            contexts: ["page", "link", "action"]
                        });
                    });
                }
            });
        } else {
            chrome.contextMenus.create({
                id: "save_to_common",
                parentId: "cloudnav_root",
                title: "默认分类",
                contexts: ["page", "link", "action"]
            });
            chrome.contextMenus.create({
                id: "pin_to_common",
                parentId: "cloudnav_root_pin",
                title: "默认分类",
                contexts: ["page", "link", "action"]
            });
        }
    });
}

function normalizeUrl(url) {
    const meta = getUrlMatchMeta(url);
    return meta ? meta.normalizedUrl : '';
}

function isMatchableUrl(url) {
    return /^https?:\\/\\//i.test(String(url || '').trim());
}

function isIpLikeHost(hostname) {
    return /^(?:\\d{1,3}\\.){3}\\d{1,3}$/.test(hostname) || hostname.includes(':');
}

function getRegistrableDomain(hostname) {
    const safeHostname = String(hostname || '').trim().toLowerCase().replace(/^\\.+|\\.+$/g, '');
    if (!safeHostname) return '';
    if (safeHostname === 'localhost' || isIpLikeHost(safeHostname)) return safeHostname;

    const labels = safeHostname.split('.').filter(Boolean);
    if (labels.length <= 2) return safeHostname;

    const tail = labels.slice(-2).join('.');
    if (MULTI_PART_TLDS.has(tail) && labels.length >= 3) {
        return labels.slice(-3).join('.');
    }

    return labels.slice(-2).join('.');
}

function getUrlMatchMeta(url) {
    const safeUrl = String(url || '').trim();
    if (!safeUrl) return null;

    try {
        const parsed = new URL(isMatchableUrl(safeUrl) ? safeUrl : ('https://' + safeUrl));
        const pathname = (parsed.pathname || '/').replace(/\\/$/, '') || '/';
        const rawHostname = String(parsed.hostname || '').trim().toLowerCase().replace(/\\.$/, '');
        const hostname = rawHostname.replace(/^www\\./, '');

        return {
            normalizedUrl: \`\${parsed.origin.toLowerCase()}\${pathname}\${parsed.search}\`,
            pathname,
            hostname,
            siteKey: getRegistrableDomain(hostname)
        };
    } catch (e) {
        return {
            normalizedUrl: safeUrl.replace(/\\/$/, '').toLowerCase(),
            pathname: '',
            hostname: '',
            siteKey: ''
        };
    }
}

function getAllLinkUrls(link) {
    const extraUrls = Array.isArray(link && link.urls)
        ? link.urls.map(item => item && item.url).filter(Boolean)
        : [];
    return [link && link.url, ...extraUrls].filter(Boolean);
}

function findExactLinkByUrl(url) {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return null;
    return linkCache.find(link =>
        getAllLinkUrls(link).some(candidate => normalizeUrl(candidate) === normalizedUrl)
    ) || null;
}

function isRootPathMatch(meta) {
    return !!(meta && meta.pathname === '/');
}

function buildMatchState(type, link) {
    return { type, link };
}

function getLinkMatchState(url) {
    const targetMeta = getUrlMatchMeta(url);
    if (!targetMeta) return null;

    let rootMatch = null;
    let siteMatch = null;

    for (const link of linkCache) {
        const candidates = getAllLinkUrls(link);
        for (const candidate of candidates) {
            const candidateMeta = getUrlMatchMeta(candidate);
            if (!candidateMeta) continue;

            if (targetMeta.normalizedUrl && candidateMeta.normalizedUrl && targetMeta.normalizedUrl === candidateMeta.normalizedUrl) {
                return buildMatchState('exact', link);
            }

            const sameHost = !!(
                targetMeta.hostname &&
                candidateMeta.hostname &&
                targetMeta.hostname === candidateMeta.hostname
            );

            const sameBaseSite = !!(
                targetMeta.siteKey &&
                candidateMeta.siteKey &&
                targetMeta.siteKey === candidateMeta.siteKey &&
                candidateMeta.hostname === candidateMeta.siteKey
            );

            if (!sameHost && !sameBaseSite) continue;

            if (!rootMatch && isRootPathMatch(candidateMeta)) {
                rootMatch = buildMatchState('root', link);
                continue;
            }

            if (!siteMatch) {
                siteMatch = buildMatchState('site', link);
            }
        }
    }

    return rootMatch || siteMatch;
}

function getMenuTitles(matchType) {
    if (matchType === 'exact') {
        return {
            save: "✅ 已添加 - 保存到 CloudNav",
            pin: "✅ 已添加 - 保存并置顶"
        };
    }

    if (matchType === 'root') {
        return {
            save: "🏠 根目录已添加 - 保存到 CloudNav",
            pin: "🏠 根目录已添加 - 保存并置顶"
        };
    }

    if (matchType === 'site') {
        return {
            save: "🌐 同站已添加 - 保存到 CloudNav",
            pin: "🌐 同站已添加 - 保存并置顶"
        };
    }

    return {
        save: "⚡ 保存到 CloudNav",
        pin: "📌 保存并置顶"
    };
}

function getActionBadgeState(matchType) {
    if (matchType === 'exact') {
        return {
            text: '已',
            color: '#16a34a',
            title: '当前网址已添加到 CloudNav'
        };
    }

    if (matchType === 'root') {
        return {
            text: '根',
            color: '#2563eb',
            title: '当前网站根目录已添加到 CloudNav'
        };
    }

    if (matchType === 'site') {
        return {
            text: '站',
            color: '#f59e0b',
            title: '当前网站已有相关页面添加到 CloudNav'
        };
    }

    return {
        text: '',
        color: '#64748b',
        title: DEFAULT_ACTION_TITLE
    };
}
function updateMenuTitle(url) {
    const match = isMatchableUrl(url) ? getLinkMatchState(url) : null;
    const titles = getMenuTitles(match && match.type);
    chrome.contextMenus.update("cloudnav_root", { title: titles.save }, () => {
        if (chrome.runtime.lastError) { }
    });
    chrome.contextMenus.update("cloudnav_root_pin", { title: titles.pin }, () => {
        if (chrome.runtime.lastError) { }
    });
}
function setActionBadge(tabId, matchType) {
    if (typeof tabId !== 'number') return;
    const badgeState = getActionBadgeState(matchType);

    chrome.action.setBadgeText({ tabId, text: badgeState.text }, () => {
        if (chrome.runtime.lastError) { }
    });

    chrome.action.setTitle({
        tabId,
        title: badgeState.title
    }, () => {
        if (chrome.runtime.lastError) { }
    });

    chrome.action.setBadgeBackgroundColor({ tabId, color: badgeState.color }, () => {
        if (chrome.runtime.lastError) { }
    });
}
async function updateTabUi(tab, updateMenu = true) {
    if (!tab || typeof tab.id !== 'number') return;
    await ensureCache();

    const currentUrl = tab.url || '';
    const match = isMatchableUrl(currentUrl) ? getLinkMatchState(currentUrl) : null;

    if (updateMenu && tab.active) {
        updateMenuTitle(currentUrl);
    }

    setActionBadge(tab.id, match && match.type);
}
async function refreshActiveTabUi() {
    try {
        let tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        if (!tabs.length) {
            tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        }
        if (tabs[0]) {
            await updateTabUi(tabs[0]);
        }
    } catch (e) { }
}

async function refreshAllTabBadges() {
    try {
        const tabs = await chrome.tabs.query({});
        await Promise.all(
            tabs
                .filter(tab => typeof tab.id === 'number')
                .map(tab => updateTabUi(tab, false))
        );
    } catch (e) { }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
   try {
       const tab = await chrome.tabs.get(activeInfo.tabId);
       await updateTabUi(tab);
   } catch(e){}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   if (changeInfo.url || changeInfo.status === 'complete') {
       updateTabUi({ ...tab, id: tabId, url: tab.url || changeInfo.url });
   }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (String(info.menuItemId).startsWith("save_to_")) {
        const idParts = String(info.menuItemId).replace("save_to_", "").split("_");
        const catId = idParts[0];
        const subCatId = idParts.length > 1 ? idParts[1] : null;
        const title = tab.title;
        const url = info.linkUrl || tab.url;
        saveLink(title, url, catId, subCatId);
    } else if (String(info.menuItemId).startsWith("pin_to_")) {
        const idParts = String(info.menuItemId).replace("pin_to_", "").split("_");
        const catId = idParts[0];
        const subCatId = idParts.length > 1 ? idParts[1] : null;
        const title = tab.title;
        const url = info.linkUrl || tab.url;
        saveLink(title, url, catId, subCatId, '', true);
    }
});

async function saveLink(title, url, categoryId, subCategoryId = null, icon = '', pinned = undefined) {
    if (!CONFIG.password) {
        notify('保存失败', '未配置密码，请先在侧边栏登录。');
        return;
    }

    const matchedLink = findExactLinkByUrl(url);
    const requestUrl = matchedLink && matchedLink.url ? matchedLink.url : url;

    if (!icon && matchedLink && matchedLink.icon) {
        icon = matchedLink.icon;
    }

    if (!icon) {
        try {
            const u = new URL(requestUrl);
            icon = \`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=\${encodeURIComponent(u.origin)}&size=128\`;
        } catch(e){}
    }

    try {
        const payload = {
            title: title || '未命名',
            url: requestUrl,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            icon: icon
        };

        if (typeof pinned === 'boolean') {
            payload.pinned = pinned;
        }

        const res = await fetch(\`\${CONFIG.apiBase}/api/link\`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-password': CONFIG.password
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            notify('保存成功', pinned === true ? '已保存并置顶' : \`已保存到 CloudNav\`);
            chrome.runtime.sendMessage({ type: 'refresh' }).catch(() => {});
            if (matchedLink) {
                linkCache = linkCache.map(link => link.id === matchedLink.id ? {
                    ...link,
                    title: title || link.title,
                    url: requestUrl,
                    categoryId,
                    subCategoryId: subCategoryId || undefined,
                    icon,
                    pinned: typeof pinned === 'boolean' ? pinned : link.pinned
                } : link);
            } else {
                const newLink = { id: Date.now().toString(), title, url: requestUrl, categoryId, subCategoryId: subCategoryId || undefined, icon, pinned: pinned === true };
                linkCache.unshift(newLink);
            }
            refreshActiveTabUi();
        } else {
            notify('保存失败', \`服务器错误: \${res.status}\`);
        }
    } catch (e) {
        notify('保存失败', '网络请求错误');
    }
}

function notify(title, message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: title,
        message: message,
        priority: 1
    });
}
`,J=`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        :root {
            --bg: #ffffff;
            --panel: #f8fafc;
            --text: #1e293b;
            --border: #e2e8f0;
            --hover: #f1f5f9;
            --accent: #2563eb;
            --accent-soft: rgba(37, 99, 235, 0.08);
            --muted: #64748b;
            --success: #15803d;
            --warn: #b45309;
            --danger: #dc2626;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg: #0f172a;
                --panel: #111c33;
                --text: #f1f5f9;
                --border: #334155;
                --hover: #1e293b;
                --accent: #60a5fa;
                --accent-soft: rgba(96, 165, 250, 0.12);
                --muted: #94a3b8;
                --success: #4ade80;
                --warn: #f59e0b;
                --danger: #f87171;
            }
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); padding-bottom: 20px; width: 100%; }
        .header { position: sticky; top: 0; padding: 10px 12px; background: var(--bg); border-bottom: 1px solid var(--border); z-index: 20; display: flex; gap: 8px; }
        .search-input { flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--hover); color: var(--text); outline: none; font-size: 13px; }
        .search-input:focus { border-color: var(--accent); }
        .refresh-btn { width: 34px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); background: var(--hover); border-radius: 8px; color: var(--muted); cursor: pointer; transition: all 0.2s; }
        .refresh-btn:hover { color: var(--accent); border-color: var(--accent); }
        .refresh-btn:active { transform: scale(0.96); }
        .rotating { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .page-editor { margin: 12px; padding: 12px; border: 1px solid var(--border); border-radius: 14px; background: linear-gradient(180deg, var(--accent-soft), transparent 72%), var(--panel); }
        .editor-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
        .editor-title { font-size: 14px; font-weight: 700; line-height: 1.2; }
        .editor-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
        .editor-status { font-size: 11px; color: var(--muted); line-height: 1.45; }
        .editor-status[data-tone="success"] { color: var(--success); }
        .editor-status[data-tone="warn"] { color: var(--warn); }
        .editor-status[data-tone="error"] { color: var(--danger); }
        .duplicate-note { display: inline-flex; align-items: center; border-radius: 999px; padding: 3px 8px; font-size: 10px; font-weight: 600; line-height: 1.2; color: var(--muted); background: rgba(100, 116, 139, 0.12); }
        .duplicate-note[data-kind="exact"] { color: var(--success); background: rgba(34, 197, 94, 0.14); }
        .duplicate-note[data-kind="root"] { color: var(--accent); background: var(--accent-soft); }
        .duplicate-note[data-kind="site"] { color: var(--warn); background: rgba(180, 83, 9, 0.12); }
        .duplicate-note[data-kind="duplicate"] { color: var(--danger); background: rgba(220, 38, 38, 0.1); }
        .form-row { margin-bottom: 8px; }
        .form-row-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .form-row-head span { font-size: 12px; font-weight: 600; color: var(--muted); }
        .form-input, .form-select, .form-textarea { width: 100%; border: 1px solid var(--border); background: var(--bg); color: var(--text); border-radius: 8px; padding: 8px 10px; font-size: 13px; outline: none; }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent); }
        .form-textarea { min-height: 64px; resize: vertical; }
        .form-toggle { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid var(--border); background: var(--bg); color: var(--text); border-radius: 8px; font-size: 13px; cursor: pointer; user-select: none; }
        .form-toggle input { margin: 0; }
        .form-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
        .primary-btn, .secondary-btn { border: 1px solid var(--border); border-radius: 10px; padding: 9px 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .primary-btn { background: var(--accent); color: white; border-color: transparent; }
        .primary-btn:hover { filter: brightness(1.05); }
        .primary-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .secondary-btn { background: var(--bg); color: var(--text); }
        .secondary-btn:hover { border-color: var(--accent); color: var(--accent); }
        .inline-btn { display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 999px; padding: 4px 9px; font-size: 11px; font-weight: 600; line-height: 1.2; white-space: nowrap; cursor: pointer; transition: all 0.2s; background: var(--bg); color: var(--accent); }
        .inline-btn:hover { border-color: var(--accent); background: var(--accent-soft); }
        .existing-records { display: none; margin-bottom: 12px; border: 1px solid var(--border); border-radius: 12px; padding: 10px; background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(6px); }
        .existing-records-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
        .existing-records-title { font-size: 12px; font-weight: 700; color: var(--text); }
        .existing-records-subtitle { margin-top: 4px; font-size: 11px; line-height: 1.5; color: var(--muted); }
        .existing-records-body { display: flex; flex-direction: column; gap: 10px; }
        .existing-group { display: flex; flex-direction: column; gap: 8px; }
        .existing-group-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .existing-group-label { font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: 0.02em; text-transform: uppercase; }
        .existing-group-count { font-size: 11px; color: var(--muted); }
        .existing-item { border: 1px solid var(--border); border-radius: 10px; padding: 10px; background: var(--bg); display: flex; flex-direction: column; gap: 8px; }
        .existing-item.active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent-soft); background: linear-gradient(180deg, var(--accent-soft), transparent 70%), var(--bg); }
        .existing-item-main { display: flex; gap: 8px; align-items: flex-start; }
        .existing-item-icon { width: 18px; height: 18px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-top: 2px; }
        .existing-item-icon img { width: 100%; height: 100%; object-fit: contain; }
        .existing-item-title { font-size: 13px; font-weight: 600; line-height: 1.35; color: var(--text); }
        .existing-item-meta { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
        .existing-item-location { font-size: 11px; font-weight: 600; color: var(--accent); }
        .existing-item-url { font-size: 11px; line-height: 1.45; color: var(--muted); word-break: break-all; }
        .existing-item-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(72px, 1fr)); gap: 6px; }
        .existing-item-actions .inline-btn { padding: 4px 8px; font-size: 10.5px; }
        .existing-item-actions .inline-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .existing-item-actions .inline-btn.primary-inline { background: var(--accent); color: #fff; border-color: transparent; }
        .existing-item-actions .inline-btn.primary-inline:hover { filter: brightness(1.05); background: var(--accent); }
        .existing-item-actions .inline-btn.danger-inline { color: var(--danger); }
        .existing-item-actions .inline-btn.danger-inline:hover { border-color: var(--danger); background: rgba(220, 38, 38, 0.08); }
        .alt-url-hint { margin-top: 6px; font-size: 11px; line-height: 1.5; color: var(--muted); }
        .url-input-row { display: flex; gap: 8px; align-items: center; }
        .url-input-row .form-input { flex: 1; min-width: 0; }
        .alt-url-list { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
        .alt-url-item { border: 1px solid var(--border); border-radius: 10px; padding: 8px; background: var(--bg); }
        .alt-url-grid { display: grid; grid-template-columns: minmax(88px, 0.9fr) minmax(0, 1.8fr) 32px 32px; gap: 6px; align-items: center; }
        .alt-url-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; }
        .alt-url-default { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); cursor: pointer; user-select: none; }
        .alt-url-default input { margin: 0; }
        .icon-btn { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 8px; background: var(--bg); color: var(--muted); cursor: pointer; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--danger); color: var(--danger); }
        .icon-btn.alt-url-open:hover { border-color: var(--accent); color: var(--accent); }
        .content { padding: 0 8px; }
        .cat-group { margin-bottom: 4px; }
        .cat-header { padding: 8px 10px; font-size: 13px; font-weight: 600; color: var(--text); cursor: pointer; display: flex; align-items: center; gap: 8px; border-radius: 8px; user-select: none; transition: background 0.1s; }
        .cat-header:hover { background: var(--hover); }
        .cat-arrow { width: 14px; height: 14px; color: var(--muted); transition: transform 0.2s; }
        .cat-header.active .cat-arrow { transform: rotate(90deg); color: var(--accent); }
        .cat-links { display: none; padding-left: 8px; margin-bottom: 8px; }
        .cat-header.active + .cat-links { display: block; }
        .link-item { display: flex; align-items: center; gap: 8px; padding: 7px 8px; border-radius: 8px; text-decoration: none; color: var(--text); transition: background 0.1s; border-left: 2px solid transparent; }
        .link-item:hover { background: var(--hover); border-left-color: var(--accent); }
        .link-icon { width: 16px; height: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .link-icon img { width: 100%; height: 100%; object-fit: contain; }
        .link-info { min-width: 0; flex: 1; }
        .link-title { font-size: 13px; font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; }
        .empty { text-align: center; padding: 20px; color: var(--muted); font-size: 12px; }
        .loading { display: flex; justify-content: center; padding: 40px; color: var(--accent); font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <input type="text" id="search" class="search-input" placeholder="搜索..." autocomplete="off">
        <button id="refresh" class="refresh-btn" title="同步最新数据">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
        </button>
    </div>
    <div class="page-editor">
        <div class="editor-head">
            <div class="editor-title">保存当前网页</div>
            <div class="editor-meta">
                <div id="duplicateNote" class="duplicate-note" style="display:none;"></div>
                <button id="openExistingRecord" class="inline-btn" type="button" style="display:none;">查看记录</button>
            </div>
            <div id="pageStatus" class="editor-status">准备读取当前标签页...</div>
        </div>
        <div id="existingRecords" class="existing-records" style="display:none;"></div>
        <div class="form-row"><input id="pageTitle" class="form-input" type="text" placeholder="网页标题"></div>
        <div class="form-row">
            <div class="url-input-row">
                <input id="pageUrl" class="form-input" type="text" placeholder="网页地址">
                <button id="openMainUrl" class="inline-btn" type="button">直达</button>
            </div>
        </div>
        <div class="form-row">
            <div class="form-row-head">
                <span>备用网址</span>
                <button id="addAltUrl" class="inline-btn" type="button">添加备用网址</button>
            </div>
            <div class="alt-url-hint">可选添加备用网址、镜像站、发布页等，勾选后会作为默认打开地址。</div>
            <div id="altUrlList" class="alt-url-list" style="display:none;"></div>
        </div>
        <div class="form-row"><textarea id="pageDescription" class="form-textarea" placeholder="网页描述（可选）"></textarea></div>
        <div class="form-row"><select id="pageCategory" class="form-select"></select></div>
        <div class="form-row" id="subCategoryWrap" style="display:none;"><select id="pageSubCategory" class="form-select"></select></div>
        <div class="form-row"><input id="pageIcon" class="form-input" type="text" placeholder="图标地址（可选）"></div>
        <div class="form-row">
            <label class="form-toggle" title="置顶后会显示在首页顶部的「置顶/常用」区域">
                <input id="pagePinned" type="checkbox" />
                <span>置顶到首页（常用）</span>
            </label>
        </div>
        <div class="form-actions">
            <button id="fillCurrent" class="secondary-btn" type="button">读取当前页</button>
            <button id="saveCurrent" class="primary-btn" type="button">新建记录</button>
        </div>
    </div>
    <div id="content" class="content">
        <div class="loading">初始化...</div>
    </div>
    <script src="sidebar.js"><\/script>
</body>
</html>`,Z=`const CONFIG = ${V};
const CACHE_KEY = 'cloudnav_data';

let port = null;
try {
    port = chrome.runtime.connect({ name: 'cloudnav_sidebar' });
    chrome.windows.getCurrent((win) => {
        if (win && port) {
            port.postMessage({ type: 'init', windowId: win.id });
        }
    });

    port.onMessage.addListener((msg) => {
        if (msg.action === 'close_panel') {
            window.close();
        }
    });
} catch(e) {
    console.error('Connection failed', e);
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('content');
    const searchInput = document.getElementById('search');
    const refreshBtn = document.getElementById('refresh');
    const pageStatus = document.getElementById('pageStatus');
    const duplicateNote = document.getElementById('duplicateNote');
    const openExistingRecordBtn = document.getElementById('openExistingRecord');
    const existingRecords = document.getElementById('existingRecords');
    const titleInput = document.getElementById('pageTitle');
    const urlInput = document.getElementById('pageUrl');
    const openMainUrlBtn = document.getElementById('openMainUrl');
    const descriptionInput = document.getElementById('pageDescription');
    const categorySelect = document.getElementById('pageCategory');
    const subCategoryWrap = document.getElementById('subCategoryWrap');
    const subCategorySelect = document.getElementById('pageSubCategory');
    const addAltUrlBtn = document.getElementById('addAltUrl');
    const altUrlList = document.getElementById('altUrlList');
    const iconInput = document.getElementById('pageIcon');
    const pinnedInput = document.getElementById('pagePinned');
    const fillCurrentBtn = document.getElementById('fillCurrent');
    const saveCurrentBtn = document.getElementById('saveCurrent');

    const showFatalError = (message) => {
        const safeMessage = String(message || 'Unknown error')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        if (container) {
            container.innerHTML = \`<div class="empty" style="color:#ef4444">初始化失败: \${safeMessage}<br>请重新生成扩展后再试</div>\`;
        }
        if (pageStatus) {
            pageStatus.textContent = '初始化失败，请检查扩展配置。';
            pageStatus.dataset.tone = 'error';
        }
    };

    try {
        if (
            !container ||
            !searchInput ||
            !refreshBtn ||
            !pageStatus ||
            !duplicateNote ||
            !openExistingRecordBtn ||
            !existingRecords ||
            !titleInput ||
            !urlInput ||
            !openMainUrlBtn ||
            !descriptionInput ||
            !categorySelect ||
            !subCategoryWrap ||
            !subCategorySelect ||
            !addAltUrlBtn ||
            !altUrlList ||
            !iconInput ||
            !pinnedInput ||
            !fillCurrentBtn ||
            !saveCurrentBtn
        ) {
            throw new Error('Sidebar DOM unavailable');
        }

    let allLinks = [];
    let allCategories = [];
    let expandedCats = new Set();
    let currentAltUrls = [];
    let editingLinkId = '';
    let isSavingCurrent = false;
    let lastSavedFeedback = null;
    let currentExistingRecordState = { groups: [], total: 0, primaryLink: null };
    let existingRecordsExpanded = false;
    let deletingLinkIds = new Set();

    const escapeHtml = (value = '') => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const ensureProtocol = (value = '') => {
        const trimmed = String(value || '').trim();
        if (!trimmed) return '';
        if (/^https?:\\/\\//i.test(trimmed)) return trimmed;
        return 'https://' + trimmed;
    };

    const openPreviewUrl = (value = '') => {
        const target = ensureProtocol(value);
        if (!target) return;
        window.open(target, '_blank', 'noopener,noreferrer');
    };

    const getExistingRecordUrl = (link) => {
        if (!link || !link.id || !CONFIG.appUrl) return '';
        try {
            const target = new URL(CONFIG.appUrl);
            target.searchParams.set('focus_link', String(link.id));
            return target.toString();
        } catch (e) {
            return '';
        }
    };

    const openCloudNavRecord = (link) => {
        const targetUrl = getExistingRecordUrl(link);
        if (!targetUrl) return;

        if (chrome && chrome.tabs && chrome.tabs.create) {
            chrome.tabs.create({ url: targetUrl });
            return;
        }

        window.open(targetUrl, '_blank', 'noopener,noreferrer');
    };

    const getExistingGroupLabel = (matchType) => {
        if (matchType === 'exact') return '重复网址';
        if (matchType === 'root') return '站点根目录';
        return '同站记录';
    };

    const buildExistingRecordState = (candidateUrls = []) => {
        const normalizedCandidates = new Set((candidateUrls || []).map(normalizeUrl).filter(Boolean));
        const mainMeta = getUrlMatchMeta((candidateUrls && candidateUrls[0]) || '');
        const groupedMatches = {
            exact: new Map(),
            root: new Map(),
            site: new Map()
        };

        allLinks.forEach(link => {
            if (!link) return;

            const candidates = getAllLinkUrls(link);
            let matchType = '';

            for (const candidate of candidates) {
                const candidateMeta = getUrlMatchMeta(candidate);
                if (!candidateMeta) continue;

                if (
                    normalizedCandidates.size > 0 &&
                    candidateMeta.normalizedUrl &&
                    normalizedCandidates.has(candidateMeta.normalizedUrl)
                ) {
                    matchType = 'exact';
                    break;
                }

                if (!mainMeta) continue;

                const sameHost = !!(
                    mainMeta.hostname &&
                    candidateMeta.hostname &&
                    mainMeta.hostname === candidateMeta.hostname
                );

                const sameBaseSite = !!(
                    mainMeta.siteKey &&
                    candidateMeta.siteKey &&
                    mainMeta.siteKey === candidateMeta.siteKey &&
                    candidateMeta.hostname === candidateMeta.siteKey
                );

                if (!sameHost && !sameBaseSite) continue;

                if (!matchType && isRootPathMatch(candidateMeta)) {
                    matchType = 'root';
                    continue;
                }

                if (!matchType) {
                    matchType = 'site';
                }
            }

            if (matchType) {
                groupedMatches[matchType].set(link.id, link);
            }
        });

        const groups = ['exact', 'root', 'site']
            .map(type => ({
                type,
                links: Array.from(groupedMatches[type].values()).sort((a, b) => {
                    const aTime = Number(a && a.createdAt) || 0;
                    const bTime = Number(b && b.createdAt) || 0;
                    return bTime - aTime;
                })
            }))
            .filter(group => group.links.length > 0);

        return {
            groups,
            total: groups.reduce((sum, group) => sum + group.links.length, 0),
            primaryLink: groups[0] && groups[0].links[0] ? groups[0].links[0] : null
        };
    };

    const renderExistingRecords = () => {
        if (!existingRecords) return;

        if (!existingRecordsExpanded || !currentExistingRecordState.total) {
            existingRecords.style.display = 'none';
            existingRecords.innerHTML = '';
            return;
        }

        existingRecords.style.display = 'block';
        existingRecords.innerHTML = \`
            <div class="existing-records-head">
                <div>
                    <div class="existing-records-title">已收录记录</div>
                    <div class="existing-records-subtitle">当前网页在 CloudNav 中命中 \${currentExistingRecordState.total} 条相关记录，可在侧边栏内直接查看、定位或删除。</div>
                </div>
            </div>
            <div class="existing-records-body">
                \${currentExistingRecordState.groups.map(group => \`
                    <div class="existing-group">
                        <div class="existing-group-head">
                            <span class="existing-group-label">\${escapeHtml(getExistingGroupLabel(group.type))}</span>
                            <span class="existing-group-count">\${group.links.length} 条</span>
                        </div>
                        \${group.links.map(link => {
                            const openUrl = getPreferredOpenUrl(link) || link.url || '';
                            const iconSrc = getDisplayIconUrl(openUrl || link.url || '');
                            const locationText = getLocationText(link.categoryId, link.subCategoryId);
                            const extraUrlCount = Array.isArray(link.urls) ? link.urls.length : 0;
                            const isActive = !!(editingLinkId && link.id === editingLinkId);
                            const isDeleting = deletingLinkIds.has(link.id);

                            return \`
                                <div class="existing-item \${isActive ? 'active' : ''}">
                                    <div class="existing-item-main">
                                        <div class="existing-item-icon"><img src="\${escapeHtml(iconSrc)}" /></div>
                                        <div class="link-info">
                                            <div class="existing-item-title">\${escapeHtml(link.title || link.url || '未命名网站')}</div>
                                            <div class="existing-item-meta">
                                                <div class="existing-item-location">\${escapeHtml(locationText || '未分类')}</div>
                                                <div class="existing-item-url">\${escapeHtml(openUrl || link.url || '')}\${extraUrlCount > 0 ? \`<br>另有 \${extraUrlCount} 个备用网址\` : ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="existing-item-actions">
                                        <button class="inline-btn primary-inline existing-load-editor" type="button" data-link-id="\${escapeHtml(link.id)}">\${isActive ? '已载入' : '载入编辑'}</button>
                                        <button class="inline-btn existing-open-site" type="button" data-url="\${escapeHtml(openUrl || link.url || '')}">直达</button>
                                        \${link && link.id ? \`<button class="inline-btn existing-open-app" type="button" data-link-id="\${escapeHtml(link.id)}">定位记录</button>\` : ''}
                                        \${link && link.id ? \`<button class="inline-btn danger-inline existing-delete-record" type="button" data-link-id="\${escapeHtml(link.id)}" \${isDeleting ? 'disabled' : ''}>\${isDeleting ? '删除中...' : '删除'}</button>\` : ''}
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`).join('')}
            </div>
        \`;
    };

    const updateExistingRecordAction = (recordState = null) => {
        currentExistingRecordState = recordState && recordState.total
            ? recordState
            : { groups: [], total: 0, primaryLink: null };

        if (!currentExistingRecordState.total) {
            existingRecordsExpanded = false;
            openExistingRecordBtn.style.display = 'none';
            openExistingRecordBtn.setAttribute('disabled', 'disabled');
            openExistingRecordBtn.textContent = '查看记录';
            openExistingRecordBtn.title = '';
            renderExistingRecords();
            return;
        }

        openExistingRecordBtn.style.display = 'inline-flex';
        openExistingRecordBtn.removeAttribute('disabled');
        openExistingRecordBtn.textContent = existingRecordsExpanded
            ? \`收起记录 (\${currentExistingRecordState.total})\`
            : \`查看记录 (\${currentExistingRecordState.total})\`;
        openExistingRecordBtn.title = currentExistingRecordState.primaryLink && currentExistingRecordState.primaryLink.title
            ? \`查看与「\${currentExistingRecordState.primaryLink.title}」相关的已有记录\`
            : '查看已有的网站记录';
        renderExistingRecords();
    };

    const openExistingRecord = () => {
        if (!currentExistingRecordState.total) return;
        existingRecordsExpanded = !existingRecordsExpanded;
        updateExistingRecordAction(currentExistingRecordState);
    };

    const deleteExistingRecord = async (link) => {
        if (!link || !link.id || deletingLinkIds.has(link.id)) return;

        const label = link.title || link.url || '当前记录';
        const confirmed = window.confirm(\`确定要删除「\${label}」吗？删除后网站中的对应卡片也会同步移除。\`);
        if (!confirmed) return;

        deletingLinkIds.add(link.id);
        renderExistingRecords();

        try {
            const res = await fetch(\`\${CONFIG.apiBase}/api/link\`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-password': CONFIG.password
                },
                body: JSON.stringify({ id: link.id })
            });

            let responseData = null;
            try {
                responseData = await res.json();
            } catch (e) {
                responseData = null;
            }

            if (!res.ok) {
                throw new Error(responseData && responseData.error ? responseData.error : \`删除失败: \${res.status}\`);
            }

            if (editingLinkId === link.id) {
                editingLinkId = '';
                syncSaveActionLabel();
            }

            lastSavedFeedback = null;
            await loadData(true);
            setStatus(\`已删除「\${label}」。\`, 'success');
        } catch (e) {
            setStatus(e && e.message ? e.message : '删除失败，请稍后重试。', 'error');
        } finally {
            deletingLinkIds.delete(link.id);
            renderExistingRecords();
        }
    };

    const MULTI_PART_TLDS = new Set([
        'ac.jp', 'ac.uk',
        'co.jp', 'co.kr', 'co.uk',
        'com.au', 'com.br', 'com.cn', 'com.hk', 'com.mx', 'com.sg', 'com.tr', 'com.tw',
        'edu.cn', 'edu.hk',
        'gen.tr', 'go.jp', 'gov.cn', 'gov.hk', 'gov.uk',
        'idv.hk', 'idv.tw',
        'mil.cn',
        'ne.jp', 'ne.kr', 'net.au', 'net.cn', 'net.hk', 'net.sg', 'net.tw', 'net.uk',
        'or.jp', 'or.kr', 'org.au', 'org.cn', 'org.hk', 'org.mx', 'org.sg', 'org.tw', 'org.uk',
        're.kr'
    ]);

    const normalizeUrl = (value = '') => {
        const meta = getUrlMatchMeta(value);
        return meta ? meta.normalizedUrl : '';
    };

    const isIpLikeHost = (hostname = '') => /^(?:\\d{1,3}\\.){3}\\d{1,3}$/.test(hostname) || hostname.includes(':');

    const getRegistrableDomain = (hostname = '') => {
        const safeHostname = String(hostname || '').trim().toLowerCase().replace(/^\\.+|\\.+$/g, '');
        if (!safeHostname) return '';
        if (safeHostname === 'localhost' || isIpLikeHost(safeHostname)) return safeHostname;

        const labels = safeHostname.split('.').filter(Boolean);
        if (labels.length <= 2) return safeHostname;

        const tail = labels.slice(-2).join('.');
        if (MULTI_PART_TLDS.has(tail) && labels.length >= 3) {
            return labels.slice(-3).join('.');
        }

        return labels.slice(-2).join('.');
    };

    const getUrlMatchMeta = (value = '') => {
        const safeValue = ensureProtocol(value);
        if (!safeValue) return null;
        try {
            const parsed = new URL(safeValue);
            const pathname = (parsed.pathname || '/').replace(/\\/$/, '') || '/';
            const rawHostname = String(parsed.hostname || '').trim().toLowerCase().replace(/\\.$/, '');
            const hostname = rawHostname.replace(/^www\\./, '');
            return {
                normalizedUrl: \`\${parsed.origin.toLowerCase()}\${pathname}\${parsed.search}\`,
                pathname,
                hostname,
                siteKey: getRegistrableDomain(hostname)
            };
        } catch (e) {
            return {
                normalizedUrl: safeValue.replace(/\\/$/, '').toLowerCase(),
                pathname: '',
                hostname: '',
                siteKey: ''
            };
        }
    };

    const isRootPathMatch = (meta) => !!(meta && meta.pathname === '/');

    const getMatchText = (matchType, locationText = '') => {
        const prefix = matchType === 'exact'
            ? '已添加'
            : (matchType === 'root' ? '根目录已添加' : '同站已添加');
        return locationText ? \`\${prefix}：\${locationText}\` : prefix;
    };

    const setDuplicateNote = (text = '', kind = '') => {
        duplicateNote.textContent = text;
        duplicateNote.style.display = text ? 'inline-flex' : 'none';
        if (kind) {
            duplicateNote.dataset.kind = kind;
        } else {
            duplicateNote.removeAttribute('data-kind');
        }
    };

    const getLinkMatchState = (pageUrl) => {
        const targetMeta = getUrlMatchMeta(pageUrl);
        if (!targetMeta) return null;

        let rootMatch = null;
        let siteMatch = null;

        for (const link of allLinks) {
            const candidates = getAllLinkUrls(link);
            for (const candidate of candidates) {
                const candidateMeta = getUrlMatchMeta(candidate);
                if (!candidateMeta) continue;

                if (targetMeta.normalizedUrl && candidateMeta.normalizedUrl && targetMeta.normalizedUrl === candidateMeta.normalizedUrl) {
                    return { type: 'exact', link };
                }

                const sameHost = !!(
                    targetMeta.hostname &&
                    candidateMeta.hostname &&
                    targetMeta.hostname === candidateMeta.hostname
                );

                const sameBaseSite = !!(
                    targetMeta.siteKey &&
                    candidateMeta.siteKey &&
                    targetMeta.siteKey === candidateMeta.siteKey &&
                    candidateMeta.hostname === candidateMeta.siteKey
                );

                if (!sameHost && !sameBaseSite) continue;

                if (!rootMatch && isRootPathMatch(candidateMeta)) {
                    rootMatch = { type: 'root', link };
                    continue;
                }

                if (!siteMatch) {
                    siteMatch = { type: 'site', link };
                }
            }
        }

        return rootMatch || siteMatch;
    };

    const getReadCurrentStatus = (matchType) => {
        if (matchType === 'exact') return '已读取当前页，当前网址已添加到 CloudNav。可直接修改后再次保存。';
        if (matchType === 'root') return '已读取当前页，当前网站根目录已添加到 CloudNav。当前页面可单独保存。';
        if (matchType === 'site') return '已读取当前页，CloudNav 中已有同站记录。当前页面可单独保存。';
        return '已读取当前页，可编辑后保存到指定分类。';
    };

    const setStatus = (text, tone = 'muted') => {
        pageStatus.textContent = text;
        pageStatus.dataset.tone = tone;
    };
    const getArrowIcon = () => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-arrow"><polyline points="9 18 15 12 9 6"></polyline></svg>';

    const getDisplayIconUrl = (pageUrl) => {
        try {
            const url = new URL(chrome.runtime.getURL('/_favicon/'));
            url.searchParams.set('pageUrl', pageUrl);
            url.searchParams.set('size', '32');
            return url.toString();
        } catch (e) {
            return '';
        }
    };

    const getCloudNavIconUrl = (pageUrl) => {
        try {
            const parsed = new URL(ensureProtocol(pageUrl));
            return \`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=\${encodeURIComponent(parsed.origin)}&size=128\`;
        } catch (e) {
            return '';
        }
    };

    const getAllLinkUrls = (link) => {
        const extraUrls = Array.isArray(link && link.urls)
            ? link.urls.map(item => item && item.url).filter(Boolean)
            : [];
        return [link && link.url, ...extraUrls].filter(Boolean);
    };

    const getPreferredOpenUrl = (link) => {
        if (link && Array.isArray(link.urls)) {
            const defaultUrl = link.urls.find(item => item && item.isDefault && item.url);
            if (defaultUrl && defaultUrl.url) return defaultUrl.url;
        }
        return link && link.url ? link.url : '';
    };

    const findCategory = (categoryId) => allCategories.find(cat => cat.id === categoryId) || null;
    const findSubCategory = (categoryId, subCategoryId) => {
        const category = findCategory(categoryId);
        if (!category || !Array.isArray(category.subcategories)) return null;
        return category.subcategories.find(sub => sub.id === subCategoryId) || null;
    };

    const createAltUrlItem = (item = {}) => ({
        id: item && item.id ? String(item.id) : ('url_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)),
        label: typeof (item && item.label) === 'string' && item.label.trim() ? item.label.trim() : '备用站',
        url: typeof (item && item.url) === 'string' ? item.url : '',
        isDefault: !!(item && item.isDefault)
    });

    const getFormUrls = () => [urlInput.value, ...currentAltUrls.map(item => item && item.url)];

    const getCandidateSignature = (urls = []) =>
        urls
            .map(normalizeUrl)
            .filter(Boolean)
            .sort()
            .join('||');

    const clearSavedFeedbackIfDirty = () => {
        if (lastSavedFeedback && lastSavedFeedback.signature !== getCandidateSignature(getFormUrls())) {
            lastSavedFeedback = null;
        }
    };

    const getPreparedAltUrls = () => {
        const mainNormalizedUrl = normalizeUrl(urlInput.value);
        const seen = new Set(mainNormalizedUrl ? [mainNormalizedUrl] : []);
        let defaultAssigned = false;

        return currentAltUrls.reduce((acc, item, index) => {
            const finalUrl = ensureProtocol(item && item.url);
            const normalizedAltUrl = normalizeUrl(finalUrl);
            if (!finalUrl || !normalizedAltUrl || seen.has(normalizedAltUrl)) {
                return acc;
            }

            seen.add(normalizedAltUrl);

            const nextItem = {
                id: item && item.id ? String(item.id) : ('url_' + Date.now() + '_' + index),
                label: String(item && item.label ? item.label : '备用站').trim() || '备用站',
                url: finalUrl
            };

            if (item && item.isDefault && !defaultAssigned) {
                nextItem.isDefault = true;
                defaultAssigned = true;
            }

            acc.push(nextItem);
            return acc;
        }, []);
    };

    const setAltUrls = (items = []) => {
        const nextItems = Array.isArray(items) ? items.map(createAltUrlItem) : [];
        const defaultIndex = nextItems.findIndex(item => item.isDefault);

        currentAltUrls = nextItems.map((item, index) => ({
            ...item,
            isDefault: defaultIndex === -1 ? false : index === defaultIndex
        }));

        if (!currentAltUrls.length) {
            altUrlList.style.display = 'none';
            altUrlList.innerHTML = '';
            return;
        }

        altUrlList.style.display = 'flex';
        altUrlList.innerHTML = currentAltUrls.map(item => \`
            <div class="alt-url-item" data-id="\${escapeHtml(item.id)}">
                <div class="alt-url-grid">
                    <input class="form-input alt-url-label" type="text" value="\${escapeHtml(item.label || '')}" placeholder="标签">
                    <input class="form-input alt-url-url" type="text" value="\${escapeHtml(item.url || '')}" placeholder="备用网址">
                    <button class="icon-btn alt-url-open" type="button" title="直达打开">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                    </button>
                    <button class="icon-btn alt-url-remove" type="button" title="删除备用网址">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                    </button>
                </div>
                <div class="alt-url-meta">
                    <label class="alt-url-default">
                        <input class="alt-url-default-toggle" type="checkbox" \${item.isDefault ? 'checked' : ''}>
                        <span>设为默认打开</span>
                    </label>
                </div>
            </div>
        \`).join('');
    };

    const findDuplicateLinks = (candidateUrls, ignoreLinkId = '') => {
        const normalizedCandidates = new Set((candidateUrls || []).map(normalizeUrl).filter(Boolean));
        if (normalizedCandidates.size === 0) return [];

        return allLinks.filter(link => {
            if (!link) return false;
            if (ignoreLinkId && link.id === ignoreLinkId) return false;
            return getAllLinkUrls(link).some(candidate => normalizedCandidates.has(normalizeUrl(candidate)));
        });
    };

    const findExistingLink = (pageUrl) => {
        const normalized = normalizeUrl(pageUrl);
        if (!normalized) return null;
        return allLinks.find(link =>
            getAllLinkUrls(link).some(candidate => normalizeUrl(candidate) === normalized)
        ) || null;
    };

    const getLocationText = (categoryId, subCategoryId) => {
        const category = findCategory(categoryId);
        const subCategory = findSubCategory(categoryId, subCategoryId);
        return [category ? category.name : categoryId, subCategory ? subCategory.name : '']
            .filter(Boolean)
            .join(' / ');
    };

    const getSaveActionText = () => editingLinkId ? '更新记录' : '新建记录';

    const getSavePendingText = () => editingLinkId ? '更新中...' : '新建中...';

    const syncSaveActionLabel = () => {
        saveCurrentBtn.textContent = getSaveActionText();
        saveCurrentBtn.title = editingLinkId
            ? '更新当前载入的已有记录'
            : '新建一条记录并保存到当前分类';
    };

    const loadLinkIntoEditor = (link, statusText = '已载入已有记录，可直接查看并编辑后保存。') => {
        if (!link) return;

        lastSavedFeedback = null;
        editingLinkId = link.id || '';
        titleInput.value = link.title || '';
        urlInput.value = link.url || '';
        descriptionInput.value = link.description || '';
        iconInput.value = link.icon || getCloudNavIconUrl(link.url || '');
        setAltUrls(link.urls || []);
        if (pinnedInput) pinnedInput.checked = !!link.pinned;

        const nextCategoryId = link.categoryId || categorySelect.value || ((allCategories[0] && allCategories[0].id) || 'common');
        renderCategoryOptions(nextCategoryId);
        renderSubCategoryOptions(nextCategoryId, link.subCategoryId || '');
        syncSaveActionLabel();
        setStatus(statusText, 'success');
        updateDuplicateState();
    };

    const renderCategoryOptions = (selectedCategoryId) => {
        const fallbackId = selectedCategoryId || categorySelect.value || (allCategories[0] && allCategories[0].id) || 'common';
        if (allCategories.length === 0) {
            categorySelect.innerHTML = '<option value="common">常用推荐</option>';
            categorySelect.value = 'common';
            return;
        }

        categorySelect.innerHTML = allCategories
            .map(cat => \`<option value="\${escapeHtml(cat.id)}">\${escapeHtml(cat.name)}</option>\`)
            .join('');

        categorySelect.value = allCategories.some(cat => cat.id === fallbackId)
            ? fallbackId
            : allCategories[0].id;
    };

    const renderSubCategoryOptions = (selectedCategoryId, selectedSubCategoryId = '') => {
        const category = findCategory(selectedCategoryId);
        const subcategories = category && Array.isArray(category.subcategories) ? category.subcategories : [];

        if (subcategories.length === 0) {
            subCategoryWrap.style.display = 'none';
            subCategorySelect.innerHTML = '<option value="">-- 不选择 --</option>';
            return;
        }

        subCategoryWrap.style.display = 'block';
        subCategorySelect.innerHTML = '<option value="">-- 不选择 --</option>' + subcategories
            .map(sub => \`<option value="\${escapeHtml(sub.id)}">\${escapeHtml(sub.name)}</option>\`)
            .join('');
        subCategorySelect.value = subcategories.some(sub => sub.id === selectedSubCategoryId)
            ? selectedSubCategoryId
            : '';
    };

    const updateDuplicateState = () => {
        const candidateUrls = getFormUrls();
        const formSignature = getCandidateSignature(candidateUrls);
        const existingRecordState = buildExistingRecordState(candidateUrls);

        if (lastSavedFeedback && lastSavedFeedback.signature === formSignature) {
            const locationText = getLocationText(lastSavedFeedback.categoryId, lastSavedFeedback.subCategoryId);
            updateExistingRecordAction(existingRecordState);
            setDuplicateNote(getMatchText('exact', locationText), 'exact');
            return;
        }

        const duplicates = findDuplicateLinks(candidateUrls, editingLinkId);
        if (duplicates.length) {
            const existing = duplicates[0];
            const locationText = getLocationText(existing.categoryId, existing.subCategoryId);
            updateExistingRecordAction(existingRecordState);
            setDuplicateNote(
                duplicates.length > 1 ? \`检测到 \${duplicates.length} 个重复网站\` : getMatchText('exact', locationText),
                duplicates.length > 1 ? 'duplicate' : 'exact'
            );
            return;
        }

        const currentMatch = getLinkMatchState(urlInput.value);
        if (currentMatch && currentMatch.link) {
            const locationText = getLocationText(currentMatch.link.categoryId, currentMatch.link.subCategoryId);
            updateExistingRecordAction(existingRecordState);
            setDuplicateNote(getMatchText(currentMatch.type, locationText), currentMatch.type);
            return;
        }

        updateExistingRecordAction(existingRecordState.total ? existingRecordState : null);
        setDuplicateNote();
    };
    const toggleCat = (id) => {
        const header = document.querySelector(\`.cat-header[data-id="\${id}"]\`);
        if (!header) return;

        header.classList.toggle('active');
        if (header.classList.contains('active')) {
            expandedCats.add(id);
        } else {
            expandedCats.delete(id);
        }
    };

    const getActiveTab = async () => {
        let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tabs || tabs.length === 0) {
            tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        }
        return tabs && tabs[0] ? tabs[0] : null;
    };

    const fillCurrentTab = async (reuseExisting = true) => {
        try {
            lastSavedFeedback = null;
            const tab = await getActiveTab();
            if (!tab || !tab.url) {
                setStatus('未找到当前标签页，请手动填写网址。', 'error');
                return;
            }

            if (/^(chrome|edge|about):\\/\\//i.test(tab.url)) {
                setStatus('当前页面不支持直接保存，请切换到普通网页。', 'error');
                return;
            }

            const matchState = reuseExisting ? getLinkMatchState(tab.url) : null;
            const existing = matchState && matchState.type === 'exact' ? matchState.link : null;
            const safeIcon = tab.favIconUrl && /^(https?:|data:)/i.test(tab.favIconUrl)
                ? tab.favIconUrl
                : getCloudNavIconUrl(tab.url);

            if (existing) {
                loadLinkIntoEditor({
                    ...existing,
                    title: existing.title || tab.title || '',
                    url: existing.url || tab.url,
                    icon: existing.icon || safeIcon
                }, getReadCurrentStatus('exact'));
            } else {
                editingLinkId = '';
                titleInput.value = tab.title || '';
                urlInput.value = tab.url;
                descriptionInput.value = '';
                iconInput.value = safeIcon;
                setAltUrls([]);
                if (pinnedInput) pinnedInput.checked = false;
                const nextCategoryId = matchState && matchState.link && matchState.link.categoryId
                    ? matchState.link.categoryId
                    : (categorySelect.value || (allCategories[0] && allCategories[0].id) || 'common');
                const nextSubCategoryId = matchState && matchState.link ? (matchState.link.subCategoryId || '') : '';
                renderCategoryOptions(nextCategoryId);
                renderSubCategoryOptions(nextCategoryId, nextSubCategoryId);
                syncSaveActionLabel();
                setStatus(getReadCurrentStatus(matchState && matchState.type), matchState ? 'warn' : 'success');
            }
            updateDuplicateState();
        } catch (e) {
            setStatus('读取当前标签页失败，请点击“读取当前页”重试。', 'error');
        }
    };

    const render = (filter = '') => {
        const q = String(filter || '').toLowerCase();
        const isSearching = q.length > 0;
        let html = '';
        let hasContent = false;

        allCategories.forEach(cat => {
            const catLinks = allLinks.filter(link => {
                if (link.categoryId !== cat.id) return false;
                if (!q) return true;

                return String(link.title || '').toLowerCase().includes(q) ||
                    getAllLinkUrls(link).some(candidate => String(candidate || '').toLowerCase().includes(q)) ||
                    String(link.description || '').toLowerCase().includes(q);
            });

            if (catLinks.length === 0) return;
            hasContent = true;

            const isOpen = expandedCats.has(cat.id) || isSearching;
            const activeClass = isOpen ? 'active' : '';

            html += \`
            <div class="cat-group">
                <div class="cat-header \${activeClass}" data-id="\${escapeHtml(cat.id)}">
                    \${getArrowIcon()}
                    <span>\${escapeHtml(cat.name)}</span>
                </div>
                <div class="cat-links">
            \`;

            catLinks.forEach(link => {
                const openUrl = getPreferredOpenUrl(link);
                const iconSrc = getDisplayIconUrl(openUrl || link.url);
                const hoverTitle = link.description || openUrl || link.url || '';
                html += \`
                    <a href="\${escapeHtml(openUrl || link.url)}" target="_blank" class="link-item" title="\${escapeHtml(hoverTitle)}">
                        <div class="link-icon"><img src="\${escapeHtml(iconSrc)}" /></div>
                        <div class="link-info">
                            <div class="link-title">\${escapeHtml(link.title || link.url)}</div>
                        </div>
                    </a>
                \`;
            });

            html += '</div></div>';
        });

        container.innerHTML = hasContent
            ? html
            : (filter ? '<div class="empty">无搜索结果</div>' : '<div class="empty">暂无数据</div>');
    };

    const syncLocalCache = async () => {
        await chrome.storage.local.set({
            [CACHE_KEY]: {
                links: allLinks,
                categories: allCategories
            }
        });
    };

    const loadData = async (forceRefresh = false) => {
        const keepCategoryId = categorySelect.value;
        const keepSubCategoryId = subCategorySelect.value;

        try {
            if (!forceRefresh) {
                const cached = await chrome.storage.local.get(CACHE_KEY);
                if (cached[CACHE_KEY]) {
                    const data = cached[CACHE_KEY];
                    allLinks = data.links || [];
                    allCategories = data.categories || [];
                    renderCategoryOptions(keepCategoryId || ((allCategories[0] && allCategories[0].id) || 'common'));
                    renderSubCategoryOptions(categorySelect.value, keepSubCategoryId);
                    render(searchInput.value);
                    updateDuplicateState();
                    return;
                }
            }

            refreshBtn.classList.add('rotating');
            if (!allLinks.length) {
                container.innerHTML = '<div class="loading">同步数据中...</div>';
            }

            const res = await fetch(\`\${CONFIG.apiBase}/api/storage\`, {
                headers: { 'x-auth-password': CONFIG.password }
            });

            if (!res.ok) throw new Error('Sync failed');

            const data = await res.json();
            allLinks = data.links || [];
            allCategories = data.categories || [];
            await syncLocalCache();

            renderCategoryOptions(keepCategoryId || ((allCategories[0] && allCategories[0].id) || 'common'));
            renderSubCategoryOptions(categorySelect.value, keepSubCategoryId);
            render(searchInput.value);
            updateDuplicateState();
        } catch (e) {
            if (!allLinks.length) {
                container.innerHTML = \`<div class="empty" style="color:#ef4444">加载失败: \${e.message}<br>请点击右上角刷新</div>\`;
            }
        } finally {
            refreshBtn.classList.remove('rotating');
        }
    };

    const saveCurrentPage = async () => {
        if (isSavingCurrent) return;

        if (!CONFIG.password) {
            setStatus('未检测到登录密码，请重新在 CloudNav 设置中生成扩展。', 'error');
            return;
        }

        const title = titleInput.value.trim();
        const finalUrl = ensureProtocol(urlInput.value);
        const description = descriptionInput.value.trim();
        const categoryId = categorySelect.value || ((allCategories[0] && allCategories[0].id) || 'common');
        const subCategoryId = subCategorySelect.value || '';
        const icon = iconInput.value.trim() || getCloudNavIconUrl(finalUrl);
        const pinned = !!(pinnedInput && pinnedInput.checked);
        const preparedAltUrls = getPreparedAltUrls();
        const existedBeforeSave = !!editingLinkId || !!findExistingLink(finalUrl);

        if (!title || !finalUrl) {
            setStatus('标题和网址不能为空。', 'error');
            return;
        }

        const duplicateLinks = findDuplicateLinks([finalUrl, ...preparedAltUrls.map(item => item.url)], editingLinkId);
        if (duplicateLinks.length > 0) {
            const firstDuplicate = duplicateLinks[0];
            const locationText = getLocationText(firstDuplicate.categoryId, firstDuplicate.subCategoryId);
            setStatus(locationText ? \`存在重复网址：\${locationText}\` : '存在重复网址，请调整后再保存。', 'error');
            updateDuplicateState();
            return;
        }

        isSavingCurrent = true;
        saveCurrentBtn.disabled = true;
        saveCurrentBtn.textContent = getSavePendingText();
        setStatus('正在保存当前网页...', 'muted');

        try {
            const res = await fetch(\`\${CONFIG.apiBase}/api/link\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-password': CONFIG.password
                },
                body: JSON.stringify({
                    id: editingLinkId || undefined,
                    title,
                    url: finalUrl,
                    urls: preparedAltUrls,
                    description,
                    categoryId,
                    subCategoryId: subCategoryId || null,
                    icon,
                    pinned
                })
            });

            let responseData = null;
            try {
                responseData = await res.json();
            } catch (e) {
                responseData = null;
            }

            if (!res.ok) {
                throw new Error(responseData && responseData.error ? responseData.error : \`服务器错误: \${res.status}\`);
            }

            if (responseData && responseData.link && responseData.link.id) {
                editingLinkId = responseData.link.id;
            }
            setAltUrls(responseData && responseData.link && Array.isArray(responseData.link.urls) ? responseData.link.urls : preparedAltUrls);
            lastSavedFeedback = {
                signature: getCandidateSignature([finalUrl, ...preparedAltUrls.map(item => item.url)]),
                isNew: !existedBeforeSave,
                categoryId,
                subCategoryId
            };
            await loadData(true);
            setStatus(existedBeforeSave ? '当前网页已更新到所选分类。' : '当前网页已添加到所选分类。', 'success');
            updateDuplicateState();
        } catch (e) {
            setStatus(e && e.message ? e.message : '保存失败，请稍后重试。', 'error');
        } finally {
            isSavingCurrent = false;
            saveCurrentBtn.disabled = false;
            syncSaveActionLabel();
        }
    };

    container.addEventListener('click', (e) => {
        const header = e.target.closest('.cat-header');
        if (header) {
            toggleCat(header.dataset.id);
        }
    });

    syncSaveActionLabel();
    await loadData();
    await fillCurrentTab();

    searchInput.addEventListener('input', (e) => render(e.target.value));
    refreshBtn.addEventListener('click', async () => {
        await loadData(true);
        updateDuplicateState();
    });
    openExistingRecordBtn.addEventListener('click', () => openExistingRecord());
    existingRecords.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.existing-delete-record');
        if (deleteBtn) {
            const targetLinkId = deleteBtn.dataset.linkId || '';
            const targetLink = allLinks.find(link => link && link.id === targetLinkId) || null;
            if (targetLink) {
                deleteExistingRecord(targetLink);
            }
            return;
        }

        const loadEditorBtn = e.target.closest('.existing-load-editor');
        if (loadEditorBtn) {
            const targetLinkId = loadEditorBtn.dataset.linkId || '';
            const targetLink = allLinks.find(link => link && link.id === targetLinkId) || null;
            if (targetLink) {
                loadLinkIntoEditor(targetLink);
            }
            return;
        }

        const openSiteBtn = e.target.closest('.existing-open-site');
        if (openSiteBtn) {
            const targetUrl = openSiteBtn.dataset.url || '';
            if (targetUrl) {
                openPreviewUrl(targetUrl);
            }
            return;
        }

        const openAppBtn = e.target.closest('.existing-open-app');
        if (!openAppBtn) return;

        const targetLinkId = openAppBtn.dataset.linkId || '';
        const targetLink = allLinks.find(link => link && link.id === targetLinkId) || null;
        if (targetLink) {
            openCloudNavRecord(targetLink);
        }
    });
    openMainUrlBtn.addEventListener('click', () => openPreviewUrl(urlInput.value));
    fillCurrentBtn.addEventListener('click', () => fillCurrentTab(false));
    saveCurrentBtn.addEventListener('click', saveCurrentPage);
    addAltUrlBtn.addEventListener('click', () => {
        lastSavedFeedback = null;
        currentAltUrls = [...currentAltUrls, createAltUrlItem()];
        setAltUrls(currentAltUrls);
        updateDuplicateState();
        requestAnimationFrame(() => {
            const lastUrlInput = altUrlList.querySelector('.alt-url-item:last-child .alt-url-url');
            if (lastUrlInput) lastUrlInput.focus();
        });
    });
    altUrlList.addEventListener('input', (e) => {
        const row = e.target.closest('.alt-url-item');
        if (!row) return;
        const id = row.dataset.id;
        const item = currentAltUrls.find(entry => entry.id === id);
        if (!item) return;

        if (e.target.classList.contains('alt-url-label')) {
            item.label = e.target.value;
        } else if (e.target.classList.contains('alt-url-url')) {
            item.url = e.target.value;
            clearSavedFeedbackIfDirty();
            updateDuplicateState();
        }
    });
    altUrlList.addEventListener('change', (e) => {
        const row = e.target.closest('.alt-url-item');
        if (!row) return;
        const id = row.dataset.id;

        if (e.target.classList.contains('alt-url-default-toggle')) {
            currentAltUrls = currentAltUrls.map(item => ({
                ...item,
                isDefault: item.id === id ? !!e.target.checked : false
            }));
            lastSavedFeedback = null;
            setAltUrls(currentAltUrls);
            updateDuplicateState();
        }
    });
    altUrlList.addEventListener('click', (e) => {
        const openBtn = e.target.closest('.alt-url-open');
        if (openBtn) {
            const row = openBtn.closest('.alt-url-item');
            if (!row) return;
            const id = row.dataset.id;
            const item = currentAltUrls.find(entry => entry.id === id);
            if (item && item.url) {
                openPreviewUrl(item.url);
            }
            return;
        }

        const removeBtn = e.target.closest('.alt-url-remove');
        if (!removeBtn) return;
        const row = removeBtn.closest('.alt-url-item');
        if (!row) return;
        const id = row.dataset.id;
        lastSavedFeedback = null;
        currentAltUrls = currentAltUrls.filter(item => item.id !== id);
        setAltUrls(currentAltUrls);
        updateDuplicateState();
    });
    categorySelect.addEventListener('change', () => renderSubCategoryOptions(categorySelect.value, ''));
    urlInput.addEventListener('input', () => {
        clearSavedFeedbackIfDirty();
        updateDuplicateState();
    });

    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.type === 'refresh') {
            loadData(true);
        }
    });
    } catch (e) {
        console.error('Sidebar init failed', e);
        showFatalError(e && e.message ? e.message : 'Unknown error');
    }
});`,U=(t,a)=>e.jsxs("div",{className:"rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0",children:[e.jsxs("div",{className:"flex justify-between items-center bg-slate-50 dark:bg-slate-700/50 px-3 py-2 border-b border-slate-200 dark:border-slate-700",children:[e.jsx("span",{className:"text-xs font-mono font-medium text-slate-600 dark:text-slate-300",children:t}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:()=>pe(t,a),className:"text-xs flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline",title:"下载文件",children:[e.jsx(R,{size:12}),"Download"]}),e.jsx("div",{className:"w-px h-3 bg-slate-300 dark:bg-slate-600"}),e.jsxs("button",{onClick:()=>G(a,t),className:"text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline",children:[T[t]?e.jsx(ee,{size:12}):e.jsx(te,{size:12}),T[t]?"Copied":"Copy"]})]})]}),e.jsx("div",{className:"bg-slate-900 p-3 overflow-x-auto",children:e.jsx("pre",{className:"text-[10px] md:text-xs font-mono text-slate-300 leading-relaxed whitespace-pre",children:a})})]}),Y=async()=>{const t=o.favicon;if(!t)return null;try{const a=new Image;a.crossOrigin="anonymous",a.src=t,await new Promise((s,l)=>{a.onload=s,a.onerror=l});const n=document.createElement("canvas");n.width=128,n.height=128;const i=n.getContext("2d");if(!i)throw new Error("Canvas error");return i.drawImage(a,0,0,128,128),new Promise(s=>{n.toBlob(l=>{s(l)},"image/png")})}catch(a){return console.error(a),null}},ge=async()=>{const t=await Y();if(!t){alert(`生成图片失败 (可能是跨域限制)。

请尝试右键点击下方的预览图片，选择 '图片另存为...' 保存。`);return}const a=window.URL.createObjectURL(t),n=document.createElement("a");n.href=a,n.download="icon.png",document.body.appendChild(n),n.click(),document.body.removeChild(n),window.URL.revokeObjectURL(a)},me=async()=>{A(!0);try{const{default:t}=await ae(async()=>{const{default:h}=await import("./jszip.min-Dlb6ltHU.js").then(he=>he.j);return{default:h}},__vite__mapDeps([0,1,2])),a=new t;a.file("manifest.json",q()),a.file("background.js",W),a.file("sidebar.html",J),a.file("sidebar.js",Z);const n=await Y();n?a.file("icon.png",n):(console.warn("Could not generate icon for zip"),a.file("icon_missing.txt","Icon generation failed due to CORS. Please save the icon manually."));const i=await a.generateAsync({type:"blob"}),s=window.URL.createObjectURL(i),l=document.createElement("a");l.href=s,l.download="CloudNav-Ext.zip",document.body.appendChild(l),l.click(),document.body.removeChild(l),window.URL.revokeObjectURL(s)}catch(t){console.error(t),alert("打包下载失败")}finally{A(!1)}};if(!d)return null;const xe=[{id:"site",label:"网站设置",icon:_e},{id:"ai",label:"AI 设置",icon:be},{id:"tools",label:"扩展工具",icon:fe}];return e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",children:[e.jsxs("div",{className:"bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-200 dark:border-slate-700 flex max-h-[90vh] flex-col md:flex-row",children:[e.jsx("div",{className:"w-full md:w-48 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 flex flex-row md:flex-col p-2 gap-1 overflow-x-auto shrink-0",children:xe.map(t=>e.jsxs("button",{onClick:()=>ne(t.id),className:`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${k===t.id?"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300":"text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}`,children:[e.jsx(t.icon,{size:18}),t.label]},t.id))}),e.jsxs("div",{className:"flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden bg-white dark:bg-slate-800",children:[e.jsxs("div",{className:"flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 shrink-0",children:[e.jsx("h3",{className:"text-lg font-semibold dark:text-white",children:"设置"}),e.jsx("button",{onClick:m,className:"p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors",children:e.jsx(Q,{className:"w-5 h-5 dark:text-slate-400"})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-6 pb-12",children:[k==="site"&&e.jsx("div",{className:"space-y-6 animate-in fade-in duration-300",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"网页标题 (Title)"}),e.jsx("input",{type:"text",value:o.title,onChange:t=>g("title",t.target.value),className:"w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"导航栏标题"}),e.jsx("input",{type:"text",value:o.navTitle,onChange:t=>g("navTitle",t.target.value),className:"w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"置顶分类图标"}),e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600",children:e.jsx(ve,{name:o.pinnedCategoryIcon||"LayoutGrid",size:20})}),e.jsx("input",{type:"text",value:o.pinnedCategoryIcon||"LayoutGrid",onChange:t=>g("pinnedCategoryIcon",t.target.value),placeholder:"LayoutGrid / Star / 📌",className:"flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"}),e.jsx("button",{type:"button",onClick:()=>I(!0),className:"px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-blue-500 rounded-lg text-slate-600 dark:text-slate-300 transition-colors",title:"选择图标",children:e.jsx(ke,{size:16})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"网站图标 (Favicon URL)"}),e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600",children:o.favicon?e.jsx("img",{src:o.favicon,className:"w-full h-full object-cover"}):e.jsx(X,{size:20,className:"text-slate-400"})}),e.jsx("input",{type:"text",value:o.favicon,onChange:t=>g("favicon",t.target.value),placeholder:"https://example.com/favicon.ico",className:"flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"})]}),e.jsxs("div",{className:"mt-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("p",{className:"text-xs text-slate-500",children:"选择生成的随机图标 (点击右侧按钮刷新):"}),e.jsxs("button",{type:"button",onClick:()=>F(o.navTitle),className:"text-xs flex items-center gap-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 px-2 py-1 rounded transition-colors",children:[e.jsx(De,{size:12})," 随机生成"]})]}),e.jsx("div",{className:"flex gap-2",children:z.map((t,a)=>e.jsx("button",{onClick:()=>g("favicon",t),className:"w-8 h-8 rounded hover:ring-2 ring-blue-500 transition-all border border-slate-100 dark:border-slate-600",children:e.jsx("img",{src:t,className:"w-full h-full rounded"})},a))})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"身份验证过期天数"}),e.jsx("div",{className:"relative",children:e.jsx("input",{type:"number",min:"0",value:o.passwordExpiryDays,onChange:t=>g("passwordExpiryDays",parseInt(t.target.value)||0),className:"w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"})}),e.jsx("p",{className:"text-xs text-slate-500 mt-1",children:"设置为 0 表示永久不退出，默认 7 天后自动退出"})]})]})}),k==="ai"&&e.jsxs("div",{className:"space-y-6 animate-in fade-in duration-300",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"AI 提供商"}),e.jsxs("select",{value:u.provider,onChange:t=>j("provider",t.target.value),className:"w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500",children:[e.jsx("option",{value:"gemini",children:"Google Gemini"}),e.jsx("option",{value:"openai",children:"OpenAI Compatible (ChatGPT, DeepSeek, Claude...)"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"API Key"}),e.jsxs("div",{className:"relative",children:[e.jsx(Ae,{size:16,className:"absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"}),e.jsx("input",{type:"password",value:u.apiKey,onChange:t=>j("apiKey",t.target.value),placeholder:"sk-...",className:"w-full pl-10 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 font-mono"})]}),e.jsx("p",{className:"text-xs text-slate-500 mt-1",children:"Key 仅存储在本地浏览器缓存中，不会发送到我们的服务器。"})]}),u.provider==="openai"&&e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"Base URL (API 地址)"}),e.jsx("input",{type:"text",value:u.baseUrl,onChange:t=>j("baseUrl",t.target.value),placeholder:"https://api.openai.com/v1",className:"w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1",children:"模型名称 (Model Name)"}),e.jsx("input",{type:"text",value:u.model,onChange:t=>j("model",t.target.value),placeholder:u.provider==="gemini"?"gemini-2.5-flash":"gpt-3.5-turbo",className:"w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"})]}),e.jsxs("div",{className:"pt-4 border-t border-slate-100 dark:border-slate-700",children:[e.jsx("h4",{className:"text-sm font-semibold mb-2 dark:text-slate-200",children:"批量操作"}),se?e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-xs text-slate-600 dark:text-slate-400",children:[e.jsxs("span",{children:["正在生成描述... (",w.current,"/",w.total,")"]}),e.jsxs("button",{onClick:()=>{C.current=!0,y(!1)},className:"text-red-500 flex items-center gap-1 hover:underline",children:[e.jsx(Ne,{size:12})," 停止"]})]}),e.jsx("div",{className:"w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-blue-500 transition-all duration-300",style:{width:`${w.current/w.total*100}%`}})})]}):e.jsxs("button",{onClick:ue,className:"flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-lg transition-colors border border-purple-200 dark:border-purple-800",children:[e.jsx(ye,{size:16})," 一键补全所有缺失的描述"]})]})]}),k==="tools"&&e.jsxs("div",{className:"space-y-8 animate-in fade-in duration-300",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2",children:[e.jsx("span",{className:"flex items-center justify-center w-6 h-                                -6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold",children:"1"}),"输入访问密码"]}),e.jsx("div",{className:"bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700",children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-slate-500 mb-1 block",children:"API 域名 (自动获取)"}),e.jsx("code",{className:"block w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 font-mono truncate",children:$})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-slate-500 mb-1 block",children:"访问密码 (Password)"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("div",{className:"relative flex-1",children:[e.jsx("input",{type:E?"text":"password",value:N,readOnly:!0,className:"w-full p-2 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-sm outline-none font-mono",placeholder:"未登录 / 未设置"}),e.jsx("button",{type:"button",onClick:()=>D(t=>!t),className:"absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 transition-colors",title:E?"隐藏密码":"显示密码",children:E?e.jsx(we,{size:16}):e.jsx(Ce,{size:16})})]}),e.jsx("button",{onClick:()=>G(N,"pwd"),className:"px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-blue-500 rounded text-slate-600 dark:text-slate-400 transition-colors",children:T.pwd?e.jsx(ee,{size:16}):e.jsx(te,{size:16})})]}),e.jsx("p",{className:"text-[10px] text-slate-400 mt-1",children:"此密码对应您部署时设置的 PASSWORD 环境变量。"})]})]})})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2",children:[e.jsx("span",{className:"flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold",children:"2"}),"选择浏览器类型"]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx("button",{onClick:()=>P("chrome"),className:`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${x==="chrome"?"border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300":"border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-800"}`,children:e.jsx("span",{className:"font-semibold",children:"Chrome / Edge"})}),e.jsx("button",{onClick:()=>P("firefox"),className:`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${x==="firefox"?"border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300":"border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-800"}`,children:e.jsx("span",{className:"font-semibold",children:"Mozilla Firefox"})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h4",{className:"font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2",children:[e.jsx("span",{className:"flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold",children:"3"}),"配置步骤与代码"]}),e.jsxs("div",{className:"bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700",children:[e.jsxs("h5",{className:"font-semibold text-sm mb-3 dark:text-slate-200",children:["安装指南 (",x==="chrome"?"Chrome/Edge":"Firefox","):"]}),e.jsxs("ol",{className:"list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed",children:[e.jsxs("li",{children:["在电脑上新建文件夹 ",e.jsx("code",{className:"bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs",children:"CloudNav-Pro"}),"。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"[重要]"})," 将下方图标保存为 ",e.jsx("code",{className:"bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs",children:"icon.png"}),"。"]}),e.jsxs("li",{children:["获取插件代码文件：",e.jsxs("ul",{className:"list-disc list-inside ml-4 mt-1 space-y-1 text-slate-500",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"方式一 (推荐)："}),"点击下方的 ",e.jsx("span",{className:"text-blue-600 dark:text-blue-400 font-bold",children:'"📦 一键下载所有文件"'})," 按钮，解压到该文件夹。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"方式二 (备用)："}),"分别点击下方代码块的 ",e.jsx(R,{size:12,className:"inline"})," 按钮下载或复制 ",e.jsx("code",{className:"bg-white dark:bg-slate-900 px-1 rounded",children:"manifest.json"}),", ",e.jsx("code",{className:"bg-white dark:bg-slate-900 px-1 rounded",children:"background.js"})," 等文件到该文件夹。"]})]})]}),e.jsxs("li",{children:["打开浏览器扩展管理页面",x==="chrome"?e.jsxs(e.Fragment,{children:[" (Chrome: ",e.jsx("code",{className:"select-all bg-white dark:bg-slate-900 px-1 rounded",children:"chrome://extensions"}),")"]}):e.jsxs(e.Fragment,{children:[" (Firefox: ",e.jsx("code",{className:"select-all bg-white dark:bg-slate-900 px-1 rounded",children:"about:debugging"}),")"]}),"。"]}),e.jsx("li",{className:"text-blue-600 font-bold",children:"操作关键点："}),e.jsx("li",{children:'1. 开启右上角的 "开发者模式" (Chrome)。'}),e.jsx("li",{children:'2. 点击 "加载已解压的扩展程序"，选择包含上述文件的文件夹。'}),e.jsxs("li",{children:["3. 前往 ",e.jsx("code",{className:"select-all bg-white dark:bg-slate-900 px-1 rounded",children:"chrome://extensions/shortcuts"}),"。"]}),e.jsxs("li",{children:["4. ",e.jsx("strong",{children:"[重要]"}),' 找到 "打开 CloudNav 侧边栏"，设置快捷键 (如 Ctrl+Shift+E)。']})]}),e.jsx("div",{className:"mt-4 mb-4",children:e.jsxs("button",{onClick:me,disabled:H,className:"w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20",children:[e.jsx(Ie,{size:20}),H?"打包中...":"📦 一键下载所有文件 (v7.6 Pro)"]})}),e.jsxs("div",{className:"p-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded border border-green-200 dark:border-green-900/50 text-sm space-y-2",children:[e.jsxs("div",{className:"font-bold flex items-center gap-2",children:[e.jsx(je,{size:16})," 完美交互方案 (v7.6):"]}),e.jsxs("ul",{className:"list-disc list-inside text-xs space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"左键 / 快捷键:"})," 稳定打开侧边栏，首次点击也可直接拉起。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"网页右键:"})," 直接展示分类列表 (支持判重警告)。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"图标右键:"})," 同上，统一为级联菜单，直接保存。"]})]})]})]}),e.jsxs("div",{className:"p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600",children:o.favicon?e.jsx("img",{src:o.favicon,className:"w-full h-full object-cover"}):e.jsx(X,{size:24,className:"text-slate-400"})}),e.jsxs("div",{children:[e.jsx("div",{className:"font-medium text-sm dark:text-white",children:"插件图标 (icon.png)"}),e.jsx("div",{className:"text-xs text-slate-500",children:"请保存此图片为 icon.png"})]})]}),e.jsxs("button",{onClick:ge,className:"flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded-lg transition-colors",children:[e.jsx(R,{size:16})," 下载图标"]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-100 dark:border-slate-700",children:[e.jsx(Ue,{size:18,className:"text-purple-500"})," 核心配置"]}),U("manifest.json",q()),U("background.js",W),e.jsxs("div",{className:"flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-100 dark:border-slate-700",children:[e.jsx(Re,{size:18,className:"text-green-500"})," 侧边栏导航功能 (Sidebar)"]}),U("sidebar.html",J),U("sidebar.js",Z)]})]})]})]}),e.jsx("div",{className:"p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end bg-slate-50 dark:bg-slate-800/50 shrink-0",children:e.jsxs("button",{onClick:de,className:"flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20",children:[e.jsx(Le,{size:18})," 保存更改"]})})]})]}),ce&&e.jsx("div",{className:"fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",children:e.jsxs("div",{className:"bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 dark:text-slate-200",children:"选择置顶分类图标"}),e.jsx("button",{type:"button",onClick:()=>I(!1),className:"p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",children:e.jsx(Q,{size:20})})]}),e.jsx("div",{className:"flex-1 overflow-auto p-4",children:e.jsx(Se,{onSelectIcon:t=>{g("pinnedCategoryIcon",t),I(!1)}})})]})})]})};export{Fe as default};
