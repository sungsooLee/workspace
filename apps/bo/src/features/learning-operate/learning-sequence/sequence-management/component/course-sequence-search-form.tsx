import { DateRangePickerFormField } from '@features/form';
import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { CODE_GROUP } from '@learnway/hooks';
import { generateYears } from '@learnway/shared';
import { ContentsRow, Input } from '@learnway/ui';
import {
  FormRow2,
  SearchBoxForm,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import React, { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

interface CourseSequenceSearchFormProps {
  provider: any;
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  onSearch: (data: any) => void;
}

export const CourseSequenceSearchForm: React.FC<CourseSequenceSearchFormProps> = ({
  provider,
  onSubmit,
  onSearch,
}) => {
  const { t } = useTranslation();

  return (
    <SearchBoxForm onSearch={onSubmit(onSearch)}>
      <ContentsRow>
        {/* 테넌트 */}
        <FormRow2
          provider={provider}
          name="tenantId"
          label={t('테넌트')}
          format={'number'}
          element={<TenantByRoleDropdownFormField />}
          validation={{
            required: true,
          }}
        />
        {/* 채널 */}
        <FormRow2
          provider={provider}
          name="channelUuid"
          label={t('LABEL.form.label.channel')}
          element={<TenantChannelDropdownFormField enableFilter={true} />}
          validation={{
            required: true,
          }}
        />
        {/* 개설년도 */}
        <FormRow2
          provider={provider}
          name="openingYear"
          label={t('LABEL.form.label.openingDate')}
          element={
            <DropdownFormField
              options={generateYears(10)}
              presetOptionLabel={t('LABEL.form.label.select', '선택')}
            />
          }
          validation={{
            required: true,
          }}
        />
        {/* 과정유형 */}
        <FormRow2
          provider={provider}
          name="courseType"
          label={t('LABEL.form.label.courseType')}
          element={
            <DropdownFormField
              presetOptionLabel={t('LABEL.form.label.select', '선택')}
              optionsConfig={{
                codeGroup: CODE_GROUP['lms.course.CourseType'],
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        {/* 과정명 */}
        <FormRow2
          provider={provider}
          name="courseName"
          label={t('LABEL.form.label.courseName')}
          element={<Input />}
        />
        {/* 차수명 */}
        <FormRow2
          provider={provider}
          name="courseSequenceName"
          label={t('LABEL.form.label.courseSequenceName')}
          element={<Input />}
        />
        {/* 상태 */}
        <FormRow2
          provider={provider}
          name="learningStatusType"
          label={t('LABEL.form.label.learningStatusType')}
          element={
            <DropdownFormField
              presetOptionLabel={t('LABEL.form.label.select', '선택')}
              optionsConfig={{
                codeGroup: CODE_GROUP['lms.sequence.LearningStatusType'],
              }}
            />
          }
        />
        {/* 학습 기간 */}
        <FormRow2
          provider={provider}
          name={'courseSequenceRange'}
          label={t('LABEL.form.label.courseSequenceRange')}
          type={'date-range'}
          format={'object'}
          value={{ from: undefined, to: undefined }}
          element={<DateRangePickerFormField />}
        />
      </ContentsRow>
    </SearchBoxForm>
  );
};
