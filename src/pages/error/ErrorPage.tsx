// ErrorPage.tsx
import { useLocation } from 'react-router-dom';
import ErrorFallback from '@/shared/components/error/errorFallback';

const ErrorPage = () => {
  const location = useLocation();
  const statusCode = location.state?.statusCode;

  return <ErrorFallback statusCode={statusCode} resetError={() => {}} />;
};

export default ErrorPage;
