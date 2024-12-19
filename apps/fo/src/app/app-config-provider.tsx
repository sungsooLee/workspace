import { useEffect, useState, ReactNode } from 'react';

import { initI18N } from '@learnway/config';
import { Spinner } from '@learnway/ui';

import { useFetchI18nResource, useFetchCodes } from '../entities/system';

import '../styles.css';

/* eslint-disable-next-line */
export interface AppConfigProviderProps {
  children?: ReactNode;
}

export function AppConfigProvider({ children }: AppConfigProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: codeData } = useFetchCodes();
  const { data: i18nData } = useFetchI18nResource();

  useEffect(() => {
    if (!i18nData) {
      return;
    }
    initI18N(i18nData);
  }, [i18nData]);

  useEffect(() => {
    if (!codeData || !i18nData) {
      return;
    }
    setIsLoading(false);
  }, [codeData, i18nData]);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return children;
}
