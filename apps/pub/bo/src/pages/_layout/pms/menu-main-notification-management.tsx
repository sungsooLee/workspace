/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Input, Dropdown, Button, GridBox, Divider, DatePicker, Badge } from '@learnway/ui';
import { IcoRefresh02, IcoSearch, IcoDownload } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

export const Route = createFileRoute('/_layout/pms/menu-main-notification-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const columnHelper = createColumnHelper<any>();

  const data: any[] = [
    {
      title1: '테넌트명',
      title2: 'PC/Mobile',
      title3: 'Main 화면',
      title4: '높음',
      title5: <Badge option={{ label: 'New', value: 'A' }} variant="text" status="new" size="sm" />,
      title6: <Button className="link" label={'신규 학습잘르 위한 혜택'} />,
      title7: '사용',
      title8: '2025-05-30 10:00',
      title9: '2025-06-30 22_00',
      title10: '만료',
      title11: <Button variant="search" label={'고정'} />,
    },
  ];

  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '디바이스',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '공지 위치',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '공지 유형',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '상태',
      enableGrouping: false,
      size: 60,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '제목',
      enableGrouping: false,
      size: 360,
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '사용 여부',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title8', {
      cell: (info) => info.getValue(),
      header: '노출 시작일',
      enableGrouping: false,
      size: 160,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title9', {
      cell: (info) => info.getValue(),
      header: '노출 종료일',
      enableGrouping: false,
      size: 160,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title10', {
      cell: (info) => info.getValue(),
      header: '공지 상태',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title11', {
      cell: (info) => info.getValue(),
      header: '최상단 고정',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'center',
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
                        <span className={searchStyles.text}>테넌트</span>
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
                        <span className={searchStyles.text}>디바이스</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          className={searchStyles.select_option}
                          options={[
                            { value: 'type1', label: '전체' },
                            { value: 'type2', label: '항목' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>공지 위치</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          className={searchStyles.select_option}
                          options={[
                            { value: 'type1', label: '전체' },
                            { value: 'type2', label: '항목' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-option1" className={searchStyles.label}>
                        <span className={searchStyles.text}>공지 유형</span>
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
                      <label htmlFor="name-option2" className={searchStyles.label}>
                        <span className={searchStyles.text}>사용여부</span>
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
                      <label htmlFor="name-option3" className={searchStyles.label}>
                        <span className={searchStyles.text}>제목</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-select3'} type={'text'} placeholder={'입력'} value={''} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 확장영역 */}
                {isExpanded && (
                  <div className={cn(searchStyles.form_display, searchStyles.item_wrap)}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-item1" className={searchStyles.label}>
                          <span className={searchStyles.text}>시험일자</span>
                        </label>
                        <div className={searchStyles.box}>
                          <DatePicker className={searchStyles.datepicker_item} />
                          <span className={searchStyles.dash}></span>
                          <DatePicker className={searchStyles.datepicker_item} />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-item2" className={searchStyles.label}>
                          <span className={searchStyles.text}>유효기간</span>
                        </label>
                        <div className={searchStyles.box}>
                          <DatePicker className={searchStyles.datepicker_item} />
                          <span className={searchStyles.dash}></span>
                          <DatePicker className={searchStyles.datepicker_item} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
          <Divider />
          <GridBox
            data={data}
            columns={columns}
            showSelectedCount={true}
            showNumberingColumn={true}
            title={'공지사항 목록'}
          />
        </div>
      </PageContainer>
    </form>
  );
}
