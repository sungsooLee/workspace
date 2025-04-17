export interface Widget {
  widgetCode: string;
  widgetName: string;
  widgetDesc: string;
  isWebExposed: boolean;
  isMobileExposed: boolean;
  isUsed: boolean;
  secureContentYn: boolean;
  componentPcId: string;
  componentMobileId: string;
}
