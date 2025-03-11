import * as Primitive from '@radix-ui/react-dialog';
import { IcoXclose } from '@learnway/icons';
import React, { cloneElement, isValidElement, useEffect, useState } from 'react';

import { ModalConfig } from './type';
import { cn } from '@learnway/shared';
import styles from './modal.module.css';
import { useModal } from '../modal/modal.hook';
import { Button } from '../button/button';

const ModalComponent: React.FC<ModalConfig> = ({
  id,
  title,
  description,
  content,
  footer,
  onClose,
  width = 'auto',
  height = 'auto',
  hideCloseButton = false,
  ...props
}) => {
  const { close: closeModal } = useModal();
  const [modalData, setModalData] = useState();

  useEffect(() => {
    console.log('ModalComponent changed data', modalData);
  }, [modalData]);

  const handleOpenChange = (open: boolean) => {
    onClose?.();
  };

  const handleFooterButtonClick = (key?: string) => {
    console.log('handleFooterButtonClick', key);

    // 확인 버튼 클릭
    if (key === 'confirm') {
      closeModal(modalData);
    }
    // 취소 or key 가 없는경우 (footer button 에 actionKey 설정 안된 경우)
    else if (key === 'cancel' || !key) {
      closeModal();
    }
    // reset, .....
    else {
      // content component 연동
    }
  };

  return (
    <Primitive.Root open={true} onOpenChange={handleOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className={styles.overlay} />
        <Primitive.Content
          className={cn(styles.content, 'nlp--modal', width && styles[width])}
          onInteractOutside={(e) => e.preventDefault()} // Overlay 클릭 방지
          onEscapeKeyDown={(e) => e.preventDefault()} // ESC 키 방지
        >
          {/* title */}
          <Primitive.Title className={styles.title}>{title}</Primitive.Title>

          {/* description */}
          {description && (
            <Primitive.Description className={styles.description}>
              {description}
            </Primitive.Description>
          )}

          {/* content */}
          <div className={cn(styles.content_body, !title && styles.notitle)}>
            {
              <ContentComponent
                content={content}
                setModalData={setModalData}
                closeModal={closeModal}
              />
            }
          </div>

          {/* footer */}
          {footer && (
            <div className={styles.footer}>
              <FooterComponent
                {...props}
                id={id}
                footer={footer}
                onButtonClick={handleFooterButtonClick}
              />
            </div>
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

const ContentComponent: React.FC<any> = ({ content, setModalData, closeModal }) => {
  const newContent = isValidElement(content)
    ? cloneElement(
        content as React.ReactElement<{
          setModalData: (value: any) => void;
          closeModal: (value?: any) => void;
        }>,
        {
          setModalData,
          closeModal,
        },
      ) // content 는 어떤 컴포넌트가 들어올지 모르기때문에 setModalData 사용을 위해 타입 단언
    : null;
  return newContent;
};

const FooterComponent: React.FC<any> = ({ footer: customFooter, onButtonClick }) => {
  const handleClick = (event: any) => {
    const isButton = event.target instanceof HTMLButtonElement;
    const actionKey = event.target?.getAttribute('actionKey');
    isButton && onButtonClick?.(actionKey);
  };

  return (
    <div className={styles.btn_wrap} onClick={handleClick}>
      {isValidElement(customFooter) ? (
        customFooter
      ) : (
        <>
          <Button label={'취소'} variant={'gray'} size={'lg'} actionKey={'cancel'} />
          <Button label={'확인'} variant={'primary'} size={'lg'} actionKey={'confirm'} />
        </>
      )}
    </div>
  );
};

export const Modal = ModalComponent;
