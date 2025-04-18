import { CompletionStatusWidget } from '../completion-status/completion-status';
import completionStatusPreviewData from '../completion-status/completion-status-mock.json';
import { tenantQueryOptions } from '../../../../../entities/tenant';

export const widgetComponentConfig: any = {
  'completion-status-widget': {
    component: CompletionStatusWidget,
    fetchData: async (queryClient: any) => {
      return await queryClient.fetchQuery(tenantQueryOptions.byUser());
    },
    fetchPreviewData: () => {
      return completionStatusPreviewData;
    },
  },
};
