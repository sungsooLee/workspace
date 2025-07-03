import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Input, Dropdown, Button, GridBox, DatePicker, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch, IcoFormRequired } from '@learnway/icons';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const TenantMemberApplyComponent: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
  const [selectedValues4, setSelectedValues4] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  //grid
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      tenant: '테넌트1 외 2',
      group: '완성차',
      company: '회사1',
      part: '경영지원실',
      team: '소속',
      position: '직위',
      email: 'mail@mail.com',
      companyNum: '1234567',
      user: <Button className="link" label={'김현대'} />,
      applyDate: '2025-01-01 14:25:11',
      tenure: '정상',
      status: '정상',
      joinDate: '2025-01-01 14:25:11',
    },
    {
      tenant: '테넌트1 외 2',
      group: '완성차',
      company: '회사1',
      part: '경영지원실',
      team: '소속',
      position: '직위',
      email: 'mail@mail.com',
      companyNum: '1234567',
      user: <Button className="link" label={'김현대'} />,
      applyDate: '2025-01-01 14:25:11',
      tenure: '정상',
      status: '정상',
      joinDate: '2025-01-01 14:25:11',
    },
  ];

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('tenant', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('group', {
      cell: (info) => info.getValue(),
      header: '그룹',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('part', {
      cell: (info) => info.getValue(),
      header: '실',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),

    columnHelper.accessor('team', {
      cell: (info) => info.getValue(),
      header: '소속',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('position', {
      cell: (info) => info.getValue(),
      header: '호칭(직위)',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      header: '이메일',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('companyNum', {
      cell: (info) => info.getValue(),
      header: '사번',
      enableGrouping: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
        size: 'auto',
      },
    }),
    columnHelper.accessor('user', {
      cell: (info) => info.getValue(),
      header: '이름',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('applyDate', {
      cell: (info) => info.getValue(),
      header: '신청일',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('tenure', {
      cell: (info) => info.getValue(),
      header: '재직여부',
      enableGrouping: false,
      size: 88,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: '계정상태',
      enableGrouping: false,
      size: 88,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('joinDate', {
      cell: (info) => info.getValue(),
      header: '승인일',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>테넌트</span>
                    {/* 필수 케이스 */}
                    <span className={cn(searchStyles.status, searchStyles.required)}>
                      <IcoFormRequired width={8} height={8} />
                    </span>
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
                    <span className={searchStyles.text}>이메일</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id={'name-select3'} type={'text'} placeholder={'입력'} value={''} />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select4" className={searchStyles.label}>
                    <span className={searchStyles.text}>사번</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id={'name-select4'} type={'text'} placeholder={'입력'} value={''} />
                  </div>
                </div>
              </div>
            </div>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select5" className={searchStyles.label}>
                    <span className={searchStyles.text}>재직여부</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues3}
                      onChange={(selected) => setSelectedValues3(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select6" className={searchStyles.label}>
                    <span className={searchStyles.text}>승인 상태</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
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
                  <label htmlFor="name-7" className={searchStyles.label}>
                    <span className={searchStyles.text}>신청 기간</span>
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
        multiple={true}
        showSelectedCount={true}
        pagination={{
          pageSize,
          pageNumber,
          totalPages: 100,
          onPageChange: setpageNumber,
          onPageSizeChange: setPageSize,
        }}
        title={'유저 목록'}
      />
    </>
  );
};

TenantMemberApplyComponent.displayName = 'TenantMemberApply';
export const TenantMemberApply = TenantMemberApplyComponent;
