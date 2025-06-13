import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { DatePicker, Dropdown, Button, GridBox, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch, IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';

/** style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

export const Route = createFileRoute('/_layout/lms/procedure-management')({
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
                      <span className={searchStyles.text}>채널</span>
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
                      <span className={searchStyles.text}>개설연도</span>
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
                      <span className={searchStyles.text}>과정유형</span>
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
        <Divider />
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
          title={'과정 목록'}
        />
      </div>
    </PageContainer>
  );
}
