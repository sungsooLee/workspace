import { useMount } from 'ahooks';
import { ReactNode, useEffect, useState } from 'react';

import {
  // TODO: Fix unknown imports: Spinner from '@learnway/ui'
  initAxios,
  initI18N,
  initZod,
  // getDefaultLang,
  setConfig,
} from '@learnway/config';

import { useFetchCodeGroups, useFetchI18nResource } from '../entities/platform';
import { useAuthSignin } from '../features/auth';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { Spinner } from '@learnway/ui/spinner';
import '../styles.css';

declare global {
  interface Window {
    LEARNWAY_CONFIG: {
      //CODE: typeof CODE;
    };
  }
}

export interface AppConfigProviderProps {
  children?: ReactNode;
}

export function AppConfigProvider({ children }: AppConfigProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: codeGroupData } = useFetchCodeGroups();
  const { data: i18nData } = useFetchI18nResource();
  const { reissue } = useAuthSignin();
  const { data: authUser } = useFetchAuthUser();

  useMount(async () => {
    setConfig('APP_INFO', 'BO');
    // console.log('### useMount start');
    // tokenService.refreshToken && (await reissue());
    // console.log('### useMount end');
  });

  useEffect(() => {
    initAxios({
      // API Error ux 대응
      onRejected: async (error: any) => {
        const { config, response: errorResponse } = error;
        if (error?.code === 'ERR_NETWORK' || errorResponse?.status === 500) {
          console.error('error', error);
          // await alert({
          //   title: '시스템 에러',
          //   content: '시스템 관리자에게 문의하세요',
          //   type: 'error',
          // });
        }
        return Promise.reject(error);
      },
    });
    initZod();
  }, []);

  useEffect(() => {
    if (!i18nData) {
      return;
    }

    initI18N(i18nData);
  }, [i18nData]);

  useEffect(() => {
    // codeGroupData, i18n 로딩
    if (!codeGroupData || !i18nData) return;

    // reissue 체크
    // if (!authUser && tokenService.refreshToken) {
    //   return;
    // }

    setIsLoading(false);
  }, [codeGroupData, i18nData, authUser]);

  // useEffect(() => {
  //   const supportedLanguages = ['ko', 'en'];
  //   const currentLang = getDefaultLang();

  //   // 현재 언어가 아닌 다른 언어들을 백그라운드에서 미리 로딩
  //   supportedLanguages
  //     .filter((lang) => lang !== currentLang)
  //     .forEach((lang) => {
  //       queryClient.prefetchQuery(queryOptions.detail(lang));
  //     });
  // }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  return children;
}
