import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalTitle,
  useModal,
  ContentsRow,
  TextareaFormField,
  ModalFooter,
  Input,
  RadioGroupFormField,
} from '@learnway/ui';
import { FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  DuplicateCheckInputFormField,
  DuplicateState,
} from '@features/tenant/management/ui/duplicate-check-input-form-field';
import { AddressSearchModal } from './address-search-modal';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { DropdownFormField, InputFormField } from '@features/form';

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;

const TrainingPlaceDetailModalComponent = ({ mode }: { mode: string }) => {
  const { open: openModal, close: closeModal, alert: openAlert } = useModal();
  const { provider, fetchData, onSubmit, getValues, onFormChange } = useDynamicForm(formConfig);

  const handleOnSubmit = (node: any) => {
    openAlert({
      title: 'API가 준비중입니다.',
    });
  };

  const handleOnClose = () => {
    closeModal();
  };

  const duplicateCheck = async (educationPlaceCode: string) => {
    const payload = { educationPlaceCode: educationPlaceCode };
    // TODO.
    //const result: boolean = await XXXService.existsCode(payload);
    const result = false;

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  const isUsedFormField = (
    <FormRow
      provider={provider}
      name={'isUsed'}
      element={<SwitchFormField disabled={mode === 'view'} />}
    />
  );

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    fetchData({ ...getValues(), addr: address.roadAddr });
  };

  const handleSearchAddress = async () => {
    openModal({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
    });
  };

  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
      <ModalContainer>
        <ModalTitle>{mode === 'view' ? t('교육공간 상세') : t('교육공간 등록')}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <FormSubTitle label={'기본정보'} lineType="dark" />
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'tenantId'}
                element={<DropdownFormField disabled={mode === 'view'} />}
              />
              <FormRow
                provider={provider}
                name={'educationPlaceType'}
                element={<RadioGroupFormField disabled={mode === 'view'} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'educationPlaceCode'}
                element={
                  <DuplicateCheckInputFormField
                    onDuplicationCheck={duplicateCheck}
                    disabled={mode === 'view'}
                  />
                }
              />
              <FormRow
                provider={provider}
                name={'educationPlaceName'}
                element={<InputFormField disabled={mode === 'view'} />}
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'educationPlaceType', value: 'ONLINE' }]}
            >
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'mapImageLinkContent'}
                  element={<InputFormField disabled={mode === 'view'} />}
                />
                {isUsedFormField}
              </ContentsRow>
            </FormDisplay>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'educationPlaceType', value: 'OFFLINE' }]}
            >
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'addr'}
                  element={<Input showSearchIcon onEnterKeyDown={handleSearchAddress} />}
                />
                <FormRow provider={provider} name={'addrDetail'} />
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider} name={'mapImageFileInfo'} />
                {isUsedFormField}
              </ContentsRow>
            </FormDisplay>

            <FormSubTitle label={'기타정보'} lineType="dark" />
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'educationPlaceRemarkContent'}
                element={<TextareaFormField resize={'none'} />}
              />
            </ContentsRow>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button type="submit" label={t('확인')} variant={'primary'} size={'lg'} />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const TrainingPlaceDetailModal = TrainingPlaceDetailModalComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantId',
      type: 'dropdown',
      format: 'number',
      label: t('테넌트'),
      value: '',
      presetOptionLabel: t('선택'),
      optionsConfig: {
        codeGroup: CODE_GROUP['manual.tenant.tenantId'],
      },
    },
    {
      name: 'educationPlaceType',
      type: 'radio-group',
      label: t('교육공간 타입'),
      value: 'OFFLINE',
      options: [
        { value: 'ONLINE', label: t('온라인') },
        { value: 'OFFLINE', label: t('오프라인') },
      ],
    },
    {
      name: 'educationPlaceCode',
      type: 'custom',
      label: t('교육공간 코드'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
    },
    {
      name: 'educationPlaceName',
      type: 'text',
      label: t('교육공간명'),
      value: '',
      placeholder: '',
      maxLength: 40,
    },
    {
      name: 'educationPlaceRemarkContent',
      type: 'textarea',
      label: t('메모'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'mapImageLinkContent',
      type: 'text',
      label: t('링크주소'),
      value: '',
      placeholder: '',
    },
    {
      name: 'addr',
      type: 'text',
      label: t('주소'),
      value: '',
      placeholder: '',
    },
    {
      name: 'addrDetail',
      type: 'text',
      label: t('상세 주소'),
      value: '',
      placeholder: '',
      maxLength: 50,
    },
    {
      name: 'mapImageFileInfo',
      type: 'text',
      label: t('약도 파일'),
      value: '',
      placeholder: '',
    },
  ],
  validator: {
    tenantId: true,
    educationPlaceType: true,
    educationPlaceCode: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.educationPlaceCode.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('교육공간 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.educationPlaceCode.checkState === DuplicateState.check ||
            values.educationPlaceCode.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('교육공간 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.educationPlaceCode.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('교육공간 코드') }),
        },
      ],
    },
    educationPlaceName: true,
    isUsed: true,
    mapImageLinkContent: {
      required: false,
      conditions: [
        {
          fn: (values) => {
            if (values.mapImageLinkContent.trim().length === 0) return false;
            const pattern = new RegExp(URL_REGEX, 'i');
            return !pattern.test(values.mapImageLinkContent.trim());
          },
          message: t('URL 형식에 맞게 입력해 주세요.'),
        },
      ],
    },
  },
};
