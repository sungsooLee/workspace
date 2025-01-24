import { memo, useEffect, useState } from 'react';
import { Category } from '../../../types/entities/category';
import { useCategoryNavigation } from '../../../entities/category/service/category.hook';

interface CategoryDetailProps {
  categories: Category[];
  selectedDepth1: number | null;
}

const CategoryDetailComponent = ({ categories, selectedDepth1 }: CategoryDetailProps) => {
  const { handleCategoryClick } = useCategoryNavigation();

  const [expandedDepth1, setExpandedDepth1] = useState<number[]>([]);
  const [expandedDepth2, setExpandedDepth2] = useState<number[]>([]);
  useEffect(() => {
    if (categories?.length) {
      setExpandedDepth1(categories.filter((cat) => cat.depth === 1).map((cat) => cat.categoryId));
      setExpandedDepth2(categories.filter((cat) => cat.depth === 2).map((cat) => cat.categoryId));
    }
  }, [categories]);

  const depth1Categories = categories.filter((cat) => cat.categoryId === selectedDepth1);

  const toggleDepth1 = (categoryId: number) => {
    setExpandedDepth1((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  };

  const toggleDepth2 = (categoryId: number) => {
    setExpandedDepth2((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  };

  return (
    <div className="divide-y">
      {depth1Categories.map((depth1: Category) => (
        <div key={depth1.categoryId} className="py-2">
          <div onClick={() => toggleDepth1(depth1.categoryId)}>
            <span className="font-medium">{depth1.name}</span>
            <span>{expandedDepth1.includes(depth1.categoryId) ? '▼' : '▶'}</span>
          </div>

          {expandedDepth1.includes(depth1.categoryId) &&
            (depth1.children as Category[])?.map((depth2) => (
              <div key={depth2.categoryId} className="ml-4">
                <div onClick={() => toggleDepth2(depth2.categoryId)}>
                  <span>{depth2.name}</span>
                  <span>
                    {depth2.children &&
                      depth2.children?.length > 0 &&
                      (expandedDepth2.includes(depth2.categoryId) ? '▼' : '▶')}
                  </span>
                </div>

                {expandedDepth2.includes(depth2.categoryId) &&
                  (depth2.children as Category[])?.map((depth3) => (
                    <div
                      key={depth3.categoryId}
                      className="cursor-pointer"
                      onClick={() => handleCategoryClick(depth3)}>
                      {depth3.name}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export const CategoryDetail = memo(CategoryDetailComponent);
