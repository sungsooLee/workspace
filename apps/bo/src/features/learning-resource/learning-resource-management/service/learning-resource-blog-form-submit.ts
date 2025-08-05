import { BlogCreateReq, BlogUpdateReq, Tag } from '@entities/learning-resource';
import { getParsedDataFromString } from '@learnway/shared';
import { ContentAddInfoType } from '@shared/types/enums';

export const getPayloadFromBlogSubmit = (options: {
  data: Record<string, any>;
  tenantId: number;
  contentUuid?: string;
}) => {
  const payload: BlogCreateReq = {
    tenantId: options.data.tenantId,
    contentName: options.data.contentName,
    languageCountryCode: options.data.languageCountryCode,
    channelUuid: options.data.channelUuid,
    description: options.data.description,
    coordinatorUuid: options.data.coordinatorUuid,
    coordinatorName: options.data.coordinatorName,
    coordinatorTelCountryCode: options.data.coordinatorTelCountryCode,
    coordinatorTelNo: options.data.coordinatorTelNo,
    contentUseStartDate: options.data.contentUseDate?.from,
    contentUseEndDate: options.data.contentUseDate?.to,
    isUnlimited: !options.data.isLimitExist,
    isVendored: options.data.isVendored,
    vendorCode: options.data.vendorCode,
    vendorName: options.data.vendorName,
    vendorCoordinatorName: options.data.vendorCoordinatorName,
    vendorTelCountryCode: options.data.vendorTelCountryCode,
    vendorTelNo: options.data.vendorTelNo,
    isCourseUsed: options.data.isCourseUsed,
    isInspected: options.data.isInspected,
    isCopyrighted: options.data.isCopyrighted,
    isDeleted: false,
    isOpened: true,
    tags: options.data.tags.map((tag: Tag | string) => ({
      tagName: typeof tag === 'string' ? tag : tag.tagName,
    })),
    blogContent: getParsedDataFromString(options.data.blogContent),
    contentAddInfoType: ContentAddInfoType.VIDEO_ADD_INFO, // 블로그(초)
    contentAddInfo: options.data.contentAddInfo,
  };

  if (options.contentUuid) {
    Object.assign(payload, {
      contentUuid: options.contentUuid ?? '',
    } as BlogUpdateReq);
  }

  console.log('payload ===>', payload);

  return { payload };
};
