/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Input, Dropdown, Button, Grid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import styles from './user-menu.module.css';

const UserMenuComponent: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      count: '1',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원1팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '2',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '3',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '4',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '5',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '6',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '7',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '8',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '9',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '10',
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('count', {
      cell: (info) => info.getValue(),
      header: 'NO.',
      meta: {
        headerAlign: 'left', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      enableGrouping: false,
      size: 64,
    }),
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('part', {
      cell: (info) => info.getValue(),
      header: '본부/사업부',
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('team', {
      cell: (info) => info.getValue(),
      header: '소속',
      size: 210,
    }),
    columnHelper.accessor('companyNumber', {
      cell: (info) => info.getValue(),
      header: '사번',
      size: 210,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '이름',
      size: 210,
    }),
    columnHelper.accessor('employmentStatus', {
      cell: (info) => info.getValue(),
      header: '재직여부',
      size: 100,
    }),
    columnHelper.accessor('accountStatus', {
      cell: (info) => info.getValue(),
      header: '계정상태',
      size: 100,
    }),
  ] as ColumnDef<any, unknown>[]; //
  return (
    <div className={styles.user_search_wrap}>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>회사</span>
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
                    <span className={searchStyles.text}>본부/사업부</span>
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
                  <label htmlFor="name-select3" className={searchStyles.label}>
                    <span className={searchStyles.text}>소속</span>
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
            </div>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-input1" className={searchStyles.label}>
                    <span className={searchStyles.text}>사번</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-input1" type="text" placeholder="입력" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-input2" className={searchStyles.label}>
                    <span className={searchStyles.text}>이름</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-input2" type="text" placeholder="입력" />
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
      <div className="grid_wrap line">
        <Grid
          data={data}
          columns={columns}
          showSelectedCount={true}
          hideColumnSettings={true}
          height={200}
          pagination={{
            pageSize,
            pageIndex,
            totalRows: 100,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          title="타이틀"
        />
      </div>
    </div>
  );
};

UserMenuComponent.displayName = 'UserMenu';
export const UserMenu = UserMenuComponent;
