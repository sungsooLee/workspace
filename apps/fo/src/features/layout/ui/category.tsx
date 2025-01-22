import { memo, useState } from 'react';
import { Button, ModalWrapper, Popover, useModalControl } from '@learnway/ui';

const CategoryContent = () => {
  return <div>Content</div>;
};
const CategoryComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} popoverContent={<CategoryContent />}>
      <Button>{isOpen ? '카테고리 닫기' : '카테고리'}</Button>
    </Popover>
  );
};

export const Category = memo(CategoryComponent);
