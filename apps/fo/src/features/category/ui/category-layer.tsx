import { useState } from 'react';
import { useCategories } from '../services/category.service';
import { CategoryBadgeList } from './category-badge-list';
import { CategoryNavigation } from './category-navigation';
import { CategoryDetail } from './category-detail';

export function CategoryLayer() {
  const { data: categories } = useCategories();
  const [selectedDepth1, setSelectedDepth1] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col bg-gray-400">
      <div className="border-b p-4">
        <CategoryBadgeList />
      </div>

      <div className="flex flex-1">
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
      </div>
    </div>
  );
}
