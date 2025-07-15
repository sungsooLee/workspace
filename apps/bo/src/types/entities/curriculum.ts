export type CurriculumCreateRequest = {
  tenantId: number;
  channelUuid: string;
  curriculumName: string;
  curriculumDescription: string;
  curriculumType: CURRICULUM_TYPE;
  languageCountryCode: string;
  coordinatorUuid: string;
  coordinatorName: string;
  coordinatorTelCountryCode: string;
  coordinatorTelNo: string;
  isVendored: boolean;
  vendorCode: number;
  vendorName: string;
  vendorCoordinatorUuid: string;
  vendorCoordinatorName: string;
  vendorTelCountryCode: string;
  vendorTelNo: string;
};

export type CurriculumResponse = CurriculumCreateRequest & {
  curriculumId: number;
  isPublished: boolean;
  isUsed: boolean;
  openingYear: number;
};

export type CurriculumDetailResponse = CurriculumResponse & {
  mappingCurriculumType: MAPPING_CURRICULUM_TYPE;
  moduleList: ModuleListResponse[];
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  modifiedDate: string;
  curriculumType: CURRICULUM_TYPE;
};

export type ModuleListResponse = {
  mappingCurriculumType: MAPPING_CURRICULUM_TYPE;
  moduleId: number;
  moduleName: string;
  description: string;
  moduleType: MODULE_TYPE;
  sortOrder: number;
  isDummy: boolean;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  modifiedDate: string;
  lessonList: LessonResponse[];
};

export type LessonResponse = {
  mappingCurriculumType: MAPPING_CURRICULUM_TYPE;
  lessonId: number;
  lessonName: string;
  description: string;
};
export type Curriculum = CurriculumResponse;

export type CurriculumSearchParams = {
  tenantId: number;
  channelUuid: string;
  languageCountryCode?: string;
  curriculumName?: string;
  openingYear?: number;
  page?: number;
  size?: number;
  sort?: string;
};

export enum LESSON_TYPE {
  TOC = 'TOC',
  RESOURCES = 'RESOURCES',
}

export enum MAPPING_CURRICULUM_TYPE {
  LESSON = 'LESSON',
  MODULE = 'MODULE',
  CURRICULUM = 'CURRICULUM',
}

export enum MODULE_TYPE {
  GENERAL = 'GENERAL',
  FIXED = 'FIXED',
}

export enum CURRICULUM_TYPE {
  GENERAL = 'GENERAL',
  ASSESSMENT = 'ASSESSMENT',
  SURVEY = 'SURVEY',
}

export enum CONTENT_TYPE {
  VIDEO = 'VIDEO',
  EBOOK = 'EBOOK',
  SCORM = 'SCORM',
  HTML5_VIDEO = 'HTML5_VIDEO',
  IMAGE = 'IMAGE',
  EXTERNAL_LINK = 'EXTERNAL_LINK',
  EXTERNAL_AGENCY = 'EXTERNAL_AGENCY',
  BLOG = 'BLOG',
  EXAM = 'EXAM',
  EXAM_POOL = 'EXAM_POOL',
  ASSIGNMENT = 'ASSIGNMENT',
  SURVEY = 'SURVEY',
  ETC = 'ETC',
}
