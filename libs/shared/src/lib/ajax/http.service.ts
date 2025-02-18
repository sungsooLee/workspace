import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';

import { cookieService } from '../cookie/cookie.service';
import { encodeQueryString } from '../../index';

const API_REQUEST_TIMEOUT = 5000;

// sample url: https://jsonplaceholder.typicode.com/users
interface RequestArgs {
  method: HttpMethod;
  url: string;
  queryParam?: any;
  payload?: any;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// frontend ajax call interceptor
// (function () {
//   const origOpen = XMLHttpRequest.prototype.open;
//   XMLHttpRequest.prototype.open = function () {
//     console.log('request started:', arguments);
//     this.addEventListener('load', function () {
//       console.log('request completed!');
//       console.log(this.readyState); //will always be 4 (ajax is completed successfully)
//       console.log(this.responseText); //whatever the response was
//     });
//     origOpen.apply(this, arguments);
//   };
// })();

export class HttpService {
  private httpClient!: AxiosInstance;
  private cancelTokenSource!: CancelTokenSource;
  private options!: AxiosRequestConfig | undefined | null;
  private completed!: boolean;
  private CLEAR_BEFORE_MESSAGE_TIME = 3000;
  private beforeMessage!: string;
  private beforeTimeout!: any;

  private reissueProccess!: (error: any) => Promise<any>;

  init(payload?: any): void {
    this.reissueProccess = payload;
  }

  async get<T>(
    url: string,
    queryParam?: any,
    options?: AxiosRequestConfig,
    payload?: any,
  ): Promise<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.GET,
      url: encodeQueryString(url),
      queryParam,
      payload,
    });
  }

  async post<T>(url: string, payload: any, options?: AxiosRequestConfig): Promise<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.POST,
      url,
      payload,
    });
  }

  async put<T>(url: string, payload: any, options?: AxiosRequestConfig): Promise<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.PUT,
      url,
      payload,
    });
  }

  async patch<T>(url: string, payload: any, options?: AxiosRequestConfig): Promise<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.PATCH,
      url,
      payload,
    });
  }

  async delete<T>(url: string, payload?: any, options?: AxiosRequestConfig): Promise<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.DELETE,
      url,
      payload,
    });
  }

  async execute<T>(args: RequestArgs, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    this.setOptions(options);
    const { url } = args;

    return this.httpRequest<T>(args)
      .then((response: AxiosResponse) => {
        console.log('axios.response', response);
        return response;
      })
      .catch((error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          console.log('axios.error', error);
        } else {
          // this.showNotification('Unknown Error', error.message);
          console.log('> unknown error-2:', url, error.message);
        }
        throw error;
      })
      .finally(() => {
        console.log('axios.httpRequest finally');
        this.completed = true;
      });
  }

  private setOptions(options: AxiosRequestConfig = { timeout: API_REQUEST_TIMEOUT }): void {
    if (this.options) {
      this.options = { ...this.options, ...options };
    } else {
      this.options = options;
    }

    this.cancelTokenSource = axios.CancelToken.source();
    this.httpClient = axios.create({ ...options, cancelToken: this.cancelTokenSource.token });
    this.httpClient.interceptors.request.use(function (config) {
      const accessToken = cookieService.get('ACCESS-TOKEN');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    });
    this.httpClient.interceptors.response.use(
      function (config) {
        return config;
      },
      async (error) => {
        const { config, response: errorResponse } = error;
        // error
        if (errorResponse.status === 401) {
          console.log('401 error');
          if (this.reissueProccess) {
            return await this.reissueProccess(error);
          }
        }

        return Promise.reject(error);
      },
    );
    this.completed = false;
  }
  /*
  private reissue<T>(args: RequestArgs): AxiosPromise<T> {
    const { method, url, queryParam, payload } = args;
    return this.execute<AxiosResponse>(
      {
        method: HttpMethod.POST,
        url: `${OAuthApiPrefix()}/token-reissue`,
      },
      { headers: { 'refresh-token': `${cookieService.get('REFRESH-TOKEN')}` } },
    );
  }
*/
  private httpRequest<T>(args: RequestArgs): AxiosPromise<T> {
    const { method, url, queryParam, payload } = args;
    switch (method) {
      case HttpMethod.GET:
        if (payload) {
          return this.httpClient.get<T>(url, { params: queryParam, data: payload });
        } else {
          return this.httpClient.get<T>(url, { params: queryParam });
        }
      case HttpMethod.POST:
        return this.httpClient.post<T>(url, payload);
      case HttpMethod.PUT:
        return this.httpClient.put<T>(url, payload);
      case HttpMethod.PATCH:
        return this.httpClient.patch<T>(url, payload);
      case HttpMethod.DELETE:
        if (payload) {
          return this.httpClient.delete<T>(url, { data: payload });
        } else {
          return this.httpClient.delete<T>(url);
        }
    }
  }

  private executeRequest<T>(args: RequestArgs): Promise<T> {
    const { url } = args;

    return this.httpRequest<T>(args)
      .then((response: AxiosResponse) => {
        return response.data.data;
      })
      .catch((error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          console.log('axios.error', error);
        } else {
          // this.showNotification('Unknown Error', error.message);
          console.log('> unknown error-2:', url, error.message);
        }
        throw error;
      })
      .finally(() => {
        this.completed = true;
      });
  }
}

export const httpService = new HttpService();
