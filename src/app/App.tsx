import './App.css';
import './index.css';
import Router from './routers/sections';
import { AuthProvider } from '@/app/auth/context/jwt/auth-provider';
import { ThemeProvider } from './layout/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '../shared/components/Toast/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* <ThemeProvider defaultTheme='dark' storageKey='ui-theme'> */}
          <Router />
          {/* </ThemeProvider> */}
        </AuthProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
