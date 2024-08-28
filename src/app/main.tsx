import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';
import { worker } from '../shared/mocks/browser.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getErrorDataByCode } from '@/shared/components/error/getErrorDataByCode.ts';
import { toast } from '@/shared/hooks/useToast.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      throwOnError: true,
    },
    mutations: {
      throwOnError: false,
      onError: (error: any) => {
        const errorData = getErrorDataByCode(error);
        toast({
          description: `[${errorData.code}] ${errorData.message}`,
          variant: 'destructive',
          duration: 1000,
        });
      },
    },
  },
});

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    // </React.StrictMode>
  );
};

//msw 설정
if (process.env.NODE_ENV === 'development') {
  worker
    .start({
      onUnhandledRequest: 'bypass',
    })
    .then(() => {
      renderApp();
    });
} else {
  renderApp();
}
