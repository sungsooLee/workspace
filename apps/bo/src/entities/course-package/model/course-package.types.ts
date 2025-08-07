export interface CoursePackagesParam {
  tenantId: number;
  channelUuid: string;
  packageName: string;
  isUsed: boolean;
}

export interface CoursePackages {
  packageId: number;
  packageName: string;
  description: string;
  channelName: string;
  tenantName: string;
  isUsed: boolean;
}

export interface CreateCoursePackage {
  packageName: string;
  description: string;
  channelUuid: string;
  isUsed: boolean;
  exposureStartDt: string;
  exposureEndDt: string;
  language: string;
  tenantIds: Array<any>;
}
