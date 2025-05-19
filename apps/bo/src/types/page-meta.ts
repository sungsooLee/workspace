import { AUTH_CONTAINERS } from '../widgets/layout';

export type CONTAINER_TYPE = (typeof AUTH_CONTAINERS)[keyof typeof AUTH_CONTAINERS];

export interface PageMeta {
  title?: string;
  container?: CONTAINER_TYPE;
}

export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort[];
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableContent<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
