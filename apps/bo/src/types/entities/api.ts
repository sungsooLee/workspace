export interface SortRequest {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface SortResponse {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PaginationRequest {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PaginationResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<T>;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  sort?: SortResponse;
  pageable?: {
    offset: number;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
    sort: SortResponse;
  };
}
