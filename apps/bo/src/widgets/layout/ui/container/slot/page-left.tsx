import { FC, ReactNode } from 'react';
const PageLeftComponent: FC<{ children: ReactNode; panel?: boolean }> = ({
  children,
  panel = false,
}) => {
  return <div className={`${panel ? 'panel' : ''}`}>{children}</div>;
};

PageLeftComponent.displayName = 'PageLeft';
export const PageLeft = PageLeftComponent;
