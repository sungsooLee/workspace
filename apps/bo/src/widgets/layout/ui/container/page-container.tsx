import { FC, ReactNode, Children, isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import styles from './page-container.module.css';
import { ContentsButtons } from './slot/contents-buttons';
import { PageContents } from './page-contents';

import { useActiveMenuDepthState } from '../../../../features/layout';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';

/**
 * 목록 또는 상세 화면에 대한 디자인 wrapping 컴포넌트
 * @param children
 * @param panel
 * @constructor
 */
const PageContainerComponent: FC<{
  children: ReactNode;
  panel?: boolean;
}> = ({ children, panel = false }) => {
  const { t } = useTranslation();

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
          {ButtonSlot && <div className={styles.btn_wrap}>{ButtonSlot}</div>}
        </div>
        {/* contents_wrap */}
        <div className={styles.contents_wrap}>
          {/* contents */}
          <div className={styles.contents}>
            <PageContents>{BodySlot}</PageContents>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageContainer = PageContainerComponent;
