import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useModal } from '@learnway/ui';

import styles from './video.module.css';

import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_learning/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModal();

  const handleCompleteAlert = () => {
    openAlert({
      type: 'complete',
      title: <>완료되었습니다.</>,
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
    });
  };

  return (
    <div className={styles.start}>
      {/* 예시 이미지 */}
      <img src={bnrImage1} alt="" />
    </div>
  );
}
