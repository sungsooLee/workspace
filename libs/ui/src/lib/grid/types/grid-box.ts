import { GridProps } from './grid';
import React from 'react';

export interface GridBoxConfig<T> {
  data?: T[]; // Grid에 표시될 데이터
  columns?: any[]; // 커스텀 컬럼 정의
  page?: {
    pageIndex: number;
    pageSize: number;
    totalRows: number;
    [key: string]: any;
  };
  totalRows?: number; // page 외부에 따로 totalRows가 있을 경우
  gridFetch?: (params: { page?: number; size?: number; [key: string]: any }) => void;
}

export interface GridBoxProps<T extends object = object>
  extends Omit<GridProps<T>, 'data' | 'columns'> {
  /**
   * config
   */
  config?: GridBoxConfig<T>;

  /**
   * 타이틀
   */
  title?: string;

  /**
   * 항목 설정 버튼 표시 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 항목 설정 버튼이 숨겨집니다.
   */
  hideColumnSettings?: boolean;

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
   * 좌측 타이틀 영역 커스텀
   */
  titleCustomNode?: React.ReactNode;

  /**
   * 우측 버튼 영역 커스텀
   */
  renderButtons?: React.ReactNode;

  /**
   * guideText
   */
  guideText?: string;

  /**
   * override GridProps
   */
  data?: T[];
  columns?: any[];
}
