/**
 * 브라우져 크롬 여부
 * @return boolean
 */
export const isChrome = () => {
  return /chrome/i.test(navigator.userAgent) && !/edge|opr|brave/i.test(navigator.userAgent);
};

/**
 * 브라우져 firefox 여부
 * @return boolean
 */
export const isFirefox = () => {
  return /firefox/i.test(navigator.userAgent);
};

/**
 * localhost 여부 체크
 * @return boolean
 */
export const isLocalhost = () => {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]'
  );
};
