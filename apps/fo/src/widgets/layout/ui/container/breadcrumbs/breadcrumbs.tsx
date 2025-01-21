import { memo } from 'react';

import { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/layout';

import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const [activeMenuDepth] = useActiveMenuDepthState();
  if (!activeMenuDepth?.[0]) {
    return <></>;
  }

  return (
    <div className={styles._start}>
      Home
      {activeMenuDepth &&
        activeMenuDepth.map((menu: Menu) => <span key={menu.key}>&gt; {menu.title}</span>)}
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
