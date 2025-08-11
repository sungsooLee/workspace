type DateTime = string;

export enum LessonContentType {
  VIDEO = 'VIDEO',
  EBOOK = 'EBOOK',
  SCORM = 'SCORM',
  HTML5_VIDEO = 'HTML5_VIDEO',
  IMAGE = 'IMAGE',
  EXTERNAL_LINK = 'EXTERNAL_LINK',
  COMMISSIONED_CONTENT = 'COMMISSIONED_CONTENT',
  BLOG = 'BLOG',
  EXAM = 'EXAM',
  EXAM_POOL = 'EXAM_POOL',
  ASSIGNMENT = 'ASSIGNMENT',
  SURVEY = 'SURVEY',
  ETC = 'ETC',
}
export const LessonContentTypeLabel: Record<LessonContentType, string> = {
  [LessonContentType.VIDEO]: '동영상',
  [LessonContentType.EBOOK]: '이북',
  [LessonContentType.SCORM]: '스콤',
  [LessonContentType.HTML5_VIDEO]: 'HTML 동영상',
  [LessonContentType.IMAGE]: '이미지',
  [LessonContentType.EXTERNAL_LINK]: '외부링크',
  [LessonContentType.COMMISSIONED_CONTENT]: '외부위탁',
  [LessonContentType.BLOG]: '블로그',
  [LessonContentType.EXAM]: '시험지',
  [LessonContentType.EXAM_POOL]: '문제은행',
  [LessonContentType.ASSIGNMENT]: '과제',
  [LessonContentType.SURVEY]: '설문지',
  [LessonContentType.ETC]: '기타',
}

export interface CurriculumData {
  mappingCurriculumType?: string;
  lessonId?: number;
  lessonName?: string;
  lessonType?: string;
  sortOrder?: number;
  contentUuid?: string;
  contentType?: string;
  learningTime?: number;
  createdBy?: string;
  createdDate?: DateTime;
  lastModifiedBy?: string;
  modifiedDate?: DateTime;
  lessonDescription?: string;
}
