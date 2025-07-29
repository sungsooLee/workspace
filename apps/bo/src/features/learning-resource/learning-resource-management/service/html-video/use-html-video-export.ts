import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import { DynamicFormProvider, useCurrentRoute } from '@learnway/hooks';
import { ContentExportRes } from '@types';
import { usePostContentExport } from '@entities/learning-resource';

export const useHtmlVideoExport = (provider: DynamicFormProvider) => {
  const router = useRouter();
  const { state } = useCurrentRoute();

  const { watch } = provider;
  const languageCountryCode = watch('languageCountryCode');

  const { contentUuid, listParam } = state;

  const { exportContent } = usePostContentExport({
    onSuccess: (result: ContentExportRes) => {
      if (result.destContentUuid) {
        router.navigate({
          to: '/learning/resource/html-video/view',
          state: {
            contentUuid: result.destContentUuid,
            listParam: {
              tenantId: result.destTenantId,
              channelUuid: result.destChannelUuid,
            },
          },
          replace: true,
        });
      }
    },
  });

  const handleTranslateAction = useCallback(() => {
    const { tenantId, channelUuid } = listParam;
    if (!tenantId || !channelUuid) {
      return;
    }

    exportContent({
      contentUuid,
      tenantId: listParam?.tenantId ?? -1,
      destChannelUuid: listParam?.channelUuid ?? '',
      languageCountryCode,
    });
  }, [contentUuid, languageCountryCode, listParam]);

  return { handleTranslateAction };
};
