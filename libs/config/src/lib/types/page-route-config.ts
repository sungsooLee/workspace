import { ZodSchema } from 'zod';

export interface PageRouteConfig<T> {
  validate?: (r: RouteValidateParams) => void;
  validateState?: ZodSchema | ((state: any) => ZodSchema);
  validateParam?: ZodSchema; //| (param: any) => boolean;
  validateSearch?: ZodSchema; // | (search: any) => boolean;
  authorization?: boolean | string;
  meta?: T;
}

export interface RouteValidateParams {
  params: any;
  search: any;
  state: any;
}
