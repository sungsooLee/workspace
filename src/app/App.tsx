import './styles/global.css';
import Router from './routers/sections';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '../shared/components/Toast/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useLanguageStore from '@/shared/stores/useLanguageStore';
import { ScrollRestoration } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const language = useLanguageStore((state) => state.language);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ScrollRestoration /> */}
        <Router />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
