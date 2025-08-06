export interface StaticFileTypes {
  fileUuid: string;
  newFileUuid: string;
  tenantId: number;
  isLoginRequired: boolean;
  isUsed: boolean;
  expiryStartDate: string;
  expiryEndDate: string;
  description: string;
}

export interface StaticFileParams {
  originalFileName: string;
  fileType: string;
  isLoginRequired: boolean;
  isUsed: boolean;
  expiryStartDate: string;
  expiryEndDate: string;
}

export interface StaticFileResponse {
  fileId: number;
  fileUuid: string;
  originalFileName: string;
  fileExtension: string;
  fileType: string;
  tenantId: number;
  tenantName: string;
  isLoginRequired: boolean;
  isUsed: boolean;
  expiryStartDate: string;
  expiryEndDate: string;
  modifiedDate: string;
}
