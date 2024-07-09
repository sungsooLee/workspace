import './App.css';
import './index.css';
import Router from './routes/sections';
import { AuthProvider } from './auth/context/jwt/auth-provider';
import { ThemeProvider } from './components/layout/theme-provider';
import { RouterProvider, ScrollRestoration } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      </QueryClientProvider>
    </>
  );
}

export default App;
