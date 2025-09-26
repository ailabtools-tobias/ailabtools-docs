document.addEventListener('DOMContentLoaded', function () {
  // Remove the base tag added by EZOIC ADS in the head
  const baseTag = document.querySelector('base');
  if (baseTag) {
    baseTag.remove();
  }
});

/**
 * 获取Cookie
 *
 * @param name
 * @returns {string|null}
 */
function publicGetCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg);
  return arr ? unescape(arr[2]) : null;
}

/**
 * 设置Cookie
 *
 * @param name
 * @param value
 * @param timeoutM
 */
function publicSetCookie(name, value, timeoutM = 0) {
  if (timeoutM) {
    var now = new Date();
    //设置时间
    now.setMinutes(now.getMinutes() + timeoutM);

    document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
  } else {
    document.cookie = `${name}=${value}; path=/`;
  }
}

/**
 * 处理联盟计划Cookie
 */
function publicProcessAffiliateProgramCookie() {
  if (window && window.location) {
    const searchParams = new URLSearchParams(window.location.search);
    const alt_ref = searchParams.has('alt_ref') ? searchParams.get('alt_ref') : '';
    if (alt_ref && !publicGetCookie('ailab_affiliate_program')) {
      const affiliateProgramData = JSON.stringify({
        code:           alt_ref,
        promotion_link: window.location.href,
        source_link:    document.referrer,
        invited_time:   parseInt(new Date().getTime() / 1000)
      });
      publicSetCookie('ailab_affiliate_program', affiliateProgramData, 45 * 24 * 60);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/api/affiliate-promotion-log/add', true);
      xhr.timeout = 2 * 60 * 1000;
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({type: 1, 'affiliate_program': affiliateProgramData}));
    }
  }
}

// 非Iframe引入状态下逻辑
if (window.top === window.self) {
  // 处理联盟计划Cookie
  publicProcessAffiliateProgramCookie();

  // Tawk
  var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6384dc50b0d6371309d18b87/1givh48mt';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  })();
}
