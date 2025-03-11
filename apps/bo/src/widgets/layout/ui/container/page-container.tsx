import { Children, FC, isValidElement, ReactNode } from 'react';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import styles from './page-container.module.css';
import { ContentsButtons } from './slot/contents-buttons';
import { PageContents } from './page-contents';

import { useActiveMenuDepthState } from '../../../../features/platform';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';

/**
 * 목록 또는 상세 화면에 대한 디자인 wrapping 컴포넌트
 * @param children
 * @param panel
 * @constructor
 */
const PageContainerComponent: FC<{
  children?: ReactNode; // 자식 요소
  displayContent?: boolean; // 컨텐츠를 출력할지 여부를 결정한다. 기본값은 출력
}> = ({ children, displayContent = true }) => {
  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);

  const ButtonSlot = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ContentsButtons,
  );
  const BodySlot = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && child.type === ContentsButtons),
  );

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div className={styles.inner}>
        {/* title_wrap */}
        <div className={styles.title_wrap}>
          <h3 className={styles.title}>{title || '테스트 제목'}</h3>
          {ButtonSlot && displayContent && <div className={styles.btn_wrap}>{ButtonSlot}</div>}
        </div>
        {/* contents */}
        {BodySlot.length > 0 && displayContent && (
          <div className={styles.content_wrap}>
            <div className={styles.content}>
              <PageContents>{BodySlot}</PageContents>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PageContainer = PageContainerComponent;
