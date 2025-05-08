export interface CommonCodeGroup {
  cdGroupId: string;
  cdGroupName: string;
  cdGroupAbbreviationEnglishName: string;
  cdGroupContent: string;
  isUsed: boolean;
}

export interface CommonCode
  extends Omit<CommonCodeGroup, 'cdGroupAbbreviationEnglishName' | 'cdGroupContent'> {
  cdId: string;
  cdName: string;
  cdContent: string;
  referenceVal1?: string;
  referenceVal2?: string;
  referenceVal3?: string;
  referenceVal4?: string;
  _timestamp?: number;
}

export interface CreateCommonCodeGroup extends CommonCodeGroup {
  informationSystemNo: string;
  cdRelationSeparationCd: string;
  cdLength: number;
  cdStandardTypecd: string;
  validityYn: boolean;
  languageCd: string;
  sourceInformationSystemNo: string;
  requestorEmployeeNo: string;
  multilingulCd: string;
  isDeleted: boolean;
}

export interface CommonCodeResponse {
  cdGroupId: string;
  cdGroupName: string;
  cdId: string;
  cdName: string;
  cdSeq: number;
  cdContent: string;
  referenceVal1: string;
  referenceVal2: string;
  referenceVal3: string;
  referenceVal4: string;
  isUsed: boolean;
}
