import { forwardRef } from 'react';
import { BaseFormDialogProps } from '../../dynamic-form-field';

const ELearningCategoryComponent = forwardRef<HTMLDivElement, BaseFormDialogProps>(
  ({ name, value, onChange }, ref) => {
    return (
      <div ref={ref}>
        <span>
          {value} - {name}
        </span>
        <button
          type={'button'}
          onClick={() => {
            console.log(onChange);
            onChange('테스트 Value');
          }}>
          Test Value Change
        </button>
      </div>
    );
  },
);

export const ELearningCategory = ELearningCategoryComponent;
