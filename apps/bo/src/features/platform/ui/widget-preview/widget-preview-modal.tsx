import { useCreation } from 'ahooks';
import { memo } from 'react';

import { cn } from '@learnway/shared';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

import type { Widget } from '@entities/widgets';
import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css

import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';
import { EmbedWidgetPreview } from '../embed-widget-preview/embed-widget-preview';

const WidgetPreviewModalComponent = ({ widget }: { widget: Widget }) => {
  const { closeModal } = useModal();

  console.log('widget', widget);
  const items = useCreation(() => {
    return [
      ...(widget.isWebExposed
        ? [
            {
              title: 'PC',
              key: 'a',
              content: (
                <div className="flex w-full justify-center">
                  <EmbedWidgetPreview
                    componentId={widget.componentPcId}
                    width={widget.pcWidth}
                    height={widget.pcHeight}
                  />
                </div>
              ),
            },
          ]
        : []),
      ...(widget.isMobileExposed
        ? [
            {
              title: 'Mobile',
              key: 'b',
              content: (
                <div className="flex w-full justify-center">
                  <EmbedWidgetPreview
                    componentId={widget.componentMobileId}
                    width={widget.mobileWidth}
                    height={widget.mobileHeight}
                    isMobile
                  />
                </div>
              ),
            },
          ]
        : []),
    ];
  }, [widget]);

  return (
    <ModalContainer>
      <ModalTitle>{'위젯 미리보기'}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.wrap)}>
          <div className={styles.tab_wrap}>
            <Tabs items={items} type="segment" size="md" />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const WidgetPreviewModal = memo(WidgetPreviewModalComponent);
