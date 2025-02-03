import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { useActiveMenuDepthState } from '../../../../features/layout';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import styles from './page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div className={styles.inner}>
        <div>{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
