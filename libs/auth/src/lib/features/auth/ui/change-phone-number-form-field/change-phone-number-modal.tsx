import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ModalBody, ModalContainer, ModalFooter, useModal, ModalTitle } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { DynamicFormField, ContentsRow } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import { FormRow } from '../../../../shared/ui';
import { useFetchAuthUser, useUpdatePhoneNumber } from '../../../../entities/authorization';

const TIME_LIMIT_VERIFY = 180;

const ChangePhoneNumberModalComponent = ({ widget }: { widget: any }) => {
  const { t } = useTranslation();
  const { close: closeModal, alert } = useModal();

  const { provider, fetchData, control, getValues, onFormValid, onSubmit, setFormError } =
    useDynamicForm(phoneNumberFormConfig);

  const { data: authUser } = useFetchAuthUser();
  const { update: updatePhoneNumber } = useUpdatePhoneNumber();

  useEffect(() => {
    if (!authUser) {
      return;
    }
    fetchData({
      currentPhoneNumber: authUser.phoneNumber,
      currentPhoneNumberNationCode: authUser.phoneNumberNationCode,
    });
  }, [authUser]);

  const handleOnSubmit = async (data: any) => {
    if (!authUser?.name || !authUser?.birthday) {
      return;
    }
    const payload = {
      name: authUser.name,
      birthday: String(authUser.birthday),
      currentPhoneNumber: authUser.phoneNumber,
      currentPhoneNumberNationCode: authUser.phoneNumberNationCode,
      newPhoneNumber: data.newPhoneNumber,
      newPhoneNumberNationCode: data.newPhoneNumberNationCode,
    };

    updatePhoneNumber(payload, {
      onSuccess: async (d, variables, context) => {
        await alert('LABEL.message.updatePhoneNumberResultMessage');
        closeModal({
          number: variables.newPhoneNumber,
          nationCode: variables.newPhoneNumberNationCode,
        });
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.common.phoneNumberChange')}</ModalTitle>

        <ModalBody>
          <ContentsRow type="no_line">
            <FormRow provider={provider}>
              <DynamicFormField name={'currentPhoneNumber'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow type="no_line">
            <FormRow provider={provider}>
              <DynamicFormField name={'newPhoneNumber'} />
            </FormRow>
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button
            label={t('LABEL.common.cancel')}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
          />
          <Button label={t('LABEL.common.update')} variant={'primary'} size={'lg'} type="submit" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ChangePhoneNumberModal = memo(ChangePhoneNumberModalComponent);

const phoneNumberFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'currentPhoneNumber',
      type: 'phone-number',
      label: 'LABEL.common.currentPhoneNumber',
      value: '',
      placeholder: 'LABEL.common.currentPhoneNumber',
      fields: {
        nationCode: 'currentPhoneNumberNationCode',
        number: 'currentPhoneNumber',
      },
      disabled: true,
    },
    {
      name: 'currentPhoneNumberNationCode',
      type: 'hidden',
      value: 'KR',
    },
    {
      name: 'newPhoneNumber',
      type: 'phone-number',
      label: 'LABEL.common.newPhoneNumber',
      value: '',
      placeholder: 'LABEL.common.newPhoneNumber',
      fields: {
        nationCode: 'newPhoneNumberNationCode',
        number: 'newPhoneNumber',
      },
    },
    {
      name: 'newPhoneNumberNationCode',
      type: 'hidden',
      value: 'KR',
    },
  ],
  validator: {
    newPhoneNumber: {
      format: 'phone-number',
      required: true,
    },
  },
};
