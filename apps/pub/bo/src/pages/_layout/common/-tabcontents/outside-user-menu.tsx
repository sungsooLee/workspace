/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Input, Dropdown, Button, GridBox, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import styles from './outside-user-menu.module.css';

const OutsideUserMenuComponent: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      count: '1',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '2',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '3',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '4',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '5',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '6',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '7',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '8',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '9',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      count: '10',
      type: '강사',
      company: '회사',
      part: '부서',
      position: '과장',
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
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '사외이용자 유형',
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('part', {
      cell: (info) => info.getValue(),
      header: '본부/사업부',
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('position', {
      cell: (info) => info.getValue(),
      header: '직위',
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
    <div className={styles.outside_user_search_wrap}>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>사외이용자 유형</span>
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
      <Divider />
      <GridBox
        data={data}
        columns={columns}
        showSelectedCount={true}
        showColumnSettings={false}
        pagination={{
          pageSize,
          pageNumber,
          totalPages: 100,
          onPageChange: setpageNumber,
          onPageSizeChange: setPageSize,
        }}
        title="사외이용자 목록"
      />
    </div>
  );
};

OutsideUserMenuComponent.displayName = 'OutsideUserMenu';
export const OutsideUserMenu = OutsideUserMenuComponent;
