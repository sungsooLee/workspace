import { forwardRef, useEffect } from 'react';
import { BaseFormDialogProps } from '../../../../../../shared/ui/dynamic-form-field';
import { Input, Textarea } from '@learnway/ui';

/**
 * 다국어 등록 수정 화면에서
 * keyType 에 따른 각기 다른 컴포넌트 노출
 */
const FormTranslationBoxComponent = forwardRef<HTMLDivElement, BaseFormDialogProps>(
  ({ control, watch, value, onChange }, ref) => {
    const keyType = watch('keyType');
    return (
      <div ref={ref}>
        {keyType === 'ERROR' || keyType === 'LABEL' ? (
          <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    );
  },
);

export const FormTranslationBox = FormTranslationBoxComponent;
