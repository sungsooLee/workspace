import * as ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { QueryConfig } from '@learnway/config';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

import { usePageMetaState } from './entities/platform';

const isLocal = process.env.NODE_ENV === 'local';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: import.meta.env.VITE_FO_BASE_PATH,
  context: {
    setPageMeta: undefined,
    queryClient: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// dayjs
dayjs.extend(duration);

QueryConfig.init({});

function App() {
  const [, setPageMeta] = usePageMetaState();
  // Inject the returned value from the hook into the router context
  return (
    <QueryClientProvider client={QueryConfig.getQueryClient()}>
      <AppConfigProvider>
        <RouterProvider
          router={router}
          context={{ queryClient: QueryConfig.getQueryClient(), setPageMeta }}
        />
      </AppConfigProvider>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
