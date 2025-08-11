import { IcoLink } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { createFileRoute } from '@tanstack/react-router';

import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import liveImage from '@learnway/styles/fo/assets/images/common/img_live.png';

export const Route = createFileRoute('/_learning/live-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.file}`}>
      <div className={styles.file_box}>
        <p>
          <img src={liveImage} alt="" />
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
