import { Chapter } from '@/features/chapter';

export interface Content extends Chapter {
  contentId: number;
  contentName: string;
  seq: number;
  status?: string;
}
