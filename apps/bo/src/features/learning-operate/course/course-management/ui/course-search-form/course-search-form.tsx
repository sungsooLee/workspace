import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { CODE_GROUP } from '@learnway/hooks';
import { generateYears } from '@learnway/shared';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import {
  FormRow2,
  SearchBoxForm,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CourseSearchFormData } from '../../types/type';

interface CourseSearchFormProps {
  provider: any;
  onSubmit: (handler: (data: CourseSearchFormData) => void) => (event: React.FormEvent) => void;
  onSearch: (data: CourseSearchFormData) => void;
}

export const CourseSearchForm: React.FC<CourseSearchFormProps> = ({
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
          label="테넌트"
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
          name="openingDate"
          label={t('LABEL.form.label.openingDate')}
          element={
            <DropdownFormField
              options={generateYears(10)}
              presetOptionLabel={t('LABEL.form.label.all')}
            />
          }
        />
        {/* 과정유형 */}
        <FormRow2
          provider={provider}
          name="courseType"
          label={t('LABEL.form.label.courseType')}
          element={
            <DropdownFormField
              presetOptionLabel={t('LABEL.form.label.all')}
              optionsConfig={{
                codeGroup: CODE_GROUP['lms.course.CourseType'],
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        {/* 사용여부 */}
        <FormRow2
          provider={provider}
          name="useYn"
          label={t('LABEL.form.label.useYn')}
          element={
            <DropdownFormField
              presetOptionLabel={t('LABEL.form.label.all')}
              optionsConfig={{
                codeGroup: CODE_GROUP['mock.options.use'],
              }}
            />
          }
        />
        {/* 담당자/운영자 */}
        <FormRow2
          provider={provider}
          name="adminName"
          label={t('LABEL.form.label.coordinator/Operator')}
          element={<Input />}
        />
        {/* 과정코드 */}
        <FormRow2
          provider={provider}
          name="courseCode"
          label={t('LABEL.form.label.courseCode')}
          element={<Input />}
        />
        {/* 과정명 */}
        <FormRow2
          provider={provider}
          name="courseName"
          label={t('LABEL.form.label.courseName')}
          element={<Input />}
        />
      </ContentsRow>
    </SearchBoxForm>
  );
};
