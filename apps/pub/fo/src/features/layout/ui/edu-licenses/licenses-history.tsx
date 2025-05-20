import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Button,
  ContentsRow,
  Panel,
  DatePicker,
  Dropdown,
  Input,
  TableBox,
  Pagination,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { IcoPlus, IcoDownload } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './licenses-history.module.css';
import searchBoxStyles from './search-box.module.css';
import bulletStyles from '../../../../shared/ui/list/bullet.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import { stubArray } from 'lodash';

const LicensesHistoryComponent = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
  ];

  const columnHelper = createColumnHelper<any>();

  // thead : 'value'
  const data: any[] = [
    {
      name: '갱신',
      name2: '정보처리기사',
      name3: '1A',
      name4: '2025-11-08',
      name5: '승인중',
      name6: 'eee',
    },
    {
      name: '신규',
      name2: '화공기술사',
      name3: '3',
      name4: '2025-11-08',
      name5: <span className={styles.completed}>승인완료</span>,
      name6: 'eee',
    },
    {
      name: '신규',
      name2: '화공기술사',
      name3: '3',
      name4: '2025-11-08',
      name5: <span className={styles.rejected}>반려</span>,
      name6: 'eee',
    },
  ];

  // Thead 정의
  const columns = [
    columnHelper.accessor('name', {
      header: '이력구분',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('name2', {
      header: '자격증 종목',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('name3', {
      header: '등급',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('name4', {
      header: '취득일자',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('name5', {
      header: '승인상태',
      cell: (info) => info.getValue(),
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className={`${styles.start} ${styles.history_wrap}`}>
      <div className={styles.list_flex}>
        <div className={`${bulletStyles.start} ${bulletStyles.list} ${styles.list_info}`}>
          <ul>
            <li>자격증 취득 이력을 등록할 수 있으며, 승인 현황을 조회할 수 있습니다.</li>
          </ul>
        </div>
        <Button variant="line" size="lg" className={styles.btn}>
          <IcoPlus />
          취득이력등록
        </Button>
      </div>

      <Panel
        hideHeaderUnderline
        className={`${searchBoxStyles.start} ${styles.search_date}`}
        type="rounded_fill"
      >
        <div className={searchBoxStyles.search_box}>
          <div className={styles.form_content}>
            <ContentsRow className={styles.content_row}>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>취득일자</span>
                </label>
                <div className={formStyles.input_box}>
                  <DatePicker displayType={'day'} size={'lg'} placeholder="0000.00.00" />
                </div>
              </div>

              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>승인상태</span>
                </label>
                <div className={formStyles.input_box}>
                  <Dropdown
                    options={options}
                    value={selectedValues}
                    onChange={(selected) => setSelectedValues(selected)}
                    placeholder="선택"
                    variant="default"
                    isMulti={false}
                    size={'lg'}
                  />
                </div>
              </div>

              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>자격증 종목</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="nameSearch"
                    type="text"
                    value=""
                    placeholder="입력"
                    className="lg"
                    showSearchIcon
                  />
                </div>
              </div>
            </ContentsRow>
            <Button variant="primary" size="lg" className={styles.btn_search}>
              검색
            </Button>
          </div>
        </div>
      </Panel>
      <div className={styles.table_list}>
        <TableBox
          data={data}
          columns={columns}
          tableMode={true}
          showNumberingColumn
          showExcelDownload
          customButtonNode={
            <Button
              label={'메뉴얼다운로드'}
              icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
            />
          }
          className={styles.table}
        />
        <Pagination
          count={100}
          page={page}
          onChange={handlePageChange}
          className={styles.pagenation}
        />
      </div>
    </div>
  );
};

export const LicensesHistory = LicensesHistoryComponent;
