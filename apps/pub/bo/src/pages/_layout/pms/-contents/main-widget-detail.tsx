/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, Input, TableBox } from '@learnway/ui';

/* styles */
import styles from './main-widget-detail.module.css';
import dataWrapStyles from './data-wrap.module.css';

const MainWidgetDetailComponent: FC<{}> = ({}) => {
  // Table
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      Sort: <strong>PC</strong>,
      ComponentId: (
        <div className={cn(dataWrapStyles.wrap)}>
          <Input value={'dsbdbshjdbshbd'} disabled />
          <span className={dataWrapStyles.guide_text}>{'가로*세로 600*800'}</span>
        </div>
      ),
    },
    {
      Sort: <strong>Mobile</strong>,
      ComponentId: (
        <div className={cn(dataWrapStyles.wrap)}>
          <Input value={'dsbdbshjdbshbd'} disabled />
          <span className={dataWrapStyles.guide_text}>{'가로*세로 1,000*1,000'}</span>
        </div>
      ),
    },
  ];

  const columns = [
    columnHelper.accessor('Sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('ComponentId', {
      cell: (info) => info.getValue(),
      header: '컴포넌트 ID',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'위젯 상세'}
        actionNode={
          <>
            <Button label={'삭제'} variant={'text'} size={'sm'} />
            <Button label={'저장'} variant={'save'} size={'sm'} />
          </>
        }
        lineType={'light'}
      />
      <div className={styles.form_wrap}>
        <div className={styles.table_wrap}>
          <TableBox data={data} columns={columns} tableMode={true} title={'컴포넌트 ID'} />
        </div>
      </div>
    </div>
  );
};

MainWidgetDetailComponent.displayName = 'MainWidgetDetail';
export const MainWidgetDetail = MainWidgetDetailComponent;
