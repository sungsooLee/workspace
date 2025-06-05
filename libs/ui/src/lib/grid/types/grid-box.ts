import { GridBoxState, GridProps } from './grid';
import React from 'react';
import { GridBoxSearchInputCondition } from '../grid-box/grid-box-search-input';
import { PaginationResponse } from '../../type';

/**
 * TODO. GridBox 내의 기능이 확정되지 않아 useGridBox 와 GridBox 에 대한 Config 를 분리해놨는데 확정 된다면 합치는게 좋을꺼 같습니다.
 * useGridBox 훅에 전달되는 config 객체의 타입을 정의합니다.
 * 훅이 데이터 페칭 로직을 수행하는 데 필요한 정보를 담고 있습니다.
 */
export interface useGridBoxConfig {
  /**
   * 타이틀
   */
  title?: string;

  /**
   * 데이터를 실제로 페칭하는 로직을 담고 있는 함수입니다.
   * React Query의 fetchQuery 등에 전달될 FetchQueryOptions 객체를 반환해야 합니다.
   */
  query: any; // 실제 타입은 FetchQueryOptions 객체를 반환하는 함수 시그니처가 되어야 합니다. 예: (params: any) => FetchQueryOptions<any, any, any, any>;

  /**
   * Grid에 표시될 컬럼들의 정의 배열입니다.
   */
  columns: any[]; // 실제 컬럼 정의 객체들의 배열 타입으로 명확히 하는 것이 좋습니다. 예: ColumnDef<T>[];

  /**
   * Grid에 표시될 데이터 배열입니다.
   */
  data?: any[]; // 실제 행 데이터 객체들의 배열 타입으로 명확히 하는 것이 좋습니다. 예: T[];

  /**
   * useReactTable() 생성시 getRowId 설정에 사용되는 key 값
   * 기본값 : 'id'
   */
  rowId?: string;

  /**
   * Excel 업로드 다운로드에 대한 기능 정의
   */
  excel?: ExcelConfig;

  /**
   * 데이터 페칭 시 사용될 페이지네이션 상태 객체 (선택적)입니다.
   * 현재 페이지 정보 등을 포함합니다.
   */
  pagination?: {
    pageIndex: number; // 현재 페이지 인덱스 (0부터 시작)
    pageSize: number; // 페이지당 행 수
    totalRows: number; // 전체 행 수 (page 객체 안에 포함될 수도 있음)
    [key: string]: any; // 필요한 다른 페이지네이션 속성
  };
}

export interface UseGridBoxReturn<T = any> {
  config: GridBoxConfig<T>;
  gridFetch: (condition?: Record<string, any>, state?: GridBoxState) => Promise<void>;
  data: any;
}

/**
 * GridBox 컴포넌트의 config prop 타입을 정의합니다.
 * Grid의 데이터와 기본적인 동작 설정을 포함합니다.
 */
export interface GridBoxConfig<T = any> {
  /**
   * 타이틀
   */
  title?: string;

  /**
   * Grid에 표시될 컬럼들의 정의 배열입니다.
   */
  columns?: any[]; // 실제 컬럼 정의 객체들의 배열 타입으로 명확히 하는 것이 좋습니다. 예: ColumnDef<T>[];

  /**
   * Grid에 표시될 데이터 배열입니다.
   */
  data?: any[]; // 실제 행 데이터 객체들의 배열 타입으로 명확히 하는 것이 좋습니다. 예: T[];

  /**
   * useReactTable() 생성시 getRowId 설정에 사용되는 key 값
   * 기본값 : 'id'
   */
  rowId?: string;

  /**
   * Grid에 표시될 데이터 배열입니다.
   */
  gridData?: PaginationResponse<T>; // 실제 행 데이터 객체들의 배열 타입으로 명확히 하는 것이 좋습니다. 예: T[];

  /**
   * Grid에 표시될 전체 행 개수 (page 객체 외부에 별도로 있을 경우)입니다.
   */
  totalRows?: number;

  /**
   * Grid에 표시될 전체 행 개수 (page 객체 외부에 별도로 있을 경우)입니다.
   */
  totalElements?: number;

  /**
   * 데이터를 다시 불러오는 함수 (선택적)입니다.
   * 페이지 변경, 검색 등 데이터 갱신이 필요할 때 호출됩니다.
   */
  gridFetch?: (params: { page?: number; size?: number; [key: string]: any }) => void;

  /**
   * 조회된 데이터 유무 (조회된 데이터 개수가 1건 이상 있으면 true)
   */
  hasData?: boolean;

  onDataChange: (data: any) => void;

  getParams?: () => void; //UseFormReturn['getValues'];

  /**
   * Excel 업로드 다운로드에 대한 기능 정의
   */
  excel?: ExcelConfig;

  /**
   * 페이지네이션 상태 객체 (선택적)입니다.
   * 현재 페이지 정보 등을 포함합니다.
   */
  page?: GridBoxPagination;

  // state change
  onStateChange?: (state: GridBoxState) => void;

  pagination?: GridBoxPagination;
}

export interface GridBoxProps<T extends object = object>
  extends Omit<GridProps<T>, 'data' | 'columns' | 'pagination'> {
  /**
   * config
   */
  config?: GridBoxConfig;

  /**
   * 타이틀
   */
  title?: string;

  /**
   * 가이드 텍스트
   */
  guideText?: string;

  /**
   * 전체 행 개수 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 전체 행 개수가 표시됩니다.
   */
  showTotalCount?: boolean;

  /**
   * 선택된 행 개수 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 선택된 행 개수가 표시됩니다.
   */
  showSelectedCount?: boolean;

  /**
   * 항목 설정 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 항목 설정 버튼이 표시됩니다.
   */
  showColumnSettings?: boolean;

  /**
   * 엑셀 다운로드 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 엑셀 다운로드 버튼이 표시됩니다.
   */
  showExcelDownload?: boolean;

  /**
   * 업로드 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 업로드 버튼이 표시됩니다.
   */
  showUpload?: boolean;

  /**
   * 전체 선택 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 전체 선택 버튼이 표시됩니다.
   */
  showSelectAll?: boolean;

  /**
   * 전체 삭제 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 전체 삭제 버튼이 표시됩니다.
   */
  showRemoveAll?: boolean;

  /**
   * 추가 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 추가 버튼이 표시됩니다.
   */
  showAdd?: boolean;

  /**
   * 삭제 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 행삭제 버튼이 표시됩니다.
   */
  showRemove?: boolean;

  /**
   * 좌측 타이틀 영역 커스텀 (전체 카운트와 가이드 텍스트 중간 영역)
   */
  titleCustomNode?: React.ReactNode;

  /**
   * 우측 버튼 영역 커스텀
   */
  customButtonNode?: React.ReactNode;

  /**
   * override GridProps
   */
  data?: T[];

  /**
   * grid data
   */
  gridData?: PaginationResponse<T>;

  /**
   * 추가 버튼 클릭 핸들러
   */
  onAddClick?: () => void;

  /**
   * 추가 버튼 클릭 핸들러
   */
  onRemoveClick?: () => void;

  /**
   * 전체선택 버튼 클릭 핸들러
   */
  onSelectAllClick?: () => void;

  /**
   * 전체삭제 버튼 클릭 핸들러
   */
  onRemoveAllClick?: () => void;

  /**
   * 검색영역 조회 버튼 클릭 핸들러 (엔터 눌렀을때도 실행됨)
   */
  onSearchClick?: (condition: GridBoxSearchInputCondition) => void;

  /**
   * Show RowIndex
   */
  showNumberingColumn?: boolean;

  /**
   * 그리드 컬럼
   */
  columns?: any[];

  clientSideSorting?: boolean;
  clientSideFiltering?: boolean;

  /**
   * 페이지네이션 관련 설정을 포함하는 객체입니다.
   */
  pagination?: GridBoxPagination;

  /**
   * 엑셀 버튼
   */
  excelButtons?: React.ReactNode;
}

export interface GridBoxPagination {
  /**
   * 현재 페이지의 인덱스입니다. (0부터 시작)
   */
  pageNumber?: number;

  /**
   * 전체 페이지 개수입니다.
   */
  totalPages?: number;

  /**
   * 한 페이지에 표시할 데이터 개수
   */
  pageSize?: number;

  /**
   * 한 페이지에 표시할 데이터 개수 (삭제 예정)
   */
  pageIndex?: number;

  /**
   * 페이지 크기 선택 옵션 배열입니다.
   */
  pageSizeOptions?: number[];

  /**
   * 페이지 변경 시 호출되는 콜백 함수입니다.
   * @param {number} pageIndex 변경된 페이지 인덱스
   */
  onPageChange?: (pageIndex: number) => void;

  /**
   * 페이지 크기 변경 시 호출되는 콜백 함수입니다.
   * @param {number} pageSize 변경된 페이지 크기
   */
  onPageSizeChange?: (pageSize: number) => void;
}

export interface ExcelConfig {
  upload?: string; // uploadUrl
  download?: string; // downloadUrl
  form?: {
    // 양식 관련 정보
    xlsx: string; // xlsx form download url
    csv: string; // csv download url
  };
  uploadCOnfig?: {
    validateUrl?: string; //엑셀 유효성 검사 url
    uploadUrl?: string;
  };
  onBeforeDownload?: (executeUpload: () => Promise<void>) => Promise<void>;
  onBeforeUpload?: (executeUpload: () => Promise<void>) => Promise<void>;
}
