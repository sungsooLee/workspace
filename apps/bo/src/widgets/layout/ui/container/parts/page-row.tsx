import { FC, ReactNode, Children } from 'react';
const PageRowComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const childCount = Children.count(children);

  return (
    <div
      className={'pc-row'}
      style={{
        gridTemplateColumns: `repeat(${childCount}, 1fr)`, // 자식 개수만큼 row를 분배
      }}>
      {children}
    </div>
  );
};
PageRowComponent.displayName = 'PageRow';

export const PageRow = PageRowComponent;
