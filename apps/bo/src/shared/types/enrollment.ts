export interface EnrollmentRegistList {
  courseSequenceId: number;
  courseSequenceName: string;
  openingYear: number;
  learningStartDate: string;
  learningEndDate: string;
  enrollId: number;
  createdDate: string;
  enrollStatusType: string;
  userId: number;
  departmentName: string;
  companyName: string;
  employeeNumber: string;
  userName: string;
  approvalReason: string;
  finalApprovalDate: string;
}

export interface EnrollmentRegistCount {
  total: number;
  countInfo: Array<any>;
}

export interface EnrollmentCancelList {
  courseSequenceId: number;
  courseSequenceName: string;
  openingYear: number;
  learningStartDate: string;
  learningEndDate: string;
  enrollId: number;
  createdDate: string;
  enrollStatusType: string;
  userId: number;
  departmentName: string;
  companyName: string;
  employeeNumber: string;
  userName: string;
  approvalReason: string;
  finalApprovalDate: string;
}
