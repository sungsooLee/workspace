import { useErrorBoundary } from 'react-error-boundary';
import { Button } from '../../Button/button';

export const ErrorTimeoutAndClick = () => {
  const { showBoundary } = useErrorBoundary();

  const setTimeoutError = () => {
    console.log('타임아웃 시작');
    setTimeout(() => {
      console.log('타임아웃 끝');
      throw Error('END SETTIMEOUT');
    }, 1000);
  };

  const clickError = () => {
    try {
      throw Error('Click Error');
    } catch (error) {
      showBoundary(error);
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Button onClick={() => setTimeoutError()}>setTimeout 에러</Button>
      </div>
      <div>
        <Button onClick={() => clickError()}>클릭 에러</Button>
      </div>
    </>
  );
};
