/* eslint-disable react/jsx-no-useless-fragment */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Button, GridBox, Dropdown, Input, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const CurrentTeamChargeComponent: FC<{}> = ({}) => {
  const columnHelper = createColumnHelper<any>();

  const data: any[] = [
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
  ];

  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '본부',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '부서',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '성명',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '호칭',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '시작일',
      size: 220,
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '기능',
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'type1-1', label: '전체' },
    { value: 'type1-2', label: '항목' },
  ];
  return (
    <>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select" className={searchStyles.label}>
                    <span className={searchStyles.text}>부서</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select2" className={searchStyles.label}>
                    <span className={searchStyles.text}>담당자명</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id={'name-select2'} type={'text'} placeholder={'입력'} value={''} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <GridBox title={'현업팀 목록'} data={data} columns={columns} multiple={true} showAdd={true} />
    </>
  );
};

CurrentTeamChargeComponent.displayName = 'CurrentTeamCharge';
export const CurrentTeamCharge = CurrentTeamChargeComponent;
