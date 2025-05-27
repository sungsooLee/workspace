import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { Input, Button, Dropdown, DatePicker, GridBox } from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';

export const Route = createFileRoute('/_layout/pms/private_search_list')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const options2 = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      company: '회사1',
      viewer: <Button className="link" label={'김현대'} />,
      viewerNumber: '111111',
      menuPath: '플랫폼 관리 > 테넌트 관리 > 테넌트 - 유저 관리',
      searchCases: '100건',
      reason: '업무 목적',
      searchDate: '2025-01-01 07:12:00',
      downloadDate: '2025-01-01 07:12:00',
    },
    {
      company: '회사2',
      viewer: <Button className="link" label={'김현대'} />,
      viewerNumber: '111111',
      menuPath: '플랫폼 관리 > 테넌트 관리 > 테넌트 - 유저 관리',
      searchCases: '100건',
      reason: '업무 목적',
      searchDate: '2025-01-01 07:12:00',
      downloadDate: '2025-01-01 07:12:00',
    },
  ];
  const columns = [
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '소속회사',
      size: 170,
    }),
    columnHelper.accessor('viewer', {
      cell: (info) => info.getValue(),
      header: '조회자',
      size: 170,
    }),
    columnHelper.accessor('viewerNumber', {
      cell: (info) => info.getValue(),
      header: '조회자 사번',
      size: 170,
      meta: {
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('menuPath', {
      cell: (info) => info.getValue(),
      header: '메뉴경로',
      size: 360,
    }),
    columnHelper.accessor('searchCases', {
      cell: (info) => info.getValue(),
      header: '조회 건',
      size: 120,
      meta: {
        cellAlign: 'right', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('reason', {
      cell: (info) => info.getValue(),
      header: '다운로드 사유',
      size: 120,
    }),
    columnHelper.accessor('searchDate', {
      cell: (info) => info.getValue(),
      header: '조회일',
      size: 170,
      meta: {
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('downloadDate', {
      cell: (info) => info.getValue(),
      header: '다운로드 일',
      size: 170,
      meta: {
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-1" className={searchStyles.label}>
                        <span className={searchStyles.text}>테넌트명</span>
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
                      <label htmlFor="name-2" className={searchStyles.label}>
                        <span className={searchStyles.text}>조회자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-2" type="text" placeholder="입력" />
                      </div>
                    </div>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-3" className={searchStyles.label}>
                        <span className={searchStyles.text}>조회자 사번</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-3" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-reason" className={searchStyles.label}>
                        <span className={searchStyles.text}>다운로드 사유</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options2}
                          value={selectedValues2}
                          onChange={(selected) => setSelectedValues2(selected)}
                          variant="default"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-2" className={searchStyles.label}>
                        <span className={searchStyles.text}>타이틀</span>
                      </label>
                      <div className={searchStyles.box}>
                        <div className={searchStyles.datepicker_wrap}>
                          <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                          <span className={searchStyles.hyphen}>-</span>
                          <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                        </div>
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
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className={'grid_wrap'}>
              <GridBox
                data={data}
                columns={columns}
                showSelectedCount={true}
                showNumberingColumn={true}
                showExcelDownload={true}
                pagination={{
                  pageSize,
                  pageNumber,
                  totalPages: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title={'개인정보 조회 사유 목록'}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
