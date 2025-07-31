import { memo } from 'react';

import { WidgetPreviewModal } from './widget-preview-modal';
import type { Widget } from '@types';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

const WidgetPreviewComponent = ({ widget, disabled }: { widget: Widget; disabled?: boolean }) => {
  const { openModal } = useModal();
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
          content: <WidgetPreviewModal widget={widget} /> });
      }}
    >
      {'미리보기'}
    </Button>
  );
};

export const WidgetPreviewButton = memo(WidgetPreviewComponent);
