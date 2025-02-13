import { FC, ReactNode } from 'react';
const ContentsRowComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="row">{children}</div>;
};
ContentsRowComponent.displayName = 'ContentsRow';

export const ContentsRow = ContentsRowComponent;
