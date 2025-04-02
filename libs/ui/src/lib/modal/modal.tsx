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
  // 닫기 버튼 클릭 시 onClose 콜백 호출
  const handleOpenChange = () => onClose?.();
  return (
    <Primitive.Root open={true} onOpenChange={handleOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className={styles.overlay} />
        <Primitive.Content
          className={cn(styles.content, 'nlp--modal', width && styles[width])}
          onInteractOutside={(e) => e.preventDefault()} // Overlay 클릭 방지
          onEscapeKeyDown={(e) => e.preventDefault()} // ESC 키 방지
        >
          {/* 모달 콘텐츠 */}
          <div className={cn(styles.content_body, width && styles[width])}>{content}</div>

          {/* 헤더 액션 노드 영역 (커스텀 사용 가능) */}
          {headerActionNode && (
            <div className={cn(styles.header_action_node)}>{headerActionNode}</div>
          )}

          {/* 닫기 버튼 */}
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
