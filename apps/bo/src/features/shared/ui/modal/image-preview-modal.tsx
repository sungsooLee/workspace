import { useState } from 'react';
import { cn } from '@learnway/shared';
import { ModalBody, ModalContainer, Button } from '@learnway/ui';
import { IcoArrowPrev, IcoArrowNext } from '@learnway/icons';
// style
import styles from '@learnway/styles/bo/assets/styles/modules/pop-image-preview.module.css';

type Props = {
  imageUrl: string | string[];
};

const ImagePreviewModalComponent = ({ imageUrl }: Props) => {
  const isMultiImage = Array.isArray(imageUrl);
  const imageUrls = isMultiImage ? imageUrl : [imageUrl];
  const min = 0;
  const max = imageUrls.length - 1;

  const [step, setStep] = useState(min);

  const increment = () => {
    setStep((prev) => Math.min(prev + 1, max));
  };

  const decrement = () => {
    setStep((prev) => Math.max(prev - 1, min));
  };

  const isMin = step <= min;
  const isMax = step >= max;
  return (
    <ModalContainer>
      <ModalBody>
        <div className={cn(styles.start, styles.img_wrap)}>
          <img src={imageUrls[step]} alt="" />
          {isMultiImage && (
            <>
              <Button
                onlyIcon
                icon={<IcoArrowPrev width={32} height={32} />}
                className={styles.btn_prev}
                disabled={isMin}
                onClick={decrement}
              />
              <Button
                onlyIcon
                icon={<IcoArrowNext width={32} height={32} />}
                className={styles.btn_next}
                disabled={isMax}
                onClick={increment}
              />
            </>
          )}
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const ImagePreviewModal = ImagePreviewModalComponent;
