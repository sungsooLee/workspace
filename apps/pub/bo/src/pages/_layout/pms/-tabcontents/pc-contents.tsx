import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/view-box.module.css';
// eslint-disable-next-line no-empty-pattern
const PcContentsComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={cn(styles.inner, styles.type_pc)}>{/* 컨텐츠 영역 */}</div>
    </div>
  );
};

PcContentsComponent.displayName = 'PcContents';
export const PcContents = PcContentsComponent;
