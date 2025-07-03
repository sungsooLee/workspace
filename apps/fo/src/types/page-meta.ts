import { AUTH_CONTAINERS } from '../widgets/layout';

export type CONTAINER_TYPE = (typeof AUTH_CONTAINERS)[keyof typeof AUTH_CONTAINERS];

export interface PageMeta {
  title?: string;
  mobile?: {
    container?: {
      showHeader?: boolean;
    };
    showHeader?: boolean;
    showFooter?: boolean;
    showMainFooter?: boolean;
  };
  container?: CONTAINER_TYPE;
}
