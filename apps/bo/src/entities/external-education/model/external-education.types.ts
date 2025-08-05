export interface ExternalCourseFormStatusType {
  USE: 'USE';
  IN_USE: 'IN_USE';
  DRAFT: 'DRAFT';
}

export interface ExternalCourseFormEnrollType {
  REGISTRATION: 'REGISTRATION';
  RESULT: 'RESULT';
}

export interface ExternalCourseFormLayoutParam {
  tenantId: number;
  externalCourseFormEnrollType: ExternalCourseFormEnrollType;
}

export interface ExternalCourseForm {
  externalCourseFormTitle: string;
  externalCourseFormDescription: string;
  externalCourseFormId?: number;
  externalCourseFormStatusType: ExternalCourseFormStatusType;
  tenantId: number;
}

export interface ExternalCourseFormListRequest {
  tenantId?: number;
  externalCourseFormTitle?: string;
  externalCourseFormDescription?: string;
  externalFormStatusType?: 'USE' | 'IN_USE' | 'DRAFT';
}

export interface ExternalComponentLayout {
  externalCourseFormComponentId: number;
  isMandatory: boolean;
  sortOrder: number;
}

export interface ExternalCourseLayoutRequest {
  externalCourseFormId: number;
  layouts: ExternalComponentLayout[];
  externalCourseFormEnrollType: ExternalCourseFormEnrollType;
}

export interface ExternalCourseLayoutParam {
  externalCourseFormId: number;
  externalCourseFormEnrollType: ExternalCourseFormEnrollType;
}
