import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/pages/_layout/learning/popup-question-detail.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

import {
  Button,
  ContentsRow,
  EditCheckboxCell,
  EditInputCell,
  EditRadioCell,
  EditTextareaCell,
  FormSubTitle,
  GridFormField,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  RadioGroupFormField,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import { cn } from '@learnway/shared';

import {
  ContentInformation,
  ContentType,
  EnFormMode,
  EnQuestionLevel,
  EnQuestionType,
  QuestionItem,
  QuestionItemGridRow,
} from '@types';
import { FormRow2, SingleAttachmentFormField, SwitchFormField } from '@shared/ui';
import { S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { FormDisplay } from '@features/form';
import { IcoMenu01 } from '@learnway/icons';

import { EditSingleAttachmentCell } from '@features/form/ui/edit-single-attachment-cell';
import { useWatch } from 'react-hook-form';
import { useCreateQuestionItem, useGetQuestionItem } from '@entities/learning-resource';

const LearningResourceTestItemModalComponent = ({
  contentInfo,
  questionItemGridRow,
  onSuccessCallback,
}: {
  contentInfo: ContentInformation & { examPoolUuid?: string };
  questionItemGridRow?: QuestionItemGridRow;
  onSuccessCallback?: () => void | Promise<void>;
}) => {
  const { close, confirm: openConfirm } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [otherOptions, setOtherOptions] = useState<any[]>();
  const [formMode, setFormMode] = useState<EnFormMode>(
    questionItemGridRow ? EnFormMode.VIEW : EnFormMode.ADD,
  );
  const [questionItem, setQuestionItem] = useState<QuestionItem>();

  const formRef = useRef<HTMLFormElement>(null);

  const { provider, getValues, updateFormData, onFormChange, onSubmit } = useDynamicForm2();
  const { data: rowData } = useGetQuestionItem(questionItemGridRow?.examQuestionUuid);
  const { create: createQuestionItem } = useCreateQuestionItem();

  // console.log('questionItemGridRow', questionItemGridRow);
  const imageTypeWatch = useWatch({ control: provider.control, name: 'imageType' });
  const attachImageWatch = useWatch({ control: provider.control, name: 'fileUuid' });
  const questionTypeWatch = useWatch({ control: provider.control, name: 'questionType' });

  const handleDeleteButtonClick = () => {
    console.log('delete button click');
  };

  const handleSaveButtonClick = () => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };
  const handleSubmit = async (data: any) => {
    const { fileAttached, ...restData } = data;

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
      const questionItem = { ...restData, contentUuid: paramUuid };
      createQuestionItem(questionItem, {
        onSuccess: (data: any) => {
          console.log('ok ', data);

          data && onSuccessCallback?.();
          close();
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
          header: '보기',
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
          header: '첨부파일',
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
          header: '정답',
          accessorKey: 'isCorrectAnswer',
          size: 80,
          cell: (info: CellContext<any, any>) => (
            <div>
              {questionTypeWatch === EnQuestionType.MULTIPLE && (
                <EditCheckboxCell
                  info={info}
                  checkbox={{
                    variant: EnQuestionType.SINGLE === questionTypeWatch ? 'radio' : 'default',
                    label: '정답',
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
                    options: [{ label: '정답', value: true }],
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
            header: '순서변경',
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
          header: '정답',
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
      console.log(otherOptions, data);
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
    console.log('rowData', rowData);
    setQuestionItem(rowData);
  }, [rowData]);

  return (
    <ModalContainer>
      <ModalTitle>{'문항상세'}</ModalTitle>
      <ModalBody>
        <form ref={formRef} onSubmit={onSubmit(handleSubmit)}>
          <div className={cn(popupStyles.wrap, styles.start)}>
            <FormSubTitle label="문제은행 정보" noLine />
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
                    <td>{contentInfo.tenantName}</td>
                    <th scope={'row'}>{'채널'}</th>
                    <td>{contentInfo.channelName}</td>
                  </tr>
                  <tr>
                    <th scope={'row'}>{'학습자원명'}</th>
                    <td>{contentInfo.contentName}</td>
                    <th scope={'row'}>{'언어'}</th>
                    <td>{contentInfo.languageCountryCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <FormSubTitle label={'문항정보'} lineType={'dark'} />
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="questionType"
                label="문항유형"
                format="string"
                type="custom"
                value={EnQuestionType.SINGLE}
                element={
                  <RadioGroupFormField
                    options={[
                      { label: '객관식', value: EnQuestionType.SINGLE },
                      { label: '다답식', value: EnQuestionType.MULTIPLE },
                      { label: '단답식', value: EnQuestionType.SHORT_ANSWER },
                      { label: '주관식', value: EnQuestionType.ESSAY },
                      { label: 'OX', value: EnQuestionType.OX },
                    ]}
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
                label="문항언어"
                element={<Input id="name-type2-2" type="text" disabled />}
              />
              <FormRow2
                provider={provider}
                name="questionLevel"
                label="난이도"
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
                label="문항"
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
                label="해설"
                format="string"
                value=""
                placeholder="내용입력"
                element={<TextareaFormField maxLength={2000} />}
              />
            </ContentsRow>
            <ContentsRow type="horizontal" className="inactive">
              <FormRow2
                provider={provider}
                name="fileAttached"
                label="첨부파일"
                format="boolean"
                value={false}
                tooltip="내용입력"
                validation={{ required: true }}
                element={<SwitchFormField />}
                switchConfig={{
                  label: (value: boolean) => (value ? '파일1개' : '파일없음'),
                }}
              />
            </ContentsRow>
            <FormDisplay provider={provider} dependencies={[{ name: 'fileAttached', value: true }]}>
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  label="첨부유형"
                  name="imageType"
                  value="image"
                  validation={{ required: true }}
                  element={
                    <RadioGroupFormField
                      options={[
                        { label: '이미지', value: 'image' },
                        { label: '파일(다운로드)', value: 'file' },
                      ]}
                      disabled={attachImageWatch}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name="fileUuid"
                  label="파일"
                  validation={{ required: true }}
                  element={
                    imageTypeWatch === 'image' ? (
                      <SingleAttachmentFormField
                        uploadConfig={{
                          affairsType: 'CMS',
                          s3Path: S3_PATH['upload/content/image'],
                          acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
                        }}
                      />
                    ) : (
                      <SingleAttachmentFormField
                        uploadConfig={{
                          affairsType: 'CMS',
                          s3Path: S3_PATH['upload/content/original'],
                        }}
                      />
                    )
                  }
                />
              </ContentsRow>
            </FormDisplay>
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
                        title: '보기목록',
                        guideText: '보기의 첨부파일은 최대1개, 이미지파일만 가능합니다.',
                        multiple: true,
                        showAdd: true,
                        showRemove: true,
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
        <Button
          label={t('취소')}
          variant="gray"
          size="lg"
          onClick={() => {
            close();
          }}
        />
        {formMode === EnFormMode.VIEW && (
          <Button label={t('삭제')} variant="gray" size="lg" onClick={handleDeleteButtonClick} />
        )}
        <Button label={t('저장')} variant="primary" size="lg" onClick={handleSaveButtonClick} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearningResourceTestItemModal = LearningResourceTestItemModalComponent;
