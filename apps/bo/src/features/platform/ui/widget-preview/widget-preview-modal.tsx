import { memo } from 'react';
import { useCreation } from 'ahooks';

import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  Tabs,
} from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css
import type { Widget } from '../../../../types';

import { EmbedWidgetPreview } from '../embed-widget-preview/embed-widget-preview';

const WidgetPreviewModalComponent = ({ widget }: { widget: Widget }) => {
  const { close: closeModal } = useModal();

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
                    componentId={'completion-status-widget'}
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
