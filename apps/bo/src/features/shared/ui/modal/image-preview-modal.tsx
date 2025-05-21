import React, { FC, memo, useState, useEffect } from 'react';
import { cn } from '@learnway/shared';
import { ModalBody, ModalContainer } from '@learnway/ui';

import styles from './image-preview-modal.module.css';

const ImagePreviewModalComponent: FC<any> = ({ imageUrl }) => {
  return (
    <ModalContainer>
      <ModalBody>
        <div className={cn(styles.start, styles.img_wrap)}>
          <img src={imageUrl} alt="" />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const ImagePreviewModal = ImagePreviewModalComponent;
