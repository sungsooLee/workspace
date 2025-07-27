import {
  ContentsRow,
  EditorFormField,
  FormSubTitle,
  Input,
  RadioGroupFormField,
} from '@learnway/ui';
import { FormRow2, SwitchFormField } from '@shared/ui';
import { useEffect } from 'react';
import { DateRangePickerFormField } from '@features/form';
import { useExternalEducationPopup } from '@features/external-education/hooks/use-external-education-popup';

interface PopupProps {
  formId?: number;
  isActive?: boolean;
  onRegisterSave?: (saveFn: () => Promise<boolean>) => void;
}

export function Popup({ formId, isActive, onRegisterSave }: PopupProps) {
  const { 
    provider, 
    saveFunction, 
    handleFormSubmit, 
    isPopupPeriod 
  } = useExternalEducationPopup(formId, isActive);

  // 저장 함수 등록
  useEffect(() => {
    if (!onRegisterSave) return;
    onRegisterSave(saveFunction);
  }, [onRegisterSave, saveFunction]);

  return (
    <form onSubmit={handleFormSubmit}>
      <FormSubTitle label="팝업" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'popupTitle'}
          label="제목"
          validation={{ required: true }}
          element={<Input />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'popupContent'}
          label="팝업내용"
          format="object"
          validation={{ required: true }}
          element={<EditorFormField />}
        />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow2
          provider={provider}
          name={'isPopupPeriod'}
          label="게시기간"
          format="boolean"
          element={
            <SwitchFormField
              switchConfig={{
                label: (value: boolean) => (value ? '기간 설정' : '미설정'),
              }}
            />
          }
        />
      </ContentsRow>
      {isPopupPeriod && (
        <ContentsRow type="horizontal">
          <FormRow2
            provider={provider}
            name={'dateRange'}
            format={'object'}
            element={<DateRangePickerFormField />}
          />
        </ContentsRow>
      )}

      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'isPopupExposed'}
          label="팝업 노출 여부"
          format={'boolean'}
          element={
            <RadioGroupFormField
              options={[
                { label: '노출', value: true },
                { label: '비노출', value: false },
              ]}
            />
          }
        />
      </ContentsRow>
    </form>
  );
}
