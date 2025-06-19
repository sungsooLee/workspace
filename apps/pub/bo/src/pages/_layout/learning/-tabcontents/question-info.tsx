/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ContentsRow, Tabs, TableBox, Input, RadioGroupFormField } from '@learnway/ui';
import { IcoMenu01, IcoFormRequired } from '@learnway/icons';

/* styles */
import styles from './test-detail.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const QuestionInfoComponent: FC<{}> = ({}) => {
  const items = [
    {
      title: '선택형 문항',
      key: 'option01',
      content: '',
    },
    {
      title: '랜덤형 문항',
      key: 'option02',
      content: '',
    },
  ];

  // Table
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      type: <strong>객관식</strong>,
      levelHigh: <Input value={'0'} disabled />,
      levelMiddle: <Input value={'0'} disabled />,
      levelLow: <Input value={'0'} disabled />,
    },
    {
      type: <strong>OX</strong>,
      levelHigh: <Input value={'0'} disabled />,
      levelMiddle: <Input value={'0'} disabled />,
      levelLow: <Input value={'0'} disabled />,
    },
    {
      type: <strong>다답식</strong>,
      levelHigh: <Input value={'0'} disabled />,
      levelMiddle: <Input value={'0'} disabled />,
      levelLow: <Input value={'0'} disabled />,
    },
    {
      type: <strong>단답식</strong>,
      levelHigh: <Input value={'0'} disabled />,
      levelMiddle: <Input value={'0'} disabled />,
      levelLow: <Input value={'0'} disabled />,
    },
    {
      type: <strong>주관식</strong>,
      levelHigh: <Input value={'0'} disabled />,
      levelMiddle: <Input value={'0'} disabled />,
      levelLow: <Input value={'0'} disabled />,
    },
  ];

  const columns = [
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '문항유형',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('levelHigh', {
      cell: (info) => info.getValue(),
      header: '문항수(난이도 상)',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('levelMiddle', {
      cell: (info) => info.getValue(),
      header: '문항수(난이도 중)',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('levelLow', {
      cell: (info) => info.getValue(),
      header: '문항수(난이도 하)',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const data2: any[] = [
    {
      question: (
        <Link to={'/'} className="link">
          문항내용
        </Link>
      ),
      questionType: '객관식',
      level: '상',
      number: '3',
      useable: (
        <RadioGroupFormField
          options={[
            { value: 'option01', label: '사용' },
            { value: 'option02', label: '미사용' },
          ]}
        />
      ),
      orderChange: <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />,
    },
  ];

  const columns2 = [
    columnHelper.accessor('question', {
      cell: (info) => info.getValue(),
      header: '문항',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('questionType', {
      cell: (info) => info.getValue(),
      header: '문항유형',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('level', {
      cell: (info) => info.getValue(),
      header: '난이도',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('number', {
      cell: (info) => info.getValue(),
      header: '보기수',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('orderChange', {
      cell: (info) => info.getValue(),
      header: '순서변경',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div className={styles.wrap}>
      <FormSubTitle label={'기본정보'} />
      <div className={cn(tableStyles.start, tableStyles.wrap)}>
        <table>
          <caption>{'기본정보'}</caption>
          <colgroup>
            <col style={{ width: '240px' }} />
            <col />
            <col style={{ width: '240px' }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope={'row'}>{'테넌트'}</th>
              <td>{'테넌트명'}</td>
              <th scope={'row'}>{'채널'}</th>
              <td>{'채널명'}</td>
            </tr>
            <tr>
              <th scope={'row'}>{'유형'}</th>
              <td>{'시험지'}</td>
              <th scope={'row'}>{'학습자원명'}</th>
              <td>{'학습자원명'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 퍼블수정 20250613 : lineType 추가 */}
      <FormSubTitle label={'문항정보'} lineType={'dark'} />
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-type" className={formStyles.form_label}>
            <span className={formStyles.form_text}>문항 출제유형</span>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.segment_wrap}>
              <Tabs
                items={items}
                type="segment"
                size="sm"
                selectedTabKey={'option01'}
                className={styles.tab_select}
              />
            </div>
          </div>
        </div>
      </ContentsRow>
      {/* 퍼블수정 20250619 페이지별 문항수 추가 */}
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-type" className={formStyles.form_label}>
            <span className={formStyles.form_text}>페이지별 문항수</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input type="text" suffixText={'개'} value={'5'} className={formStyles.input_time} />
          </div>
        </div>
        <div className={formStyles.form_item}></div>
        <div className={formStyles.form_item}></div>
      </ContentsRow>
      <div className={styles.table_wrap}>
        <TableBox
          data={data}
          columns={columns}
          tableMode={true}
          titleCustomNode={
            <div className="custom_info_wrap">
              <strong className="table_tit font-normal">{'문항현황'}</strong>
              <strong className="table_tit font-normal">{'시험지 문항수'}</strong>
              <span className="count_info">{'5'}</span>
              <strong className="table_tit font-normal">{'선택 문항수'}</strong>
              <span className="count_info point">{'5'}</span>
              <strong className="table_tit font-normal">{'문항 당 배점'}</strong>
              <span className="count_info">{'5'}</span>
            </div>
          }
          className={styles.info_table}
        />
        <TableBox
          data={data2}
          columns={columns2}
          tableMode={true}
          multiple
          showNumberingColumn
          hideRowSelectionCheckBox={false}
          titleCustomNode={
            <div className="custom_info_wrap">
              <strong className="table_tit font-normal">{'문항목록'}</strong>
              <strong className="table_tit font-normal">{'전체'}</strong>
              <span className="count_info">{'5'}</span>
            </div>
          }
          showExcelDownload
          className={styles.list_table}
        />
      </div>
    </div>
  );
};

QuestionInfoComponent.displayName = 'QuestionInfo';
export const QuestionInfo = QuestionInfoComponent;
