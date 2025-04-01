import * as Primitive from '@radix-ui/react-dialog';
import { IcoXclose } from '@learnway/icons';
import React from 'react';

import { ModalConfig } from './type';
import { cn } from '@learnway/shared';
import styles from './modal.module.css';
import { Button } from '../button/button';

const ModalComponent: React.FC<ModalConfig> = ({
  content,
  headerActionNode,
  onClose,
  width = 'auto',
  hideCloseButton = false,
}) => {
  return (
    <Primitive.Root open={true} onOpenChange={() => onClose?.()}>
      <Primitive.Portal>
        <Primitive.Overlay className={styles.overlay} />
        <Primitive.Content
          className={cn(styles.content, 'nlp--modal', width && styles[width])}
          onInteractOutside={(e) => e.preventDefault()} // Overlay 클릭 방지
          onEscapeKeyDown={(e) => e.preventDefault()} // ESC 키 방지
        >
          {/* content */}
          <div className={cn(styles.content_body, width && styles[width])}>{content}</div>

          {/* 해더 버튼 영역 커스텀 하게 사용시 설정 */}
          {headerActionNode && (
            <div className={cn(styles.header_action_node)}>{headerActionNode}</div>
          )}

          {/* close button */}
          {!hideCloseButton && (
            <Primitive.Close asChild>
              <Button className={styles.btn_close} aria-label="Close" onlyIcon>
                <IcoXclose width={24} height={24} stroke="#131C30" />
              </Button>
            </Primitive.Close>
          )}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
};

export const Modal = ModalComponent;
