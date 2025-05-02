export interface DndFileProgressProps {
  files: any;
  onRemove: (fileId: string) => void;
  onRetry: (fileId: string) => void;
  addFiles: (files: File[]) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  acceptFiles: string[];
  maxFileCount: number;
  maxFileSize: number;
}
