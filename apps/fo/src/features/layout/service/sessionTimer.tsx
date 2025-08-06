import { useEffect } from 'react';
import { useLoginTimeout } from './loginTimeout.hooks';

export function SessionTimer() {
  const { startSession } = useLoginTimeout();

  useEffect(() => {
    startSession();
  }, []);

  return null;
}
