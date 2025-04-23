import { GridProps } from './grid';
import React from 'react';

/**
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

/**
 * GridBox 컴포넌트의 config prop 타입을 정의합니다.
 * Grid의 데이터와 기본적인 동작 설정을 포함합니다.
 */
export interface GridBoxConfig {
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
   * Grid에 표시될 전체 행 개수 (page 객체 외부에 별도로 있을 경우)입니다.
   */
  totalRows?: number;

  /**
   * 데이터를 다시 불러오는 함수 (선택적)입니다.
   * 페이지 변경, 검색 등 데이터 갱신이 필요할 때 호출됩니다.
   */
  gridFetch?: (params: { page?: number; size?: number; [key: string]: any }) => void;

  /**
   * 조회된 데이터 유무 (조회된 데이터 개수가 1건 이상 있으면 true)
   */
  hasData?: boolean;

  /**
   * 페이지네이션 상태 객체 (선택적)입니다.
   * 현재 페이지 정보 등을 포함합니다.
   */
  page?: {
    pageIndex: number; // 현재 페이지 인덱스 (0부터 시작)
    pageSize: number; // 페이지당 행 수
    totalRows: number; // 전체 행 수 (page 객체 안에 포함될 수도 있음)
    [key: string]: any; // 필요한 다른 페이지네이션 속성
  };
}

export interface GridBoxProps<T extends object = object>
  extends Omit<GridProps<T>, 'data' | 'columns'> {
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
  showDeleteAll?: boolean;

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
  columns?: any[];
}
