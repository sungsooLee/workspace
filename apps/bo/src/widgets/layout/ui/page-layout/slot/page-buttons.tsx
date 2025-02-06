import { FC, ReactNode } from 'react';

const PageButtons: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default PageButtons;

PageButtons.displayName = 'PageButtons';
