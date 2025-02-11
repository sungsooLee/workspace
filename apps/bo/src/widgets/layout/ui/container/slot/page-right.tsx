import { FC, ReactNode } from 'react';
const PageRightComponent: FC<{ children: ReactNode; panel?: boolean }> = ({
  children,
  panel = false,
}) => {
  return <div className={`${panel ? 'panel' : ''}`}>{children}</div>;
};

export default PageRightComponent;
PageRightComponent.displayName = 'PageRight';

export const PageRight = PageRightComponent;
