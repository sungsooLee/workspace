import { FC, ReactNode, Children } from 'react';
const PageRow: FC<{ children: ReactNode }> = ({ children }) => {
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
export default PageRow;
