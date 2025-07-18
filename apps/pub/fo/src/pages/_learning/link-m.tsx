import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoLink } from '@learnway/icons';

import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

export const Route = createFileRoute('/_learning/link-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.file}`}>
      <div className={styles.file_box}>
        <p>
          비즈니스 영어 단어&숙어집 Part 2.pdf
          <IcoLink width={24} height={24} fill="#4d525c" />
        </p>
        <Button variant="line" size="md">
          다운로드
        </Button>
      </div>
    </div>
  );
}
