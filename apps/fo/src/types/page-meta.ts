export interface PageRouteConfig {
  validate?: (r: RouteValidateParams) => void;
  authorization?: boolean;
  meta?: PageMeta;
}

export interface PageMeta {
  mobile?: {
    container?: {
      showHeader: boolean;
    };
    showFooter: boolean;
  };
}

export interface RouteValidateParams {
  params: any;
  search: any;
  state: any;
}
