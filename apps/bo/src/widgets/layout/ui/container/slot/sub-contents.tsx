import { FC, ReactNode } from 'react';
const SubContentsComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

SubContentsComponent.displayName = 'SubContents';

export const SubContents = SubContentsComponent;
