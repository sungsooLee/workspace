import { FC, useEffect } from 'react';
import TranslationContainer from './translation-container';
import { TranslationBody } from './translation-body';
import { Button, ContentsRow, useModal } from '@learnway/ui';
import { useDynamicForm } from '@learnway/hooks';
import { DynamicFormField } from '@learnway/ui';
import { FormRow } from '../../../../shared/ui/form';
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
