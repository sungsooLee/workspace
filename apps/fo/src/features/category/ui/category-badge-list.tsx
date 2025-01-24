import React from 'react';
import { Category } from '../../../types/entities/category';
import { useCategories } from '../services/category.service';
import { useCategoryNavigation } from '../../../entities/category/service/category.hook';

interface CategoryBadgeListProps {
  onClose?: (categoryId: number) => void;
  onClick?: (category: Category) => void;
}

export function CategoryBadgeList({ onClose, onClick }: CategoryBadgeListProps) {
  const { handleCategoryClick } = useCategoryNavigation();

  // 최근 방문한 카테고리는 일단 로컬 스토리지에서 관리한다고 가정
  const [recentCategories, setRecentCategories] = React.useState<Category[]>([]);
  const { data: categories } = useCategories();
  console.log(categories);
  React.useEffect(() => {
    // 로컬 스토리지에서 최근 방문 카테고리 ID 목록을 가져옴
    const recentCategoryIds = JSON.parse(localStorage.getItem('recentCategories') || '[]');

    // categories 데이터에서 해당하는 카테고리들을 찾아서 설정
    if (categories?.length && recentCategoryIds?.length) {
      const recent = recentCategoryIds
        .map((id: number) => categories.find((cat: Category) => cat.categoryId === id))
        .filter(Boolean)
        .slice(0, 8); // 최대 8개까지만 표시

      setRecentCategories(recent);
    }
  }, [categories]);

  const handleClose = (e: React.MouseEvent, categoryId: number) => {
    e.stopPropagation();
    // 최근 방문 목록에서 제거
    const updatedIds = recentCategories
      .filter((cat) => cat.categoryId !== categoryId)
      .map((cat) => cat.categoryId);

    localStorage.setItem('recentCategories', JSON.stringify(updatedIds));
    setRecentCategories((prev) => prev.filter((cat) => cat.categoryId !== categoryId));
    onClose?.(categoryId);
  };

  // const handleClick = (category: Category) => {
  //   onClick?.(category);
  // };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      최근방문
      {recentCategories.map((category) => (
        <div
          key={category.categoryId}
          className="cursor-pointer"
          onClick={() => handleCategoryClick(category)}>
          <span>{category.name}</span>
          <button onClick={(e) => handleClose(e, category.categoryId)}>×</button>
        </div>
      ))}
    </div>
  );
}
