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

export const Route = createFileRoute('/_layout/pms/menu-channel-open-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const [selectedValues2, setSelectedValues2] = useState<null>(null);
  const [selectedValues3, setSelectedValues3] = useState<null>(null);
  const [selectedValues4, setSelectedValues4] = useState<null>(null);
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
  const options4 = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '사용',
      type: '일반',
      sort: '공개',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '일반',
      sort: '공개',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
    {
      channelId: 'IA000000',
      channelName: '채널명채널명채널명채널명',
      tenant: '테넌트명1, 테넡트명2',
      status: '미사용',
      type: '유니버셜',
      sort: '비밀',
      owner: '김현대 외 1',
      receiptId: '0000000',
      register: '홍길동',
      registerDate: '2025-01-01 07:12',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('channelId', {
      cell: (info) => info.getValue(),
      header: '채널ID',
      enableGrouping: false,
      size: 110,
    }),
    columnHelper.accessor('channelName', {
      cell: (info) => info.getValue(),
      header: '채널명',
      size: 180,
      enableGrouping: false,
    }),
    columnHelper.accessor('tenant', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: '상태',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '유형',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      size: 80,
      enableGrouping: false,
    }),
    columnHelper.accessor('owner', {
      cell: (info) => info.getValue(),
      header: '소유자',
      enableGrouping: false,
      size: 156,
    }),
    columnHelper.accessor('receiptId', {
      cell: (info) => info.getValue(),
      header: '접수ID',
      enableGrouping: false,
      size: 130,
    }),
    columnHelper.accessor('register', {
      cell: (info) => info.getValue(),
      header: '등록자',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('registerDate', {
      cell: (info) => info.getValue(),
      header: '등록일시',
      size: 200,
      enableGrouping: false,
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
                      <label htmlFor="name-select" className={searchStyles.label}>
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
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널상태</span>
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
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널유형</span>
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
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select4" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널구분</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options4}
                          value={selectedValues4}
                          onChange={(selected) => setSelectedValues4(selected)}
                          variant="default"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-registerTerm" className={searchStyles.label}>
                        <span className={searchStyles.text}>등록기간</span>
                      </label>
                      <div className={searchStyles.box}>
                        <div className={searchStyles.datepicker_wrap}>
                          <DatePicker displayType={'day'} size={'md'} />
                          <span className={searchStyles.hyphen}>-</span>
                          <DatePicker displayType={'day'} size={'md'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channel" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-channel'} placeholder={'입력'} type={'text'} />
                      </div>
                    </div>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channelId" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널ID</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-channelId'} placeholder={'입력'} type={'text'} />
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
                showNumberingColumn={true}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title="채널 목록"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
