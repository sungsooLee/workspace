import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { DynamicFormProvider } from '@learnway/hooks';
import { BlogPostRes, BlogUpdateReq } from '@types';
import { useCreateBlogContent, useUpdateBlogContent } from '@entities/learning-resource';
import { getPayloadFromBlogSubmit } from '../learning-resource-blog-form-submit';
import { useModal } from '@learnway/ui/modal';

export const useBlogContentForm = (options: {
  mode: 'CREATE' | 'UPDATE';
  provider: DynamicFormProvider;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { confirm: openConfirm } = useModal();

  const { watch } = options.provider;
  const contentUuid = watch('contentUuid');
  const tenantId = watch('tenantId');

  const routingParams = useCallback((info: BlogPostRes) => {
    return {
      to: '/learning/resource/blog/view',
      state: {
        contentUuid: info.contentUuid,
        listParam: {
          tenantId: info.tenantId,
          channelUuid: info.channelUuid },
        mode: 'UPDATE' },
      replace: true };
  }, []);

  const { create: createBlogContent } = useCreateBlogContent({
    onSuccess: (result: BlogPostRes) => {
      if (result?.contentUuid) {
        router.navigate(routingParams(result));
      }
    } });

  const { update: updateBlogContent } = useUpdateBlogContent({
    onSuccess: (result: BlogPostRes) => {
      if (result?.contentUuid) {
        router.navigate(routingParams(result));
      }
    } });

  const handleOnSubmit = async (data: Record<string, any>): Promise<void> => {
    const { payload } = getPayloadFromBlogSubmit({
      data,
      tenantId,
      mode: options.mode,
      contentUuid });

    if (
      await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message') })
    ) {
      if (options.mode === 'CREATE') {
        createBlogContent(payload);
      } else {
        updateBlogContent(payload as BlogUpdateReq);
      }
    }
  };

  return { handleOnSubmit };
};
