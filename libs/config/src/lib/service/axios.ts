import axios from 'axios';

import { API_SERVER } from '../const/config.constant';

import { httpService } from '@learnway/shared';

export function initAxios() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = API_SERVER;

  httpService.reissueProccess = (error: any): Promise<any> => {};
}
