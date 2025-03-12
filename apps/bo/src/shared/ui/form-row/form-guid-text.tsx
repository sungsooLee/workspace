import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

const FormGuideTextComponent: FC<any> = ({ children }) => {
  return <p className={cn(styles.guide_text, 'dynamic-form-field-guide-text')}>{children}</p>;
};

FormGuideTextComponent.displayName = 'FormGuideText';
export const FormGuideText = FormGuideTextComponent;
