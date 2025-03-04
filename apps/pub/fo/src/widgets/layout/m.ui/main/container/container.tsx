import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '../../../../../features/platform';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { MobileContainerHeader } from './container-header';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const [activeMenuDepth] = useActiveMenuDepthState();

  const isLeafPage = useCreation(() => {
    const children = last(activeMenuDepth)?.children;
    return !children || !children?.length;
  }, [activeMenuDepth]);

  return (
    <div className="bg-secondary-1 flex flex-col">
      {isLeafPage && <MobileContainerHeader />}
      {/* <div>{title}</div> */}
      <div>{children}</div>
    </div>
  );
}

export const MobileContainer = memo(PageContainerComponent);
