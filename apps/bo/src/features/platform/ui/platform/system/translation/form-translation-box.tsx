import { forwardRef } from 'react';
import { Input, Textarea } from '@learnway/ui';
import { useWatch } from 'react-hook-form';

/**
 * 다국어 등록 수정 화면에서
 * keyType 에 따른 각기 다른 컴포넌트 노출
 */
const FormTranslationBoxComponent = forwardRef<HTMLDivElement, any>(
  ({ control, value, onChange, disabled, name }, ref) => {
    const keyType = useWatch({ control, name: 'keyType' });
    return (
      <div ref={ref}>
        {keyType === 'ERROR' || keyType === 'LABEL' ? (
          <Textarea
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <Input
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    );
  },
);

export const FormTranslationBox = FormTranslationBoxComponent;
