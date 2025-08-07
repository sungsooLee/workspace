import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  QuestionBasicInfoDetail,
  QuestionItem,
  QuestionItemGridRow,
} from '@entities/learning-resource';
import { CMSApiPrefix } from '@learnway/config';
import { IcoCopy, IcoMinus, IcoPlus } from '@learnway/icons';
import { cn, isEmptyData } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { GridBox } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui/buttons';
import { NoticeBox } from '@shared/ui/notice-box';
import { QUESTION_LEVELS, QUESTION_TYPES } from '../../service/exam-util';
import {
  initStatisticRow,
  updateNewStatistics,
} from '../../service/learning-resource-question-service';
import { QuestionBankTabFormRef, QuestionStatisticRow } from '../../service/question-bank/type';
import { useQuestionBankInfoInput } from '../../service/question-bank/use-question-bank-info-input';
import { LearningResourceQuestionShuttleModal } from './modal/learning-resource-question-shuttle-modal';
import { LearningResourceTestItemModal } from './modal/learning-resource-test-item-modal';

// Drag and Drop 관련
import { closestCenter, DndContext, MeasuringStrategy } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { QuestionDragHandle } from './components/learning-resource-question-drag-handle';

import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';

interface QuestionBankQuestionProps {
  content?: QuestionBasicInfoDetail;
  isExamMapping?: boolean;
}

const LearningResourceQuestionBankQuestionComponent = forwardRef<
  QuestionBankTabFormRef,
  QuestionBankQuestionProps
>(({ content, isExamMapping }, ref) => {
  const { t } = useTranslation();

  const { openModal } = useModal();

  const [statistic, setStatistic] = useState<QuestionStatisticRow[]>(initStatisticRow(t));

  const {
    questionItemList,
    setQuestionItemList,
    selectedQuestionRows,
    setSelectedQuestionRows,
    handleUpdateQuestionCountInfo,
    questionCreateSuccessCallback,
    questionDeleteSuccessCallback,
    refetchQuestionItemList,
    handleOnCopyQuestion,
    handleOnDeleteQuestion,
    dragSensors,
    handleOnDragEnd,
  } = useQuestionBankInfoInput(content?.contentUuid as string);

  const handleAddQuestionButtonClick = useCallback(async () => {
    if (content) {
      await openModal({
        width: 'xl',
        content: (
          <LearningResourceTestItemModal
            contentInfo={content}
            onSuccessCallback={questionCreateSuccessCallback}
            hasMapping={isExamMapping}
          />
        ),
      });
    }
  }, [content]);

  const handleViewQuestionButtonClick = async (questionItemRow: QuestionItemGridRow) => {
    if (content) {
      await openModal({
        width: 'xl',
        content: (
          <LearningResourceTestItemModal
            contentInfo={content}
            questionItemGridRow={questionItemRow}
            onDeleteCallback={questionDeleteSuccessCallback}
            hasMapping={isExamMapping}
          />
        ),
      });
    }
  };

  const handleClickRetrieveQuestionModal = useCallback(async () => {
    if (!content?.contentUuid) {
      return;
    }

    const result = await openModal({
      width: 'xl',
      height: 'fix',
      content: <LearningResourceQuestionShuttleModal examPoolUuid={content.contentUuid} />,
    });

    if (result) {
      const { data: refetchResult = [] } = await refetchQuestionItemList();
      setQuestionItemList(refetchResult);
    }
  }, [content]);

  const handleOnExcelUpload = useCallback(async (result: Record<string, any>) => {
    const { uploadResult } = result;
    if (uploadResult) {
      const { data: refetchResult = [] } = await refetchQuestionItemList();
      setQuestionItemList(refetchResult.filter((q) => q.isUsed) as QuestionItem[]);
    }
  }, []);

  const handleIsRowSelectable = useCallback(() => !isExamMapping, [isExamMapping]);

  const statisticColumns = useMemo<ColumnDef<QuestionStatisticRow, any>[]>(() => {
    // Table
    const columnHelper = createColumnHelper<QuestionStatisticRow>();
    return [
      columnHelper.accessor('title', {
        cell: (info) => info.getValue(),
        header: t('문항유형'),
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
        header: t('문항수(난이도 상)'),
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
      columnHelper.accessor('medium', {
        cell: (info) => <Input value={`${info.getValue()}`} disabled />,
        header: t('문항수(난이도 중)'),
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
      columnHelper.accessor('easy', {
        cell: (info) => <Input value={`${info.getValue()}`} disabled />,
        header: t('문항수(난이도 하)'),
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
    ];
  }, []);

  // Table
  const questionListColumns = useMemo(() => {
    const columnHelper = createColumnHelper<QuestionItemGridRow>();
    return [
      columnHelper.accessor('questionText', {
        cell: (info) => (
          <span
            className="cursor-pointer text-[var(--gray8)] underline"
            onClick={() => handleViewQuestionButtonClick(info.row.original)}
          >
            {info.getValue()}
          </span>
        ),
        header: t('문항'),
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
          size: 'auto',
        },
      }),
      columnHelper.accessor('questionType', {
        cell: (info) => QUESTION_TYPES(t)[info.getValue()],
        header: t('문항유형'),
        enableGrouping: false,
        size: 216,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'left', // 셀 정렬
        },
      }),
      columnHelper.accessor('questionLevel', {
        cell: (info) => QUESTION_LEVELS(t)[info.getValue()],
        header: t('난이도'),
        enableGrouping: false,
        size: 104,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
      columnHelper.accessor('optionCount', {
        cell: (info) => info.getValue(),
        header: t('보기수'),
        size: 104,
        enableGrouping: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
      columnHelper.accessor('orderChange', {
        cell: (info) => <QuestionDragHandle hasMapping={isExamMapping} />,
        header: t('순서변경'),
        size: 104,
        enableGrouping: false,
        enableSorting: false,
        meta: {
          headerAlign: 'center', // 헤더 정렬
          cellAlign: 'center', // 셀 정렬
        },
      }),
    ];
  }, [isExamMapping]);

  useImperativeHandle(ref, () => ({
    complete: () => {
      // console.log('content', content);
      handleUpdateQuestionCountInfo();
    },
  }));

  useEffect(() => {
    console.log('questionItemList', questionItemList);
    if (isEmptyData(questionItemList)) return;

    const newStatistic: QuestionStatisticRow[] = [...initStatisticRow(t)];

    questionItemList.forEach((item) => {
      updateNewStatistics(item, newStatistic);
    });
    setStatistic(newStatistic);
  }, [questionItemList]);

  return (
    <div className={styles.wrap}>
      {isExamMapping && (
        <NoticeBox
          iconVisible={false}
          descriptions={[
            t(
              '시험지와 매핑된 문제은행은 문항을 추가하거나, 복사하거나, 삭제하거나, 순서를 변경할 수 없습니다.',
            ),
          ]}
        />
      )}
      <FormSubTitle label={t('기본정보')} noLine />
      <div className={cn(tableStyles.start, tableStyles.wrap)}>
        <table>
          <caption>{t('기본정보')}</caption>
          <colgroup>
            <col style={{ width: '240px' }} />
            <col />
            <col style={{ width: '240px' }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{t('테넌트')}</th>
              <td>{content?.tenantName}</td>
              <th scope="row">{t('채널')}</th>
              <td>{content?.channelName}</td>
            </tr>
            <tr>
              <th scope="row">{t('유형')}</th>
              <td>{t('문제은행')}</td>
              <th scope="row">{t('교육자원명')}</th>
              <td>{content?.contentName}</td>
            </tr>
            <tr>
              <th scope="row">{t('문제은행 언어')}</th>
              <td colSpan={3}>
                {t(`pms.multilingual.LangCountryCode.${content?.languageCountryCode}`)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <FormSubTitle label={t('문항정보')} lineType="dark" />
      <ContentsRow>
        <div className={styles.table_wrap}>
          <GridBox
            title=" "
            showTotalCount={false}
            disabledSelectionToggle
            tableMode
            data={statistic}
            columns={statisticColumns}
            titleCustomNode={
              <div className="custom_info_wrap">
                <strong className="table_tit text-[1.4rem] font-normal">{t('문항현황')}</strong>
                <strong className="table_tit text-[1.4rem] font-normal">
                  {t('문제은행 문항수')}
                </strong>
                <span className="count_info text-[1.4rem]">{questionItemList?.length ?? 0}</span>
              </div>
            }
            className={styles.info_table}
            guideText={t('문항현황은 문항목록에서 문항추가/삭제 시 자동 업데이트 됩니다.')}
            showGuideTextNextLine={true}
          />
        </div>
      </ContentsRow>
      <ContentsRow>
        <div className={styles.table_wrap}>
          <DndContext
            sensors={dragSensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            measuring={{
              droppable: {
                strategy: MeasuringStrategy.Always,
              },
            }}
            onDragEnd={handleOnDragEnd}
          >
            <GridBox
              title=" "
              showTotalCount={false}
              disabledSelectionToggle
              tableMode
              data={questionItemList}
              columns={questionListColumns}
              multiple
              showNumberingColumn
              enableDragAndDrop={!isExamMapping}
              rowId="sortSeq"
              onRowsSelect={setSelectedQuestionRows}
              isRowSelectable={handleIsRowSelectable}
              hideRowSelectionCheckBox={false}
              titleCustomNode={
                <div className="custom_info_wrap pt-[1.2rem]">
                  <strong className="table_tit text-[1.4rem] font-normal">{t('문항목록')}</strong>
                  <strong className="table_tit text-[1.4rem] font-normal">{t('전체')}</strong>
                  <span className="count_info">{questionItemList?.length ?? 0}</span>
                </div>
              }
              className={styles.list_table}
              customButtonNode={
                <>
                  <Button
                    variant="text"
                    label={t('불러오기')}
                    onClick={handleClickRetrieveQuestionModal}
                    disabled={isExamMapping}
                  />
                  <GridExcelUploadButton
                    validateUrl={`/exam/questions/${content?.contentUuid}/upload`}
                    affairsType="CMS"
                    formDataName="multipartFile"
                    validationResultRequired={false}
                    onUpload={handleOnExcelUpload}
                    disabled={isExamMapping}
                  />
                  <GridExcelDownloadButton
                    method="post"
                    url={`${CMSApiPrefix()}/exam/questions/${content?.contentUuid}/download`}
                    params={{}}
                    disabled={!questionItemList.length}
                  />
                  <Button
                    variant="text"
                    label={t('LABEL.grid.header.add', '추가')}
                    onClick={handleAddQuestionButtonClick}
                    icon={<IcoPlus width={16} height={16} stroke="#4C515E" />}
                    disabled={isExamMapping}
                  />
                  <Button
                    variant="text"
                    label={t('LABEL.grid.header.copy', '복사')}
                    icon={<IcoCopy width={16} height={16} stroke="#4C515E" />}
                    onClick={handleOnCopyQuestion}
                    disabled={!selectedQuestionRows.length || isExamMapping}
                  />
                  <Button
                    variant="text"
                    label={t('LABEL.grid.header.remove', '삭제')}
                    icon={<IcoMinus width={16} height={16} stroke="#131C30" />}
                    onClick={handleOnDeleteQuestion}
                    disabled={!selectedQuestionRows.length || isExamMapping}
                  />
                </>
              }
            />
          </DndContext>
        </div>
      </ContentsRow>
    </div>
  );
});

export const LearningResourceQuestionBankQuestion = LearningResourceQuestionBankQuestionComponent;
