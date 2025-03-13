import { FC, useEffect } from 'react';
import TranslationContainer from './translation-container';
import { TranslationBody } from './translation-body';
import { Button, ContentsRow, useModal } from '@learnway/ui';
import useDynamicForm from '@/libs/hooks/src/lib/form-builder/use-dynamic-form';
import { DynamicFormField } from '@/libs/ui/src/lib/dynamic-form-field';
import { FormRow } from '../../../../widgets/form/form-row';
import { FormTranslationBox } from '../../../platform/ui/platform/system/translation/form-translation-box';
import { TranslationPopupProps } from './type';

const TranslationPopupComponent: FC<TranslationPopupProps> = ({
  translations,
  config,
  defaultLang,
}) => {
  const { provider, control, onSubmit, fetchData } = useDynamicForm(config);
  const { close } = useModal();
  const handleOnSubmit = (data: any) => {
    console.log('popup data {} => ', data);
    close(data);
  };

  useEffect(() => {
    fetchData(translations);
  }, []);
  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <TranslationContainer control={control} defaultLang={defaultLang}>
        <TranslationBody>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={`translations.translation`}>
                <FormTranslationBox />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
        </TranslationBody>
        <ContentsRow>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
        </ContentsRow>
      </TranslationContainer>
    </form>
  );
};

export const TranslationPopup = TranslationPopupComponent;
