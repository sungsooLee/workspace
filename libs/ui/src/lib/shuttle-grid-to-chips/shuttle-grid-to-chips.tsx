import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './shuttle-grid-to-chips.module.css';
import { Button } from '../button/button';
import { ColumnDef, Table } from '@tanstack/react-table';
import { IcoNarrowRight, IcoXclose } from '@learnway/icons';
import { GridBox } from '../grid/grid-box/grid-box';
import { GridImperative } from '../grid/types';
import { useTranslation } from 'react-i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { SelectedChip } from '../type';

interface ShuttleGridToChipsProps {
  columns: ColumnDef<any, unknown>[];
  gridData: any[];
  selectedItems: SelectedChip[];
  handleSelectItem: (nodes: SelectedChip[]) => void;
  cancelSelectItem: (node: SelectedChip) => void;
  cancelAll: () => void;
  sourceTitle: string;
  targetTitle: string;
}

export interface ShuttleGridToChipsImperative {
  resetSelection: () => void;
}

const ShuttleGridToChipsComponent = (
  {
    columns,
    gridData,
    selectedItems,
    handleSelectItem,
    cancelSelectItem,
    cancelAll,
    sourceTitle,
    targetTitle,
  }: ShuttleGridToChipsProps,
  ref: React.Ref<ShuttleGridToChipsImperative>,
) => {
  const { t } = useTranslation();
  const leftGridRef = useRef<GridImperative>(null);

  const [leftTableInstance, setLeftTableInstance] = useState<Table<any>>();

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      leftTableInstance?.setRowSelection({});
    },
  }));

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
      cell: ({ row }) => {
        console.log(row?.original, 'row?.original::');
        const rowId = row?.original?.id;
        return (
          <div className={styles.btn_select}>
            <Button
              label={t('선택')}
              variant={selectedItems.find(({ id }) => id === rowId) ? 'primary' : 'gray2'}
              className={selectedItems.find(({ id }) => id === rowId) ? styles.active : ''}
              size={'xs'}
              onClick={() => {
                row.toggleSelected();
              }}
            />
          </div>
        );
      },
    },
  ];

  const onRowsSelect = (selectedRows: any[]) => {
    // console.log(selectedRows, 'selectedRows');
    handleSelectItem(selectedRows);
    // setRightGridData(selectedRows);
  };

  const handleRemoveItem = (node: SelectedChip) => {
    cancelSelectItem(node);
    // const newItems = selectedItems.filter(({ id }) => id !== deleteId);

    // handleSelectItem();
  };

  const removeAll = () => {
    // 좌측 그리드 전체 행 선택 해제, 로직 실행하면 handleLeftGridRowsSelect 실행됨
    leftTableInstance?.setRowSelection({});
    cancelAll();
  };

  return (
    <div className={cn(styles.start, styles.transfer_grid, 'nlp--shuttle-grid-to-grid')}>
      <div className={styles.grid_wrap}>
        <GridBox
          ref={leftGridRef} // 좌측 그리드의 명령형 메서드에 접근하기 위한 Ref 연결
          title={sourceTitle} // 좌측 그리드 제목
          data={gridData} // 좌측 그리드 데이터
          columns={leftGridColumns} // 좌측 그리드 컬럼 정의
          multiple // 다중 선택 가능
          disabledSelectionToggle // 선택 체크박스 비활성화 (버튼으로 선택 제어)
          hideRowSelectionCheckBox={true} // 행 선택 체크박스 숨김 여부
          onRowsSelect={onRowsSelect} // 행 선택 시 호출되는 핸들러
          onTableInstanceChange={(table: Table<any>) => setLeftTableInstance(table)}
        />
      </div>
      <div className={styles.icon_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#B5C2D7'} />
      </div>
      <div className={styles.grid_wrap}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{targetTitle}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} onClick={removeAll}>
              {'전체삭제'}
            </Button>
          </div>
        </div>
        <div className={styles.data_wrap}>
          {selectedItems.length === 0 ? (
            <div className={styles.no_data}>{'선택한 데이터가 없습니다.'}</div>
          ) : (
            selectedItems.map((selectedItem) => (
              <div key={selectedItem.key} className={styles.selected_item}>
                <div>
                  <span className={styles.selected_text}>{selectedItem.fullPath}</span>
                </div>
                <Button onClick={() => handleRemoveItem(selectedItem)} className={styles.btn_close}>
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
