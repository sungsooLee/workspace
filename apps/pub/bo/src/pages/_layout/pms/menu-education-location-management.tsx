import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoInfoCircle } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { Button, GridBox, Input, Dropdown } from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/menu-education-location-management')({
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
      sort: '서비스 기술교육',
      spot: 'Cell Text',
      useable: 'Y',
      reservation: 'N',
      companyOwner: '담당자명',
      map: (
        <Link to={'/'} className="link">
          약도보기
        </Link>
      ),
      link: (
        <Button size={'xs'} className="link_icon" onlyIcon>
          <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
        </Button>
      ),
      registerDate: '2025-01-01 07:12',
      registerOwner: '김현대',
      modificationDate: '2025-01-01 07:12',
      modifier: '김현대',
    },
    {
      order: '2',
      sort: '서비스 기술교육',
      spot: 'Cell Text',
      useable: 'Y',
      reservation: 'N',
      companyOwner: '담당자명',
      map: (
        <Button className="link" disabled>
          약도보기
        </Button>
      ),
      link: (
        <Button size={'xs'} className="link_icon" onlyIcon>
          <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
        </Button>
      ),
      registerDate: '2025-01-01 07:12',
      registerOwner: '김현대',
      modificationDate: '2025-01-01 07:12',
      modifier: '김현대',
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
    columnHelper.accessor('sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      size: 200,
    }),
    columnHelper.accessor('spot', {
      cell: (info) => info.getValue(),
      header: '장소 명',
      size: 300,
      enableGrouping: false,
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용가능',
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('reservation', {
      cell: (info) => info.getValue(),
      header: '예약가능',
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('map', {
      cell: (info) => info.getValue(),
      header: '약도',
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('link', {
      cell: (info) => info.getValue(),
      header: '링크',
      size: 90,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('registerDate', {
      cell: (info) => info.getValue(),
      header: '최초등록일시',
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('registerOwner', {
      cell: (info) => info.getValue(),
      header: '최초등록자',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('modificationDate', {
      cell: (info) => info.getValue(),
      header: '최종수정일시',
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '최종수정자',
      enableGrouping: false,
      size: 100,
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
                      <label htmlFor="name-sort" className={searchStyles.label}>
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
                      <label htmlFor="name-useable" className={searchStyles.label}>
                        <span className={searchStyles.text}>사용가능</span>
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
                      <label htmlFor="name-reservation" className={searchStyles.label}>
                        <span className={searchStyles.text}>예약가능</span>
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
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-spot" className={searchStyles.label}>
                        <span className={searchStyles.text}>장소 명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-spot" type="text" placeholder="입력" />
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
                hideColumnSettings={true}
                showExcelDownload={true}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title="교육장소 목록"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
