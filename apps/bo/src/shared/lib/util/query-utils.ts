import { authUserQueryKeys } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { queryConfig } from '@learnway/config';

/**
 * QueryClient 인스턴스를 가져오는 유틸리티 함수
 * @returns QueryClient 인스턴스
 */
export const getQueryClient = () => {
  return queryConfig.getQueryClient();
};

/**
 * 현재 인증된 사용자 정보를 가져오는 유틸리티 함수
 * @returns {AuthUser | undefined} 인증된 사용자 정보
 */
export const getCurrentAuthUser = (): AuthUser | undefined => {
  const queryClient = queryConfig.getQueryClient();
  return queryClient.getQueryData(authUserQueryKeys.authUser) as AuthUser;
};
