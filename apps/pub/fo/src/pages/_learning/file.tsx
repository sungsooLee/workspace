import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

import styles from './file.module.css';

export const Route = createFileRoute('/_learning/file')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.file}`}>
      <div className={styles.file_box}>
        <p>비즈니스 영어 단어&숙어집 Part 2.pdf</p>
        <span>200MB</span>
        <Button variant="line" size="sm">
          다운로드
        </Button>
      </div>
    </div>
  );
}
