import React, { Children, FC, isValidElement, memo, ReactNode, useEffect, useMemo } from 'react';
import { cn } from '@learnway/shared';
import boStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import foStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';
import { Button, DynamicFormField, Tooltip } from '@learnway/ui';
import {
  DynamicFormContextProvider,
  FormRowProps,
  FormConfig,
  useDynamicFormContext,
  useFormRow,
} from '@learnway/hooks';
import { FormGuideText } from './form-guide-text';
import { useTranslation } from 'react-i18next';

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
const BaseFormRowComponent: FC<FormRowProps> = ({
  className,
  provider,
  children,
  name,
  element,
  formFieldConfig,
  style,
  infoNode,
  fieldConfig,
}) => {
  return (
    <DynamicFormContextProvider>
      <DynamicFormContainer
        className={className}
        provider={provider}
        children={children}
        name={name}
        element={element}
        formFieldConfig={formFieldConfig}
        style={style}
        infoNode={infoNode}
        fieldConfig={fieldConfig}
      />
    </DynamicFormContextProvider>
  );
};

export const BaseFormRow = memo(BaseFormRowComponent);

const DynamicFormContainer: FC<FormRowProps> = ({
  className,
  provider,
  children,
  name,
  element,
  formFieldConfig,
  style = 'bo',
  infoNode,
  fieldConfig,
}) => {
  /*
   * 구조는 동일하고 스타일만 다르다고 전달 받아서 스타일 분리 만 합니다.
   * 만약 구조도 다르게 변경된다면 JSX 를 각 컴포넌트로 분리하는 작업을 진행해야 합니다.
   * */
  const styles = style === 'bo' ? boStyles : foStyles;
  const { t } = useTranslation();

  // fieldConfig가 제공되면 필드를 등록하고 validation 설정
  useEffect(() => {
    if (fieldConfig && provider.registerField) {
      // FormRow의 name prop을 fieldConfig.name으로 자동 설정
      const configWithName = { ...fieldConfig, name } as FormConfig;
      provider.registerField(configWithName);

      // fieldConfig에 validation이 있으면 동적으로 추가
      if (fieldConfig.validation && provider.addValidator) {
        provider.addValidator(name, fieldConfig.validation);
      }
    }
  }, [fieldConfig, name, provider]);

  const { formConfig, isRequired, error, fieldRefs } = useFormRow(
    provider,
    children,
    name,
    fieldConfig as FormConfig | undefined,
  );
  const { guideText, infoArea, onChangeInfoArea, onChangeGuideText } = useDynamicFormContext();
  const FormConfigComponent = formFieldConfig[formConfig.type as keyof typeof formFieldConfig];

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

  // hidden 타입인 경우 화면에 렌더링하지 않음
  if (formConfig.type === 'hidden') {
    return null;
  }

  return (
    <div
      className={cn(styles.form_item, className)}
      ref={(node) => {
        if (fieldRefs.current) {
          fieldRefs.current[name] = node as HTMLElement | null;
        }
      }}
    >
      {/* 레이블 렌더링 */}
      {formConfig.label && (
        <label htmlFor={name} className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
          <span className={styles.form_text}> {t(formConfig.label as any)}</span>
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
          {formConfig.tooltip && (
            <Tooltip
              className={styles.tooltip}
              // side="right" //툴팁 위치가 제각각 다르게 노출 되는 현상있음.
              // align="start"
              content={t(formConfig.tooltip as any)}
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
          {infoNode && <span className={styles.info_area}>{infoNode}</span>}
          {formConfig.subText && (
            <span className={styles.sub_text}>{t(formConfig.subText as any)}</span>
          )}
        </label>
      )}
      {/* 입력 영역: children을 순회하며 필요한 변환(renderChild) 적용 */}
      <div className={styles.input_box}>
        <DynamicFormField
          {...formConfig}
          {...provider}
          error={error.isError}
          name={name}
          component={element || FormConfigComponent}
        />
        {children}
      </div>
      {/* 안내 텍스트 또는 에러 메시지 렌더링 */}
      {!error.isError &&
        (guideText ? (
          <FormGuideText>{guideText}</FormGuideText>
        ) : (
          formConfig.guideText && <FormGuideText>{t(formConfig.guideText as any)}</FormGuideText>
        ))}
      {error.isError && (
        <p className={cn(styles.guide_text, styles.error, 'dynamic-form-field-error')}>
          {t(error.message as any)}
        </p>
      )}
    </div>
  );
};
