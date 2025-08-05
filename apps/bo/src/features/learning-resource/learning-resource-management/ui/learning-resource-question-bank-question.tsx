import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { IcoCopy, IcoMinus, IcoPlus } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { GridBox } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { QuestionItem, QuestionItemGridRow } from '@types';
import { QUESTION_LEVELS, QUESTION_TYPES } from '../service/exam-util';
import {
  initStatisticRow,
  QuestionStatisticRow,
  updateNewStatistics,
} from '../service/learning-resource-question-service';
import { ContentsRow } from '@learnway/ui/contents-row';
import { CMSApiPrefix } from '@learnway/config';
import { QuestionBankTabFormRef } from '../service/question-bank/type';
import { useQuestionBankInfoInput } from '../service/question-bank/use-question-bank-info-input';
import { LearningResourceTestItemModal } from './learning-resource-test-item-modal';
import { LearningResourceQuestionShuttleModal } from './learning-resource-question-shuttle-modal';

// Drag and Drop 관련
import { closestCenter, DndContext, MeasuringStrategy } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import { QuestionDragHandle } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-drag-handle';

const LearningResourceQuestionBankQuestionComponent = forwardRef<QuestionBankTabFormRef, unknown>(
  (props, ref) => {
    const { t } = useTranslation();

    const { openModal } = useModal();

    const [statistic, setStatistic] = useState<QuestionStatisticRow[]>(initStatisticRow(t));

    const {
      baseInfo,
      questionItemList,
      setQuestionItemList,
      selectedQuestionRows,
      setSelectedQuestionRows,
      handleUpdateQuestionCountInfo,
      questionCreateSuccessCallback,
      refetchQuestionItemList,
      handleOnCopyQuestion,
      handleOnDeleteQuestion,
      dragSensors,
      handleOnDragEnd,
    } = useQuestionBankInfoInput();

    const handleAddQuestionButtonClick = useCallback(async () => {
      if (baseInfo) {
        await openModal({
          width: 'xl',
          content: (
            <LearningResourceTestItemModal
              contentInfo={baseInfo}
              onSuccessCallback={questionCreateSuccessCallback}
            />
          ),
        });
      }
    }, [baseInfo]);

    const handleViewQuestionButtonClick = async (questionItemRow: QuestionItemGridRow) => {
      if (baseInfo) {
        await openModal({
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

    const handleClickRetrieveQuestionModal = useCallback(async () => {
      if (!baseInfo?.contentUuid) {
        return;
      }

      const result = await openModal({
        width: 'xl',
        height: 'fix',
        content: <LearningResourceQuestionShuttleModal examPoolUuid={baseInfo.contentUuid} />,
      });

      if (result) {
        const { data: refetchResult = [] } = await refetchQuestionItemList();
        setQuestionItemList(refetchResult);
      }
    }, [baseInfo]);

    const handleOnExcelUpload = useCallback(async (result: Record<string, any>) => {
      const { uploadResult } = result;
      if (uploadResult) {
        const { data: refetchResult = [] } = await refetchQuestionItemList();
        setQuestionItemList(refetchResult.filter((q) => q.isUsed) as QuestionItem[]);
      }
    }, []);

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
          cell: (info) => <QuestionDragHandle />,
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
    }, []);

    useImperativeHandle(ref, () => ({
      complete: () => {
        // console.log('baseInfo', baseInfo);
        handleUpdateQuestionCountInfo();
      },
    }));

    useEffect(() => {
      console.log('questionItemList', questionItemList);
      if (!questionItemList) return;
      const newStatistic: QuestionStatisticRow[] = [...initStatisticRow(t)];

      questionItemList.forEach((item) => {
        updateNewStatistics(item, newStatistic);
      });
      setStatistic(newStatistic);
    }, [questionItemList]);

    return (
      <div className={styles.wrap}>
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
                <td>{baseInfo?.tenantName}</td>
                <th scope="row">{t('채널')}</th>
                <td>{baseInfo?.channelName}</td>
              </tr>
              <tr>
                <th scope="row">{t('유형')}</th>
                <td>{t('문제은행')}</td>
                <th scope="row">{t('학습자원명')}</th>
                <td>{baseInfo?.contentName}</td>
              </tr>
              <tr>
                <th scope="row">{t('문제은행 언어')}</th>
                <td colSpan={3}>
                  {t(`pms.multilingual.LangCountryCode.${baseInfo?.languageCountryCode}`)}
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
                enableDragAndDrop
                rowId="sortSeq"
                onRowsSelect={setSelectedQuestionRows}
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
                    />
                    <GridExcelUploadButton
                      validateUrl={`/exam/questions/${baseInfo?.contentUuid}/upload`}
                      affairsType="CMS"
                      formDataName="multipartFile"
                      validationResultRequired={false}
                      onUpload={handleOnExcelUpload}
                    />
                    <GridExcelDownloadButton
                      method="post"
                      url={`${CMSApiPrefix()}/exam/questions/${baseInfo?.contentUuid}/download`}
                      params={{}}
                      disabled={!questionItemList.length}
                    />
                    <Button
                      variant="text"
                      label={t('LABEL.grid.header.add', '추가')}
                      onClick={handleAddQuestionButtonClick}
                      icon={<IcoPlus width={16} height={16} stroke="#4C515E" />}
                    />
                    <Button
                      variant="text"
                      label={t('LABEL.grid.header.copy', '복사')}
                      icon={<IcoCopy width={16} height={16} stroke="#4C515E" />}
                      onClick={handleOnCopyQuestion}
                      disabled={!selectedQuestionRows.length}
                    />
                    <Button
                      variant="text"
                      label={t('LABEL.grid.header.remove', '삭제')}
                      icon={<IcoMinus width={16} height={16} stroke="#131C30" />}
                      onClick={handleOnDeleteQuestion}
                      disabled={!selectedQuestionRows.length}
                    />
                  </>
                }
              />
            </DndContext>
          </div>
        </ContentsRow>
      </div>
    );
  },
);

export const LearningResourceQuestionBankQuestion = LearningResourceQuestionBankQuestionComponent;
