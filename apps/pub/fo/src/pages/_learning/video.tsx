import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useModal, Button } from '@learnway/ui';

import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';

import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_learning/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModal();

  // 완료 alert
  const handleCompleteAlert = () => {
    openAlert({
      type: 'complete',
      title: <>완료되었습니다.</>,
      content: <>요청하신 작업이 정상적으로 완료되었습니다.</>,
    });
  };

  // 오류 alert
  const handleErrorAlert = () => {
    openAlert({
      type: 'error',
      title: <>오류가 발생하였습니다.</>,
      content: (
        <>
          요청하신 작업을 실행할 수 없습니다.
          <br />
          다시 확인해주세요.
        </>
      ),
    });
  };

  // 서버 오류 alert
  const handleServerErrorAlert = () => {
    openAlert({
      type: 'warning',
      title: <>서버 오류가 발생하였습니다.</>,
      content: (
        <>
          요청하신 작업을 실행할 수 없습니다.
          <br />
          담당자에게 문의해주세요.
        </>
      ),
    });
  };

  return (
    // 퍼블수정 20250716 마크업 수정
    <div className={`${styles.start} ${styles.video}`}>
      <div className={styles.video_box}>
        {/* 비디오 영역 */}
        <img src={bnrImage1} alt="" />
      </div>
    </div>
  );
}
