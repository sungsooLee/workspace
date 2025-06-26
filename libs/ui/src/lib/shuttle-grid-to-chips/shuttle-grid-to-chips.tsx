import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '@learnway/shared';
import { GridBoxProps } from '../grid/types';
import styles from './shuttle-grid-to-chips.module.css';
import { Button } from '../button/button';
import { ColumnDef, Table } from '@tanstack/react-table';
import { IcoNarrowRight, IcoXclose } from '@learnway/icons';
import { GridBox } from '../grid/grid-box/grid-box';
import { GridImperative } from '../grid/types';
import { useTranslation } from 'react-i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

export interface ShuttleGridToChipsProps<T>
  extends Pick<GridBoxProps, 'hideRowSelectionCheckBox' | 'showNumberingColumn'> {
  /**
   * 그리드 컬럼 정의 배열
   */
  columns: ColumnDef<any, unknown>[];
  /**
   * 좌측 그리드에 표시될 원본 데이터
   */
  gridData: T[];
  /**
   * 각 행을 고유하게 식별할 수 있는 키 (데이터 객체의 속성 이름)
   */
  rowKey: string;
  /**
   * 컴포넌트에 추가될 CSS 클래스 이름
   */
  className?: string;
  /**
   * 좌측 그리드의 제목
   */
  leftTitle?: string;
  /**
   * 우측 그리드의 제목
   */
  rightTitle?: string;
  selectedItems?: { id: string; name: string }[];
  onSelectedChange: (newSelected: { id: string; name: string }[]) => void;
}

/**
 * 컴포넌트의 외부에서 호출 가능한 명령형 메서드를 정의하는 인터페이스입니다.
 */
export interface ShuttleGridToChipsImperative {
  /**
   * 선택 상태를 초기화하는 메서드입니다.
   */
  resetSelection: () => void;
}

/**
 * Shuttle Grid To Grid
 * - 그리드는 페이지네이션 타입을 기본으로 하나, 셔틀 화면은 업무에 맞게 페이지네이션 또는 스크롤 타입을 제공
 * - 그리드 스크롤 타입을 제공할 경우, 필수 조회 항목 설정하여 조회 결과가 소팅되어 목록에 노출될 수 있도록 함
 */
const ShuttleGridToChipsComponent = <T,>(
  {
    hideRowSelectionCheckBox = true,
    showNumberingColumn = false,
    gridData = [],
    columns,
    rowKey,
    className,
    leftTitle,
    selectedItems = [],
    onSelectedChange,
  }: ShuttleGridToChipsProps<T>,
  ref: React.Ref<ShuttleGridToChipsImperative>,
) => {
  const { t } = useTranslation();
  const leftGridRef = useRef<GridImperative>(null);

  const [leftTableInstance, setLeftTableInstance] = useState<Table<any>>();
  // const [selectedItems, setSelectedItems] = useState<{ id: string; name: string }[]>([]);

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      // 좌측 그리드 전체 행 선택 해제, 로직 실행하면 handleLeftGridRowsSelect 실행됨
      leftTableInstance?.setRowSelection({});
    },
  }));

  /**
   * 좌측 그리드의 컬럼 정의
   * 기존 컬럼에 '선택' 버튼 컬럼을 추가합니다.
   */
  const leftGridColumns: ColumnDef<any, unknown>[] = [
    ...columns,
    {
      accessorKey: 'select-col',
      header: () => t('선택'),
      size: 94,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      cell: ({ row }) => (
        <div className={styles.btn_select}>
          <Button
            label={t('선택')}
            variant={
              selectedItems.find(({ id }) => id === row?.original?.[rowKey]) ? 'primary' : 'gray2'
            }
            className={
              selectedItems.find(({ id }) => id === row?.original?.[rowKey]) ? styles.active : ''
            }
            size={'xs'}
            onClick={() => {
              row.toggleSelected();
            }}
          />
        </div>
      ),
    },
  ];

  /**
   * 좌측 그리드에서 행을 선택/해제할 때 호출되는 핸들러.
   * 선탯 버튼 누르거나 전체선택 버튼 누를때 실행됨
   * 선택된 행을 우측 그리드 데이터에 추가하거나 삭제합니다.
   * @param selectedRows - 선택된 (또는 선택 해제된) 행의 원본 데이터
   */
  const handleLeftGridRowsSelect = (selectedRows: any[]) => {
    console.log(selectedRows);
    onSelectedChange(selectedRows.map((row) => ({ id: row[rowKey], name: row.fullName })));
    // setRightGridData(selectedRows);
  };

  /**
   * `rightGridData` 상태가 변경될 때마다 `onSelectedChange` 콜백을 호출하여 부모에게 변경된 데이터를 알립니다.
   */
  // useEffect(() => {
  //   onSelectedChange?.(rightGridData);
  // }, [rightGridData]);

  // 항목 제거 핸들러
  const handleRemoveItem = (deleteId: string) => {
    const newItems = selectedItems.filter(({ id }) => id !== deleteId);
    onSelectedChange(newItems);
  };

  return (
    <div className={cn(styles.start, styles.transfer_grid, className, 'nlp--shuttle-grid-to-grid')}>
      {/* 좌측 그리드 컨테이너 */}
      <div className={styles.grid_wrap}>
        <GridBox
          ref={leftGridRef} // 좌측 그리드의 명령형 메서드에 접근하기 위한 Ref 연결
          title={leftTitle} // 좌측 그리드 제목
          data={gridData as any} // 좌측 그리드 데이터
          columns={leftGridColumns} // 좌측 그리드 컬럼 정의
          multiple // 다중 선택 가능
          disabledSelectionToggle // 선택 체크박스 비활성화 (버튼으로 선택 제어)
          showSelectAll // '전체 선택' 기능 표시
          hideRowSelectionCheckBox={hideRowSelectionCheckBox} // 행 선택 체크박스 숨김 여부
          showNumberingColumn={showNumberingColumn} // 번호 매김 컬럼 표시 여부
          onRowsSelect={handleLeftGridRowsSelect} // 행 선택 시 호출되는 핸들러
          onTableInstanceChange={(table: Table<any>) => setLeftTableInstance(table)}
        />
      </div>
      {/* 그리드 사이의 구분 및 이동 아이콘 */}
      <div className={styles.icon_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#B5C2D7'} />
      </div>
      <div className={styles.grid_wrap}>
        <div className={titleStyles.title_wrap}>
          {/* <h3 className={titleStyles.title}>{targetTitle || title}</h3> */}
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              // onClick={handleRemoveAllItem}
            >
              {'전체삭제'}
            </Button>
          </div>
        </div>
        <div className={styles.data_wrap}>
          {selectedItems.length === 0 ? (
            <div className={styles.no_data}>{'선택한 데이터가 없습니다.'}</div>
          ) : (
            selectedItems.map(({ id, name }) => (
              <div key={id} className={styles.selected_item}>
                <div>
                  {/* fullPath 대신 특정 속성? 값을 갖고오는 로직 추가 필요한 것 같음. */}
                  <span className={styles.selected_text}>{name}</span>
                </div>
                <Button onClick={() => handleRemoveItem(id)} className={styles.btn_close}>
                  <IcoXclose width={20} height={20} stroke="#131C30" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const ShuttleGridToChips = forwardRef(ShuttleGridToChipsComponent);
