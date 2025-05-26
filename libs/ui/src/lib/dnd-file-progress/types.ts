import { UploadFile } from '@learnway/hooks';
export interface DndFileProgressProps {
  files: UploadFile[];
  onRemove: (fileId: string) => void;
  onRetry: (fileId: string) => void;
  addFiles: (files: File[]) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  acceptFiles: string[];
  maxFileCount: number;
  maxFileSize: number;
  wrapSize?: string;
  guideText?: string;
  errorMessage?: string;
}
