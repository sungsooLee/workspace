import React from 'react';
import { Button } from '@learnway/ui';
import { IcoMinus } from '@learnway/icons';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FROM_STATUS, FORM_MODE } from '@shared/const';
import { FormState } from '../types/form.types';

interface FormActionButtonsProps {
  formStatus: FROM_STATUS;
  mode: FORM_MODE;
  formState: FormState;
  onDelete: () => void;
  onSave: () => void;
}

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  formStatus,
  mode,
  formState,
  onDelete,
  onSave,
}) => {
  if (
    formStatus !== FROM_STATUS.NONE &&
    (mode === FORM_MODE.create || mode === FORM_MODE.detail)
  ) {
    return (
      <>
        <Button
          variant="text"
          size="sm"
          className={layoutStyles.btn_text}
          icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
          onClick={onDelete}
        >
          {t('LABEL.button.delete')}
        </Button>
        <Button
          type="button"
          variant="save"
          size="sm"
          onClick={onSave}
        >
          {t('LABEL.button.save')}
        </Button>
      </>
    );
  }
  return null;
};