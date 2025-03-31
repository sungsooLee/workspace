import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '../../../../../features/platform';
import { useCreation } from 'ahooks';
import { last } from 'lodash';
import { Breadcrumbs } from '../../container/breadcrumbs/breadcrumbs';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/container/page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);

  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      {/* <div>{title}</div> */}
      {/* <div className={styles.title}>{title}</div> */}
      {children}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
