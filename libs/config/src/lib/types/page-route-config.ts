import { ValidatorConfig } from '@learnway/shared';

export interface PageRouteConfig<T> {
  validate?: (r: RouteValidateParams) => void;
  validateState?: ValidatorConfig;
  validateParam?: ValidatorConfig; //| (param: any) => boolean;
  validateSearch?: ValidatorConfig; // | (search: any) => boolean;
  authorization?: boolean | string;
  meta?: T;
}

export interface RouteValidateParams {
  params: any;
  search: any;
  state: any;
}
