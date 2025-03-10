export const ERROR = {
  AUTHORIZATION: 'AUTHORIZATION',
  PAGE_ACCESS_RIGHTS: 'PAGE_ACCESS_RIGHTS',
  E003: 'E003',
};
export type ERROR = (typeof ERROR)[keyof typeof ERROR];
