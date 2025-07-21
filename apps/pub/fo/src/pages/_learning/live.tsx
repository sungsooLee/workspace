import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoLink } from '@learnway/icons';

import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';

import liveImage from '@learnway/styles/fo/assets/images/common/img_live.png';

export const Route = createFileRoute('/_learning/live')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.file}`}>
      <div className={styles.file_box}>
        {/* 퍼블수정 20250717 마크업 수정 */}
        <p>
          <img src={liveImage} alt="" />
          비즈니스 영어 단어&숙어집 Part 2.pdf
          <IcoLink width={24} height={24} fill="#4d525c" />
        </p>
        {/* 퍼블수정 20250717 size 수정 */}
        <Button variant="line" size="md">
          다운로드
        </Button>
      </div>
    </div>
  );
}
