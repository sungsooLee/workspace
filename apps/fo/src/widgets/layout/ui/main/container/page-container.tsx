import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '@learnway/auth/entities';

import { useCurrentRoute } from '@learnway/hooks';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/container/page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const [activeMenuDepth] = useActiveMenuDepthState();

  const { meta } = useCurrentRoute();
  /*
  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);
*/
  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      {/* <div>{title}</div> */}
      {/* <div className={styles.title}>{title}</div> */}
      {children}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
