import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

import { Button, GridBox, Input, Dropdown, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

export const Route = createFileRoute('/_layout/pms/widget-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  /* GridBox */
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const data: any[] = [
    {
      WidgetName: '학습현황',
      Device: '전체',
      status: '사용',
      Register: '홍길동',
      RegisterDate: 'YYYY-MM-DD HH:MM:SS',
      Owner: '김현대',
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('WidgetName', {
      cell: (info) => info.getValue(),
      header: '위젯명',
      size: 195,
      enableGrouping: false,
    }),
    columnHelper.accessor('Device', {
      cell: (info) => info.getValue(),
      header: '디바이스',
      size: 195,
      enableGrouping: false,
    }),
    columnHelper.accessor('Status', {
      cell: (info) => info.getValue(),
      header: '상태',
      size: 195,
    }),
    columnHelper.accessor('Register', {
      cell: (info) => info.getValue(),
      header: '등록자',
      size: 195,
    }),
    columnHelper.accessor('RegisterDate', {
      cell: (info) => info.getValue(),
      header: '등록일시',
      size: 195,
    }),
    columnHelper.accessor('Owner', {
      cell: (info) => info.getValue(),
      header: '수정자',
      size: 195,
    }),
    columnHelper.accessor('Preview', {
      cell: (info) => info.getValue(),
      header: '미리보기',
      size: 64,
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
                      <label htmlFor="name-status" className={searchStyles.label}>
                        <span className={searchStyles.text}>상태</span>
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
                      <label htmlFor="name-widget" className={searchStyles.label}>
                        <span className={searchStyles.text}>위젯명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-widget" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-register" className={searchStyles.label}>
                        <span className={searchStyles.text}>등록자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-register" type="text" placeholder="입력" />
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
              {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
            </div>
          </div>
          <Divider />
          <GridBox
            data={data}
            columns={columns}
            showSelectedCount={true}
            showColumnSettings={false}
            showNumberingColumn={true}
            pagination={{
              pageNumber: 0,
              pageSize: 10,
              totalPages: 100,
              onPageChange: setPageIndex,
              onPageSizeChange: setPageSize,
            }}
            title="모듈타이틀"
          />
        </div>
      </PageContainer>
    </form>
  );
}
