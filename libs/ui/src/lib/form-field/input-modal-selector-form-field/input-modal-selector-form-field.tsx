import { forwardRef } from 'react';
import { Input, InputProps } from '../../input/input';
import styles from './input-modal-selector-form-field.module.css';
import { useModal } from '../../modal/modal.hook';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';
import { t } from 'i18next';

interface ComplexFieldValue {
  [key: string]: string;
}

interface ComplexFieldConfig {
  leftKey?: string;
  rightKey?: string;
}

interface InputModalSelectorFormFieldComponentProps extends BaseFormFieldProps<string> {
  /** 모달 설정 */
  modalConfig: ModalConfig;
  /** 입력 필드 Props */
  inputProps?: InputProps;
  /** 모달 데이터 변환 함수 (onFormChange 시 사용) */
  transformModalData?: (modalData?: any) => string | ComplexFieldValue;
  /** 복합 서치 필드 모드 활성화 */
  complexField?: boolean;
  leftFieldProps?: {
    placeholder?: string;
    inputProps?: InputProps;
  };
  rightFieldProps?: {
    placeholder?: string;
    inputProps?: InputProps;
  };
  complexName?: string;
  complexFieldConfig?: ComplexFieldConfig;
}

const InputModalSelectorFormFieldComponent = forwardRef<
  HTMLInputElement,
  InputModalSelectorFormFieldComponentProps
>(
  (
    {
      inputProps = {},
      modalConfig,
      value,
      readOnly = false,
      disabled = true,
      placeholder = t('LABEL.form.input.select'),
      onChange,
      onFormChange,
      transformModalData,
      complexField = false,
      leftFieldProps,
      rightFieldProps,
      transformComplexData,
      complexName,
      complexFieldConfig = { leftKey: 'left', rightKey: 'right' },
      ...props
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const handleModalOpen = async () => {
      const data = await openModal(modalConfig);
      const transformData = transformModalData ? transformModalData(data) : data;
      console.log('modal data', data, transformData);
      onFormChange?.(transformData);
      // 복합 서치일 경우에
      if (transformComplexData) transformComplexData?.(transformData);
    };

    const handleClear = () => {
      if (complexField && complexName) {
        const { leftKey = 'left', rightKey = 'right' } = complexFieldConfig;
        const clearData = { [leftKey]: '', [rightKey]: '' };
        onFormChange({ [complexName]: clearData } as any);
      } else {
        if (onChange) {
          const clearEvent = { target: { value: '' } } as any;
          onChange(clearEvent);
        }
      }
    };

    /// 복합서치 값 구해오고 렌더링 ///
    const getDualValues = () => {
      const { leftKey = 'left', rightKey = 'right' } = complexFieldConfig;

      if (typeof value === 'object' && value) {
        const result = {
          leftValue: (value as ComplexFieldValue)[leftKey] || '',
          rightValue: (value as ComplexFieldValue)[rightKey] || '',
        };
        return result;
      }
      return { leftValue: '', rightValue: '' };
    };

    if (complexField) {
      const dualValues = getDualValues();

      return (
        <div
          className={cn(styles.start, styles.search_wrap, 'nlp--input-modal-selector-form-field')}
        >
          <div className="flex flex-row space-x-2">
            <Input
              {...leftFieldProps?.inputProps}
              value={dualValues.leftValue}
              readOnly={true}
              placeholder={leftFieldProps?.placeholder || t('LABEL.form.input.code')}
            />

            <Input
              {...rightFieldProps?.inputProps}
              ref={ref}
              value={dualValues.rightValue}
              placeholder={rightFieldProps?.placeholder || t('LABEL.form.input.text')}
              onEnterKeyDown={handleModalOpen}
              onChange={(event) => {
                if (event.target.value === '') {
                  handleClear();
                }
              }}
              showSearchIcon
            />
          </div>
        </div>
      );
    }
    //////

    return (
      <div
        className={cn(styles.start, styles.search_wrap, 'nlp--input-modal-selector-form-field')}
        role="button"
      >
        <Input
          {...inputProps}
          ref={ref}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onEnterKeyDown={handleModalOpen}
          onChange={(event) => {
            if (event.target.value === '') {
              handleClear();
            }
          }}
          showSearchIcon
        />
      </div>
    );
  },
);

export const InputModalSelectorFormField = InputModalSelectorFormFieldComponent;
