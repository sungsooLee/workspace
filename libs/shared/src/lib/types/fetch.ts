export interface FetchPaginationParam {
  size?: number;
  page?: number;
  sort?: string[]; // 'fieldName,asc', 'fieldName,desc'
}

export interface PageInfo {
  size?: number; // page당 row size
  first?: boolean; // true: 첫번째 페이지
  last?: boolean; // true: 마지막 페이지
  totals?: number; // 전체 row count
  totalPages?: number; // 전체 page수
  currentPage?: number; // 현재 page
}

export interface QueryFnPagingData<T> {
  content?: T;
  page?: PageInfo;
}

export interface FetchResponse<T = unknown> {
  data?: T;
  pageInfo?: PageInfo;
  isError: boolean;
  isLoading: boolean;
  isFetching?: boolean;
  refetch: () => void;
}
