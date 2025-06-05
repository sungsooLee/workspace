import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { DatePicker, Dropdown, Button, GridBox } from '@learnway/ui';
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
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
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
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      group: '완성차',
      company: <Button className="link" label={'현대자동차'} />,
      useable: '사용',
      modifier: '시스템',
      modificationDate: '2025-01-01 07:12:00',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
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
      header: '회사명',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용여부',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '수정자',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('modificationDate', {
      cell: (info) => info.getValue(),
      header: '수정일',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
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
                      <span className={searchStyles.text}>그룹</span>
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
                      <span className={searchStyles.text}>회사명</span>
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
                    <label htmlFor="name-select3" className={searchStyles.label}>
                      <span className={searchStyles.text}>회사정보 사용</span>
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
                    <label htmlFor="name-select4" className={searchStyles.label}>
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
