import './styles/global.css';
import Router from './routers/sections';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/shared/components/toast/toaster';

function App() {
  return (
    <>
      <Router />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
