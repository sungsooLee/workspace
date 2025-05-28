import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { appConfig } from '@learnway/config';
import { useEffect, useState } from 'react';
import { getDefaultLang } from '@learnway/config';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: '/pb-fo',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

appConfig.init({});

export const I18nProvider: React.FC<any> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!i18next.isInitialized) {
      i18next
        .use(initReactI18next)
        .init({
          debug: false,
          lng: getDefaultLang(),
          fallbackLng: 'ko',
          react: {
            useSuspense: false,
          },
          interpolation: {
            escapeValue: false,
          },
        })
        .then(() => {
          setIsInitialized(true);
        });
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return <div>Loading i18n...</div>;
  }

  return <>{children}</>;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </StrictMode>,
);
