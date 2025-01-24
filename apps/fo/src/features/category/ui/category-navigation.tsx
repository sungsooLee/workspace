import { memo, useState } from 'react';
import { useCategories } from '../services/category.service';
import { Category } from '../../../types/entities/category';

interface CategoryNavigationProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (categoryId: number) => void;
}

export function CategoryNavigationComponent({
  categories,
  selectedId,
  onSelect,
}: CategoryNavigationProps) {
  const depth1Categories = categories.filter((cat) => cat.depth === 1);

  return (
    <div className="flex">
      <div className="w-60 bg-blue-900 text-white">
        {depth1Categories.map((category) => (
          <div
            key={category.categoryId}
            className={`cursor-pointer p-4 hover:bg-blue-800 ${
              selectedId === category.categoryId ? 'bg-blue-800' : ''
            }`}
            onClick={() => onSelect(category.categoryId)}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export const CategoryNavigation = memo(CategoryNavigationComponent);
