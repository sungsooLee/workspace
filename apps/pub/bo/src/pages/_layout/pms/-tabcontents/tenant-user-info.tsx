import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Input, Dropdown, Button, GridBox, DatePicker, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch, IcoFormRequired } from '@learnway/icons';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const TenantUserInfoComponent: FC<{}> = ({}) => {
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
      title1: '서비스 기술교육',
      title2: '서비스 기술교육',
      title3: '서비스 기술교육',
      title4: '서비스 기술교육',
      title5: '서비스 기술교육',
      title6: '서비스 기술교육',
      title7: '서비스 기술교육',
      title8: '서비스 기술교육',
    },
    {
      title1: '서비스 기술교육',
      title2: '서비스 기술교육',
      title3: '서비스 기술교육',
      title4: '서비스 기술교육',
      title5: '서비스 기술교육',
      title6: '서비스 기술교육',
      title7: '서비스 기술교육',
      title8: '서비스 기술교육',
    },
    {
      title1: '서비스 기술교육',
      title2: '서비스 기술교육',
      title3: '서비스 기술교육',
      title4: '서비스 기술교육',
      title5: '서비스 기술교육',
      title6: '서비스 기술교육',
      title7: '서비스 기술교육',
      title8: '서비스 기술교육',
    },
    {
      title1: '서비스 기술교육',
      title2: '서비스 기술교육',
      title3: '서비스 기술교육',
      title4: '서비스 기술교육',
      title5: '서비스 기술교육',
      title6: '서비스 기술교육',
      title7: '서비스 기술교육',
      title8: '서비스 기술교육',
    },
    {
      title1: '서비스 기술교육',
      title2: '서비스 기술교육',
      title3: '서비스 기술교육',
      title4: '서비스 기술교육',
      title5: '서비스 기술교육',
      title6: '서비스 기술교육',
      title7: '서비스 기술교육',
      title8: '서비스 기술교육',
    },
  ];

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title8', {
      cell: (info) => info.getValue(),
      header: '구분',
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
                    <span className={searchStyles.text}>회원가입 방식</span>
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
            </div>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select5" className={searchStyles.label}>
                    <span className={searchStyles.text}>사번</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id={'name-select5'} type={'text'} placeholder={'입력'} value={''} />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select6" className={searchStyles.label}>
                    <span className={searchStyles.text}>학습자 역할</span>
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
                    <span className={searchStyles.text}>계정상태</span>
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
                  <label htmlFor="name-8" className={searchStyles.label}>
                    <span className={searchStyles.text}>승인상태</span>
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
        showNumberingColumn={true}
        pagination={{
          pageSize,
          pageNumber,
          totalPages: 100,
          onPageChange: setpageNumber,
          onPageSizeChange: setPageSize,
        }}
        title={'교육 이력 목록'}
      />
    </>
  );
};

TenantUserInfoComponent.displayName = 'TenantUserInfo';
export const TenantUserInfo = TenantUserInfoComponent;
