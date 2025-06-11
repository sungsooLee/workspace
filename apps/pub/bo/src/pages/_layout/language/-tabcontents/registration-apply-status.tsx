import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Input, Button, GridBox, Divider, RadioGroupFormField } from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
const RegistrationApplyStatusComponent: FC<{}> = ({}) => {
  //grid
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      title1: '현대트랜시스',
      title2: '현대트랜시스',
      title3: '김현대',
      title4: '중국어',
      title5: <Button className="link" label={'HSK (3~6급)'} />,
      title6: '점수/등급형',
      title7: '중국국가한판',
      title8: '상신',
      title9: '2025-01-01',
    },
    {
      title1: '현대트랜시스',
      title2: '현대트랜시스',
      title3: '김현대',
      title4: '중국어',
      title5: <Button className="link" label={'HSK (3~6급)'} />,
      title6: '점수/등급형',
      title7: '중국국가한판',
      title8: '상신',
      title9: '2025-01-01',
    },
    {
      title1: '현대트랜시스',
      title2: '현대트랜시스',
      title3: '김현대',
      title4: '중국어',
      title5: <Button className="link" label={'HSK (3~6급)'} />,
      title6: '점수/등급형',
      title7: '중국국가한판',
      title8: '상신',
      title9: '2025-01-01',
    },
  ];

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '신청 담당자',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),

    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '언어 분류 ',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '어학시험 과목',
      enableGrouping: false,
      size: 365,
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '어학시험 결과유형',
      enableGrouping: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
        size: 'auto',
      },
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '시행 기관',
      enableGrouping: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
        size: 'auto',
      },
    }),
    columnHelper.accessor('title8', {
      cell: (info) => info.getValue(),
      header: '승인상태',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title9', {
      cell: (info) => info.getValue(),
      header: '신청일자',
      enableGrouping: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>테넌트</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input
                      id={'name-select1'}
                      type={'text'}
                      placeholder={'입력'}
                      value={'현대로펌'}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select2" className={searchStyles.label}>
                    <span className={searchStyles.text}>회사</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input
                      id={'name-select2'}
                      type={'text'}
                      placeholder={'입력'}
                      value={'현대로펌'}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select3" className={searchStyles.label}>
                    <span className={searchStyles.text}>승인상태</span>
                  </label>
                  <div className={searchStyles.box}>
                    <RadioGroupFormField
                      options={[
                        { value: 'option01', label: '전체' },
                        { value: 'option02', label: '상신' },
                        { value: 'option03', label: '승인완료' },
                        { value: 'option04', label: '반려' },
                      ]}
                      defaultValue={'option01'}
                    />
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
      <GridBox
        data={data}
        columns={columns}
        showNumberingColumn={true}
        showSelectedCount={true}
        pagination={{
          pageSize,
          pageNumber,
          totalPages: 100,
          onPageChange: setpageNumber,
          onPageSizeChange: setPageSize,
        }}
        title={'어학시험 과목 등록신청'}
      />
    </div>
  );
};

RegistrationApplyStatusComponent.displayName = 'RegistrationApplyStatus';
export const RegistrationApplyStatus = RegistrationApplyStatusComponent;
