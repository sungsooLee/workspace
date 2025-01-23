import React, { forwardRef, useEffect, useRef, useState } from 'react';

import * as Primitive from "@radix-ui/react-toast";

import { ToastConfig } from './type';

import styles from './toast.module.scss';

export interface ToastComponentProps {
  className?: string;
  config: ToastConfig;
  onClose?: () => void;
}

const ToastComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  ToastComponentProps
>(
  ({ className, onClose, config: { title, description }, }) => {
    const [open, setOpen] = useState(true);
    const eventDateRef = useRef(new Date());
    const timerRef = useRef(0);

    useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    const handleOpenChange = (value: boolean) => {
      setOpen(value);
      !value && onClose && onClose();
    }

    return (
      <>
        <Primitive.Root className={styles.Root} open={open} onOpenChange={handleOpenChange}>

          {/* Title*/}
          <Primitive.Title className={styles.Title}>{title}</Primitive.Title>

          {/* Description */}
          <Primitive.Description className={styles.Description}>
            {description}
          </Primitive.Description>

          {/* Action */}
          {/*<Primitive.Action*/}
          {/*  className={styles.Action}*/}
          {/*  asChild*/}
          {/*  altText="Goto schedule to undo"*/}
          {/*>*/}
          {/*  <button className={`${styles.Button} small green`}>Undo</button>*/}
          {/*</Primitive.Action>*/}

        </Primitive.Root>
        <Primitive.Viewport className={styles.Viewport} />
      </>
    );
  }
)

export const Toast = ToastComponent;
