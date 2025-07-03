import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/view-box.module.css';
// eslint-disable-next-line no-empty-pattern
const MobileContentsComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={cn(styles.inner, styles.type_mobile)}>{/* 컨텐츠 영역 */}</div>
    </div>
  );
};

MobileContentsComponent.displayName = 'MobileContents';
export const MobileContents = MobileContentsComponent;
