import { FC, useRef } from 'react';
import { Button } from '@learnway/ui';
const FormCategorySelector: FC<any> = ({ onChange, value, name, fieldRefs }) => {
  const handleOnSelector = () => {
    onChange('표준 카테고리');
  };
  return (
    <div ref={(ref) => (fieldRefs.current[name] = ref)}>
      <input type={'hidden'} />
      <span>{value.label}</span>
      <Button type={'button'} variant="gray" size="sm" onClick={handleOnSelector}>
        선택
      </Button>
    </div>
  );
};

export default FormCategorySelector;
