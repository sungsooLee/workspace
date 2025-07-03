import { memo } from 'react';

import { useWigetComponentConfig, hasComponent } from '../../service/widget-container.service';

interface WidgetContainerComponentProps {
  componentId: string;
  isPreview: boolean;
  props?: any;
}

export interface EmbedWidgetProps {
  data?: any;
}

const WidgetContainerComponent = ({
  componentId,
  isPreview,
  props = {},
}: WidgetContainerComponentProps) => {
  const { Component, data } = useWigetComponentConfig(componentId, isPreview);

  if (!hasComponent(componentId)) {
    return <></>;
  }

  return <Component data={data} {...props} />;
};

export const WidgetContainer = memo(WidgetContainerComponent);
