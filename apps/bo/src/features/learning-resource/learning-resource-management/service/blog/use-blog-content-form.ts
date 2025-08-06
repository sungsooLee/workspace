import {
  BlogPostRes,
  BlogUpdateReq,
  useCreateBlogContent,
  useUpdateBlogContent,
} from '@entities/learning-resource';
import { DynamicFormProvider } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getPayloadFromBlogSubmit } from '../learning-resource-blog-form-submit';

export const useBlogContentForm = (options: { provider: DynamicFormProvider }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { confirm: openConfirm } = useModal();

  const { watch } = options.provider;
  const contentUuid = watch('contentUuid');
  const tenantId = watch('tenantId');

  const routingParams = useCallback((info: BlogPostRes) => {
    return {
      to: '/learning/learning-resource/view',
      state: {
        contentUuid: info.contentUuid,
        listParam: {
          tenantId: info.tenantId,
          channelUuid: info.channelUuid,
        },
      },
      replace: true,
    };
  }, []);

  const { create: createBlogContent } = useCreateBlogContent({
    onSuccess: (result: BlogPostRes) => {
      if (result?.contentUuid) {
        router.navigate(routingParams(result));
      }
    },
  });

  const { update: updateBlogContent } = useUpdateBlogContent({
    onSuccess: (result: BlogPostRes) => {
      if (result?.contentUuid) {
        router.navigate(routingParams(result));
      }
    },
  });

  const handleOnSubmit = async (data: Record<string, any>): Promise<void> => {
    const { payload } = getPayloadFromBlogSubmit({
      data,
      tenantId,
      contentUuid,
    });

    if (
      await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      })
    ) {
      if (!contentUuid) {
        createBlogContent(payload);
      } else {
        updateBlogContent(payload as BlogUpdateReq);
      }
    }
  };

  return { handleOnSubmit };
};
