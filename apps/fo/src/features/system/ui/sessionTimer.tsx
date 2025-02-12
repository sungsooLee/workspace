import { useEffect } from 'react';
import { useLoginTimeout } from '../../../widgets/layout/service/loginTimeout.hooks';

export function SessionTimer() {
  const { startSession } = useLoginTimeout();

  useEffect(() => {
    startSession();
  }, []);

  return null;
}
