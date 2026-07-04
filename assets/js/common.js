function publicRunWhenReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, {once: true});
    return;
  }

  callback();
}

function publicRemoveBaseTag() {
  const baseTag = document.querySelector('base');
  if (baseTag) {
    baseTag.remove();
  }
}

publicRunWhenReady(function () {
  publicRemoveBaseTag();
});

function publicGetCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg);
  return arr ? unescape(arr[2]) : null;
}

function publicSetCookie(name, value, timeoutM = 0) {
  if (timeoutM) {
    var now = new Date();
    now.setMinutes(now.getMinutes() + timeoutM);

    document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
  } else {
    document.cookie = `${name}=${value}; path=/`;
  }
}

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

if (window.top === window.self) {
  publicProcessAffiliateProgramCookie();
}
