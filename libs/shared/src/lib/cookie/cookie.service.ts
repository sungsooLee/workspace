import Cookies from 'js-cookie';

class CookieService {
  keys: string[] = [];

  set(key: string, value: any, isJSON = false) {
    this.keys.push(key);
    if (isJSON) {
      Cookies.set(key, JSON.stringify(value));
    } else {
      Cookies.set(key, value);
    }
  }

  get(key: string, isJSON = false): string | undefined {
    const value = Cookies.get(key);
    return value ? (isJSON ? JSON.parse(value) : value) : undefined;
  }

  remove(key: string) {
    this.keys = this.keys.filter((keyed: string) => keyed !== key);
    Cookies.remove(key);
  }

  clear() {
    // Direct remove from login cookie
    Cookies.remove('LOGIN_USER_ID');
    Cookies.remove('LOGIN_TENANT_ID');
    Cookies.remove('LOGIN_ROLE_ID');
    Cookies.remove('LOGIN_TOKEN');
    //Cookies.remove('REFRESH_LOGIN_TOKEN');

    // remove cookies from app
    this.keys
      .filter((key: string) => key !== 'I18N_LANG')
      .forEach((key: string) => this.remove(key));
    this.keys = [];
  }

  getUserId() {
    return Cookies.get('LOGIN_USER_ID');
  }

  getUserImageUrl() {
    return Cookies.get('LOGIN_USER_IMAGE_URL');
  }

  getUserFullName() {
    return Cookies.get('LOGIN_USER_FULL_NAME');
  }

  getLocale() {
    return Cookies.get('I18N_LANG') || 'en';
  }

  isSignedUser() {
    return !!this.getUserId();
  }
  /*
  initCookie(isUseCookie: boolean) {
    isUseCookie ? this.set('I18N_LANG', this.getLocale()) : this.removeAll();
  }*/
}

export const cookieService = new CookieService();
