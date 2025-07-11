export type Curriculum = {
  tenantId: number;
  curriculumId?: number;
  channelUuid: string;
  curriculumName: string;
  curriculumDescription: string;
  curriculumType?: CurriculumType;
  languageCountryCode: string;
  coordinatorUuid?: string;
  coordinatorName?: string;
  coordinatorTelCountryCode?: string;
  coordinatorTelNo?: string;
  isVendored?: boolean;
  vendorCode?: number;
  vendorName?: string;
  vendorCoordinatorUuid?: string;
  vendorCoordinatorName?: string;
  vendorTelCountryCode?: string;
  vendorTelNo?: string;
};

export enum CurriculumType {
  GENERAL = 'GENERAL',
  ASSESSMENT = 'ASSESSMENT',
  SURVEY = 'SURVEY',
}
