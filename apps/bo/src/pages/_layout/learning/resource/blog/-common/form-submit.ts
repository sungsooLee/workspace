import { getParsedDataFromString, isEmptyData } from '@learnway/shared';
import { BlogCreateReq, BlogUpdateReq, ContentAddInfoType } from '@types';

export const getPayloadFromBlogSubmit = (options: {
  data: any;
  tenantId: number;
  mode: 'create' | 'update';
  contentUuid?: string;
}) => {
  const getTimeValueFromHour = (duration: {
    hour: number;
    minute: number;
    second: number;
  }): number => {
    const { hour, minute, second } = duration;
    return hour * 60 * 60 + minute * 60 + second;
  };
  console.log(options.data);

  const contentTime = getTimeValueFromHour(options.data.contentDuration);
  const contentThumbnailFileGroupUuid = !isEmptyData(
    options.data.contentThumbnailFileGroupUuid?.files,
  )
    ? options.data.contentThumbnailFileGroupUuid?.files[0].group.groupUuid
    : '';
  const selectedContentThumbnailFileUuid = !isEmptyData(
    options.data.contentThumbnailFileGroupUuid?.files,
  )
    ? options.data.contentThumbnailFileGroupUuid?.files[0].fileUuid
    : '';

  const payload: BlogCreateReq = {
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
    contentThumbnailFileGroupUuid,
    selectedContentThumbnailFileUuid,
    isCourseUsed: options.data.isCourseUsed,
    isContentSecured: options.data.isContentSecured,
    isInspected: options.data.isInspected,
    isCopyrighted: options.data.isCopyrighted,
    isSecured: true,
    isDeleted: false,
    isOpened: true,
    tags: options.data.tags,
    blogContent: getParsedDataFromString(options.data.blogContent),
    contentAddInfoType: ContentAddInfoType.VIDEO_ADD_INFO, // 블로그(초)
    contentAddInfo: contentTime,
  };

  if (options.mode === 'update') {
    Object.assign(payload, {
      contentUuid: options.contentUuid ?? '',
    } as BlogUpdateReq);
  }

  console.log('payload ===>', payload);

  return { payload };
};
