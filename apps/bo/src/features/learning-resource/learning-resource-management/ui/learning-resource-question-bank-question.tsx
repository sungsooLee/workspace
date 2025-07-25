import { useEffect, useMemo, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

import { cn } from '@learnway/shared';
import { Button, FormSubTitle, GridBox, Input, RadioGroupFormField, useModal } from '@learnway/ui';
import { useLearningResourceQuestionDetailForm } from '../service/learning-resource-question-detail-from.hook';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { IcoCopy, IcoMenu01, IcoMinus, IcoPlus } from '@learnway/icons';
import { LearningResourceTestItemModal } from './learning-resource-test-item-modal';
import { useGetQuestionItemList } from '@entities/learning-resource';
import { QuestionItemGridRow } from '@types';
import {
  initStatisticRow,
  QuestionStatisticRow,
  updateNewStatistics,
} from '../service/learning-resource-question-service';

const LearningResourceQuestionBankQuestionComponent = () => {
  const { alert, openModal, confirm: openConfirm } = useModal();
  const [statistic, setStatistic] = useState<QuestionStatisticRow[]>(initStatisticRow);

  const { baseInfo } = useLearningResourceQuestionDetailForm();

  const { data: questionItemList } = useGetQuestionItemList(baseInfo?.contentUuid);

  const handleAddQuestionButtonClick = async () => {
    if (baseInfo) {
      const questionItem = await openModal({
        width: 'xl',
        content: <LearningResourceTestItemModal contentInfo={baseInfo} />,
      });
    }
  };

  const handleViewQuestionButtonClick = async (questionItemRow: QuestionItemGridRow) => {
    if (baseInfo) {
      openModal({
        width: 'xl',
        content: (
          <LearningResourceTestItemModal
            contentInfo={baseInfo}
            questionItemGridRow={questionItemRow}
          />
        ),
      });
    }
  };

  const statisticColumn = useMemo<ColumnDef<QuestionStatisticRow, any>[]>(() => {
    // Table
    const columnHelper = createColumnHelper<QuestionStatisticRow>();
    return [
      columnHelper.accessor('title', {
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
      columnHelper.accessor('hard', {
        cell: (info) => <Input value={`${info.getValue()}`} disabled />,
        header: '문항수(난이도 상)',
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
      columnHelper.accessor('medium', {
        cell: (info) => <Input value={`${info.getValue()}`} disabled />,
        header: '문항수(난이도 중)',
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
      columnHelper.accessor('easy', {
        cell: (info) => <Input value={`${info.getValue()}`} disabled />,
        header: '문항수(난이도 하)',
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
    ];
  }, []);

  // Table
  const columns2 = useMemo(() => {
    const columnHelper = createColumnHelper<QuestionItemGridRow>();
    return [
      columnHelper.accessor('questionText', {
        cell: (info) => {
          return (
            <Button
              className="link"
              onClick={() => {
                handleViewQuestionButtonClick(info.row.original);
              }}
            >
              {info.getValue()}
            </Button>
          );
        },
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
      columnHelper.accessor('questionLevel', {
        cell: (info) => info.getValue(),
        header: '난이도',
        enableGrouping: false,
        size: 104,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
      columnHelper.accessor('optionCount', {
        cell: (info) => info.getValue(),
        header: '보기수',
        size: 104,
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
      columnHelper.accessor('isUsed', {
        cell: (info) => (
          <RadioGroupFormField
            value={`${info.getValue()}`}
            options={[
              { value: 'true', label: '사용' },
              { value: 'false', label: '미사용' },
            ]}
          />
        ),
        header: '사용',
        size: 240,
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
      columnHelper.accessor('orderChange', {
        cell: (info) => <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />,
        header: '순서변경',
        size: 104,
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
    ];
  }, []);

  useEffect(() => {
    console.log('questionItemList', questionItemList);
    if (!questionItemList) return;
    const newStatistic: QuestionStatisticRow[] = [...initStatisticRow];

    questionItemList.forEach((item) => {
      updateNewStatistics(item, newStatistic);
    });
    setStatistic(newStatistic);
  }, [questionItemList]);
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
          data={statistic}
          columns={statisticColumn}
          titleCustomNode={
            <div className="custom_info_wrap">
              <strong className="table_tit text-[1.4rem] font-normal">{'문항현황'}</strong>
              <strong className="table_tit text-[1.4rem] font-normal">{'문제은행 문항수'}</strong>
              <span className="count_info text-[1.4rem]">{questionItemList?.length ?? 0}</span>
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
          data={questionItemList}
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
