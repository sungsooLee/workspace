import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '../../../../features/platform';
import { useCreation } from 'ahooks';
import { last } from 'lodash';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);

  return (
    <div className="bg-secondary-1 flex flex-col">
      {/* <div>{title}</div> */}
      <div>{children}</div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
