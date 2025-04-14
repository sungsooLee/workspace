import { memo } from 'react';

import { Button, useModal } from '@learnway/ui';

import { WidgetPreviewModal } from './widget-preview-modal';

const WidgetPreviewComponent = ({ widgetCode }: { widgetCode: string }) => {
  const { open: openModal } = useModal();
  return (
    <Button
      size={'xs'}
      className="btn_table"
      variant={'gray2'}
      onClick={(e) => {
        e.stopPropagation();
        openModal({
          width: 'xl',
          content: <WidgetPreviewModal widgetCode={widgetCode} />,
        });
      }}
    >
      {'미리보기'}
    </Button>
  );
};

export const WidgetPreviewButton = memo(WidgetPreviewComponent);
