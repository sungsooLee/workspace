// useReducer 액션 타입
import { FileItem } from './types';

type Action =
  | { type: 'ADD_FILE'; file: FileItem }
  | { type: 'UPDATE_FILE'; fileId: string; updates: Partial<FileItem> }
  | { type: 'REMOVE_FILE'; fileId: string }
  | { type: 'CLEAR_ERROR' };

// 리듀서 함수 (상태 업데이트)
export const uppyFileReducer = (state: FileItem[], action: Action): FileItem[] => {
  switch (action.type) {
    case 'ADD_FILE':
      return [...state, action.file];
    case 'UPDATE_FILE':
      return state.map((file) =>
        file.id === action.fileId ? { ...file, ...action.updates } : file,
      );
    case 'REMOVE_FILE':
      return state.filter((file) => file.id !== action.fileId);
    case 'CLEAR_ERROR':
      return state.map((file) => ({ ...file, errorMessage: undefined }));
    default:
      return state;
  }
};
