import { FC, ReactNode } from 'react';
const PageLeft: FC<{ children: ReactNode; panel?: boolean }> = ({ children, panel = false }) => {
  return <div className={`${panel ? 'panel' : ''}`}>{children}</div>;
};

export default PageLeft;
PageLeft.displayName = 'PageLeft';
