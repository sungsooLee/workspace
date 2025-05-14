export interface SortResponse {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
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
  sort: SortResponse[];
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: SortResponse[];
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
