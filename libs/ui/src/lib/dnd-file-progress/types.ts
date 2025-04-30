export interface DndFileProgressProps {
  files: any;
  onRemove: (fileId: string) => void;
  onCancel: (fileId: string) => void;
  onRetry: (fileId: string) => void;
  addFiles: (files: File[]) => void;
  multiple?: boolean;
}
