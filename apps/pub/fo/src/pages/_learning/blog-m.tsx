import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './blog-m.module.css';

import blogImg from '@learnway/styles/fo/assets/images/temp/img_blog.png';
// 커밋테스트
export const Route = createFileRoute('/_learning/blog-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.blog}`}>
      <div className={styles.header_color}></div>
      {/* 예시 이미지 */}
      <img src={blogImg} alt="" />
    </div>
  );
}
