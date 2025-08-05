import { ContentAddInfoType, HtmlVideoMetadataReq, Tag } from '@types';

export const getPayloadFromHtmlMetadataSubmit = (options: { data: any; contentUuid: string }) => {
  console.log(options.data);
  const payload: HtmlVideoMetadataReq = {
    contentUuid: options.contentUuid,
    tenantId: options.data.tenantId,
    contentName: options.data.contentName,
    languageCountryCode: options.data.languageCountryCode,
    channelUuid: options.data.channelUuid,
    description: options.data.description,
    coordinatorUuid: options.data.coordinatorUuid,
    coordinatorName: options.data.coordinatorName,
    coordinatorTelNo: options.data.coordinatorTelNo,
    contentUseStartDate: options.data.contentUseDate?.from,
    contentUseEndDate: options.data.contentUseDate?.to,
    isUnlimited: !options.data.isLimitExist,
    isVendored: options.data.isVendored,
    vendorCode: options.data.vendorCode,
    vendorName: options.data.vendorName,
    vendorCoordinatorName: options.data.vendorCoordinatorName,
    vendorTelNo: options.data.vendorTelNo,
    isCourseUsed: options.data.isCourseUsed,
    isInspected: options.data.isInspected,
    isCopyrighted: options.data.isCopyrighted,
    isDeleted: false,
    isOpened: true,
    tags: options.data.tags.map((tag: Tag | string) => ({
      tagName: typeof tag === 'string' ? tag : tag.tagName,
    })),
    contentAddInfoType: ContentAddInfoType.VIDEO_ADD_INFO,
    contentAddInfo: options.data.contentAddInfo,
  };

  console.log('payload ===>', payload);

  return { payload };
};
