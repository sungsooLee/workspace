import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { t } from 'i18next';
import { cn, isEmptyData } from '@learnway/shared';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CMSApiPrefix } from '@learnway/config';
import {
  Button,
  ContentsRow,
  FormSubTitle,
  GridBox,
  Input,
  RadioGroupFormField,
  useModal,
} from '@learnway/ui';
import { IcoCopy, IcoMenu01, IcoMinus, IcoPlus } from '@learnway/icons';
import {
  ContentInformation,
  EnQuestionLevel,
  EnQuestionType,
  ExamQuestionGenType,
  QuestionItem,
  QuestionItemGridRow,
  TestPaperBasicInfoDetail,
} from '@types';
import { FormRow2, GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { SegmentedControlFormField } from '@features/form/ui/segmented-control-form-field';
import { QUESTION_LEVELS, QUESTION_TYPES } from '../service/exam-util';
import { getExamTemplateTextByType } from '../service/test-paper/common';
import {
  ExamQuestionInfoProps,
  QuestionStatisticRow,
  TabFormRef,
} from '../service/test-paper/type';
import { useExamQuestionInfoInput } from '../service/test-paper/use-exam-question-info-input';
import { LearningResourceTestItemModal } from './learning-resource-test-item-modal';
import { LearningResourceQuestionShuttleModal } from './learning-resource-question-shuttle-modal';

/* styles */
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

const QuestionInfoComponent = forwardRef<TabFormRef, ExamQuestionInfoProps>(
  (
    {
      basicInfoForm,
      contentUuid = '',
      tenantId,
      mode,
      data,
      hasMapping = false,
      questionGenType,
      setQuestionGenType,
    },
    ref,
  ) => {
    const { provider: basicInfoProvider, getValues, saveBasicInfo } = basicInfoForm;

    const { watch } = basicInfoProvider;
    const questionGenTypeByForm = watch('questionGenType');

    const isMount = useRef<boolean>(false);

    const questionStatusGuideText =
      questionGenTypeByForm === ExamQuestionGenType.RANDOM
        ? t(
            '유형 별, 난이도 별로 시험지에 출제할 문항수를 직접 입력하세요. 입력된 문항 수 기준으로 문항목록에서 문항이 랜덤추출됩니다.',
          )
        : t('문항현황은 문항목록에서 문항추가/삭제 시 자동 업데이트 됩니다.');

    useEffect(() => {
      if (isMount.current) {
        if (questionGenTypeByForm === ExamQuestionGenType.RANDOM) {
          saveBasicInfo?.(getValues(), true);
        }
      } else {
        isMount.current = true;
      }
    }, [questionGenTypeByForm]);

    const {
      questionList,
      selectedQuestions,
      questionState,
      scorePerQuestion,
      questionCreateSuccessCallback,
      updateQuestionStatus,
      randomCountUpdateData,
      handleCountInputChange,
      updateQuestionRandomCount,
    } = useExamQuestionInfoInput(data as TestPaperBasicInfoDetail);

    const questionGenTypeOptions = useMemo(
      () => [
        {
          title: t('선택형 문항'),
          key: ExamQuestionGenType.FIXED,
          content: '',
        },
        {
          title: t('랜덤형 문항'),
          key: ExamQuestionGenType.RANDOM,
          content: '',
        },
      ],
      [],
    );

    const { open: openModal } = useModal();

    const handleClickRetrieveQuestionModal = useCallback(async () => {
      await openModal({
        width: 'xl',
        height: 'fix',
        content: <LearningResourceQuestionShuttleModal examPoolUuid={data?.examPoolUuid ?? ''} />,
      });
    }, []);

    const handleClickAddQuestionButton = useCallback(async () => {
      if (isEmptyData(data)) {
        return;
      }

      await openModal({
        width: 'xl',
        content: (
          <LearningResourceTestItemModal
            contentInfo={data as ContentInformation}
            onSuccessCallback={questionCreateSuccessCallback}
          />
        ),
      });
    }, [data]);

    const handleViewQuestionButtonClick = useCallback(
      async (item: QuestionItemGridRow) => {
        if (isEmptyData(data)) {
          return;
        }

        await openModal({
          width: 'xl',
          content: (
            <LearningResourceTestItemModal
              contentInfo={data as ContentInformation}
              questionItemGridRow={item}
            />
          ),
        });
      },
      [data],
    );

    const questionStates: QuestionStatisticRow[] = useMemo(
      () => [
        {
          title: QUESTION_TYPES[EnQuestionType.SINGLE],
          hard: questionState[EnQuestionType.SINGLE]?.[EnQuestionLevel.HARD] ?? 0,
          medium: questionState[EnQuestionType.SINGLE]?.[EnQuestionLevel.MEDIUM] ?? 0,
          easy: questionState[EnQuestionType.SINGLE]?.[EnQuestionLevel.EASY] ?? 0,
          type: EnQuestionType.SINGLE,
        },
        {
          title: QUESTION_TYPES[EnQuestionType.OX],
          hard: questionState[EnQuestionType.OX]?.[EnQuestionLevel.HARD] ?? 0,
          medium: questionState[EnQuestionType.OX]?.[EnQuestionLevel.MEDIUM] ?? 0,
          easy: questionState[EnQuestionType.OX]?.[EnQuestionLevel.EASY] ?? 0,
          type: EnQuestionType.OX,
        },
        {
          title: QUESTION_TYPES[EnQuestionType.MULTIPLE],
          hard: questionState[EnQuestionType.MULTIPLE]?.[EnQuestionLevel.HARD] ?? 0,
          medium: questionState[EnQuestionType.MULTIPLE]?.[EnQuestionLevel.MEDIUM] ?? 0,
          easy: questionState[EnQuestionType.MULTIPLE]?.[EnQuestionLevel.EASY] ?? 0,
          type: EnQuestionType.MULTIPLE,
        },
        {
          title: QUESTION_TYPES[EnQuestionType.SHORT_ANSWER],
          hard: questionState[EnQuestionType.SHORT_ANSWER]?.[EnQuestionLevel.HARD] ?? 0,
          medium: questionState[EnQuestionType.SHORT_ANSWER]?.[EnQuestionLevel.MEDIUM] ?? 0,
          easy: questionState[EnQuestionType.SHORT_ANSWER]?.[EnQuestionLevel.EASY] ?? 0,
          type: EnQuestionType.SHORT_ANSWER,
        },
        {
          title: QUESTION_TYPES[EnQuestionType.ESSAY],
          hard: questionState[EnQuestionType.ESSAY]?.[EnQuestionLevel.HARD] ?? 0,
          medium: questionState[EnQuestionType.ESSAY]?.[EnQuestionLevel.MEDIUM] ?? 0,
          easy: questionState[EnQuestionType.ESSAY]?.[EnQuestionLevel.EASY] ?? 0,
          type: EnQuestionType.ESSAY,
        },
      ],
      [questionState],
    );

    const questionSummaryColumns = useMemo(() => {
      const columnHelper = createColumnHelper<QuestionStatisticRow>();
      return [
        columnHelper.accessor('title', {
          cell: (info) => <strong>{info.getValue()}</strong>,
          header: '문항유형',
          enableGrouping: false,
          size: 100,
          meta: {
            headerAlign: 'center',
            cellAlign: 'left',
          },
        }),
        columnHelper.accessor('hard', {
          cell: (info) => (
            <Input
              type="number"
              value={
                questionGenTypeByForm === ExamQuestionGenType.RANDOM
                  ? randomCountUpdateData[info.row.original.type]?.hardLevelCount
                  : info.getValue()
              }
              disabled={questionGenTypeByForm === ExamQuestionGenType.FIXED}
              suffixText={
                questionGenTypeByForm === ExamQuestionGenType.RANDOM ? `/ ${info.getValue()}` : ''
              }
              onChange={(e) => handleCountInputChange(e, info.row.original, 'hard')}
              placeholder="0"
            />
          ),
          header: '문항수(난이도 상)',
          enableGrouping: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'left',
          },
        }),
        columnHelper.accessor('medium', {
          cell: (info) => (
            <Input
              type="number"
              value={
                questionGenTypeByForm === ExamQuestionGenType.RANDOM
                  ? randomCountUpdateData[info.row.original.type]?.mediumLevelCount
                  : info.getValue()
              }
              disabled={questionGenTypeByForm === ExamQuestionGenType.FIXED}
              suffixText={
                questionGenTypeByForm === ExamQuestionGenType.RANDOM ? `/ ${info.getValue()}` : ''
              }
              onChange={(e) => handleCountInputChange(e, info.row.original, 'medium')}
              placeholder="0"
            />
          ),
          header: '문항수(난이도 중)',
          enableGrouping: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'left',
          },
        }),
        columnHelper.accessor('easy', {
          cell: (info) => (
            <Input
              type="number"
              value={
                questionGenTypeByForm === ExamQuestionGenType.RANDOM
                  ? randomCountUpdateData[info.row.original.type]?.easyLevelCount
                  : info.getValue()
              }
              disabled={questionGenTypeByForm === ExamQuestionGenType.FIXED}
              suffixText={
                questionGenTypeByForm === ExamQuestionGenType.RANDOM ? `/ ${info.getValue()}` : ''
              }
              onChange={(e) => handleCountInputChange(e, info.row.original, 'easy')}
              placeholder="0"
            />
          ),
          header: '문항수(난이도 하)',
          enableGrouping: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'left',
          },
        }),
      ];
    }, [questionGenTypeByForm, randomCountUpdateData]);

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
            headerAlign: 'center',
            cellAlign: 'left',
            size: 'auto',
          },
        }),
        columnHelper.accessor('questionType', {
          cell: (info) => QUESTION_TYPES[info.getValue()],
          header: t('문항유형'),
          enableGrouping: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'left',
          },
        }),
        columnHelper.accessor('questionLevel', {
          cell: (info) => QUESTION_LEVELS[info.getValue()],
          header: t('난이도'),
          enableGrouping: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        }),
        columnHelper.accessor('optionCount', {
          cell: (info) => info.getValue(),
          header: t('보기수'),
          enableGrouping: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        }),
        columnHelper.accessor('isUsed', {
          cell: (info) => (
            <RadioGroupFormField
              onChange={(value: boolean) =>
                updateQuestionStatus({
                  contentUuid: data?.examPoolUuid ?? '',
                  examQuestionUuid: info.row.original.examQuestionUuid,
                  isUsed: value,
                })
              }
              defaultValue={String(info.getValue())}
              options={[
                { value: 'true', label: t('LABEL.common.enable') },
                { value: 'false', label: t('LABEL.common.disable') },
              ]}
            />
          ),
          header: t('LABEL.common.isUsed'),
          enableGrouping: false,
          enableSorting: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'left',
          },
        }),
        columnHelper.accessor('orderChange', {
          cell: (info) => <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />,
          header: t('순서변경'),
          enableGrouping: false,
          enableSorting: false,
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        }),
      ] as ColumnDef<any, QuestionItem>[];
    }, []);

    useImperativeHandle(ref, () => ({
      // 문항
      update: () => {
        if (questionGenTypeByForm === ExamQuestionGenType.RANDOM) {
          updateQuestionRandomCount();
        } else {
          saveBasicInfo?.(getValues());
        }
      },
    }));

    return (
      <div className={styles.wrap}>
        <FormSubTitle label={t('기본 정보')} noLine />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{t('기본 정보')}</caption>
            <colgroup>
              <col style={{ width: '240px' }} />
              <col />
              <col style={{ width: '240px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{t('테넌트')}</th>
                <td>{data?.tenantName}</td>
                <th scope="row">{t('채널')}</th>
                <td>{data?.channelName}</td>
              </tr>
              <tr>
                <th scope="row">{t('유형')}</th>
                <td>{getExamTemplateTextByType(data?.examTemplateType)}</td>
                <th scope="row">{t('학습자원명')}</th>
                <td>{data?.contentName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <FormSubTitle label={t('문항 정보')} lineType="dark" />
        <ContentsRow>
          <FormRow2
            provider={basicInfoProvider}
            name="questionGenType"
            label={t('문항 출제유형')}
            format="string"
            value={questionGenType}
            validation={{ required: true }}
            element={
              <SegmentedControlFormField
                items={questionGenTypeOptions}
                onChange={(tabKey: ExamQuestionGenType) => setQuestionGenType(tabKey)}
              />
            }
          />
        </ContentsRow>

        <ContentsRow>
          <div className={styles.table_wrap}>
            <GridBox
              title=" "
              data={questionStates}
              columns={questionSummaryColumns}
              showTotalCount={false}
              disabledSelectionToggle
              tableMode
              titleCustomNode={
                <div className="custom_info_wrap">
                  <strong className="table_tit text-[1.4rem] font-normal">{t('문항현황')}</strong>
                  <strong className="table_tit text-[1.4rem] font-normal">
                    {t('시험지 문항수')}
                  </strong>
                  <span className="count_info text-[1.4rem]">{data?.questionCount}</span>
                  <strong className="table_tit text-[1.4rem] font-normal">
                    {t('선택 문항수')}
                  </strong>
                  <span
                    className={cn(
                      'count_info text-[1.4rem]',
                      data?.questionCount !== selectedQuestions.length ? 'point' : '',
                    )}
                  >
                    {selectedQuestions.length}
                  </span>
                  <strong className="table_tit text-[1.4rem] font-normal">
                    {t('문항 당 배점')}
                  </strong>
                  <span className="count_info text-[1.4rem]">{scorePerQuestion}</span>
                </div>
              }
              className={styles.info_table}
              showGuideTextNextLine
              guideText={questionStatusGuideText}
              showErrorMessageBesideGuideText={data?.questionCount !== selectedQuestions.length}
              errorMessageBesideGuideText={t('시험지 문항수와 선택 문항수는 동일해야 합니다.')}
            />
          </div>
        </ContentsRow>

        <ContentsRow>
          <div className={styles.table_wrap}>
            <GridBox
              title=" "
              showTotalCount={false}
              disabledSelectionToggle
              tableMode
              data={questionList}
              columns={questionListColumns}
              multiple
              showNumberingColumn
              hideRowSelectionCheckBox={false}
              titleCustomNode={
                <div className="custom_info_wrap pt-[1.2rem]">
                  <strong className="table_tit text-[1.4rem] font-normal">{'문항목록'}</strong>
                  <strong className="table_tit text-[1.4rem] font-normal">{'전체'}</strong>
                  <span className="count_info">{'5'}</span>
                </div>
              }
              className={styles.list_table}
              customButtonNode={
                <>
                  <Button
                    type="button"
                    variant="text"
                    label={t('불러오기')}
                    onClick={handleClickRetrieveQuestionModal}
                  />
                  <GridExcelUploadButton
                    validateUrl={`/exam/questions/${data?.examPoolUuid}/upload`}
                    affairsType="CMS"
                    formDataName="multipartFile"
                  />
                  <GridExcelDownloadButton
                    method="post"
                    url={`${CMSApiPrefix()}/exam/questions/${data?.examPoolUuid}/download`}
                    params={{}}
                  />
                  <Button
                    variant="text"
                    label={t('LABEL.grid.header.add')}
                    onClick={handleClickAddQuestionButton}
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
        </ContentsRow>
      </div>
    );
  },
);

QuestionInfoComponent.displayName = 'LearningResourceQuestionInfo';

export const LearningResourceQuestionInfo = QuestionInfoComponent;
