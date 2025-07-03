import { FC, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

/**
 * FormRow 의 가이드 텍스트 컴포넌트
 * @param children
 * @constructor
 */
const FormGuideTextComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={cn(styles.guide_text, 'dynamic-form-field-guide-text')}>{children}</p>;
};

FormGuideTextComponent.displayName = 'FormGuideText';
export const FormGuideText = FormGuideTextComponent;
