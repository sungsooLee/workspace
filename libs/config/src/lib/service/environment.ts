export type Environment = 'local' | 'dev' | 'prod';

export const getEnvironment = (): Environment => {
  return (import.meta.env.VITE_APP_ENV as Environment) || 'prod';
};

/**
 * 현재 환경이 로컬인지 확인
 */
export const isLocal = (): boolean => {
  return getEnvironment() === 'local';
};

/**
 * 현재 환경이 개발환경인지 확인
 */
export const isDev = (): boolean => {
  return getEnvironment() === 'dev';
};

/**
 * 현재 환경이 운영환경인지 확인
 */
export const isProd = (): boolean => {
  return getEnvironment() === 'prod';
};
