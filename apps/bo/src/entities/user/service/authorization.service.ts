import type { AxiosResponse } from 'axios';

export function assignToken(data: AxiosResponse) {
  try {
    localStorage.clear();
    localStorage.setItem('ACCESS-TOKEN', data.headers['access-token']);
    localStorage.setItem('REFRESH-TOKEN', data.headers['refresh-token']);
  } catch (e) {
    localStorage.clear();
  }
}

export function removeToken() {
  localStorage.clear();
}
