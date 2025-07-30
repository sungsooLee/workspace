export interface StudentsList {
  courseSequenceId: number;
  courseSequenceName: string;
  openingYear: number;
  learningStartDate: string;
  learningEndDate: string;
  studentId: number;
  userId: number;
  departmentName: string;
  companyName: string;
  employeeNumber: string;
  userName: string;
  isCompleted: true;
  progressScore: number;
  examScore: number;
  asgmtScore: number;
  learningStatus: string;
  completedDate: string;
  reason: string;
  attendanceScore: number;
  isCertified: boolean;
  enrollmentType: string;
}

export interface StudentHistory {
  courseId: number;
  courseSequenceId: number;
  courseSequenceName: string;
  studentId: number;
  userId: number;
  isCompleted: true;
  examScore: number;
  asgmtScore: number;
  courseSequenceNo: number;
  courseName: string;
  learningStartDate: string;
  learningEndDate: string;
  courseType: string;
  attendanceScore: number;
}
