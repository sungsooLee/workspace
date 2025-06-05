import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Input, Dropdown, Button, GridBox } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { cn } from '@learnway/shared';

/** style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/pms/group-management')({
  component: RouteComponent,
});

function RouteComponent() {
  // dropdown
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // grid
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원1팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
      company: '현대자동차',
      part: '경영지원본부',
      team: '경영지원2팀',
      companyNumber: '1234567',
      name: '김현대',
      employmentStatus: '재직',
      accountStatus: '정상',
    },
    {
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
  ] as ColumnDef<any, unknown>[];

  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        {/* search box */}
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
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <GridBox
            data={data}
            columns={columns}
            showNumberingColumn={true}
            showSelectedCount={true}
            pagination={{
              pageSize,
              pageNumber,
              totalPages: 100,
              onPageChange: setPageIndex,
              onPageSizeChange: setPageSize,
            }}
            title={'회사 목록'}
          />
        </div>
      </div>
    </PageContainer>
  );
}
