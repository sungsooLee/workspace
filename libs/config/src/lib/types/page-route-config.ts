export interface PageRouteConfig<T> {
  validate?: (r: RouteValidateParams) => void;
  authorization?: boolean;
  meta?: T;
}

export interface RouteValidateParams {
  params: any;
  search: any;
  state: any;
}
