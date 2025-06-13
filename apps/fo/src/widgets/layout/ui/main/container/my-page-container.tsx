import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '@learnway/auth/entities';
import { useTranslation } from 'react-i18next';

import { useCurrentRoute } from '@learnway/hooks';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/container/my-page-container.module.css';

interface MyPageContainerComponentProps {
  children: ReactNode;
}

function MyPageContainerComponent({ children }: MyPageContainerComponentProps) {
  const { t } = useTranslation();
  const [activeMenuDepth] = useActiveMenuDepthState();

  const { meta } = useCurrentRoute();
  /*
  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);
*/
  return (
    <div className={`${styles.start}`}>
      <h2>{t(meta?.title)}</h2>
      {children}
    </div>
  );
}

export const MyPageContainer = memo(MyPageContainerComponent);
