import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '@learnway/auth/entities';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { MobileContainerHeader } from './container-header';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { activeMenuDepthMenu } = useActiveMenuDepthState((state) => state);

  const isLeafPage = useCreation(() => {
    const children = last(activeMenuDepthMenu)?.children;
    return !children || !children?.length;
  }, [activeMenuDepthMenu]);

  return (
    <div className="bg-secondary-1 flex flex-col">
      {isLeafPage && <MobileContainerHeader />}
      {/* <div>{title}</div> */}
      <div>{children}</div>
    </div>
  );
}

export const MobileContainer = memo(PageContainerComponent);
