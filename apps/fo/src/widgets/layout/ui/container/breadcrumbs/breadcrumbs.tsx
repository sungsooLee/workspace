import { memo } from 'react';

import { useCategoryTree } from '@entities/category';
import { IcoArrowDown, IcoArrowForward, IcoHome03 } from '@learnway/icons';
import { Popover } from '@learnway/ui/popover';
import { Link, useRouterState } from '@tanstack/react-router';
import { Category } from '../../../../../types/entities/category';
import { useCategoryBreadcrumbs } from '../../../service/breadcurmb.hooks';
import styles from './breadcrumbs.module.css';

interface BreadcrumbsProps {
  currentCategoryId: number | null;
  tenantId: number;
}

function BreadcrumbsComponent({ tenantId, currentCategoryId }: BreadcrumbsProps) {
  const routerState = useRouterState();
  if (!currentCategoryId) {
    currentCategoryId = routerState.location.state.categoryId;
  }

  const breadcrumbPath = useCategoryBreadcrumbs(currentCategoryId, tenantId);
  const { data: categories } = useCategoryTree(tenantId);

  const renderPopoverContent = (idx: number) => {
    let siblings: Category[] = [];
    // if (category.depth === 1) {
    //   siblings = categories.children.filter((cat: any) => cat.depth === 1);
    // } else {
    //   siblings =
    //     categories.children.find((cat: any) =>
    //       cat.children?.some((child: Category) => child.id === category.id),
    //     )?.children || [];
    // }
    if (idx === 0) {
      siblings = categories?.tree.children;
    } else {
      const parentCategory = breadcrumbPath[idx - 1];

      const traverse = (nodes: any) => {
        for (const node of nodes) {
          if (node.id === parentCategory.id) {
            siblings = node.children ?? [];
            return;
          }
          if (node.children) traverse(node.children);
        }
      };

      traverse(categories?.tree.children);
    }

    const currentBreadcrumb = breadcrumbPath[idx];

    return (
      <div className={`${styles.start} ${styles.hover_menu}`}>
        <ul className={styles.menu_list}>
          {siblings.map((sibling: Category) => (
            <li key={sibling.id}>
              <Link
                to="/category"
                state={{ categoryId: sibling.id.toString() }}
                className={sibling.id === currentBreadcrumb.id ? styles.active : ''}
              >
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
          <li key={category.id} className={styles.link_item}>
            <Popover
              popoverContent={renderPopoverContent(index)}
              className={styles.btn_menu}
              side="bottom"
              align="start"
              sideOffset={10}
            >
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
