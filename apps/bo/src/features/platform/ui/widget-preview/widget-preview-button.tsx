import { memo } from 'react';

import { Button, useModal } from '@learnway/ui';

import { WidgetPreviewModal } from './widget-preview-modal';
import type { Widget } from '@types';

const WidgetPreviewComponent = ({ widget, disabled }: { widget: Widget; disabled?: boolean }) => {
  const { open: openModal } = useModal();
  return (
    <Button
      size={'xs'}
      className="btn_table"
      variant={'gray2'}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        openModal({
          width: 'xl',
          content: <WidgetPreviewModal widget={widget} />,
        });
      }}
    >
      {'미리보기'}
    </Button>
  );
};

export const WidgetPreviewButton = memo(WidgetPreviewComponent);
