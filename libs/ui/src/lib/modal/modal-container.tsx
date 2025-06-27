import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import * as Primitive from '@radix-ui/react-dialog';
import { cn, getSlot } from '@learnway/shared';
import styles from './modal-container.module.css';
import { CommonReactElementProps } from '../type';

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
  const titleRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const maxHeight = 718;

  const [isScrollable, setIsScrollable] = useState(false);
  const [contentMaxHeight, setContentMaxHeight] = useState<number>(0);

  useEffect(() => {
    const checkScroll = () => {
      if (!contentRef.current) return;

      const titleHeight = titleRef.current?.offsetHeight ?? 0;
      const footerHeight = footerRef.current?.offsetHeight ?? 0;

      const maxContentHeight = maxHeight - titleHeight - footerHeight;

      setContentMaxHeight(maxContentHeight);

      setIsScrollable(contentRef.current.scrollHeight > maxContentHeight);
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    const observer = new MutationObserver(checkScroll);
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true, // 크기 변화와 같은 속성 변경을 감지
      });
    }
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  return (
    <div className={cn(styles.start, className, 'nlp--modal-content')}>
      {/* title */}
      <Primitive.Title ref={titleRef} className={styles.title}>
        {TitleSlot}
      </Primitive.Title>
      {/* description */}
      {DescSlot && (
        <Primitive.Description className={styles.description}>{DescSlot}</Primitive.Description>
      )}
      {/* body */}
      <div
        ref={contentRef}
        className={cn(styles.contents, isScrollable && styles.scrolled, 'modal-content')}
        style={{ maxHeight: contentMaxHeight }}
      >
        {BodySlot}
      </div>
      {/* footer */}
      {FooterSlot && (
        <div ref={footerRef} className={styles.footer}>
          {FooterSlot}
        </div>
      )}
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
