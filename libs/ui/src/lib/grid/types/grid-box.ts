import { GridProps } from './grid';
import React from 'react';

export interface GridBoxProps<T = any> extends GridProps<any> {
  /**
   * config
   */
  config?: Partial<{
    data: T[]; // Grid에 표시될 데이터 배열
    columns: any[]; // 컬럼 설정 배열 (GridBox의 커스텀 컬럼 정의 형식)
    page: {
      // 페이지네이션 상태 객체 (선택적)
      pageIndex: number; // 현재 페이지 인덱스 (0부터 시작)
      pageSize: number; // 페이지당 행 수
      totalRows: number; // 전체 행 수 (page 객체 안에 포함될 수도 있음)
      [key: string]: any; // 필요한 다른 페이지네이션 속성
    };
    totalRows: number; // 전체 행 개수 (page 객체 외부에 별도로 있을 경우)
    gridFetch: (params: { page?: number; size?: number; [key: string]: any }) => void; // 데이터를 다시 불러오는 함수
  }>;

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
   * Grid Props
   */
  gridProps?: GridProps<any>;
}
