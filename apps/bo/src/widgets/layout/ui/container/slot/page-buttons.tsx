import { FC, ReactNode } from 'react';

const PageButtonsComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

PageButtonsComponent.displayName = 'PageButtons';

export const PageButtons = PageButtonsComponent;
