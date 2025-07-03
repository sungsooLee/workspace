import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, GridBox, DatePicker, Input, Dropdown, Divider } from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

export const Route = createFileRoute('/_layout/pms/menu-tenant-group-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const [selectedValues2, setSelectedValues2] = useState<null>(null);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      Name1: '완성차',
      Name2: <Button className="link" label={'현대자동차'} />,
      Name3: '사용',
      Name4: '시스템',
      Name5: '2025-01-01 07:12:00',
    },
    {
      Name1: '완성차',
      Name2: <Button className="link" label={'현대자동차'} />,
      Name3: '사용',
      Name4: '시스템',
      Name5: '2025-01-01 07:12:00',
    },
    {
      Name1: '완성차',
      Name2: <Button className="link" label={'현대자동차'} />,
      Name3: '사용',
      Name4: '시스템',
      Name5: '2025-01-01 07:12:00',
    },
    {
      Name1: '완성차',
      Name2: <Button className="link" label={'현대자동차'} />,
      Name3: '사용',
      Name4: '시스템',
      Name5: '2025-01-01 07:12:00',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('Name1', {
      cell: (info) => info.getValue(),
      header: '그룹',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('Name2', {
      cell: (info) => info.getValue(),
      header: '회사명',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('Name3', {
      cell: (info) => info.getValue(),
      header: '회사정보 사용',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('Name4', {
      cell: (info) => info.getValue(),
      header: '수정자',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('Name5', {
      cell: (info) => info.getValue(),
      header: '수정일',
      meta: {
        cellAlign: 'center',
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
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
                      <span className={searchStyles.text}>그룹</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues}
                        onChange={(selected) => setSelectedValues(selected)}
                        placeholder={'선택'}
                        presetOptionLabel={'전체'}
                      />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-2" className={searchStyles.label}>
                      <span className={searchStyles.text}>회사명</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input type={'text'} placeholder={'입력'} id={'name-2'} />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-3" className={searchStyles.label}>
                      <span className={searchStyles.text}>회사정보 사용</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues2}
                        onChange={(selected) => setSelectedValues2(selected)}
                        placeholder={'선택'}
                        presetOptionLabel={'전체'}
                      />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-4" className={searchStyles.label}>
                      <span className={searchStyles.text}>수정 기간</span>
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
          showSelectedCount={true}
          showNumberingColumn={true}
          pagination={{
            pageSize,
            pageNumber,
            totalPages: 100,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          title="회사 목록"
        />
      </div>
    </PageContainer>
  );
}
