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
  ContentsRow,
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
import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { usePostContentCopy } from '@entities/learning-resource';
import { useRouter } from '@tanstack/react-router';
import { getDetailPathByContentType } from '@features/learning-resource';
import { ContentInformation } from '@types';
import { FormRow2, SwitchFormField } from '@shared/ui';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { FormDisplay } from '@features/form';

const LearningResourceTestItemModalComponent = ({
  contentInfo,
}: {
  contentInfo: ContentInformation;
}) => {
  const { provider } = useDynamicForm2();
  return (
    <ModalContainer>
      <ModalTitle>{'문항상세'}</ModalTitle>
      <ModalBody>
        <div className={cn(popupStyles.wrap, styles.start)}>
          <FormSubTitle label="문제은행 정보" />
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
              element={<RadioGroupFormField />}
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.channel.ChannelCreationType'],
              }}
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
              element={<SwitchFormField maxLength={2000} />}
              switchConfig={{
                label: (value: boolean) => (value ? '파일1개' : '파일없음'),
              }}
            />
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'fileAttacted', value: true }]}>
            <ContentsRow>
              <div> 첨부 파일 영역 </div>
            </ContentsRow>
          </FormDisplay>
          {/* 객관식 문제 노출 시작 */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="options"
              element={
                <GridFormField
                  gridProps={{
                    multiple: true,
                    showAdd: true,
                    showRemove: true,
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 객관식 문제 노출 끝 */}
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const LearningResourceTestItemModal = LearningResourceTestItemModalComponent;
