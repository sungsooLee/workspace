import { FileItem } from '@learnway/hooks';

export interface DndFileProgressProps {
  files: FileItem[];
  onRemove: (fileId: string) => void;
  onCancel: (fileId: string) => void;
  onRetry: (fileId: string) => void;
  addFiles: (files: File[]) => void;
  multiple?: boolean;
}
