import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import * as Primitive from '@radix-ui/react-dialog';
import { cn, getSlot } from '@learnway/shared';
import styles from './modal-container.module.css';
import { CommonReactElementProps } from '@/libs/ui/src';

export interface ModalContainerProps<T = any> extends CommonReactElementProps {
  title?: string; // openModal(ModalConfig) : ModalConfig.title 값
  description?: string; // openModal(ModalConfig) : ModalConfig.description 값
  children?: React.ReactNode;
}

const ModalContainerComponent: React.FC<ModalContainerProps> = ({
  title,
  children,
  className,
  ...props
}) => {
  const TitleSlot = getSlot(children, ModalTitle);
  const DescSlot = getSlot(children, ModalDescription);
  const BodySlot = getSlot(children, ModalBody);
  const FooterSlot = getSlot(children, ModalFooter);

  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        setIsScrollable(contentRef.current.scrollHeight > 588);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  return (
    <div className={cn(styles.start, className, 'nlp--modal-content')}>
      {/* title */}
      <Primitive.Title className={styles.title}>{TitleSlot}</Primitive.Title>
      {/* description */}
      {DescSlot && (
        <Primitive.Description className={styles.description}>{DescSlot}</Primitive.Description>
      )}
      {/* body */}
      <div
        ref={contentRef}
        className={cn(styles.contents, isScrollable && styles.scrolled, 'modal-content')}
      >
        {BodySlot}
      </div>
      {/* footer */}
      {FooterSlot && <div className={styles.footer}>{FooterSlot}</div>}
    </div>
  );
};

export const ModalContainer = ModalContainerComponent;

/**
 * ModalTitle
 * @param children
 * @constructor
 */
export const ModalTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

/**
 * ModalDescription
 * @param children
 * @constructor
 */
export const ModalDescription: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

/**
 * ModalBody
 * @param children
 * @constructor
 */
export const ModalBody: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

/**
 * ModalFooter
 * @param children
 * @constructor
 */
export const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
