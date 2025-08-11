import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useDynamicForm2 } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { FormRow2 } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect } from 'react';

/**
 * NLP_BO_LMS_0047 : 교재배송지 확인 팝업
 * @returns
 */
export interface StudentsBookDeliveryModalComponentProps {
  courseSequenceId: number;
  userId: number;
}

const StudentsBookDeliveryModalComponent = ({
  courseSequenceId: courseSequenceIdProps,
  userId: userIdProps,
}: StudentsBookDeliveryModalComponentProps) => {
  const { provider, updateFormData } = useDynamicForm2();
  const queryClient = useQueryClient();

  const initializeData = async () => {
    const payload = {
      courseSequenceId: courseSequenceIdProps,
      userId: userIdProps,
    };
    // const payload = {
    //   courseSequenceId: 3,
    //   userId: 364,
    // };
    const result = await queryClient.fetchQuery(queryOptions.studentsDeliveryAddress(payload));
    if (result) {
      updateFormData({
        recipientName: result.recipientName,
        telNo: result.telNo.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'),
        address: `${result.postalCode} ${result.address} ${result.addressDetail}`,
      });
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('교재 배송지')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.pop_contents}>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('이름')}
                name={'recipientName'}
                element={<Input placeholder=" " disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('휴대폰 번호')}
                name={'telNo'}
                element={<Input placeholder=" " disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('주소')}
                name={'address'}
                element={<Input placeholder=" " disabled={true} />}
              />
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const StudentsBookDeliveryModal = StudentsBookDeliveryModalComponent;
