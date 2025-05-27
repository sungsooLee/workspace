import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, Input, Dropdown, TableBox } from '@learnway/ui';
import { IcoRefresh02, IcoSearch, IcoFormRequired } from '@learnway/icons';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/pms/language_management')({
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

  // Table
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      sort: '메세지',
      code: 'MESAGE00001',
      standard: '알바니아 국가 코드',
      translation: <Input type={'text'} placeholder={'입력'} maxLength={150} />,
      end: '3/50',
      modifier: '김현대',
      date: '2025-01-01 17:44',
    },
  ];

  // Table
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const columns = [
    columnHelper.accessor('sort', {
      cell: (info) => info.getValue(),
      header: '분류',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
      },
    }),
    columnHelper.accessor('code', {
      cell: (info) => info.getValue(),
      header: '코드',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
      },
    }),
    columnHelper.accessor('standard', {
      cell: (info) => info.getValue(),
      header: '기준명(한국어)',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
      },
    }),
    columnHelper.accessor('translation', {
      cell: (info) => info.getValue(),
      header: '번역명(번역언어)',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
      },
    }),
    columnHelper.accessor('end', {
      cell: (info) => info.getValue(),
      header: '번역완료',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
      },
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '수정자',
      enableGrouping: false,
    }),
    columnHelper.accessor('date', {
      cell: (info) => info.getValue(),
      header: '수정일',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
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
                      <label htmlFor="name-select1" className={searchStyles.label}>
                        <span className={searchStyles.text}>분류</span>
                        {/* 필수 케이스 */}
                        <span className={cn(searchStyles.status, searchStyles.required)}>
                          <IcoFormRequired width={12} height={12} />
                        </span>
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
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>번역 언어</span>
                        {/* 필수 케이스 */}
                        <span className={cn(searchStyles.status, searchStyles.required)}>
                          <IcoFormRequired width={12} height={12} />
                        </span>
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
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>번역 상태</span>
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
                      <label htmlFor="name-code" className={searchStyles.label}>
                        <span className={searchStyles.text}>
                          코드 (메뉴 코드/카테고리 코드/공통코드/라벨 코드/메세지 코드)
                        </span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-code2" type="text" placeholder="코드를 입력하세요." />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-code2" className={searchStyles.label}>
                        <span className={searchStyles.text}>
                          기준명 (메뉴명/카테고리명/공통코드명/라벨명/메세지명)
                        </span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-code" type="text" placeholder="기준명을 입력하세요." />
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
            <TableBox
              data={data}
              columns={columns}
              tableMode={true}
              title={'목록'}
              showNumberingColumn
              showExcelDownload
              showUpload
              pagination={{
                pageNumber,
                pageSize,
                totalPages: 100,
                onPageChange: setPageIndex,
                onPageSizeChange: setPageSize,
              }}
            />
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
