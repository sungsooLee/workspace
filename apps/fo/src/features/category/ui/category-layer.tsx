import { useState } from 'react';
import { useCategories } from '../services/category.service';
import { CategoryBadgeList } from './category-badge-list';
import { CategoryNavigation } from './category-navigation';
import { CategoryDetail } from './category-detail';
import styles from '../../layout/ui/category.module.css';

interface CategoryLayerProps {
  isOpen: boolean;
}

export function CategoryLayer({ isOpen }: CategoryLayerProps) {
  const { data: categories } = useCategories();
  const [selectedDepth1, setSelectedDepth1] = useState<number | null>(null);

  return (
    <>
      <CategoryBadgeList />
      {/* <div className="flex flex-1">
        <div className="w-60 bg-blue-900">
          <CategoryNavigation
            categories={categories}
            selectedId={selectedDepth1}
            onSelect={setSelectedDepth1}
          />
        </div>

        <div className="flex-1">
          <CategoryDetail categories={categories} selectedDepth1={selectedDepth1} />
        </div>
      </div> */}
    </>
  );
}
