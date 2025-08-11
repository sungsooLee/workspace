import { generateYears } from '@learnway/shared';
import { FormRow2 } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { DropdownFormField } from '@shared/ui/form';
import { SearchBoxForm } from '@shared/ui/search-box';
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
          format="number"
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
