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

export interface StudentsHistory {
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

export interface StudentsDeliveryAddress {
  recipientName: string;
  countryCode: string;
  telNo: string;
  postalCode: string;
  address: string;
  addressDetail: string;
}

export interface StudentsLevelTest {
  enrollId: number;
  availableTestDate1: string;
  availableTestDate2: string;
  countryCode: string;
  courseId: number;
  familyName: string;
  firstName: string;
  preferGender: string;
  preferLearnDate1: string;
  preferLearnDate2: string;
  telNo: string;
}
