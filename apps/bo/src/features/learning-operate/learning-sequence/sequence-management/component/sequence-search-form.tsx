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

interface SequenceSearchFormProps {
  provider: any;
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  onSearch: (data: any) => void;
}

export const SequenceSearchForm: React.FC<SequenceSearchFormProps> = ({
  provider,
  onSubmit,
  onSearch,
}) => {
  const { t } = useTranslation();

  return (
    <SearchBoxForm onSearch={onSubmit(onSearch)}>
      <ContentsRow>
        {/* 개설년도 */}
        <FormRow2
          provider={provider}
          name="openingYear"
          label={t('LABEL.form.label.openingDate')}
          element={
            <DropdownFormField
              options={generateYears(10)}
              presetOptionLabel={t('LABEL.form.label.all')}
            />
          }
          validation={{
            required: true,
          }}
        />
        {/* 사용여부 */}
        <FormRow2
          provider={provider}
          name="isUsed"
          label={t('LABEL.form.label.useYn')}
          element={
            <DropdownFormField
              options={[
                { label: t('사용'), value: 'true' },
                { label: t('미사용'), value: 'false' },
              ]}
            />
          }
          validation={{
            required: true,
          }}
        />
        {/* 차수명 */}
        <FormRow2
          provider={provider}
          name="courseSequenceName"
          label={t('LABEL.form.label.courseSequenceName')}
          element={<Input />}
        />
      </ContentsRow>
    </SearchBoxForm>
  );
};
