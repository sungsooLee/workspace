import styles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';
import { cn } from '@learnway/shared';
import React, { FC, ReactNode } from 'react'; // 하단 layout style - line
/**
 * 목록형 페이지에서 검색창 아래 영역을 감쌀때 사용한다.
 * @constructor
 */
const WrapBoxComponent: FC<{ children: ReactNode }> = () => {
  return <div className={cn(styles.start, styles.inner)}></div>;
};

export const WrapBox = WrapBoxComponent;
