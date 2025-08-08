import { DynamicFormProvider, SelectOption } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { DropdownFormField, FormItem, FormRow2 } from '@shared/ui/form';
import { SearchBoxForm } from '@shared/ui/search-box';
import { t } from 'i18next';
import { FormEventHandler } from 'react';

interface MultilingualSearchFormProps {
  provider: DynamicFormProvider;
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  onSearch: (params: Record<string, any>) => Promise<void>;
  keyTypeCodeOptions: SelectOption[];
  targetLocaleOptions: SelectOption[];
  keyTypeCode?: string;
}

export const MultilingualSearchForm = ({
  provider,
  onSubmit,
  onSearch,
  keyTypeCodeOptions,
  targetLocaleOptions,
  keyTypeCode,
}: MultilingualSearchFormProps) => {
  return (
    <SearchBoxForm onSearch={onSubmit(onSearch)}>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="keyTypeCode"
          label={t('분류')}
          type="dropdown"
          format="string"
          value=""
          validation={{ required: true }}
          element={<DropdownFormField options={keyTypeCodeOptions} />}
        />
        <FormRow2
          provider={provider}
          name="targetLocale"
          label={t('번역언어')}
          type="dropdown"
          format="string"
          value=""
          validation={{ required: true }}
          element={<DropdownFormField options={targetLocaleOptions} />}
        />
        <FormRow2
          provider={provider}
          name="isTranslated"
          label={t('번역상태')}
          type="dropdown"
          format="string"
          value=""
          element={
            <DropdownFormField
              options={[
                { value: '', label: t('전체') },
                { value: 'true', label: t('번역완료') },
                { value: 'false', label: t('번역필요') },
              ]}
            />
          }
        />
        <FormRow2
          provider={provider}
          name="multilingualKey"
          label={t('LABEL.platform.system.multilingual.multilingualKey')}
          type="text"
          element={
            <Input
              placeholder={
                keyTypeCode
                  ? t(
                      `LABEL.platform.system.multilingual.placeholder.multilingualKey.${keyTypeCode}`,
                    )
                  : t('LABEL.platform.system.multilingual.placeholder.multilingualKey.default')
              }
            />
          }
        />
      </ContentsRow>

      <ContentsRow>
        <FormRow2
          provider={provider}
          name="translation"
          label={t('LABEL.platform.system.multilingual.translation')}
          type="text"
          element={
            <Input
              placeholder={
                keyTypeCode
                  ? t(`LABEL.platform.system.multilingual.placeholder.translation.${keyTypeCode}`)
                  : t('LABEL.platform.system.multilingual.placeholder.translation.default')
              }
            />
          }
        />
        <FormItem />
      </ContentsRow>
    </SearchBoxForm>
  );
};
