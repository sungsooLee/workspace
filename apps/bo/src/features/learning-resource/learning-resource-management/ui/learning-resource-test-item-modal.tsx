import { t } from 'i18next';
import styles from '@learnway/styles/bo/pages/_layout/learning/popup-question-detail.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import uploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { useTranslation } from 'react-i18next';
import {
  Button,
  Checkbox,
  ContentsRow,
  EditCheckboxCell,
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
  Spinner,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';
import { usePostContentCopy } from '@entities/learning-resource';
import { useRouter } from '@tanstack/react-router';
import { getDetailPathByContentType } from '@features/learning-resource';
import { ContentInformation } from '@types';
import { FormRow, FormRow2, SingleAttachmentFormField, SwitchFormField } from '@shared/ui';
import {
  CODE_GROUP,
  DynamicFormConfig,
  S3_PATH,
  useDynamicForm,
  useDynamicForm2,
} from '@learnway/hooks';
import { FormDisplay } from '@features/form';
import { CellContext } from '@tanstack/react-table';
import { IcoCopy, IcoMenu01, IcoMinus, IcoPlus } from '@learnway/icons';
import { Radio } from 'lucide-react';
import { EditSingleAttachmentCell } from '@features/form/ui/edit-single-attachment-cell';
import { useWatch } from 'react-hook-form';

enum EnQuestionType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  OX = 'OX',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
}
const rowId = 'id';

const LearningResourceTestItemModalComponent = ({
  contentInfo,
}: {
  contentInfo: ContentInformation;
}) => {
  const { close } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);

  const { provider, getValues, onFormChange } = useDynamicForm2();

  const imageTypeWatch = useWatch({ control: provider.control, name: 'imageType' });
  const attachImageWatch = useWatch({ control: provider.control, name: 'fileUuid' });

  const updateisCorrectAnswerRadio = useCallback(
    (index: number) => {
      const options = getValues('options');
      options.forEach((item: any, i: number) => {
        if (index === i) {
          item.isCorrectAnswer = true;
        } else {
          item.isCorrectAnswer = false;
        }
      });
      onFormChange({ options });
    },
    [getValues, onFormChange],
  );

  const handleAddClick = () => {
    const value = getValues('options');
    console.log('values', value);
    const options = [...value, { [rowId]: getRandomId() }];
    onFormChange({ options });
  };

  const gridSingleColumn = useMemo(() => {
    return [
      {
        header: 'NO.',
        accessorKey: 'sortSeq',
        cell: (info: CellContext<any, number>) => {
          return <>{info.row.index + 1}</>;
        },
        size: 10,
      },
      {
        header: '보기',
        accessorKey: 'examOptionText',
        size: 300,
        cell: (info: CellContext<any, string>) => (
          <EditTextareaCell info={info} textarea={{ size: 'sm', maxLength: 2000 }} />
        ),
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      },
      {
        header: '첨부파일',
        accessorKey: 'file',
        size: 250,
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
      },
      {
        header: '정답',
        accessorKey: 'isCorrectAnswer',
        size: 20,
        cell: (info: CellContext<any, boolean>) => (
          <div>
            <EditCheckboxCell
              info={info}
              checkbox={{ variant: 'round', label: '정답' }}
              onCheckedChange={(event) => {
                updateisCorrectAnswerRadio(info.row.index);
              }}
            />
          </div>
        ),
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      },
      {
        header: '순서변경',
        accessorKey: 'sqlOrder',
        size: 20,
        cell: (info: CellContext<any, string>) => (
          <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />
        ),
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      },
    ];
  }, [updateisCorrectAnswerRadio]);

  return (
    <ModalContainer>
      <ModalTitle>{'문항상세'}</ModalTitle>
      <ModalBody>
        <form>
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
                format="array"
                type="custom"
                value={[]}
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
                element={<RadioGroupFormField />}
                optionsConfig={{
                  codeGroup: CODE_GROUP['pms.channel.ChannelCreationType'],
                }}
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
                name="fileAttacted"
                label="첨부파일"
                format="boolean"
                value={false}
                placeholder="내용입력"
                element={<SwitchFormField />}
                switchConfig={{
                  label: (value: boolean) => (value ? '파일1개' : '파일없음'),
                }}
              />
            </ContentsRow>
            <FormDisplay provider={provider} dependencies={[{ name: 'fileAttacted', value: true }]}>
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name="imageType"
                  value="image"
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
                      columns: gridSingleColumn,
                    }}
                  />
                }
              />
            </ContentsRow>
            {/* 객관식 문제 노출 끝 */}
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
        <Button
          label={t('저장')}
          variant="primary"
          size="lg"
          onClick={() => {
            const data = getValues();
            const options = data.options;
            options[0].isCorrectAnswer = undefined;
            console.log(data);

            onFormChange({ options });
          }}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearningResourceTestItemModal = LearningResourceTestItemModalComponent;
