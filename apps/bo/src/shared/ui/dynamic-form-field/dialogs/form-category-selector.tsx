import { FC, useRef } from 'react';
import { Button } from '@learnway/ui';
const FormCategorySelectorComponent: FC<any> = ({ onChange, value }) => {
  const handleOnSelector = () => {
    const response = window.confirm('카테고리를 선택하시겠습니가?');
    console.log('response=>', response);
    onChange([...value, response ? '신규카테고리' : '카테고리를 선택하지 않았습니다.']);
  };
  console.log('category value =>', value);
  return (
    <div>
      <span>
        {value.map((item: any) => (
          <span>{item}</span>
        ))}
      </span>
      <Button type={'button'} variant="gray" size="sm" onClick={handleOnSelector}>
        선택
      </Button>
    </div>
  );
};

export const FormCategorySelector = FormCategorySelectorComponent;
