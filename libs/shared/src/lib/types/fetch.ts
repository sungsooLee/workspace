export interface FetchPaginationParam {
  size?: number;
  page?: number;
  sort?: string[]; // 'fieldName,asc', 'fieldName,desc'
}

export interface PageInfo {
  size?: number;
  first?: boolean;
  last?: boolean;
  toatlElements?: number;
  totalPage?: number;
  number?: number;
  numberOfElements?: number;
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
