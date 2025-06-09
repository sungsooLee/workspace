import { ColumnFiltersState, RowData, SortingState, Table } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  /**
   * @tanstack/react-table 라이브러리의 모듈 선언입니다.
   * TableMeta 인터페이스를 확장하여 테이블 데이터 업데이트를 위한 메서드를 추가합니다.
   */
  interface TableMeta<TData extends RowData> {
    /**
     * 특정 셀의 데이터를 업데이트하는 함수입니다.
     *
     * @param {number} rowIndex 업데이트할 셀이 위치한 행의 인덱스입니다.
     * @param {string} columnId 업데이트할 셀의 컬럼 ID입니다.
     * @param {unknown} value 업데이트할 셀의 새로운 값입니다.
     * @returns {void}
     */
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;

    /**
     * 특정 행을 삭제하는 함수입니다.
     *
     * @param {number} rowIndex 업데이트할 셀이 위치한 행의 인덱스입니다.
     * @returns {void}
     */
    removeData: (rowIndex: number) => void;
  }

  /**
   * @tanstack/react-table 라이브러리의 모듈 선언입니다.
   * ColumnMeta 인터페이스를 확장하여 사용자 정의 컬럼 메타 데이터를 추가합니다.
   */
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * 컬럼의 필터 유형을 정의합니다.
     * 'text', 'range', 'select' 중 하나를 선택할 수 있습니다.
     */
    filterType?: 'text' | 'range' | 'select';

    /**
     * 'select' 필터 유형에서 사용되는 선택 옵션 배열입니다.
     * 각 옵션은 label과 value 속성을 가진 객체로 구성됩니다.
     */
    filterOptions?: { label: string; value: string }[];

    /**
     * 컬럼의 기본 정렬 방식을 정의합니다.
     * 'left', 'center', 'right' 중 하나를 선택할 수 있으며, 헤더와 셀 모두에 적용됩니다.
     */
    align?: 'left' | 'center' | 'right'; // 기본 정렬 (헤더와 셀 모두에 적용)

    /**
     * 컬럼 헤더의 정렬 방식을 정의합니다.
     * 'left', 'center', 'right' 중 하나를 선택할 수 있으며, 헤더에만 적용됩니다.
     */
    headerAlign?: 'left' | 'center' | 'right'; // 헤더 전용 정렬

    /**
     * 컬럼 셀의 정렬 방식을 정의합니다.
     * 'left', 'center', 'right' 중 하나를 선택할 수 있으며, 셀에만 적용됩니다.
     */
    cellAlign?: 'left' | 'center' | 'right'; // 셀 전용 정렬

    /**
     * 컬럼 width
     */
    size?: 'auto' | number;
  }
}

/**
 * Grid 컴포넌트의 Props 인터페이스입니다.
 * 테이블 데이터를 표시하고 다양한 기능을 제공합니다.
 *
 * @template T 그리드 데이터의 타입
 */
export interface GridProps<T> {
  /**
   * 그리드에 표시할 데이터 배열입니다.
   */
  data: T[];

  /**
   * 그리드에 표시할 컬럼 설정 배열입니다.
   * 각 컬럼의 정의는 `any` 타입으로 구성됩니다.
   */
  columns: any[];

  /**
   * useReactTable() 생성시 getRowId 설정에 사용되는 key 값
   * 기본값 : 'id'
   */
  rowId?: string;

  /**
   * 데이터 로딩 중 여부를 나타내는 boolean 값입니다.
   * 로딩 중일 경우, 로딩 화면을 표시할 수 있습니다.
   */
  isLoading?: boolean;

  /**
   * 그리드 높이를 설정합니다.
   */
  height?: number;

  /**
   * 다중 선택 모드 활성화 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 여러 행을 선택할 수 있습니다.
   */
  multiple?: boolean;

  /**
   * 행 클릭 시 행 선택 토글 기능을 비활성화할지 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 행 클릭 시 선택 상태 변경이 비활성화됩니다.
   */
  disabledSelectionToggle?: boolean;

  /**
   * 싱글 선택 모드에서 체크박스 컬럼을 숨길지 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 체크박스 컬럼이 숨겨집니다.
   */
  hideRowSelectionRadioBox?: boolean;

  /**
   * 다중 선택 모드에서 체크박스 컬럼을 숨길지 여부를 나타내는 boolean 값입니다.
   * `true`로 설정하면 체크박스 컬럼이 숨겨집니다.
   */
  hideRowSelectionCheckBox?: boolean;

  /**
   * row index 를 표시할 컬럼 사용 유무
   * `true`로 설정하면 첫번째 column 에 numbering 표시를 합니다.
   */
  showNumberingColumn?: boolean;

  /**
   * 테이블 해더 표시 여부
   */
  hideHeader?: boolean;

  /**
   * 정적 그룹핑 설정을 포함하는 객체입니다.
   */
  columnGrouping?: {
    /**
     * 그룹핑할 컬럼 ID 배열입니다.
     */
    columns: string[];
  };

  /**
   * 컬럼 고정 설정을 포함하는 객체입니다.
   */
  columnPinning?: {
    /**
     * 고정할 컬럼 ID 배열입니다.
     */
    columns: string[];
  };

  /**
   * 외부에서 추가할 CSS 클래스 이름입니다.
   */
  className?: string;

  /**
   * 테이블 모드 활성화 여부를 나타내는 속성입니다.
   * true : 테이블 모드가 활성화 (table view)
   * false : 일반 모드가 활성화 (grid view)
   * 기본값은 false입니다.
   */
  tableMode?: boolean;

  /**
   * 행 클릭 시 호출되는 콜백 함수입니다.
   * @param {any} selectedRow 선택된 행 데이터
   */
  onRowSelect?: (selectedRow: any) => void;

  /**
   * 다중 행 클릭 시 호출되는 콜백 함수입니다.
   * @param {any[]} selectedRows 선택된 행 데이터 배열
   */
  onRowsSelect?: (selectedRows: any[]) => void;

  /**
   * useReactTable 훅으로 생성된 table 인스턴스가 준비되었을 때 호출되는 콜백 함수입니다.
   * 상위 컴포넌트에서 table 인스턴스를 받아 테이블 상태 및 기능을 제어할 수 있습니다.
   * @param table - useReactTable 훅이 반환한 table 인스턴스
   */
  onTableInstanceChange?: (table: Table<any>) => void; // 새로운 prop 추가

  /**
   * 컬럼, 그리드 설정 변경 시 호출되는 콜백 함수입니다.
   * @param {GridState} state 변경된 그리드 상태
   */
  onStateChange?: (state: GridBoxState) => void;

  /**
   * 데이터 변경 시 호출되는 콜백 함수입니다.
   * @param {T[]} data 변경된 데이터 배열
   */
  onChange?: (data: any[]) => void;

  /**
   * 데이터 없을 때 표시할 메세지
   */
  emptyMessage?: string;

  /**
   * 테이블 모드에서 style 을 구분하기 위해 사용
   */
  variant?: 'line' | 'fill';

  /**
   * data 변경시 그리드의 첫번째 행을 자동으로 선택해주기 위해 사용
   */
  autoSelectFirstRow?: boolean;

  /**
   * 그리드 스크롤 없이 보여줄 row 개수
   */
  visibleRowCount?: number;

  /**
   * row 높이
   */
  rowHeight?: number;

  clientSideSorting?: boolean;
  clientSideFiltering?: boolean;

  /**
   * 페이지네이션 관련 설정을 포함하는 객체입니다.
   */
  pagination?: any;
  // pagination?: {
  //   /**
  //    * 페이지당 표시할 행의 개수입니다.
  //    */
  //   pageSize: number;
  //
  //   /**
  //    * 현재 페이지의 인덱스입니다. (0부터 시작)
  //    */
  //   pageIndex: number;
  //
  //   /**
  //    * 전체 페이지 개수입니다.
  //    */
  //   totalRows: number;
  //
  //   /**
  //    * 페이지 변경 시 호출되는 콜백 함수입니다.
  //    * @param {number} pageIndex 변경된 페이지 인덱스
  //    */
  //   onPageChange: (pageIndex: number) => void;
  //
  //   /**
  //    * 페이지 크기 변경 시 호출되는 콜백 함수입니다.
  //    * @param {number} pageSize 변경된 페이지 크기
  //    */
  //   onPageSizeChange: (pageSize: number) => void;
  //
  //   /**
  //    * 페이지 크기 선택 옵션 배열입니다.
  //    */
  //   pageSizeOptions?: number[];
  // };
  subRows?: T[];
}

/**
 * Grid 컴포넌트의 상태를 나타내는 인터페이스입니다.
 */
export interface GridBoxState {
  page?: number;
  size?: number;
  sort?: string[];
}

/**
 * Grid 컴포넌트의 상태를 나타내는 인터페이스입니다.
 */
export interface GridState {
  /**
   * 컬럼 필터 상태를 나타내는 배열입니다.
   */
  filters?: ColumnFiltersState;

  /**
   * 정렬 상태를 나타내는 배열입니다.
   */
  sorting?: SortingState;

  /**
   * 컬럼 표시 여부를 나타내는 객체입니다.
   */
  // columnVisibility?: VisibilityState;

  /**
   * 컬럼 순서를 나타내는 문자열 배열입니다.
   */
  // columnOrder?: string[];
}

/**
 * Grid 컴포넌트의 외부에서 호출 가능한 명령형 메서드를 정의하는 인터페이스입니다.
 */
export interface GridImperative {
  /**
   * 행 선택 상태를 초기화하는 메서드입니다.
   */
  resetRowSelection: () => void;

  /**
   * 행 선택을 위한 메서드
   */
  selectRowById: (idField: string, idValue: string) => boolean;

  /**
   * 행 토글을 위한 메서드 ( 선택, 미선택 )
   */
  toggleRowById: (idField: string, idValue: string) => void;

  /**
   * 전체 행 토글을 위한 메서드 ( 선택, 미선택 )
   */
  toggleAllRowsSelected: (selected: boolean) => void;
}
