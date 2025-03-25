import { forwardRef, useEffect } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { Button, Input } from '@learnway/ui';
import { useSearchBoxContext } from './form-row';

const CustomFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  ({ onChange, value }, ref) => {
    const { onChangeInfoArea } = useSearchBoxContext();
    const renderInfoArea = () => {
      onChangeInfoArea(
        <>
          <span className={styles.info_text}>
            채널<em>10</em>개
          </span>
          <Button variant="search" size="sm">
            채널선택
          </Button>
        </>,
      );
    };

    useEffect(() => {
      renderInfoArea();
    }, []);
    return (
      <div ref={ref}>
        <Input value={value} onChange={(event: any) => onChange(event.target.value)} />
      </div>
    );
  },
);

CustomFormFieldComponent.displayName = 'CustomFormField';
export const CustomFormField = CustomFormFieldComponent;
