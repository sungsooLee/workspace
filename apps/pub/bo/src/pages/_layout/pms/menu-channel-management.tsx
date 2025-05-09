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
      order: '1',
      applyId: 'IA000000',
      tenantSetting: '테넌트명',
      channelName: '채널명채널명채널명채널명',
      type: '공개',
      proposer: '김현대',
      companyName: '회사명',
      organizationName: '조직명',
      applyStatus: '조직명',
      applyDate: '2025-01-01 07:12',
      receiptID: (
        <Button size={'xs'} className="link">
          {'IS0000000'}
        </Button>
      ),
      mailSend: 'N',
      channelStatus: '사용',
      owner: '김현대',
      receiptDate: '2025-01-01 07:12',
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
    columnHelper.accessor('applyId', {
      cell: (info) => info.getValue(),
      header: '신청ID',
      enableGrouping: false,
      size: 94,
    }),
    columnHelper.accessor('tenantSetting', {
      cell: (info) => info.getValue(),
      header: '테넌트설정',
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('channelName', {
      cell: (info) => info.getValue(),
      header: '채널명',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '유형',
      size: 60,
      enableGrouping: false,
    }),
    columnHelper.accessor('proposer', {
      cell: (info) => info.getValue(),
      header: '신청자명',
      size: 80,
      enableGrouping: false,
    }),
    columnHelper.accessor('companyName', {
      cell: (info) => info.getValue(),
      header: '회사명',
      size: 108,
      enableGrouping: false,
    }),
    columnHelper.accessor('organizationInfo', {
      cell: (info) => info.getValue(),
      header: '조직정보',
      enableGrouping: false,
      size: 80,
    }),
    columnHelper.accessor('applyStatus', {
      cell: (info) => info.getValue(),
      header: '신청상태',
      enableGrouping: false,
      size: 80,
    }),
    columnHelper.accessor('applyDate', {
      cell: (info) => info.getValue(),
      header: '신청일시',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('receiptID', {
      cell: (info) => info.getValue(),
      header: '접수ID',
      size: 110,
      enableGrouping: false,
    }),
    columnHelper.accessor('mailSend', {
      cell: (info) => info.getValue(),
      header: '메일발송',
      enableGrouping: false,
      size: 104,
    }),
    columnHelper.accessor('channelStatus', {
      cell: (info) => info.getValue(),
      header: '채널상태',
      enableGrouping: false,
      size: 90,
    }),
    columnHelper.accessor('owner', {
      cell: (info) => info.getValue(),
      header: '김현대',
      enableGrouping: false,
      size: 104,
    }),
    columnHelper.accessor('receiptDate', {
      cell: (info) => info.getValue(),
      header: '접수/반려일시',
      enableGrouping: false,
      size: 120,
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
                          placeholder={'선택'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channelSelect" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널선택</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options2}
                          value={selectedValues2}
                          onChange={(selected) => setSelectedValues2(selected)}
                          variant="default"
                          size={'sm'}
                          placeholder={'선택'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-proposer" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널유형</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options3}
                          value={selectedValues3}
                          onChange={(selected) => setSelectedValues3(selected)}
                          variant="default"
                          size={'sm'}
                          placeholder={'선택'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channelSort" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널구분</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options4}
                          value={selectedValues4}
                          onChange={(selected) => setSelectedValues4(selected)}
                          variant="default"
                          size={'sm'}
                          placeholder={'선택'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channel" className={searchStyles.label}>
                        <span className={searchStyles.text}>등록기간</span>
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
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channelName" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-channelName'} type={'text'} placeholder={'입력'} />
                      </div>
                    </div>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channelID" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널ID</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-channelID'} type={'text'} placeholder={'입력'} />
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
