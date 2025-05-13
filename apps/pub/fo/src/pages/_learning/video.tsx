import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './video.module.css';

import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_learning/video')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.start}>
      {/* 예시 이미지 */}
      <img src={bnrImage1} alt="" />
    </div>
  );
}
