export type ContentsListSearchParams = {
  tenantId: string;
  channelUuid: string;
  contentTypes?: string;
  contentName?: string;
  isVendored?: string;
  isContentEnabled?: string;
  isCourseUsed?: string;
  coordinatorName?: string;
  langCountryCode?: string;
  isMockUp?: boolean;
};

export type ContentsListSearchResponse = {
  tenantId: number;
  tenantName: string;
  channelUuid: string;
  channelName: string;
  contentUuid: string;
  contentName: string;
  contentType: string;
  groupContentId: number;
  createType: string;
  contentStatusCode: string;
  isContentEnabled: true;
  coordinatorUuid: string;
  coordinatorName: string;
  contentAddInfoType: string;
  contentAddInfo: number;
  langCountryCode: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  modifiedDate: string;
  creatorName: string;
  modifyerName: string;
  //   children: ['string'];
};
