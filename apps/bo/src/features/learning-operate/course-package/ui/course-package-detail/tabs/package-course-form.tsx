import { useCoursePackageDetailPackageInfo } from '@features/learning-operate/course-package/hooks/use-course-package-detail-package-info';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { ContentsRow } from '@learnway/ui/contents-row';
import { InputModalSelectorFormField } from '@learnway/ui/form-field';
import { useModal } from '@learnway/ui/modal';
import {
  DropdownFormField,
  FormRow2,
  InputFormField,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField2,
} from '@shared/ui/form';
import { UserChoiceModal } from '@shared/ui/modal';
import { useTranslation } from 'react-i18next';

const PackageCourseFormComponent = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const { provider, getValues, onFormChange } = useCoursePackageDetailPackageInfo();

  return (
    <div className={layoutStyles.inner_contents}>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'location'}
          element={<InputFormField disabled={true} />}
        />
      </ContentsRow>

      <ContentsRow>
        {/*테넌트*/}
        <FormRow2
          provider={provider}
          name="tenantId"
          label="테넌트"
          format={'number'}
          element={<TenantByRoleDropdownFormField />}
          validation={{
            required: true,
          }}
        />
      </ContentsRow>
      <ContentsRow>
        {/*채널*/}
        <FormRow2
          provider={provider}
          name={'channelUuid'}
          label={t('채널')}
          disabled
          validation={{ required: true, format: 'string' }}
          element={<TenantChannelDropdownFormField2 tenantId={-1} />}
        />
      </ContentsRow>
      <ContentsRow>
        {/*과정명*/}
        <FormRow2
          provider={provider}
          name={'courseName'}
          label={t('과정명')}
          validation={{ required: true, format: 'string' }}
          element={<InputFormField maxLength={40} />}
        />
      </ContentsRow>
      <ContentsRow>
        {/*과정유형*/}
        <FormRow2
          provider={provider}
          name={'courseType'}
          label={t('과정 유형')}
          validation={{ required: true, format: 'string' }}
          element={<DropdownFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        {/* 학습시간  */}
        <FormRow2
          provider={provider}
          name={'recognizedStudyDatetime'}
          label={t('학습시간')}
          validation={{ required: true, format: 'object' }}
          element={
            <>
              <FormRow2
                provider={provider}
                name={'recognizedStudyHours'}
                format={'number'}
                element={<InputFormField type={'number'} min={0} suffixText={t('시간')} />}
              />
              <FormRow2
                provider={provider}
                name={'recognizedStudyMinutes'}
                format={'number'}
                element={<InputFormField type={'number'} min={0} suffixText={t('분')} />}
              />
              <FormRow2
                provider={provider}
                name={'recognizedStudySeconds'}
                format={'number'}
                element={<InputFormField type={'number'} min={0} suffixText={t('초')} />}
              />
            </>
          }
        />
        {/* <FormRow2
          provider={provider}
          name={'recognizedStudyHours'}
          format={'number'}
          element={<InputFormField type={'number'} min={0} suffixText={t('시간')} />}
        />
        <FormRow2
          provider={provider}
          name={'recognizedStudyMinutes'}
          format={'number'}
          element={<InputFormField type={'number'} min={0} suffixText={t('분')} />}
        />
        <FormRow2
          provider={provider}
          name={'recognizedStudySeconds'}
          format={'number'}
          element={<InputFormField type={'number'} min={0} suffixText={t('초')} />}
        /> */}
      </ContentsRow>
      <ContentsRow>
        {/*담당자*/}
        <FormRow2
          provider={provider}
          name={'coordinatorName'}
          label={t('담당자')}
          validation={{ required: true, format: 'string' }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <UserChoiceModal />,
              }}
              transformModalData={(data: any) => ({
                coordinatorUuid: data.uuid,
                coordinatorName: `${data.name}/${data?.dept?.deptName}`,
                coordinatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                coordinatorTelNo: data.phoneNumber,
                coordinatorEmail: data.email,
              })}
            />
          }
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'coordinatorTelNo'}
          label={t('연락처')}
          validation={{ required: true, format: 'string' }}
          element={<InputFormField />}
        />
      </ContentsRow>
    </div>
  );
};

export const PackageCourseForm = PackageCourseFormComponent;
