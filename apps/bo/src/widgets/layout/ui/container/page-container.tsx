import { FC, ReactNode, Children, isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';
import { last } from 'lodash';
import { Button } from '@learnway/ui';

import styles from './page-container.module.css';
import { PageButtons } from './slot/page-buttons';
import { PageLeft } from './slot/page-left';
import { PageRight } from './slot/page-right';
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
    (child) => isValidElement(child) && child.type === PageButtons,
  );
  const BodySlot = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && child.type === PageButtons),
  );

  const LeftSlot = Children.toArray(BodySlot).filter(
    (child) => isValidElement(child) && child.type === PageLeft,
  );
  const RightSlot = Children.toArray(BodySlot).filter(
    (child) => isValidElement(child) && child.type === PageRight,
  );
  const isDivision = Children.count(LeftSlot) > 0 && Children.count(RightSlot) > 0;

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div className={styles.inner}>
        {/* title_wrap */}
        <div className={styles.title_wrap}>
          <h3 className={styles.title}>{title || '테스트 제목'}</h3>
          <div className={styles.btn_wrap}>
            <Button variant="point" size="sm">
              매핑과정 보기
            </Button>
            <Button variant="point" size="sm">
              공유이력 보기
            </Button>
            <Button variant="point" size="sm">
              삭제
            </Button>
            <Button variant="point" size="sm">
              수정
            </Button>
            <Button variant="primary" size="sm">
              목록
            </Button>
          </div>
        </div>
        {/* contents_wrap */}
        <div className={styles.contents_wrap}>
          {/* contents */}
          <div className={styles.contents}>
            <PageContents>{children}</PageContents>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageContainer = PageContainerComponent;
