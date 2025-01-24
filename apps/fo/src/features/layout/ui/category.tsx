import { memo, useEffect, useState } from 'react';
import { Button, Popover } from '@learnway/ui';
import { CategoryLayer } from '../../category/ui/category-layer';
import { useRouter } from '@tanstack/react-router';

const CategoryContent = () => {
  return <CategoryLayer />;
};
const CategoryComponent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      setIsOpen(false);
    });
  }, [router.history]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} popoverContent={<CategoryContent />}>
      <Button>{isOpen ? '카테고리 닫기' : '카테고리'}</Button>
    </Popover>
  );
};

export const Category = memo(CategoryComponent);
