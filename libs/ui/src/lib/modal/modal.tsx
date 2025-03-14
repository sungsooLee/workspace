import * as Primitive from '@radix-ui/react-dialog';
import { IcoXclose } from '@learnway/icons';
import React from 'react';

import { ModalConfig } from './type';
import { cn } from '@learnway/shared';
import styles from './modal.module.css';
import { Button } from '../button/button';

const ModalComponent: React.FC<ModalConfig> = ({
  id,
  title,
  description,
  content,
  onClose,
  width = 'md',
  height = 'auto',
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
          <div className={cn(styles.content_body, !title && styles.notitle)}>{content}</div>
          {/*<div className={cn(styles.content_body, !title && styles.notitle)}>*/}
          {/*  <ContentComponent content={content} title={title} description={description} />*/}
          {/*</div>*/}

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

/**
 * modal content component
 * modal config title, description 설정된 경우 content 에서 사용하기 위해 props 설정
 * modal config 에 설정값이 없으면 content 에 기본값 사용
 * @param content
 * @param title
 * @param description
 * @constructor
 */
// const ContentComponent = ({
//   content,
//   title,
//   description,
// }: {
//   content: ReactNode;
//   title?: string;
//   description?: string;
// }) => {
//   const newContent = isValidElement<ModalContainerProps>(content)
//     ? React.cloneElement(content, { title })
//     : content;
//
//   // const children = injectPropsToSpecificComponent(content, ModalContainer, {});
//   if (isValidElement(content)) {
//     const children = React.Children.map(content, (d) => console.log(d));
//     const aa = getSlot2(content, ModalContainer);
//     console.log(children);
//     console.log(aa);
//   }
//
//   return newContent;
// };

// const injectPropsToSpecificComponent = (
//   element: ReactNode,
//   targetComponent: React.ElementType,
//   additionalProps: ModalContainerProps,
// ): ReactNode => {
//   if (!isValidElement(element)) return element;
//
//   // ✅ 특정 컴포넌트일 경우 props 추가
//   if (element.type === targetComponent) {
//     return React.cloneElement(element, additionalProps);
//   }
//
//   // ✅ children이 있으면 재귀적으로 탐색
//   if (element.props.children) {
//     return React.cloneElement(element, {
//       children: React.Children.map(element.props.children, (child) =>
//         injectPropsToSpecificComponent(child, targetComponent, additionalProps),
//       ) as ModalContainerProps,
//     });
//   }
//
//   return element;
// };

// const getSlot2 = (children: ReactNode, targetComponent: React.ElementType): ReactNode | null => {
//   let foundNode: ReactNode | null = null;
//
//   React.Children.forEach(children, (child) => {
//     if (!isValidElement(child)) return;
//
//     // ✅ 찾고자 하는 컴포넌트인 경우 저장
//     if (child.type === targetComponent) {
//       foundNode = child;
//     }
//
//     // ✅ 재귀적으로 children 탐색
//     if (!foundNode && child.props.children) {
//       foundNode = getSlot2(child.props.children, targetComponent);
//     }
//   });
//
//   return foundNode;
// };
