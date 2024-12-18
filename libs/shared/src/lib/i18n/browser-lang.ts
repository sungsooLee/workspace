export const getBrowserLang = () => {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return undefined;
  }

  let browserLang: any = window.navigator.languages ? window.navigator.languages[0] : null;
  browserLang =
    browserLang ||
    window.navigator.language ||
    (<any>window.navigator).browserLanguage ||
    (<any>window.navigator).userLanguage;

  if (browserLang.indexOf('-') !== -1) {
    browserLang = browserLang.split('-')[0];
  }

  if (browserLang.indexOf('_') !== -1) {
    browserLang = browserLang.split('_')[0];
  }

  console.log('> browserLang:', browserLang);
  return browserLang;
};
