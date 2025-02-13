import { forwardRef } from 'react';
const ELearningCategoryComponent = forwardRef<HTMLDivElement, any>(
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
