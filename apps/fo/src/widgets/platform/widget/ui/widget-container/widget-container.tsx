import { memo } from 'react';

import { CompletionStatusWidget } from '../completion-status/completion-status';

interface WidgetContainerComponentProps {
  componentId: string;
}

export interface EmbedWidgetProps {
  data?: any;
}

const WidgetContainerComponent = ({ componentId }: WidgetContainerComponentProps) => {
  switch (componentId) {
    case 'completion-status-widget':
      return <CompletionStatusWidget />;
    default:
      return <></>;
  }
};

export const WidgetContainer = memo(WidgetContainerComponent);
