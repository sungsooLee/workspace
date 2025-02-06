import { FC, ReactNode } from 'react';
const PageRight: FC<{ children: ReactNode; panel?: boolean }> = ({ children, panel = false }) => {
  return <div className={`${panel ? 'panel' : ''}`}>{children}</div>;
};

export default PageRight;
PageRight.displayName = 'PageRight';
