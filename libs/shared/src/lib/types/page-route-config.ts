import { ValidatorConfig } from '../../index';

export interface PageRouteContext {
  setPageRouteState?: any; // routing시 공통 레벨의 확장을 위한 PageRouteState 상태의 set method
  queryClient?: any; // react-query의 queryClient : route config내의 API fetch를 위해 정의
}

export interface PageRouteConfig<T> {
  validateState?: ValidatorConfig; // routing state validation config
  validateParam?: ValidatorConfig; // routing parameters validation config
  validateSearch?: ValidatorConfig; // routing query string validation config
  authorization?: boolean | string; // 권한 확인 여부
  meta?: T;
}

export interface RouteEventCallback {
  onBeforeLoad?: () => void;
}

export interface CurrentRoute<T = any> {
  state?: any;
  params?: any;
  search?: any;
  meta?: T;
}
