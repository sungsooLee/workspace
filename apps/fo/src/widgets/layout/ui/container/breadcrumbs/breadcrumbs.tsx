import { memo } from 'react';

import { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/platform';

import styles from './breadcrumbs.module.css';
import { Link } from '@tanstack/react-router';
import { IcoHome03, IcoArrowForward, IcoArrowDown } from '@learnway/icons';
import { Popover } from '@learnway/ui';
import { useCategoryBreadcrumbs } from '../../../service/breadcurmb.hooks';
import { useCategories } from '../../../../../features/category/services/category.service';
import { Category } from '../../../../../types/entities/category';

interface BreadcrumbsProps {
  currentCategoryId: number | null;
}

function BreadcrumbsComponent({ currentCategoryId }: BreadcrumbsProps) {
  const breadcrumbPath = useCategoryBreadcrumbs(currentCategoryId);
  const { data: categories } = useCategories();

  const renderPopoverContent = (category: Category) => {
    let siblings: Category[] = [];
    if (category.depth === 1) {
      siblings = categories.filter((cat) => cat.depth === 1);
    } else {
      siblings =
        categories.find((cat) =>
          cat.children?.some((child: Category) => child.categoryId === category.categoryId),
        )?.children || [];
    }

    return (
      <div className={`${styles.start} ${styles.hover_menu}`}>
        <ul className={styles.menu_list}>
          {siblings.map((sibling: Category) => (
            <li key={sibling.categoryId}>
              <Link
                to="/category"
                state={{ categoryId: sibling.categoryId.toString() }}
                className={sibling.categoryId === category.categoryId ? styles.active : ''}>
                {sibling.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!breadcrumbPath.length) return null;

  return (
    <div className={styles.start}>
      <ul className={styles.breadcrumbs}>
        <Link to="/" className={styles.home_link}>
          <IcoHome03 width={16} height={16} stroke="#6F798B" />
        </Link>
        <IcoArrowForward width={12} height={12} stroke="#6F798B" className={styles.arw} />
        {breadcrumbPath.map((category, index) => (
          <li key={category.categoryId} className={styles.link_item}>
            <Popover
              popoverContent={renderPopoverContent(category)}
              className={styles.btn_menu}
              side="bottom"
              align="start"
              sideOffset={10}>
              <span className={styles.select}>{category.name}</span>
              <i className={styles.stats}>
                <IcoArrowDown width={16} height={16} stroke="#6F798B" />
              </i>
              {index < breadcrumbPath.length - 1 && (
                <IcoArrowForward width={12} height={12} stroke="#6F798B" className={styles.arw} />
              )}
            </Popover>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
