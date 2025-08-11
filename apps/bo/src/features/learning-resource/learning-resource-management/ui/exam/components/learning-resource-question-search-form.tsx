import { getDropdownOptions } from '@features/learning-resource/learning-resource-management';
import {
  QUESTION_LEVELS,
  QUESTION_TYPES,
} from '@features/learning-resource/learning-resource-management/service/exam-util';
import { CODE_GROUP, DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import {
  DropdownFormField,
  FormItem,
  FormRow2,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui/form';
import { SearchBoxForm } from '@shared/ui/search-box';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

interface CopyQuestionSearchFormProps {
  provider: DynamicFormProvider;
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  onSearch: (params: Record<string, any>) => Promise<void>;
  languageCountryCode?: string;
}

const LearningResourceQuestionSearchFormComponent = ({
  provider,
  onSubmit,
  onSearch,
  languageCountryCode = 'KO',
}: CopyQuestionSearchFormProps) => {
  const { t } = useTranslation();

  return (
    <SearchBoxForm onSearch={onSubmit(onSearch)}>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantId"
          label={t('LABEL.form.label.tenant')}
          type="custom"
          format="object"
          validation={{ required: true }}
          element={<TenantByRoleDropdownFormField />}
        />
        <FormRow2
          provider={provider}
          name="channelUuid"
          label={t('LABEL.form.label.channel')}
          type="custom"
          format="object"
          validation={{ required: true }}
          element={<TenantChannelDropdownFormField enableFilter />}
        />
        <FormRow2
          provider={provider}
          name="contentName"
          label={t('LABEL.form.label.contentName')}
          type="text"
          element={<Input />}
        />
        <FormRow2
          provider={provider}
          name="languageCountryCode"
          label={t('문항언어')}
          type="dropdown"
          format="string"
          value={languageCountryCode}
          element={
            <DropdownFormField
              optionsConfig={{ codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'] }}
              disabled
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="questionType"
          label={t('문항유형')}
          type="dropdown"
          format="string"
          value=""
          element={
            <DropdownFormField
              options={[{ value: '', label: t('전체') }, ...getDropdownOptions(QUESTION_TYPES(t))]}
            />
          }
        />
        <FormRow2
          provider={provider}
          name="questionLevel"
          label={t('난이도')}
          type="dropdown"
          format="string"
          value=""
          element={
            <DropdownFormField
              options={[{ value: '', label: t('전체') }, ...getDropdownOptions(QUESTION_LEVELS(t))]}
            />
          }
        />
        <FormItem />
        <FormItem />
      </ContentsRow>
    </SearchBoxForm>
  );
};

LearningResourceQuestionSearchFormComponent.displayName = 'CopyQuestionSearchForm';

export const CopyQuestionSearchForm = LearningResourceQuestionSearchFormComponent;
