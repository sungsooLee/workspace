import { useEffect, useState, ReactNode } from 'react';
import { useMount } from 'ahooks';

import { initI18N, initZod, initAxios } from '@learnway/config';
import { Spinner } from '@learnway/ui';
import { cookieService } from '@learnway/shared';

import { useFetchI18nResource, useFetchCodeGroups } from '../entities/platform';
import { useReissue } from '../entities/user';

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
  const { reissue } = useReissue();

  useMount(() => {
    const refreshToken = cookieService.get('REFRESH-TOKEN');
    refreshToken && reissue();
  });

  useEffect(() => {
    initAxios();
    initZod();
  }, []);

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
