import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Input } from '@learnway/ui/input';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { TextareaFormField } from '@learnway/ui/form-field';
import { ContentsRow } from '@learnway/ui/contents-row';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { SingleAttachmentFormField } from '@shared/ui/form';
import { EnFormMode } from '@shared/types';
import {
  AssignmentSubmissionCreateReq,
  AssignmentSubmissionItem,
  AssignmentSubmissionMutationReq,
  AssignmentSubmissionUpdateReq,
  ContentInformation,
  learningResourceQueryOptions,
} from '@entities/learning-resource';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/popup-question-detail.module.css';
import { useAssignmentSubmissionInputForm } from '@features/learning-resource/learning-resource-management/service/assignment/use-assignment-submission-input-form';

interface AssignmentItemModalProps {
  contentInfo: ContentInformation;
  submissionRowItem?: AssignmentSubmissionItem;
  hasMapping?: boolean;
  onSuccessCallback?: () => void | Promise<void>;
  onDeleteCallback?: () => void | Promise<void>;
}

const LearningResourceAssignmentItemModalComponent = ({
  contentInfo,
  submissionRowItem,
  hasMapping = false,
  onSuccessCallback,
  onDeleteCallback,
}: AssignmentItemModalProps) => {
  const { t } = useTranslation();
  const { closeModal, confirm: openConfirm } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const formMode = useMemo(
    () => (submissionRowItem ? EnFormMode.VIEW : EnFormMode.ADD),
    [submissionRowItem],
  );

  const { provider, onSubmit, updateFormData } = useDynamicForm2();

  const { data: submissionItem } = useQuery(
    learningResourceQueryOptions.getAssignmentSubmissionDetail(
      submissionRowItem?.assignmentSubmissionUuid ?? '',
    ),
  );

  const { createSubmissionItem, updateSubmissionItem, deleteSubmissionItemList } =
    useAssignmentSubmissionInputForm(contentInfo.contentUuid);

  const handleDeleteButtonClick = useCallback(async () => {
    if (!submissionRowItem) {
      return;
    }

    const payload: AssignmentSubmissionMutationReq = {
      contentUuid: contentInfo.contentUuid,
      assignmentSubmissionUuidList: [submissionRowItem.assignmentSubmissionUuid],
    };

    if (
      await openConfirm({
        title: t('삭제 하시겠습니까?'),
        content: t('삭제 후 목록으로 이동합니다.'),
      })
    ) {
      deleteSubmissionItemList(payload, {
        onSuccess: (result: unknown) => {
          onDeleteCallback?.();
          closeModal();
        },
      });
    }
  }, []);

  const handleSaveButtonClick = useCallback(() => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }, []);

  const handleSubmit = async (data: Record<string, any>) => {
    const result = await openConfirm({
      title: t('저장 하시겠습니까?'),
      content: t('입력한 정보로 저장합니다.'),
    });
    if (!result) {
      return;
    }

    const payload = { ...data, contentUuid: contentInfo.contentUuid };
    console.log(formMode, payload);

    if (formMode === EnFormMode.VIEW) {
      if (!submissionRowItem) {
        return;
      }

      Object.assign(payload, {
        assignmentSubmissionUuid: submissionRowItem.assignmentSubmissionUuid,
      });

      updateSubmissionItem(payload as AssignmentSubmissionUpdateReq, {
        onSuccess: (result: unknown) => {
          onSuccessCallback?.();
          closeModal();
        },
      });
    } else {
      createSubmissionItem(payload as AssignmentSubmissionCreateReq, {
        onSuccess: (result: unknown) => {
          onSuccessCallback?.();
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    if (!submissionItem) {
      return;
    }

    updateFormData(submissionItem);
  }, [submissionItem]);

  return (
    <ModalContainer>
      <ModalTitle>{t('과제물 상세')}</ModalTitle>
      <ModalBody>
        <form ref={formRef} onSubmit={onSubmit(handleSubmit)}>
          <div className={cn(popupStyles.wrap, styles.start)}>
            <FormSubTitle label={t('과제 정보')} noLine />
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
                    <th>{t('테넌트')}</th>
                    <td>{contentInfo.tenantName}</td>
                    <th>{t('채널')}</th>
                    <td>{contentInfo.channelName}</td>
                  </tr>
                  <tr>
                    <th>{t('교육자원명')}</th>
                    <td>{contentInfo.contentName}</td>
                    <th>{t('언어')}</th>
                    <td>
                      {t(`pms.multilingual.LangCountryCode.${contentInfo.languageCountryCode}`)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <FormSubTitle label={t('과제물 정보')} lineType="dark" />
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="assignmentSubmissionText"
                label={t('과제물명')}
                format="string"
                validation={{ required: true }}
                element={<Input maxLength={150} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="explainText"
                label={t('설명')}
                format="string"
                validation={{ required: true }}
                element={<TextareaFormField maxLength={2000} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="attachFileUuid"
                label={t('첨부 파일')}
                element={
                  <SingleAttachmentFormField
                    uploadConfig={{
                      affairsType: 'CMS',
                      s3Path: S3_PATH['upload/content/image'],
                    }}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="answerFileUuid"
                label={t('답안 파일')}
                element={
                  <SingleAttachmentFormField
                    uploadConfig={{
                      affairsType: 'CMS',
                      s3Path: S3_PATH['upload/content/image'],
                    }}
                  />
                }
              />
            </ContentsRow>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant="gray" size="lg" onClick={closeModal} />
        {formMode === EnFormMode.VIEW && (
          <Button
            label={t('삭제')}
            variant="gray"
            size="lg"
            onClick={handleDeleteButtonClick}
            disabled={hasMapping}
          />
        )}
        <Button label={t('저장')} variant="primary" size="lg" onClick={handleSaveButtonClick} />
      </ModalFooter>
    </ModalContainer>
  );
};

LearningResourceAssignmentItemModalComponent.displayName = 'LearningResourceAssignmentItemModal';

export const LearningResourceAssignmentItemModal = LearningResourceAssignmentItemModalComponent;
