import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useDynamicForm2 } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { DatePicker, TimeRangePicker } from '@learnway/ui/date-picker';
import { FormRow2 } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect } from 'react';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';

/**
 * NLP_BO_LMS_0048 : 레벨 테스트 신청 내역 확인 팝업
 * @returns
 */
export interface StudentsLevelTestModalComponentProps {
  courseSequenceId: number;
  userId: number;
}

const StudentsLevelTestModalComponent = ({
  courseSequenceId: courseSequenceIdProps,
  userId: userIdProps }: StudentsLevelTestModalComponentProps) => {
  const { provider, updateFormData } = useDynamicForm2();
  const queryClient = useQueryClient();

  const initializeData = async () => {
    const payload = {
      courseSequenceId: courseSequenceIdProps,
      userId: userIdProps };
    // const payload = {
    //   courseSequenceId: 3,
    //   userId: 364,
    // };
    const result = await queryClient.fetchQuery(queryOptions.studentsLevelTest(payload));
    console.log('## result', result);
    if (result) {
      updateFormData({
        availableTestDate1: new Date(result.availableTestDate1),
        availableTestHour: {
          from: new Date(result.availableTestDate1),
          to: new Date(result.availableTestDate2) },
        preferLearnHour: {
          from: new Date(result.preferLearnDate1),
          to: new Date(result.preferLearnDate2) },
        familyName: result.familyName,
        firstName: result.firstName,
        preferGender: result.preferGender,
        telNo: result.telNo.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3') });
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('사전 레벨테스트')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.pop_contents}>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('영문성명')}
                name={'name'}
                type={'object'}
                element={
                  <>
                    <Input value={provider.getValues()?.firstName} disabled={true} />
                    <Input value={provider.getValues()?.familyName} disabled={true} />
                  </>
                }
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('휴대폰 번호')}
                name={'telNo'}
                element={<Input disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('강사 선호 성별')}
                name={'preferGender'}
                element={<Input disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('사전 레벨테스트 가능일')}
                name={'availableTestDate1'}
                element={<DatePicker displayType="day" disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('사전 레벨테스트 시간(2개 선택)')}
                name={'availableTestHour'}
                element={<TimeRangePicker disabled={true} readOnly={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                label={t('희망 교육 시간(2개 선택)')}
                name={'preferLearnHour'}
                element={<TimeRangePicker disabled={true} readOnly={true} />}
              />
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const StudentsLevelTestModal = StudentsLevelTestModalComponent;
