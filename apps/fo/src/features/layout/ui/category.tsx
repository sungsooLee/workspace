import { memo } from 'react';
import { Button, ModalWrapper, useModalControl } from '@learnway/ui';

const CategoryContent = () => {
  return <div>Content</div>;
};
const CategoryComponent = () => {
  const { open } = useModalControl();
  return (
    <div>
      <Button
        onClick={() => {
          open(<CategoryContent></CategoryContent>);
        }}>
        카테고리
      </Button>
      <ModalWrapper />
    </div>
  );
};

export const Category = memo(CategoryComponent);
