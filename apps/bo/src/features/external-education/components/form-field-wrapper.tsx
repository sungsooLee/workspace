import React from 'react';
import { cn } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

interface FormFieldWrapperProps {
  label?: string;
  required?: boolean;
  error?: string;
  description?: string;
  fieldKey?: string;
  preview?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * FieldRenderer용 래퍼 컴포넌트
 * base-form-row2.tsx의 구조를 참고하여 label과 required 표시를 담당
 */
export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  required = false,
  error,
  description,
  fieldKey,
  preview = false,
  children,
  className,
}) => {
  const isRequired = required;
  const hasError = !!error;

  return (
    <div className={cn(styles.form_item, className)}>
      {/* 레이블 렌더링 */}
      {label && (
        <label htmlFor={fieldKey} className={cn(styles.form_label, 'flex')}>
          <span className={styles.form_text}>{label}</span>
          {isRequired && (
            <span
              className={cn(styles.status, {
                [styles.error]: hasError, // 에러 발생 시 에러 스타일 적용
                [styles.required]: !hasError, // 에러가 없으면 필수 스타일 적용
              })}
            >
              <IcoFormRequired width={8} height={8} />
            </span>
          )}
          {preview && fieldKey && <span className="ml-2 text-xs text-blue-600">[{fieldKey}]</span>}
        </label>
      )}

      {/* 입력 영역 */}
      <div className={styles.input_box}>{children}</div>

      {/* 안내 텍스트 또는 에러 메시지 렌더링 */}
      {!hasError && description && <p className={cn(styles.guide_text)}>{description}</p>}
      {hasError && <p className={cn(styles.guide_text, styles.error)}>{error}</p>}
    </div>
  );
};
