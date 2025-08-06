import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/popup-question-detail.module.css';

import { cn } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { GridFormField, RadioGroupFormField, TextareaFormField } from '@learnway/ui/form-field';
import {
  EditCheckboxCell,
  EditInputCell,
  EditRadioCell,
  EditTextareaCell,
} from '@learnway/ui/grid';

import {
  ContentInformation,
  EnQuestionLevel,
  EnQuestionType,
  ExamTemplateType,
  MutationResponse,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionItemGridRow,
  useCreateQuestionItem,
  useDeleteQuestionItemList,
  useGetQuestionItem,
} from '@entities/learning-resource';
import { FormDisplay } from '@features/form';
import { EditSingleAttachmentCell } from '@features/form/ui/edit-single-attachment-cell';
import { S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { IcoMenu01 } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ContentType, EnFormMode } from '@shared/types/enums';
import { FormRow2, SingleAttachmentFormField } from '@shared/ui';

const LearningResourceTestItemModalComponent = ({
  contentInfo,
  questionItemGridRow,
  onSuccessCallback,
  onDeleteCallback,
}: {
  contentInfo: ContentInformation & { examPoolUuid?: string; examTemplateType?: ExamTemplateType };
  questionItemGridRow?: QuestionItemGridRow;
  onSuccessCallback?: () => void | Promise<void>;
  onDeleteCallback?: () => void | Promise<void>;
}) => {
  const { t } = useTranslation();
  const { alert, closeModal, confirm: openConfirm } = useModal();

  const formMode = useMemo<EnFormMode>(
    () => (questionItemGridRow ? EnFormMode.VIEW : EnFormMode.ADD),
    [questionItemGridRow],
  );

  const [otherOptions, setOtherOptions] = useState<any[]>();
  const [questionItem, setQuestionItem] = useState<QuestionItem>();

  const formRef = useRef<HTMLFormElement>(null);

  const { provider, getValues, updateFormData, onFormChange, onSubmit } = useDynamicForm2();

  const { data: rowData } = useGetQuestionItem(questionItemGridRow?.examQuestionUuid);
  const { create: createQuestionItem } = useCreateQuestionItem();
  const { delete: deleteQuestion } = useDeleteQuestionItemList({
    onSuccess: ({ result }: MutationResponse) => {
      if (result) {
        onDeleteCallback?.();
        closeModal();
      }
    },
  });

  // console.log('questionItemGridRow', questionItemGridRow);
  // const imageTypeWatch = useWatch({ control: provider.control, name: 'fileType' });
  // const attachImageWatch = useWatch({ control: provider.control, name: 'fileUuid' });
  const questionTypeWatch = useWatch({ control: provider.control, name: 'questionType' });

  const handleDeleteButtonClick = useCallback(async () => {
    if (!questionItemGridRow?.examQuestionUuid) {
      return;
    }
    console.log('delete button click');

    const payload: QuestionItemDeleteParam = {
      contentUuid: contentInfo.contentUuid,
      contentType: contentInfo.contentType,
      questionUuidList: [questionItemGridRow.examQuestionUuid],
    };

    if (
      await openConfirm({
        title: t('삭제 하시겠습니까?'),
        content: t('삭제 후 목록으로 이동합니다.'),
      })
    ) {
      deleteQuestion(payload);
    }
  }, []);

  const handleSaveButtonClick = useCallback(() => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }, []);

  const handleSubmit = async (data: Record<string, any>) => {
    const { fileAttached, ...restData } = data;

    if (
      [EnQuestionType.SINGLE, EnQuestionType.MULTIPLE].includes(questionTypeWatch) &&
      restData.options.length < 2
    ) {
      await alert({
        title: t('보기를 추가하세요.'),
        content: t('객관식이나 다답식의 경우 보기가 2개 이상이어야 합니다.'),
      });
      return;
    } else if (!restData.options.length) {
      await alert({
        title: t('보기를 추가하세요.'),
        content: t('보기가 1개 이상이어야 합니다.'),
      });
      return;
    }

    if (
      questionTypeWatch === EnQuestionType.ESSAY &&
      Object.keys(restData).includes('examOptionText')
    ) {
      delete restData.examOptionText;
    }

    for (const [i, option] of restData.options.entries()) {
      option.sortSeq = i + 1;
      if (questionTypeWatch === EnQuestionType.SHORT_ANSWER) {
        option.isCorrectAnswer = true;
      } else if (!option.isCorrectAnswer) {
        option.isCorrectAnswer = false;
      }
    }

    if (
      restData.options.map((option: any) => option.isCorrectAnswer).every((item: boolean) => !item)
    ) {
      await alert({
        title: t('정답을 설정하세요.'),
        content: t('정답이 1개 이상이어야 합니다.'),
      });
      return;
    }

    const result = await openConfirm({
      title: t('저장 하시겠습니까?'),
      content: <p>{t('입력한 정보로 저장합니다.')}</p>,
    });

    if (result) {
      // 시험지의 경우 매핑된 문제은행 uuid를 넘겨줘야 한다.
      const paramUuid =
        contentInfo.contentType === ContentType.EXAM
          ? contentInfo?.examPoolUuid
          : contentInfo.contentUuid;
      const payload = { ...restData, isUsed: true, contentUuid: paramUuid };
      createQuestionItem(payload as QuestionItem, {
        onSuccess: (result: any) => {
          onSuccessCallback?.();
          closeModal();
        },
        onError: (error: any) => {
          console.log('error', error);
        },
      });
    }
  };

  const updateIsCorrectAnswerRadio = useCallback(
    (index: number) => {
      const options = getValues('options');
      options.forEach((item: any, i: number) => {
        if (index === i) {
          item.isCorrectAnswer = true;
        } else if (questionTypeWatch === EnQuestionType.SINGLE) {
          item.isCorrectAnswer = false;
        }
      });
      onFormChange({ options });
    },
    [getValues, onFormChange, questionTypeWatch],
  );

  const gridColumn = useMemo(() => {
    const retval = [];
    retval.push({
      header: 'NO.',
      accessorKey: 'sortSeq',
      cell: (info: CellContext<any, number>) => {
        return <>{info.row.index + 1}</>;
      },
      size: 10,
    });
    switch (questionTypeWatch) {
      case EnQuestionType.SINGLE:
      case EnQuestionType.MULTIPLE:
      case EnQuestionType.OX:
        retval.push({
          header: t('보기'),
          accessorKey: 'examOptionText',
          size: 350,
          cell: (info: CellContext<any, string>) =>
            questionTypeWatch === EnQuestionType.OX ? (
              <EditInputCell info={info} input={{ disabled: true }} />
            ) : (
              <EditTextareaCell info={info} textarea={{ size: 'sm', maxLength: 2000 }} />
            ),
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        });
        retval.push({
          header: t('첨부파일'),
          accessorKey: 'fileUuid',
          size: 350,
          cell: (info: CellContext<any, string>) => (
            <EditSingleAttachmentCell
              info={info}
              singleAttahment={{
                showGuidText: false,
                uploadConfig: {
                  affairsType: 'CMS',
                  s3Path: S3_PATH['upload/content/image'],
                  acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
                },
              }}
            />
          ),
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        });
        retval.push({
          header: t('정답'),
          accessorKey: 'isCorrectAnswer',
          size: 80,
          cell: (info: CellContext<any, any>) => (
            <div>
              {questionTypeWatch === EnQuestionType.MULTIPLE && (
                <EditCheckboxCell
                  info={info}
                  checkbox={{
                    variant: EnQuestionType.SINGLE === questionTypeWatch ? 'radio' : 'default',
                    label: t('정답'),
                  }}
                  onCheckedChange={(event) => {
                    updateIsCorrectAnswerRadio(info.row.index);
                  }}
                />
              )}
              {questionTypeWatch !== EnQuestionType.MULTIPLE && (
                <EditRadioCell
                  info={info}
                  radio={{
                    options: [{ label: t('정답'), value: true }],
                  }}
                  onValueChange={(event) => {
                    updateIsCorrectAnswerRadio(info.row.index);
                  }}
                />
              )}
            </div>
          ),
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        });
        if (questionTypeWatch !== EnQuestionType.OX) {
          retval.push({
            header: t('순서변경'),
            accessorKey: 'sqlOrder',
            size: 50,
            cell: (info: CellContext<any, string>) => (
              <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />
            ),
            meta: {
              headerAlign: 'center',
              cellAlign: 'center',
            },
          });
        }
        break;
      case EnQuestionType.SHORT_ANSWER:
        retval.push({
          header: t('정답'),
          accessorKey: 'examOptionText',
          size: 1200,
          cell: (info: CellContext<any, string>) => (
            <EditTextareaCell info={info} textarea={{ size: 'sm', maxLength: 2000 }} />
          ),
          meta: {
            headerAlign: 'center',
            cellAlign: 'center',
          },
        });
        break;
    }
    return retval;
  }, [updateIsCorrectAnswerRadio, questionTypeWatch]);

  useEffect(() => {
    if (formMode !== EnFormMode.ADD) return;
    if (questionTypeWatch === EnQuestionType.OX) {
      const data = getValues('options');
      if (data && data.length > 0) {
        setOtherOptions(data);
      }
      const options = [
        { sortSeq: 1, examOptionText: 'O' },
        { sortSeq: 2, examOptionText: 'X' },
      ];
      onFormChange({ options });
    } else {
      let options = [];
      if (otherOptions && otherOptions.length > 0) {
        options = otherOptions;
      }
      onFormChange({ options });
    }
  }, [questionTypeWatch]);

  useEffect(() => {
    if (!questionItem) return;
    updateFormData({
      ...questionItem,
      fileAttached: questionItem.fileUuid && questionItem.fileUuid.length > 0,
    });
    setOtherOptions(questionItem.options);

    if (questionItem.questionType === EnQuestionType.ESSAY) {
      onFormChange({
        examOptionText: questionItem.options?.[0]?.examOptionText ?? '',
      });
    }
  }, [questionItem]);

  useEffect(() => {
    if (!rowData) return;
    // console.log('rowData', rowData);
    setQuestionItem(rowData);
  }, [rowData]);

  return (
    <ModalContainer>
      <ModalTitle>{t('문항 상세')}</ModalTitle>
      <ModalBody>
        <form ref={formRef} onSubmit={onSubmit(handleSubmit)}>
          <div className={cn(popupStyles.wrap, styles.start)}>
            <FormSubTitle
              label={t(
                `${contentInfo.contentType === ContentType.EXAM ? '시험지' : '문제은행'} 정보`,
              )}
              noLine
            />
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
                    <td>{contentInfo.tenantName}</td>
                    <th scope="row">{t('채널')}</th>
                    <td>{contentInfo.channelName}</td>
                  </tr>
                  <tr>
                    <th scope="row">{t('교육자원명')}</th>
                    <td>{contentInfo.contentName}</td>
                    <th scope="row">{t('언어')}</th>
                    <td>
                      {t(`pms.multilingual.LangCountryCode.${contentInfo.languageCountryCode}`)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <FormSubTitle label={t('문항정보')} lineType="dark" />
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="questionType"
                label={t('문항유형')}
                format="string"
                type="custom"
                value={
                  contentInfo?.examTemplateType === ExamTemplateType.QUIZ
                    ? EnQuestionType.OX
                    : EnQuestionType.SINGLE
                }
                element={
                  <RadioGroupFormField
                    options={[
                      { label: t('객관식'), value: EnQuestionType.SINGLE },
                      { label: t('다답식'), value: EnQuestionType.MULTIPLE },
                      { label: t('단답식'), value: EnQuestionType.SHORT_ANSWER },
                      { label: t('주관식'), value: EnQuestionType.ESSAY },
                      { label: t('OX'), value: EnQuestionType.OX },
                    ]}
                    disabled={contentInfo?.examTemplateType === ExamTemplateType.QUIZ}
                  />
                }
                // optionsConfig={{
                //   codeGroup: CODE_GROUP['pms.channel.ChannelCreationType'],
                // }}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="languageCountryCodeName"
                label={t('문항언어')}
                element={<Input id="name-type2-2" type="text" disabled />}
              />
              <FormRow2
                provider={provider}
                name="questionLevel"
                label={t('난이도')}
                value="HARD"
                element={
                  <RadioGroupFormField
                    options={[
                      { label: '상', value: EnQuestionLevel.HARD },
                      { label: '중', value: EnQuestionLevel.MEDIUM },
                      { label: '하', value: EnQuestionLevel.EASY },
                    ]}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="questionText"
                label={t('문항')}
                format="string"
                value=""
                validation={{ required: true }}
                element={<TextareaFormField maxLength={2000} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="explainText"
                label={t('해설')}
                format="string"
                value=""
                placeholder={t('내용입력')}
                element={<TextareaFormField maxLength={2000} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="fileUuid"
                label={t('이미지 파일')}
                element={
                  <SingleAttachmentFormField
                    uploadConfig={{
                      affairsType: 'CMS',
                      s3Path: S3_PATH['upload/content/image'],
                      acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
                    }}
                  />
                }
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              condition="or"
              dependencies={[
                { name: 'questionType', value: EnQuestionType.SINGLE },
                { name: 'questionType', value: EnQuestionType.MULTIPLE },
                { name: 'questionType', value: EnQuestionType.SHORT_ANSWER },
                { name: 'questionType', value: EnQuestionType.OX },
              ]}
            >
              {/* 객관식 문제 노출 시작 */}
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name="options"
                  value={[]}
                  element={
                    <GridFormField
                      maxRow={10}
                      gridProps={{
                        title: t('보기목록'),
                        guideText: t('보기의 첨부파일은 최대1개, 이미지파일만 가능합니다.'),
                        multiple: true,
                        showAdd: questionTypeWatch !== EnQuestionType.OX,
                        showRemove: questionTypeWatch !== EnQuestionType.OX,
                        showTotalCount: true,
                        columns: gridColumn,
                        isRowSelected: (row: object) => {
                          if (questionTypeWatch === EnQuestionType.OX) return false;
                          return true;
                        },
                      }}
                    />
                  }
                />
              </ContentsRow>
              {/* 객관식 문제 노출 끝 */}
            </FormDisplay>
            {/* 주관식 문제 정답 입력 영역 */}
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'questionType', value: EnQuestionType.ESSAY }]}
            >
              <FormRow2
                provider={provider}
                name="examOptionText"
                label={t('정답')}
                element={
                  <TextareaFormField
                    maxLength={2000}
                    onTransformInputValue={(value: string) => {
                      onFormChange({
                        options: [{ sortSeq: 1, examOptionText: value, isCorrectAnswer: true }],
                      });
                    }}
                  />
                }
              />
            </FormDisplay>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant="gray" size="lg" onClick={closeModal} />
        {formMode === EnFormMode.VIEW && (
          <Button label={t('삭제')} variant="gray" size="lg" onClick={handleDeleteButtonClick} />
        )}
        <Button label={t('저장')} variant="primary" size="lg" onClick={handleSaveButtonClick} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearningResourceTestItemModal = LearningResourceTestItemModalComponent;
