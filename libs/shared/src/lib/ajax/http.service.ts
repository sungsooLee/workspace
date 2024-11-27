import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import { encodeQueryString } from '../../index';

const API_REQUEST_TIMEOUT = 5000;

// sample url: https://jsonplaceholder.typicode.com/users
interface RequestArgs {
  method: HttpMethod;
  url: string;
  queryParam?: any;
  payload?: any;
}

enum HttpMethod {
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

  private setOptions(options: AxiosRequestConfig = { timeout: API_REQUEST_TIMEOUT }): void {
    if (this.options) {
      this.options = { ...this.options, ...options };
    } else {
      this.options = options;
    }

    this.cancelTokenSource = axios.CancelToken.source();
    this.httpClient = axios.create({ ...options, cancelToken: this.cancelTokenSource.token });
    this.completed = false;
  }

  private executeRequest<T>(args: RequestArgs): Promise<T> {
    const { method, url, queryParam, payload } = args;
    let request: AxiosPromise<T>;
    switch (method) {
      case HttpMethod.GET:
        if (payload) {
          request = this.httpClient.get<T>(url, { params: queryParam, data: payload });
        } else {
          request = this.httpClient.get<T>(url, { params: queryParam });
        }
        break;
      case HttpMethod.POST:
        request = this.httpClient.post<T>(url, payload);
        break;
      case HttpMethod.PUT:
        request = this.httpClient.put<T>(url, payload);
        break;
      case HttpMethod.PATCH:
        request = this.httpClient.patch<T>(url, payload);
        break;
      case HttpMethod.DELETE:
        if (payload) {
          request = this.httpClient.delete<T>(url, { data: payload });
        } else {
          request = this.httpClient.delete<T>(url);
        }
        break;
    }

    return request
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
