import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { IcoArrowDown, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';

import { Category } from '../../../../types';
import { useCategoryNavigation } from '../../../../entities/category/service/category.hook';
import { useCategories } from '../../services/category.service';
import { CategoryBadgeList } from '../category-badge-list/category-badge-list';
import bnrImage1 from '../../../../assets/images/banner/banner_cate1.png';
import bnrImage2 from '../../../../assets/images/banner/banner_cate2.png';

import styles from '@learnway/styles/fo/features/category/category-navigation-popover.module.css';

interface CategoryLayerProps {
  isOpen: boolean;
}

export function CategoryNavigationPopover({ isOpen }: CategoryLayerProps) {
  const { data: categories } = useCategories();
  const [selectedDepth1, setSelectedDepth1] = useState<number | null>(null);
  const depth1Categories = categories.filter((cat) => cat.depth === 1);
  const { handleCategoryClick } = useCategoryNavigation();

  // 선택된 depth1의 하위 카테고리들 찾기
  const selectedCategory = categories.find((cat) => cat.categoryId === selectedDepth1);
  // 각 카테고리의 열림/닫힘 상태를 배열로 관리
  const [openStates, setOpenStates] = useState(categories.map(() => false));

  // 모든 카테고리가 열려있는지 확인
  const isAllOpen = openStates.every((state) => state);

  // 전체 열기/닫기
  const toggleAll = () => {
    if (selectedCategory) {
      const newState = !isAllOpen;
      setOpenStates(new Array(selectedCategory.children.length).fill(newState));
    }
  };

  // 개별 카테고리 열기/닫기
  const toggleCategory = (index: number) => {
    setOpenStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  // depth1 카테고리 선택 시
  const handleDepth1Select = (categoryId: number) => {
    setSelectedDepth1(categoryId);
    // 새로운 depth1이 선택되면 모든 카테고리를 닫힌 상태로 초기화
    const selectedCat = categories.find((cat) => cat.categoryId === categoryId);
    if (selectedCat) {
      setOpenStates(new Array(selectedCat.children.length).fill(false));
    }
  };

  useEffect(() => {
    if (depth1Categories.length > 0 && !selectedDepth1) {
      const firstCategory = depth1Categories[0];
      handleDepth1Select(firstCategory.categoryId);
    }
  }, [depth1Categories]);

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <div className={`${styles.category} ${isOpen ? styles.active : ''}`}>
        <CategoryBadgeList />
        <div className={styles.category_container}>
          <div className={styles.category_menu}>
            <div className={styles.menu_list_wrap}>
              <div className={styles.menu_list}>
                {/* 카테고리 영역 - 좌측메뉴(sec1) - sec1~sec3 loop */}
                <div className={`${styles.menu_section} ${styles.sec1}`}>
                  <ul className={styles.list}>
                    {depth1Categories.map((category) => (
                      <li>
                        <Button
                          onClick={() => handleDepth1Select(category.categoryId)}
                          className={selectedDepth1 === category.categoryId ? styles.active : ''}>
                          <span>{category.name}</span>
                          {selectedDepth1 === category.categoryId ? (
                            <i>
                              <IcoArrowForward width={16} height={16} stroke="#07287E" />
                            </i>
                          ) : (
                            ''
                          )}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.banner_list}>
                  <Link to={'/'} className={styles.banner}>
                    <img src={bnrImage1} alt="" />
                  </Link>
                  <Link to={'/'} className={styles.banner}>
                    <img src={bnrImage2} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.category_inner}>
            {selectedCategory && (
              <>
                <div className={styles.tit_head}>
                  <h2>
                    <Link to="/category" onClick={() => handleCategoryClick(selectedCategory)}>
                      {selectedCategory.name}
                    </Link>
                  </h2>
                  <Button
                    onClick={toggleAll}
                    className={`${styles.btn_cate} ${isAllOpen ? styles.active : ''}`}>
                    <IcoArrowDown width={16} height={16} stroke="#07287E" />
                  </Button>
                </div>

                <div className={styles.depth_area}>
                  {selectedCategory.children?.map((category: Category, index: number) => (
                    <div key={category.categoryId} className={styles.depth_wrap}>
                      <div className={styles.tit}>
                        <h3>
                          <Link to="/category" onClick={() => handleCategoryClick(category)}>
                            {category.name}
                          </Link>
                        </h3>
                        {category.children && category.children.length > 0 && (
                          <Button
                            className={`${styles.btn_cate} ${openStates[index] ? styles.active : ''}`}
                            onClick={() => toggleCategory(index)}>
                            <IcoArrowDown width={16} height={16} stroke="#A9AFB8" />
                          </Button>
                        )}
                      </div>

                      {!openStates[index] && category.children && category.children.length > 0 && (
                        <div className={styles.depth_info}>
                          <ul className={styles.list}>
                            {(category.children as Category[]).map((sub: Category) => (
                              <li key={sub.categoryId}>
                                <Link to="/category" onClick={() => handleCategoryClick(sub)}>
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
