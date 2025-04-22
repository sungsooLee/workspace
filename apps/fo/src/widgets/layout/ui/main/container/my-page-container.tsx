import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '@learnway/auth';

import { useCurrentRoute } from '@learnway/hooks';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/container/my-page-container.module.css';

interface MyPageContainerComponentProps {
  children: ReactNode;
}

function MyPageContainerComponent({ children }: MyPageContainerComponentProps) {
  const [activeMenuDepth] = useActiveMenuDepthState();

  const { meta } = useCurrentRoute();
  /*
  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);
*/
  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      <div>{meta?.title}</div>
      {/* <div className={styles.title}>{title}</div> */}
      {children}
    </div>
  );
}

export const MyPageContainer = memo(MyPageContainerComponent);
