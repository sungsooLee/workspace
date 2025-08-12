import { useMount } from 'ahooks';
import { ReactNode, useEffect, useState } from 'react';

import { API_FO_URI, initAxios, initI18N, initZod, setConfig } from '@learnway/config';

import { useFetchCodeGroups, useFetchI18nResource } from '@entities/platform';

import { useCodeStore } from '@learnway/hooks';
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
  // const { reissue } = useAuthSignin();
  // const { alert } = useModal();
  const { reset: resetCode } = useCodeStore();

  useMount(async () => {
    // 글로벌 컨피그 세팅 BO/FO
    setConfig('APP_INFO', 'FO');
    // set api prefix by fo
    setConfig('APP_API_URI', API_FO_URI);
    // 공통코드 삭제
    resetCode();
    // tokenService.refreshToken && (await reissue());
  });

  useEffect(() => {
    initAxios({
      // API Error ux 대응
      onRejected: async (error: any) => {
        const { config, response: errorResponse } = error;
        if (error?.code === 'ERR_NETWORK' || errorResponse?.status === 500) {
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

    setIsLoading(false);
  }, [codeGroupData, i18nData]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  return children;
}
