import { IcoArrowNext, IcoArrowPrev, IcoDownload } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

// style
import styles from '@learnway/styles/bo/assets/styles/modules/pop-image-preview.module.css';

/* images */
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, useModal } from '@learnway/ui/modal';
import mapImg from '../../../assets/images/temp/img_temp_map.jpg';

export const Route = createFileRoute('/_layout/common/pop-image-preview')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();
  useEffect(() => {
    openModal({
      width: 'full',
      height: 'full',
      content: <PreviewImageContent />,
      headerActionNode: (
        <Button onlyIcon>
          <IcoDownload width={40} height={40} stroke="#131C30" />
        </Button>
      ),
    });
  }, [openModal]);
  return <div>이미지 미리보기</div>;
}

const PreviewImageContent = () => {
  return (
    <ModalContainer>
      <ModalBody>
        <div className={cn(styles.start, styles.img_wrap)}>
          <img src={mapImg} alt="" />
          <Button
            onlyIcon
            icon={<IcoArrowPrev width={32} height={32} />}
            className={styles.btn_prev}
            disabled
          />
          <Button
            onlyIcon
            icon={<IcoArrowNext width={32} height={32} />}
            className={styles.btn_next}
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};
