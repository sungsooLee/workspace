import { getQuerySkipToken } from '@learnway/shared';
import { skipToken } from '@tanstack/react-query';

import { Widget } from '../../../types';
import WidgetsService from '../api/widgets';

export const queryKeys = {
  all: ['widgets'] as const,
  detail: (widgetCode: string) => [...queryKeys.all, widgetCode] as const,
  allTenantWidget: (tenantId: number) => [...queryKeys.all, tenantId] as const,
  listWithTenant: () => [...queryKeys.all, 'fortenant'] as const,
};

export const widgetsQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<any> => {
      const data = await WidgetsService.fetchWidgets(params);
      return {
        ...data,
        content: data.content.map((widget: any) => {
          const deviceNames: string[] = [];
          widget.isWebExposed && deviceNames.push('PC');
          widget.isMobileExposed && deviceNames.push('Mobile');

          return {
            ...widget,
            deviceNames: deviceNames.join(', '),
            status: widget.isUsed ? '사용' : '사용불가',
          };
        }),
      };
    },
  }),
  get: (widgetCode?: string) =>
    widgetCode
      ? {
          queryKey: queryKeys.detail(widgetCode),
          queryFn: async (): Promise<any> => {
            const data = (await WidgetsService.fetchWidget(widgetCode)) as any;
            const deviceNames: string[] = [];
            data.isWebExposed && deviceNames.push('PC');
            data.isMobileExposed && deviceNames.push('Mobile');

            return {
              ...data,
              deviceNames,
              components: [
                ...(data.isWebExposed
                  ? [
                      {
                        type: 'PC',
                        componentId: data.componentPcId,
                        size: `${data.pcWidth} * ${data.pcHeight}`,
                      },
                    ]
                  : []),
                ...(data.isMobileExposed
                  ? [
                      {
                        type: 'Mobile',
                        componentId: data.componentMobileId,
                        size: `${data.mobileWidth} * ${data.mobileHeight}`,
                      },
                    ]
                  : []),
              ],
            };
          },
        }
      : getQuerySkipToken<Widget>(),

  allTenantWidget: (tenantId: number) =>
    tenantId
      ? {
          queryKey: queryKeys.allTenantWidget(tenantId),
          queryFn: () => WidgetsService.getWidgetsTenant(tenantId),
        }
      : getQuerySkipToken<any>(),

  listWithTenant: (param: any) => ({
    queryKeys: queryKeys.listWithTenant,
    queryFn: async () => WidgetsService.getWidgetsWithTenant(param),
  }),
};

export const mutateOptions = {
  createTenant: () => ({
    mutationFn: ({ tenantId, body }: { tenantId: number; body: any }) =>
      WidgetsService.postWidgetsTenantMappings(tenantId, body),
  }),
  moveTenantWidget: () => ({
    mutationFn: (payload: any) => {
      return WidgetsService.moveWidgetsTenantMappings(payload);
    },
  }),
  updateTenantWidget: () => ({
    mutationFn: ({ tenantWidgetId, body }: { tenantWidgetId: number; body: any }) => {
      return WidgetsService.putWidgetsTenantMappings(tenantWidgetId, body);
    },
  }),
};
