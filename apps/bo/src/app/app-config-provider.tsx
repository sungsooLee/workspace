import { useEffect, useState, ReactNode } from 'react';

import { initI18N } from '@learnway/config';
import { Spinner } from '@learnway/ui';

import { useFetchI18nResource, useFetchCodeGroups } from '../entities/platform';

import '../styles.css';

declare global {
  interface Window {
    LEARNWAY_CONFIG: {
      //CODE: typeof CODE;
    };
  }
}

/* eslint-disable-next-line */
export interface AppConfigProviderProps {
  children?: ReactNode;
}

export function AppConfigProvider({ children }: AppConfigProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: codeGroupData } = useFetchCodeGroups();
  const { data: i18nData } = useFetchI18nResource();

  useEffect(() => {
    if (!i18nData) {
      return;
    }
    initI18N(i18nData);
  }, [i18nData]);

  useEffect(() => {
    if (!codeGroupData || !i18nData) {
      return;
    }

    setIsLoading(false);
  }, [codeGroupData, i18nData]);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return children;
}
