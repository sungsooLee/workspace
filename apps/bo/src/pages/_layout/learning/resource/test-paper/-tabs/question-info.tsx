import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { t } from 'i18next';
import { Link } from '@tanstack/react-router';
import { cn, isEmptyData } from '@learnway/shared';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
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
import { ContentInformation, ExamQuestionGenType, TestPaperBasicInfoDetail } from '@types';
import { FormRow2, GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { SegmentedControlFormField } from '@features/form/ui/segmented-control-form-field';
// import { LearningResourceTestItemModal } from '@features/learning-resource/learning-resource-management/ui/learning-resource-test-item-modal';
import { getExamTemplateTextByType } from '../-common/common';
import { ExamQuestionInfoProps, TabFormRef } from '../-common/type';

/* styles */
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { useExamQuestionInfoInput } from '@pages/_layout/learning/resource/test-paper/-hooks/use-exam-question-info-input';
import { LearningResourceTestItemModal } from '@features/learning-resource/learning-resource-management/ui/learning-resource-test-item-modal';
import { useCreateQuestionItem } from '@entities/learning-resource';

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

    const { selectedQuestions, scorePerQuestion, createQuestionItem } = useExamQuestionInfoInput(
      data as TestPaperBasicInfoDetail,
    );

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

    const handleClickAddQuestionButton = useCallback(async () => {
      if (isEmptyData(data)) {
        return;
      }

      const payload = await openModal({
        width: 'xl',
        content: <LearningResourceTestItemModal contentInfo={data as ContentInformation} />,
      });

      if (payload) {
        createQuestionItem(payload);
      }
    }, [data]);

    // Table
    const columnHelper = createColumnHelper<any>();
    const arr: any[] = [
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

    useImperativeHandle(
      ref,
      () => ({
        update: () => saveBasicInfo?.(getValues()),
      }),
      [],
    );

    return (
      <form>
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
                data={arr}
                columns={columns}
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
                    <span className="count_info text-[1.4rem]">{selectedQuestions.length}</span>
                    <strong className="table_tit text-[1.4rem] font-normal">
                      {t('문항 당 배점')}
                    </strong>
                    <span className="count_info text-[1.4rem]">{scorePerQuestion}</span>
                  </div>
                }
                className={styles.info_table}
                showGuideTextNextLine
                guideText={t('문항현황은 문항목록에서 문항추가/삭제 시 자동 업데이트 됩니다.')}
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
                data={data2}
                columns={columns2}
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
                    <Button variant="text" label={'불러오기'} />
                    <GridExcelUploadButton />
                    <GridExcelDownloadButton />
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
      </form>
    );
  },
);

QuestionInfoComponent.displayName = 'QuestionInfo';

export const QuestionInfo = QuestionInfoComponent;
