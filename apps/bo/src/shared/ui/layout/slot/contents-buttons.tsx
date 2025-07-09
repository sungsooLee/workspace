import { FC, ReactNode } from 'react';

const ContentsButtonsComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

ContentsButtonsComponent.displayName = 'ContentsButtons';

export const ContentsButtons = ContentsButtonsComponent;
