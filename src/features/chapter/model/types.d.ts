import { Content } from '@/entities/content';

export interface Chapter {
  kitId: number;
  chapterId: number;
  chapterName: string;
  seq: number;
  contentSeqList: Content[];
}
