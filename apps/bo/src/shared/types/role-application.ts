export interface RoleApplication {
  roleApplicationId: number;
  applicant: Applicant;
  role: RoleInfo;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  approver?: Applicant;
  rejectReason: any;
  createdDate: string;
  approvedDate: any;
}

export interface Applicant {
  uuid: string;
  employeeNumber: string;
  name: string;
  engName: any;
  birthday: string;
  email: string;
  companyTelephoneNumber: any;
  phoneNumber: string;
  locale: string;
  lastLoginDate: string;
  loginFailCount: number;
  company: RoleCompany;
  dept: RoleDept;
  accountType: any;
  workPlaceCode: any;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  modifiedDate: string;
}

export interface RoleCompany {
  companyId: number;
  companyCode: string;
  companyType: string;
  name: string;
  engName: any;
  brn: string;
  abbreviationName: any;
  rpsntrName: any;
  companyTelNoCountryCode: any;
  companyTelNo: any;
  companyFaxNoCountryCode: any;
  companyFaxNo: any;
  companyEmail: any;
  basicAddress: any;
  detailAddress: any;
  postNo: any;
  hrInfoManageType: any;
  companyMemberJoinTypeList: any;
  isUseLinkageSystem: any;
  linkageType: any;
  linkageSystem: any;
  serviceTypeList: any;
  paymentCompanyCode: any;
  isUseSso: any;
  ssoTypeList: any;
  passwordAuthType: any;
  isUseTwoFactorAuth: any;
  twoFactorAuthPlatformTypeList: any;
  twoFactorAuthType: any;
  isUseWatermark: any;
  watermarkText: any;
  watermarkPosition: any;
  isPlayerControlLimit: any;
  playerControlLimitType: any;
  isPlayBackRateLimit: any;
  playBackRateLimitType: any;
  isCaptureBlockType: any;
  captureBlockType: any;
  focusModeType: any;
  ipAccessControlTypeFo: any;
  ipAccessControlTypeBo: any;
  managerDept: any;
  managerPosition: any;
  managerName: any;
  managerEmail: any;
  managerOfficeTelCountryCode: any;
  managerOfficeTel: any;
  managerPhoneCountryCode: any;
  managerPhone: any;
  companyLoginRestrictionList: any;
  isUsed: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  modifiedDate: string;
}

export interface RoleDept {
  deptId: number;
  depth: any;
  sortOrder: any;
  deptCode: string;
  managerEmployeeNumber: any;
  managerEmployeeNumberUuid: any;
  managerName: any;
  deptName: string;
  deptEngName: any;
  deptDesc: any;
  isUsed: boolean;
  isDeleted: boolean;
  parentDeptId: any;
  deptMemberCount: number;
  hrInfoManageType: any;
  companyCode: any;
  companyName: any;
  companyType: any;
  parentDeptList: any;
  createdBy: any;
  createdDate: any;
  lastModifiedBy: any;
  modifiedDate: any;
  childList: any[];
}

export interface RoleInfo {
  roleId: number;
  siteScope: string;
  roleType: string;
  parentRoleId: any;
  sortOrder: number;
  name: string;
  description: string;
  tenantScope: string;
  tenantId: number;
  tenantName: string;
  companyScope: string;
  companies: any;
  channelScope: string;
  channels: any[];
  deptScope: string;
  depts: any;
  isUsed: boolean;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  modifiedDate: string;
}

export interface RoleApplicationParam {
  roleId: number;
  applicantUuid: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}
