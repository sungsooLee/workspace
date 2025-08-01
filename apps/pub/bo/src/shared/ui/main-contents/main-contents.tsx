import { FC, ReactNode } from 'react';
const MainContentsComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

MainContentsComponent.displayName = 'MainContents';
export const MainContents = MainContentsComponent;
