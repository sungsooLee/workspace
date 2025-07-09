import React, { cloneElement, FC, ReactElement, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';

const LinkBoxComponent: FC<{ children: ReactNode }> = ({ children }) => {
  // children에서 Link 컴포넌트를 필터링
  const links = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Link, // 특정 컴포넌트만 필터 검사
  ) as ReactElement[];

  // 나머지 children 필터링
  const others = React.Children.toArray(children).filter(
    (child) =>
      !(
        (React.isValidElement(child) && child.type === Link) // Link가 아닌 다른 요소들
      ),
  );
  return (
    <div className={styles.link_box}>
      {links && links.length > 0 && (
        <div className={styles.link}>
          {links.map(
            (link, index) => cloneElement(link, { key: `link-${index}` }), // key 추가
          )}
        </div>
      )}

      {others}
    </div>
  );
};

export const LinkBox = LinkBoxComponent;
