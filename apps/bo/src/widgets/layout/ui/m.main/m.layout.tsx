import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { useActiveMenuDepthState } from '../../../../features/layout';

import { MobileHeader } from './m.header/m.header';

import styles from './m.layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  if (
    activeMenuDepth &&
    activeMenuDepth?.length &&
    activeMenuDepth[0].children &&
    activeMenuDepth[0].children?.length > 0
  ) {
    return (
      <>
        <MobileHeader />
        <div className={cn(styles.start, styles.container)}>
          <div className={styles.container_inner}>
            <main>
              <p>Mobile layout </p>
              {children}
            </main>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileHeader />
      <main>
        <p>Mobile layout </p>
        {children}
      </main>
    </>
  );
}

export const MobileLayout = LayoutComponent;
