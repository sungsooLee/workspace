import { memo, ReactNode, useEffect, useState } from 'react';
import { useActiveMenuDepthState } from '@learnway/auth/entities';

import { useCurrentRoute } from '@learnway/hooks';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/container/page-container.module.css';
import { useRouterState } from '@tanstack/react-router';
import { queryOptions } from '@entities/category';
import { useQueryClient } from '@tanstack/react-query';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const routerState = useRouterState();
  const queryClient = useQueryClient();
  const { activeMenuDepthMenu } = useActiveMenuDepthState((state) => state);
  const [title, setTitle] = useState<string>('');

  const { meta } = useCurrentRoute();
  /*
  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);
*/

  useEffect(() => {
    if( routerState.location.state.categoryId ) {
      (async () => {
        const category = await queryClient.fetchQuery(queryOptions.detail(routerState.location.state.categoryId));
        setTitle(category.categoryName);
      })();
    }
  }, [routerState.location.state.categoryId]);

  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      {
        routerState.location.state.categoryId &&
          <div className={styles.title}>{title}</div>
      }
      {/* <div>{title}</div> */}
      {/* <div className={styles.title}>{title}</div> */}
      {children}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
