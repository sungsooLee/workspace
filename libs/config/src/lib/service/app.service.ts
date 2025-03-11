import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { queryConfig } from './react-query';

class AppConfig {
  init(options: any) {
    dayjs.extend(duration);
    queryConfig.init(options?.queryOptions);
  }
}

export const appConfig = new AppConfig();
