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
  blogContent: BlogContent;
}

export interface Tag {
  tagId: number;
  tagName: string;
}

export interface BlogContent {
  root: Root2;
}

export interface Root2 {
  type: string;
  format: string;
  indent: number;
  version: number;
  children: Children[];
  direction: string;
}

export interface Children {
  type: string;
  format: string;
  indent: number;
  version: number;
  children: Children2[];
  direction: string;
  textStyle: string;
  textFormat: number;
}

export interface Children2 {
  mode: string;
  text: string;
  type: string;
  style: string;
  detail: number;
  format: number;
  version: number;
}
