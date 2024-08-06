import './App.css';
import './index.css';
import Router from './routers/sections';
import { AuthProvider } from '@/app/auth/context/jwt/authProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '../shared/components/Toast/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useLanguageStore from '@/shared/stores/useLanguageStore';

const queryClient = new QueryClient();

function App() {
  const language = useLanguageStore((state) => state.language);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
