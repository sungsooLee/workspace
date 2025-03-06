import { FC, useEffect } from 'react';
import TranslationContainer from './translation-container';
import useDynamicForm from '../ui/dynamic-form-field/use-dynamic-fom';
import { TranslationBody } from './translation-body';
import { FormRow } from '../ui/form-row';
import { DynamicFormField } from '../ui/dynamic-form-field';
import { FormTranslationBox } from '../../features/platform/ui/platform/system/translation/form-translation-box';
import { ContentsRow } from '../../widgets/layout/ui/container/parts/contents-row';
import { Button, useModal } from '@learnway/ui';

const TranslationPopupComponent: FC<any> = ({ translations, config, defaultLang }) => {
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
