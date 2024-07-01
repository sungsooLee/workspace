import { HTTP_ERROR_MESSAGE } from '@/constants/http-error';
import { Button } from '../ui/button';

export const hasKeyInObject = <T extends object>(
  obj: T,
  key: string | number | symbol
): key is keyof T => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export interface ErrorProps {
  statusCode?: number;
  resetError?: () => void;
}

const ErrorFallback = ({ statusCode = 404, resetError }: ErrorProps) => {
  const currentStatusCode = statusCode;
  const isHTTPError = hasKeyInObject(HTTP_ERROR_MESSAGE, currentStatusCode);

  if (!isHTTPError) return null;

  return (
    <>
      <div>
        <div>{HTTP_ERROR_MESSAGE[currentStatusCode].HEADING}</div>
        <div>{HTTP_ERROR_MESSAGE[currentStatusCode].BODY}</div>
        <Button onClick={resetError}>
          {HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON}
        </Button>
      </div>
    </>
  );
};

export default ErrorFallback;
