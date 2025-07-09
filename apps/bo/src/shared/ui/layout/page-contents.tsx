import { Children, FC, isValidElement, ReactNode } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
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
      {MainContentsSlot && MainContentsSlot.length > 0 && (
        <div className={styles.main_contents}>{MainContentsSlot}</div>
      )}

      {SubContentsSlot && SubContentsSlot.length > 0 && (
        <>
          <hr className={styles.vertical_line} />
          <div className={styles.sub_contents}>{SubContentsSlot}</div>
        </>
      )}
    </>
  );
};

export const PageContents = PageContentsComponent;
