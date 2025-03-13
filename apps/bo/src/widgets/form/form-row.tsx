import { Children, FC } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';
import { Button, Tooltip } from '@learnway/ui';
import { FormRowProps, useFormRow } from '@learnway/hooks';
import { FormGuideText } from '../../shared/ui/form';
import { formFieldConfig } from '../../shared/ui/form/form-field-config';

/**
 * FormRowComponent
 * -------------------------------------------------------------------
 * - provider와 builder 설정을 기반으로 DynamicFormField들을 감싸며,
 *   레이블, 에러 메시지, 안내 텍스트 등 폼의 공통 레이아웃을 구성.
 * - 내부에서 children을 재귀적으로 순회하면서 DynamicFormField에 추가 props
 *   (control, component 등)를 주입.
 *
 * @param className - 추가 CSS 클래스
 * @param provider - react-hook-form 및 빌더 관련 프로바이더 객체
 * @param children - 폼 필드들 (DynamicFormField 포함)
 * @param name - 명시적으로 지정한 name (없으면 내부의 첫번째 DynamicFormField의 name 사용)
 */
const FormRowComponent: FC<FormRowProps> = ({ className, provider, children, name }) => {
  const { formName, rootConfig, isRequired, error, guideText, fieldRefs, renderFormRowContent } =
    useFormRow(provider, children, name);

  return (
    <div
      className={cn(styles.form_item, className)}
      ref={(node) => {
        if (fieldRefs.current) {
          fieldRefs.current[formName] = node as HTMLElement | null;
        }
      }}>
      {/* 레이블 렌더링 */}
      {rootConfig.label && (
        <label htmlFor={formName} className={cn(styles.form_label, 'dynamic-form-field-label')}>
          <span className={styles.form_text}>{rootConfig.label}</span>
          {isRequired && (
            <span
              className={cn(styles.status, {
                [styles.error]: error.isError, // 에러 발생 시 에러 스타일 적용
                [styles.required]: !error.isError, // 에러가 없으면 필수 스타일 적용
              })}>
              <IcoFormRequired width={8} height={8} />
            </span>
          )}
          {rootConfig.tooltip && (
            <Tooltip
              className={styles.tooltip}
              side="right"
              align="start"
              content={rootConfig.tooltip}>
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          )}
          {rootConfig.subText && <span className={styles.sub_text}>{rootConfig.subText}</span>}
        </label>
      )}
      {/* 입력 영역: children을 순회하며 필요한 변환(renderChild) 적용 */}
      <div className={styles.input_box}>
        {Children.map(children, (child) => renderFormRowContent(child, formFieldConfig))}
      </div>
      {/* 안내 텍스트 또는 에러 메시지 렌더링 */}
      {!error.isError &&
        (guideText ? (
          <FormGuideText>{guideText}</FormGuideText>
        ) : (
          rootConfig.guideText && <FormGuideText>{rootConfig.guideText}</FormGuideText>
        ))}
      {error.isError && (
        <p className={cn(styles.guide_text, styles.error, 'dynamic-form-field-error')}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export const FormRow = FormRowComponent;
