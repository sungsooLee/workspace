import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './ebook.module.css';

import ebookImg from '@learnway/styles/fo/assets/images/temp/img_ebook.png';

export const Route = createFileRoute('/_learning/ebook')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.ebook}`}>
      {/* 예시 이미지 */}
      <img src={ebookImg} alt="" />
    </div>
  );
}
