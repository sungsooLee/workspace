const ACCESS_TOKEN = 'ACCESS-TOKEN';
const REFRESH_TOKEN = 'REFRESH-TOKEN';

class TokenService {
  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  set accessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }
  get refreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }
  set refreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  clear() {
    localStorage.clear();
  }
}

export const tokenService = new TokenService();
