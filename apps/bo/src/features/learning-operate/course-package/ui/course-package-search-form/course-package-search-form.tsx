import { CODE_GROUP } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import {
  DropdownFormField,
  FormRow2,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui/form';
import { SearchBoxForm } from '@shared/ui/search-box';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CoursePackageSearchFormData } from '../../types/type';
interface CoursePackageSearchFormProps {
  provider: any;
  onSubmit: (
    handler: (data: CoursePackageSearchFormData) => void,
  ) => (event: React.FormEvent) => void;
  onSearch: (data: CoursePackageSearchFormData) => void;
  onReset: () => void;
}

export const CoursePackageSearchForm: React.FC<CoursePackageSearchFormProps> = ({
  provider,
  onSubmit,
  onSearch,
  onReset,
}) => {
  const { t } = useTranslation();

  return (
    <SearchBoxForm onSearch={onSubmit(onSearch)} onReset={onReset}>
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
        {/* 패키지명 */}
        <FormRow2
          provider={provider}
          name="packageName"
          label={t('LABEL.form.label.packageName')}
          element={<Input />}
        />
        {/* 사용여부 */}
        <FormRow2
          provider={provider}
          name="isUsed"
          label={t('LABEL.form.label.useYn')}
          format={'boolean'}
          element={
            <DropdownFormField
              presetOptionLabel={t('LABEL.form.label.all')}
              optionsConfig={{
                codeGroup: CODE_GROUP['mock.options.use'],
              }}
            />
          }
        />
      </ContentsRow>
    </SearchBoxForm>
  );
};
