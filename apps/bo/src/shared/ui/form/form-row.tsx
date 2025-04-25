import React, { Children, FC, isValidElement, memo, ReactNode, useEffect, useMemo } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';
import { Button, Tooltip } from '@learnway/ui';
import {
  DynamicFormContextProvider,
  FormRowProps,
  useDynamicFormContext,
  useFormRow,
} from '@learnway/hooks';
import { formFieldConfig } from './form-field-config';
import { FormGuideText } from './form-guide-text';
import { useTranslation } from 'react-i18next';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';

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
  return (
    <DynamicFormContextProvider>
      <DynamicFormContainer
        className={className}
        provider={provider}
        children={children}
        name={name}
      />
    </DynamicFormContextProvider>
  );
};

export const FormRow = memo(FormRowComponent);

const DynamicFormContainer: FC<FormRowProps> = ({ className, provider, children, name }) => {
  const { t } = useTranslation();
  const { formName, rootConfig, isRequired, error, fieldRefs, renderFormRowContent } = useFormRow(
    provider,
    children,
    name,
  );
  const { guideText, infoArea, onChangeInfoArea, onChangeGuideText } = useDynamicFormContext();
  const DynamicComponent = useMemo(
    () =>
      Children.toArray(children)
        .filter(
          (child) =>
            !(
              isValidElement(child) &&
              child.type &&
              ((child.type as any).displayName === 'FormInfoArea' ||
                (child.type as any).displayName === 'FormGuideText')
            ),
        )
        .map((child) => renderFormRowContent(child, formFieldConfig)),
    [provider],
  );
  /**
   * form row 특정 아이템 추출
   * @param children
   * @param displayName
   */
  const extractFormItem = (children: ReactNode, displayName: string): ReactNode => {
    const childArray = React.Children.toArray(children);

    for (const child of childArray) {
      if (isValidElement(child) && child.type && (child.type as any).displayName === displayName) {
        return child;
      }
    }

    return null;
  };
  /**
   * FormInfoArea 가져오기
   * @param children
   */
  const formInfoArea = useMemo(() => extractFormItem(children, 'FormInfoArea'), [children]);
  const formGuideText = useMemo(() => extractFormItem(children, 'FormGuideText'), [children]);

  useEffect(() => {
    if (formInfoArea) {
      onChangeInfoArea(formInfoArea);
    }
  }, [formInfoArea]);
  useEffect(() => {
    if (formGuideText) {
      onChangeGuideText(formGuideText);
    }
  }, [formGuideText]);
  return (
    <div
      className={cn(styles.form_item, className)}
      ref={(node) => {
        if (fieldRefs.current) {
          fieldRefs.current[formName] = node as HTMLElement | null;
        }
      }}
    >
      {/* 레이블 렌더링 */}
      {rootConfig.label && (
        <label htmlFor={formName} className={cn(styles.form_label, 'dynamic-form-field-label')}>
          <span className={styles.form_text}> {t(rootConfig.label as any)}</span>
          {isRequired && (
            <span
              className={cn(styles.status, {
                [styles.error]: error.isError, // 에러 발생 시 에러 스타일 적용
                [styles.required]: !error.isError, // 에러가 없으면 필수 스타일 적용
              })}
            >
              <IcoFormRequired width={8} height={8} />
            </span>
          )}
          {rootConfig.tooltip && (
            <Tooltip
              className={styles.tooltip}
              side="right"
              align="start"
              content={t(rootConfig.tooltip as any)}
            >
              <Button
                onlyIcon
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          )}
          {infoArea && <span className={styles.info_area}>{infoArea}</span>}
          {rootConfig.subText && (
            <span className={styles.sub_text}>{t(rootConfig.subText as any)}</span>
          )}
        </label>
      )}
      {/* 입력 영역: children을 순회하며 필요한 변환(renderChild) 적용 */}
      <div className={styles.input_box}>{DynamicComponent}</div>
      {/* 안내 텍스트 또는 에러 메시지 렌더링 */}
      {!error.isError &&
        (guideText ? (
          <FormGuideText>{guideText}</FormGuideText>
        ) : (
          rootConfig.guideText && <FormGuideText>{t(rootConfig.guideText as any)}</FormGuideText>
        ))}
      {error.isError && (
        <p className={cn(styles.guide_text, styles.error, 'dynamic-form-field-error')}>
          {t(error.message as any)}
        </p>
      )}
    </div>
  );
};
