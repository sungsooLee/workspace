import './App.css';
import './index.css';
import Router from './routes/sections';
import { AuthProvider } from './auth/context/jwt/auth-provider';
import { ThemeProvider } from './components/layout/theme-provider';
import { RouterProvider, ScrollRestoration } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/ui/toast';
import { Toaster } from './components/ui/toaster';
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
