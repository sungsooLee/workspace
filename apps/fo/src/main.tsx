import { initI18N } from '@learnway/config';

import { fetchCodes, fetchI18nResource } from './entities/system';

import './styles.css';

Promise.all([fetchCodes(), fetchI18nResource()]).then(
  (responses: any[]) => {
    initI18N(responses[1]);

    import('./app/app');
  },
  (error: any) => console.log('> load app config error:', error),
);
