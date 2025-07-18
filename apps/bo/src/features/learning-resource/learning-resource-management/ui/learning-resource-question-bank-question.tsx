import { FC, useEffect, useImperativeHandle, useRef } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import previewImg from '@assets/images/temp/img_exam_basic.jpg';

import { cn } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  FormSubTitle,
  GridBox,
  Input,
  RadioGroupFormField,
  SplitPanel,
  TableBox,
  Tabs,
  useModal,
} from '@learnway/ui';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';

import { LearningResourceBaseForm } from './learning-resource-base-form';
import { useLearningResourceQuestionDetailForm } from '../service/learning-resource-question-detail-from.hook';
import { FormRow2, GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { Link } from 'lucide-react';
import { IcoCopy, IcoFormRequired, IcoMenu01, IcoMinus, IcoPlus } from '@learnway/icons';
import { LearningResourceTestItemModal } from './learning-resource-test-item-modal';
import { useCreateQuestionItem } from '@entities/learning-resource';

const LearningResourceQuestionBankQuestionComponent = () => {
  const { alert, open: openModal, confirm: openConfirm } = useModal();

  const { baseInfo } = useLearningResourceQuestionDetailForm();
  const { create: createQuestionItem } = useCreateQuestionItem();

  const handleAddQuestionButtonClick = async () => {
    if (baseInfo) {
      const questionItem = await openModal({
        width: 'xl',
        content: <LearningResourceTestItemModal contentInfo={baseInfo} />,
      });
      console.log('questionItem', questionItem);
      createQuestionItem(questionItem, {
        onSuccess: (data: any) => {
          console.log('ok ', data);
        },
        onError: (error: any) => {
          console.log('error', error);
        },
      });
    }
  };

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
        cellClass: 'title',
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
        size: 'auto',
      },
    }),
    columnHelper.accessor('questionType', {
      cell: (info) => info.getValue(),
      header: '문항유형',
      enableGrouping: false,
      size: 216,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
        cellClass: 'title',
      },
    }),
    columnHelper.accessor('level', {
      cell: (info) => info.getValue(),
      header: '난이도',
      enableGrouping: false,
      size: 104,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('number', {
      cell: (info) => info.getValue(),
      header: '보기수',
      size: 104,
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용',
      size: 240,
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('orderChange', {
      cell: (info) => info.getValue(),
      header: '순서변경',
      size: 104,
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div className={styles.wrap}>
      <FormSubTitle label={'기본정보'} noLine />
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
              <td>{baseInfo?.tenantName}</td>
              <th scope={'row'}>{'채널'}</th>
              <td>{baseInfo?.channelName}</td>
            </tr>
            <tr>
              <th scope={'row'}>{'유형'}</th>
              <td>{'문제은행'}</td>
              <th scope={'row'}>{'학습자원명'}</th>
              <td>{baseInfo?.contentName}</td>
            </tr>
            <tr>
              <th scope={'row'}>{'문제은행 언어'}</th>
              <td colSpan={3}>{baseInfo?.languageCountryCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 퍼블수정 20250613 : lineType 추가 */}
      <FormSubTitle label={'문항정보'} lineType={'dark'} />

      <div className={styles.table_wrap}>
        <GridBox
          title=" "
          showTotalCount={false}
          disabledSelectionToggle
          tableMode
          data={data}
          columns={columns}
          titleCustomNode={
            <div className="custom_info_wrap">
              <strong className="table_tit text-[1.4rem] font-normal">{'문항현황'}</strong>
              <strong className="table_tit text-[1.4rem] font-normal">{'문제은행 문항수'}</strong>
              <span className="count_info text-[1.4rem]">{'100'}</span>
            </div>
          }
          className={styles.info_table}
          guideText={'문항현황은 문항목록에서 문항추가/삭제 시 자동 업데이트 됩니다.'}
          showGuideTextNextLine={true}
        />
        <GridBox
          title=" "
          showTotalCount={false}
          disabledSelectionToggle
          tableMode
          data={data2}
          columns={columns2}
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
          className={styles.list_table}
          customButtonNode={
            <>
              <Button variant="text" label={'불러오기'} />
              <GridExcelUploadButton />
              <GridExcelDownloadButton />
              <Button
                variant="text"
                label={'추가'}
                onClick={handleAddQuestionButtonClick}
                icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
              />
              <Button
                variant="text"
                label={t('LABEL.grid.header.copy', '복사')}
                icon={<IcoCopy width={16} height={16} stroke="#4C515E" />}
              />
              <Button
                variant="text"
                label={'삭제'}
                icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
              />
            </>
          }
        />
      </div>
    </div>
  );
};

export const LearningResourceQuestionBankQuestion = LearningResourceQuestionBankQuestionComponent;
