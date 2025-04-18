import { useQueryClient } from '@tanstack/react-query';
import { has } from 'lodash';
import { useCreation } from 'ahooks';

import { widgetComponentConfig } from '../ui/widget-container/widget-component-config';

export function useWigetComponentConfig(componentId: string, isPreview = false) {
  const queryClient = useQueryClient();

  const config = widgetComponentConfig[componentId];

  return {
    Component: config.component,
    data: useCreation(async () => {
      if (isPreview) {
        return config.fetchPreviewData();
      }
      return await config.fetchData(queryClient);
    }, [config]),
  };
}

export function hasComponent(componentId: string): boolean {
  return has(widgetComponentConfig, componentId);
}
