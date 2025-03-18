export const getBrowserLang = () => {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return undefined;
  }

  console.log('window.navigator.languages', window.navigator.languages);
  /*
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
*/
  return 'ko';
};

export const getBrowserNation = () => {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return 'US';
  }

  let nationCode;
  window.navigator.languages?.some((code: string) => {
    if (code.indexOf('-') > -1) {
      nationCode = code.split('-')[1];
      return true;
    }
  });
  return nationCode ?? 'US';
};
