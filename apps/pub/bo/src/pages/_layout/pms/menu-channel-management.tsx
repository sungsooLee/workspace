import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { cn } from '@learnway/shared';

import { Button, GridBox, Dropdown, DatePicker, Input } from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/menu-channel-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
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
  const options3 = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      order: '1',
      tenantName: <Button className="link">테넌트명1</Button>,
      tenantSite: (
        <Link to="/" className="link">
          /1000001
        </Link>
      ),
      company: '현대자동차, 기아자동차',
      tenantOwner: '담당자명',
      companyOwner: '담당자명',
      useable: '사용',
      register: '김현대',
      registerDate: '2025-01-01 07:12',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12',
    },
    {
      order: '2',
      tenantName: <Button className="link">테넌트명2</Button>,
      tenantSite: (
        <Link to="/" className="link">
          /1000001
        </Link>
      ),
      company: '현대자동차, 기아자동차',
      tenantOwner: '담당자명',
      companyOwner: '담당자명',
      useable: '미사용',
      register: '김현대',
      registerDate: '2025-01-01 07:12',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('order', {
      cell: (info) => info.getValue(),
      header: 'NO.',
      footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
      size: 64,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('tenantName', {
      cell: (info) => info.getValue(),
      header: '테넌트명',
      enableGrouping: false,
      size: 152,
    }),
    columnHelper.accessor('tenantSite', {
      cell: (info) => info.getValue(),
      header: '테넌트 사이트',
      size: 240,
      enableGrouping: false,
    }),
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('tenantOwner', {
      cell: (info) => info.getValue(),
      header: '테넌트 담당자',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('companyOwner', {
      cell: (info) => info.getValue(),
      header: '회사 담당자',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용여부',
      size: 104,
      enableGrouping: false,
    }),
    columnHelper.accessor('register', {
      cell: (info) => info.getValue(),
      header: '등록자',
      enableGrouping: false,
      size: 104,
    }),
    columnHelper.accessor('registerDate', {
      cell: (info) => info.getValue(),
      header: '등록일시',
      enableGrouping: false,
      size: 152,
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '수정자',
      enableGrouping: false,
      size: 104,
    }),
    columnHelper.accessor('modificationDate', {
      cell: (info) => info.getValue(),
      header: '수정일',
      enableGrouping: false,
      size: 152,
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
                      <label htmlFor="name-tenant" className={searchStyles.label}>
                        <span className={searchStyles.text}>테넌트</span>
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
                      <label htmlFor="name-applyStatus" className={searchStyles.label}>
                        <span className={searchStyles.text}>신청상태</span>
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
                    <div className={searchStyles.item}>
                      <label htmlFor="name-proposer" className={searchStyles.label}>
                        <span className={searchStyles.text}>신청자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-proposer" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-companyPerson" className={searchStyles.label}>
                        <span className={searchStyles.text}>회사 담당자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <DatePicker displayType={'day'} size={'md'} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channel" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널상태</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options3}
                          value={selectedValues3}
                          onChange={(selected) => setSelectedValues3(selected)}
                          variant="default"
                          size={'sm'}
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
            <div className="grid_wrap">
              <GridBox
                data={data}
                columns={columns}
                height={440}
                showColumnSettings={false}
                multiple
                guideText={'메일발송 N인 접수ID를 선택하시면 채널 등록화면으로 이동됩니다.'}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                customButtonNode={
                  <>
                    <Button variant="text" size="sm" label={'접수'} />
                    <Button variant="text" size="sm" label={'반려'} />
                  </>
                }
                title="신청 목록"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
