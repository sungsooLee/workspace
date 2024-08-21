import './styles/global.css';
import Router from './routers/sections';
import { Toaster } from '../shared/components/Toast/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalBoundary } from '@/shared/components/error/GlobalBoundary';

function App() {
  return (
    <>
      {/* <GlobalBoundary> */}
      <Router />
      {/* </GlobalBoundary> */}

      <Toaster />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
