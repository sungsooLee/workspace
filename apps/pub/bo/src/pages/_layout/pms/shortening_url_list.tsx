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

export const Route = createFileRoute('/_layout/pms/shortening_url_list')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      sort: '수동 등록',
      title: <Button className="link" label={'과정 상세 제목'} />,
      url: <Button className="link" label={'lw.com/1G2H3HE'} />,
      click: '0',
      register: '김현대',
      registerDate: '2025-01-01 07:12:00',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      sort: '수동 등록',
      title: <Button className="link" label={'과정 상세 제목'} />,
      url: <Button className="link" label={'lw.com/1G2H3HE'} />,
      click: '0',
      register: '김현대',
      registerDate: '2025-01-01 07:12:00',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      sort: '수동 등록',
      title: <Button className="link" label={'과정 상세 제목'} />,
      url: <Button className="link" label={'lw.com/1G2H3HE'} />,
      click: '0',
      register: '김현대',
      registerDate: '2025-01-01 07:12:00',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      sort: '수동 등록',
      title: <Button className="link" label={'과정 상세 제목'} />,
      url: <Button className="link" label={'lw.com/1G2H3HE'} />,
      click: '0',
      register: '김현대',
      registerDate: '2025-01-01 07:12:00',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      sort: '수동 등록',
      title: <Button className="link" label={'과정 상세 제목'} />,
      url: <Button className="link" label={'lw.com/1G2H3HE'} />,
      click: '0',
      register: '김현대',
      registerDate: '2025-01-01 07:12:00',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12:00',
    },
    {
      sort: '수동 등록',
      title: <Button className="link" label={'과정 상세 제목'} />,
      url: <Button className="link" label={'lw.com/1G2H3HE'} />,
      click: '0',
      register: '김현대',
      registerDate: '2025-01-01 07:12:00',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12:00',
    },
  ];
  const columns = [
    columnHelper.accessor('sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      size: 180,
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: '제목',
      size: 180,
    }),
    columnHelper.accessor('url', {
      cell: (info) => info.getValue(),
      header: '단축 URL',
      size: 180,
    }),
    columnHelper.accessor('click', {
      cell: (info) => info.getValue(),
      header: '클릭',
      size: 180,
      meta: {
        cellAlign: 'right', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('register', {
      cell: (info) => info.getValue(),
      header: '등록자',
      size: 180,
    }),
    columnHelper.accessor('registerDate', {
      cell: (info) => info.getValue(),
      header: '등록일',
      size: 180,
      meta: {
        cellAlign: 'center', // 셀은 가운데 정렬
      },
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '수정자',
      size: 180,
    }),
    columnHelper.accessor('modificationDate', {
      cell: (info) => info.getValue(),
      header: '수정일',
      size: 180,
      meta: {
        cellAlign: 'center', // 셀은 가운데 정렬
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
                        <span className={searchStyles.text}>구분</span>
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
                        <span className={searchStyles.text}>제목</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-2" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-3" className={searchStyles.label}>
                        <span className={searchStyles.text}>등록자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-3" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-4" className={searchStyles.label}>
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
                title={'단축 URL 목록'}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
