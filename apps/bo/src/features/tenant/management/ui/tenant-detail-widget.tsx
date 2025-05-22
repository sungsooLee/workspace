import { FC, useState } from 'react';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { cn, getRandomId } from '@learnway/shared';
import { Button, List, Input, TableBox } from '@learnway/ui';

import { NoticeBox, FormSubTitle } from '@shared/ui';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import styles from './main-widget-detail.module.css';
import dataWrapStyles from './data-wrap.module.css';

const menuLength = 5;
const menuOptions = Array(menuLength)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `메뉴명${i}`,
  }));

const TenantDetailWidgetComponent: FC<any> = () => {
  const [myOptions, setMyOptions] = useState(menuOptions);
  const [value, setValue] = useState<any>();

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
      header: t('구분'),
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('ComponentId', {
      cell: (info) => info.getValue(),
      header: t('컴포넌트 ID'),
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <NoticeBox
        iconVisible={false}
        descriptions={[
          t('위젯을 추가 등록하려면 위젯추가 버튼을 클릭해 주세요.'),
          t(
            '위젯 순서 변경은 드래그앤드랍으로 변경하며, 노출 여부는 우측에서 스위치 버튼으로 설정할 수 있습니다.',
          ),
          t('위젯 순서 변경 후에 저장 버튼을 클릭해야 저장됩니다.'),
        ]}
        type="bullet"
      />
      <SectionLayout isLineVisible={true}>
        <div className={cn(styles.start, styles.wrap)}>
          <FormSubTitle
            label={t('위젯')}
            actionNode={
              <>
                <Button
                  label={t('메인위젯 미리보기')}
                  variant={'text'}
                  size={'sm'}
                  className="btn_text"
                />
                <Button label={t('위젯추가')} variant={'text'} size={'sm'} className="btn_text" />
                <Button label={t('저장')} variant={'save'} size={'sm'} />
              </>
            }
            underLine={true}
          />
          <div className={styles.menu_wrap}>
            <List
              options={myOptions}
              value={value}
              valueField={'id'}
              draggable
              hideBorder
              disabledActive
              itemRenderer={(option: any) => (
                <div className={styles.menu_box}>
                  <p className={styles.menu_name}>{option.name}</p>
                </div>
              )}
              onOptionsOrderChange={(newOptions: any) => setMyOptions(newOptions)}
            />
          </div>
        </div>
        <div className={cn(styles.start, styles.wrap)}>
          <FormSubTitle
            label={'위젯 상세'}
            actionNode={
              <>
                <Button label={'삭제'} variant={'text'} size={'sm'} />
                <Button label={'저장'} variant={'save'} size={'sm'} />
              </>
            }
            underLine={true}
          />
          <div className={styles.form_wrap}>
            <div className={styles.table_wrap}>
              <TableBox data={data} columns={columns} tableMode={true} title={'컴포넌트 ID'} />
            </div>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export const TenantDetailWidget = TenantDetailWidgetComponent;
