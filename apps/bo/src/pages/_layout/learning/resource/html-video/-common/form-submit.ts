import { ContentAddInfoType, HtmlVideoMetadataReq } from '@types';
import { getTimeValueFromHour } from '../../-common/common';

export const getPayloadFromHtmlMetadataSubmit = (options: {
  data: any;
  tenantId: number;
  // mode: 'draft' | 'complete';
  contentUuid: string;
}) => {
  const contentTime = getTimeValueFromHour(options.data.contentDuration);

  const payload: HtmlVideoMetadataReq = {
    contentUuid: options.contentUuid,
    tenantId: options.tenantId,
    contentName: options.data.contentName,
    languageCountryCode: options.data.languageCountryCode,
    channelUuid: options.data.channelUuid?.[0].channelUuid,
    description: options.data.description,
    coordinatorUuid: options.data.coordinatorUuid,
    coordinatorName: options.data.coordinatorName,
    coordinatorTelCountryCode: options.data.coordinatorTelCountryCode,
    coordinatorTelNo: options.data.coordinatorTelNo,
    contentUseStartDate: options.data.contentUseDate?.from,
    contentUseEndDate: options.data.contentUseDate?.to,
    isUnlimited: !options.data.isLimitExist,
    contentTime,
    isVendored: options.data.isVendored,
    vendorCode: options.data.vendorCode,
    vendorName: options.data.vendorName,
    vendorCoordinatorName: options.data.vendorCoordinatorName,
    vendorTelCountryCode: options.data.vendorTelCountryCode,
    vendorTelNo: options.data.vendorTelNo,
    contentThumbnailFileGroupUuid: options.data.contentThumbnailFileGroupUuid,
    selectedContentThumbnailFileUuid: options.data.selectedContentThumbnailFileUuid,
    isCourseUsed: options.data.isCourseUsed,
    isContentSecured: options.data.isContentSecured,
    isInspected: options.data.isInspected,
    isCopyrighted: options.data.isCopyrighted,
    isSecured: true,
    isDeleted: false,
    isOpened: true,
    tags: options.data.tags,
    contentAddInfoType: ContentAddInfoType.VIDEO_ADD_INFO,
    contentAddInfo: contentTime,
  };

  console.log('payload ===>', payload);

  return { payload };
};
