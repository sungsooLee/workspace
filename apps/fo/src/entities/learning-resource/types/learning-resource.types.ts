export interface BlogResource {
  contentUuid: string;
  contentName: string;
  languageCountryCode: string;
  blogContent: any;
}

export interface Content {
  tenantId: number;
  tenantName: string;
  channelUuid: string;
  channelName: string;
  contentUuid: string;
  contentName: string;
  languageCountryCode: string;
  createType: string;
  contentType: string;
  contentStatusCode: string;
  coordinatorUuid: string;
  coordinatorName: string;
  coordinatorTelNo: string;
  contentAddInfoType: string;
  contentAddInfo: number;
  isUnlimited: boolean;
  contentUseStartDate: any;
  contentUseEndDate: any;
  isVendored: boolean;
  vendorCoordinatorUuid: any;
  vendorCoordinatorName: any;
  vendorTelNo: any;
  isCourseUsed: boolean;
  isInspected: boolean;
  isCopyrighted: boolean;
  isSecured: boolean;
  isDeleted: boolean;
  isDrafted: boolean;
  aiSummary: any;
  aiKeyword: any;
  fileChangeId: number;
  isFileChanged: any;
  tags: Tag[];
  createdBy: string;
  creatorName: any;
  createdDate: string;
  lastModifiedBy: string;
  modifyerName: any;
  modifiedDate: string;
  description: string;
  vendorName: any;
  isOpened: boolean;
  blogContent: any;
}

export interface Tag {
  tagId: number;
  tagName: string;
}

export interface EtcContentDownloadReq {
  courseSequenceId?: number;
  courseId?: number;
  curriculumId?: number;
  moduleId?: number;
  lessonId?: number;
  contentUuid?: string;
}
