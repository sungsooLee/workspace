import { Children, FC, isValidElement, ReactNode, useState } from 'react';
import styles from './page-contents.module.css';
import { MainContents } from './slot/main-contents';
import { SubContents } from './slot/sub-contents';
/**
 * 목록 또는 상세 화면에 대한 디자인 wrapping 컴포넌트
 * @param children
 * @param panel
 * @constructor
 */
const PageContentsComponent: FC<{
  children: ReactNode;
  panel?: boolean;
}> = ({ children }) => {
  const MainContentsSlot = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === MainContents,
  );
  const SubContentsSlot = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === SubContents,
  );
  return (
    <>
      {MainContentsSlot && <div className={styles.main_contents}>{MainContentsSlot}</div>}
      {SubContentsSlot && <div className={styles.sub_contents}>{SubContentsSlot}</div>}
    </>
  );
};

export const PageContents = PageContentsComponent;
