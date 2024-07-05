import './App.css';
import './index.css';
import Router from './routes/sections';
import { AuthProvider } from './auth/context/jwt/auth-provider';
import { ThemeProvider } from './components/layout/theme-provider';
import { RouterProvider, ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <>
      <AuthProvider>
        {/* <ThemeProvider defaultTheme='dark' storageKey='ui-theme'> */}
        <Router />
        {/* </ThemeProvider> */}
      </AuthProvider>
    </>
  );
}

export default App;
