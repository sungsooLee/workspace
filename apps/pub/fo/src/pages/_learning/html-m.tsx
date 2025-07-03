import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './html-m.module.css';

import webImg from '@learnway/styles/fo/assets/images/temp/img_web.png';

export const Route = createFileRoute('/_learning/html-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.html}`}>
      {/* 예시 이미지 */}
      <img src={webImg} alt="" />
    </div>
  );
}
