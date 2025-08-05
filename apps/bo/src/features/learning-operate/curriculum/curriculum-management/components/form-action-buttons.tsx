import { MAPPING_CURRICULUM_TYPE, MODULE_TYPE } from '@entities/curriculum';
import { IcoMinus } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { Button } from '@learnway/ui/button';
import { FORM_MODE, FROM_STATUS } from '@shared/const';
import { t } from 'i18next';
import React from 'react';
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
  if (formStatus !== FROM_STATUS.NONE && (mode === FORM_MODE.create || mode === FORM_MODE.detail)) {
    // FIXED모듈 하위의 레슨일 경우에는 disabled 처리
    const isLessonUnderFixedModule =
      formState.activeFormType === MAPPING_CURRICULUM_TYPE.LESSON &&
      formState.selectedNode?.type === MAPPING_CURRICULUM_TYPE.LESSON &&
      formState.parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
      formState.parentNode?.data?.moduleType === MODULE_TYPE.FIXED;
    return (
      <>
        <Button
          variant="text"
          size="sm"
          className={layoutStyles.btn_text}
          icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
          onClick={onDelete}
          disabled={!formState.isEditing || isLessonUnderFixedModule}
        >
          {t('LABEL.button.delete')}
        </Button>
        <Button type="button" variant="save" size="sm" onClick={onSave}>
          {t('LABEL.button.save')}
        </Button>
      </>
    );
  }
  return null;
};
