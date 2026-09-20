// PJ568 站点链接逐级 Fallback
//
// 候选顺序：<目标>.<当前域名> > <目标>.pj568.top > <目标>.pj568.eu.org
// 全部不可用时回落 <目标>.pj568.top。
//
// 声明式用法：
//   子域服务（按 blog.<域名> 逐级探测）：<a data-fallback="blog" href="//blog.pj568.top">
//   裸域主页（@ 表示裸域，按 <域名>/ 逐级探测）：<a data-fallback="@" href="/">
//   自动跳转（毫秒，值所在元素可为主页外的容器）：<body data-fallback-redirect="10000">
//
// 脚本置于 </body> 前即可，无需 defer。
(function () {
  'use strict';

  //// 兜底域名，首个同时作为全部失败时的默认值
  const FALLBACK_DOMAINS = ['pj568.top', 'pj568.eu.org'];
  //// 单次探测超时（毫秒）
  const PROBE_TIMEOUT = 4000;
  //// 裸域标记
  const APEX = '@';

  //// 解析结果缓存：目标 -> Promise<{ url, available }>
  const resolutionCache = {};

  // 生成域名候选：当前域名优先（保留端口），其后依次为兜底域名，去重
  function origins() {
    const seen = {};
    const list = [];
    [location.host].concat(FALLBACK_DOMAINS).forEach((origin) => {
      if (!origin || seen[origin]) return;
      seen[origin] = true;
      list.push(origin);
    });
    return list;
  }

  // 目标对应子域前缀与路径
  function targetPrefix(target) {
    return target === APEX ? '' : target + '.';
  }

  function targetPath(target) {
    return target === APEX ? '/' : '';
  }

  // 生成候选地址
  function candidateUrls(target) {
    return origins().map((origin) => (
      '//' + targetPrefix(target) + origin + targetPath(target)
    ));
  }

  // 默认兜底地址
  function fallbackUrl(target) {
    return '//' + targetPrefix(target) + FALLBACK_DOMAINS[0] + targetPath(target);
  }

  // 探测单个地址：能建立连接（含非 2xx、跨域不透明响应）即视为可用
  function probe(url) {
    return new Promise((resolve, reject) => {
      if (typeof fetch !== 'function') {
        reject(new Error('当前环境不支持 fetch'));
        return;
      }

      let settled = false;
      const controller = typeof AbortController === 'function' ? new AbortController() : null;
      const timer = setTimeout(() => {
        if (controller) controller.abort();
        done(new Error('探测超时：' + url));
      }, PROBE_TIMEOUT);

      function done(error) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (error) reject(error); else resolve(url);
      }

      fetch(url, {
        mode: 'no-cors',
        cache: 'no-store',
        redirect: 'follow',
        signal: controller ? controller.signal : undefined,
      }).then(() => done(), (error) => done(error));
    });
  }

  // 按优先级顺序探测，返回首个可用地址；全部失败返回 null
  function findAvailable(target) {
    return candidateUrls(target).reduce((chain, url) => chain.then((found) => {
      if (found) return found;
      return probe(url).then(() => url, () => null);
    }), Promise.resolve(null));
  }

  // 带缓存的解析：失败时回落 *.pj568.top；refresh 为真时强制重新探测
  function resolve(target, refresh) {
    if (refresh || !resolutionCache[target]) {
      resolutionCache[target] = findAvailable(target).then((found) => ({
        url: found || fallbackUrl(target),
        available: Boolean(found),
      }));
    }
    return resolutionCache[target];
  }

  // 预探测并改写 href
  function preflight() {
    document.querySelectorAll('a[data-fallback]').forEach((link) => {
      const target = link.dataset.fallback;
      resolve(target).then((result) => {
        link.href = result.url;
        link.dataset.available = result.available ? 'true' : 'false';
      });
    });
  }

  // 点击兜底：预探测未确认可用时，拦截默认跳转并重新逐级尝试
  function onClick(event) {
    const target = event.target;
    const link = target && target.closest ? target.closest('a[data-fallback]') : null;
    if (!link) return;
    if (link.dataset.available === 'true') return; // 已确认可用，交给浏览器默认跳转

    event.preventDefault();
    const refresh = link.dataset.available === 'false'; // 全部失败过则强制重试
    resolve(link.dataset.fallback, refresh).then((result) => {
      location.href = result.url;
    });
  }

  // 自动跳转：延迟后前往可用主页
  function autoRedirect() {
    const holder = document.querySelector('[data-fallback-redirect]');
    if (!holder) return;
    const delay = parseInt(holder.dataset.fallbackRedirect, 10);
    resolve(APEX).then((result) => {
      setTimeout(() => { location.href = result.url; }, Number.isFinite(delay) ? delay : PROBE_TIMEOUT);
    });
  }

  function init() {
    preflight();
    document.addEventListener('click', onClick);
    autoRedirect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露给调试与测试
  window.PJ568Fallback = { resolve, candidateUrls, fallbackUrl };
})();
