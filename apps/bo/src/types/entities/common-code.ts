export interface CommonCodeGroup {
  cdGroupNo: string;
  cdGroupName: string;
  cdGroupAbbreviatonEnglishName: string;
  cdGroupContent: string;
  applyDatetime: string;
  useYn: boolean;
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
  deleteYn: boolean;
}
