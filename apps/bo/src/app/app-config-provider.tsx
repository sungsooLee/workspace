import { useEffect, useState, ReactNode } from 'react';
import { useMount } from 'ahooks';

import { initI18N, initZod, initAxios, tokenService } from '@learnway/config';
import { Spinner, useModal } from '@learnway/ui';

import { useFetchI18nResource, useFetchCodeGroups } from '../entities/platform';
import { useAuthSignin } from '../features/auth';

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
  const { reissue } = useAuthSignin();
  const { alert } = useModal();

  useMount(async () => {
    tokenService.refreshToken && (await reissue());
  });

  useEffect(() => {
    initAxios({
      // API Error ux 대응
      onRejected: async (error: any) => {
        const { config, response: errorResponse } = error;
        if (error?.code === 'ERR_NETWORK' || errorResponse?.status === 500) {
          await alert({
            title: '시스템 에러',
            content: '시스템 관리자에게 문의하세요',
            type: 'error',
          });
        }
        return Promise.reject(error);
      },
    });
    initZod();
  }, []);

  useEffect(() => {
    console.log(';i18nData', i18nData);
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
