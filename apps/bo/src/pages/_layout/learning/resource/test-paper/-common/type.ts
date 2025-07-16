export interface ExamPageState {
  mode: PageMode;
  contentUuid?: string;
}

export enum PageMode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum ExamTab {
  PAPER = 'PAPER',
  QUESTION = 'QUESTION',
}

export enum ExamTemplateType {
  EXAM = 'EXAM',
  OMR = 'OMR',
  QUIZ = 'QUIZ',
}
