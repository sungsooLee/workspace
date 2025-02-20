// eslint-disable-next-line @nx/enforce-module-boundaries
import * as Primitive from '@radix-ui/react-dialog';
import { IcoXclose } from '@learnway/icons';

import { ModalConfig } from './type';
import { cn } from '@learnway/shared';
import styles from './modal.module.css';
import { Button } from '../button/button';

const ModalComponent: React.FC<ModalConfig> = ({
  title,
  description,
  content,
  footer,
  onClose,
  width = 'auto',
  height = 'auto',
  hideCloseButton = false,
  hideFooter = false,
  ...props
}) => {
  const handleOpenChange = (open: boolean) => {
    onClose?.();
  };

  return (
    <Primitive.Root open={true} onOpenChange={handleOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className={styles.overlay} />
        <Primitive.Content className={cn(styles.content, width && styles[width])}>
          {/* title */}
          <Primitive.Title className={styles.title}>{title}</Primitive.Title>

          {/* description */}
          {description && (
            <Primitive.Description className={styles.description}>
              {description}
            </Primitive.Description>
          )}

          {/* children */}
          <div className={styles.content_body}>{content}</div>

          {/* footer */}
          {!hideFooter && (
            <div className={styles.footer}>
              <FooterComponent {...props} />
              {/*{footer}*/}
              {/* <Primitive.Close asChild>
                <button className={`${styles.Button} green`}>{footer}</button>
              </Primitive.Close> */}
            </div>
          )}

          {/* close button */}
          {!hideCloseButton && (
            <Primitive.Close asChild>
              <button className={styles.btn_close} aria-label="Close">
                <IcoXclose width={24} height={24} stroke="#131C30" />
              </button>
            </Primitive.Close>
          )}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
};

const FooterComponent: React.FC<any> = ({}) => {
  const handleClick = () => {};
  return (
    <>
      <Button label={'취소'} variant={'point'} size={'sm'} />
      <Button label={'확인'} variant={'primary'} size={'sm'} onClick={handleClick} />
    </>
  );
};

export const Modal = ModalComponent;
