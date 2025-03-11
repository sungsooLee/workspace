import { SortResponse } from './sort';

export interface PaginationRequest {
  page: number;
  size: number;
  sort: string[];
}
export interface PaginationResponse {
  offset: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  sort: SortResponse[];
}
