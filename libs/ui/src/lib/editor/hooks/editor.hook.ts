import { useRef } from 'react';
import { ExposeEditorHandle } from './types';

/**
 * 외부에서 에디터를 사용하기 위한 hooks
 */
const useEditor = () => {
  const editor = useRef<ExposeEditorHandle>(null);
  /**
   * Editor 내용을 HTML 로 반환
   */
  const handleGetHTML = () => {
    if (!editor.current) return null;
    return editor.current.getHTML();
  };

  /**
   * Editor HTML 세팅
   * @param html
   */
  const handleSetHTML = (html: string) => {
    if (!editor.current) return null;
    editor.current.setHTML(html);
  };
  /**
   * Editor 초기화
   */
  const handleClearEditor = () => {
    if (!editor.current) return null;
    editor.current.clearEditor();
  };

  return {
    editor,
    getHTML: handleGetHTML,
    setHTML: handleSetHTML,
    clear: handleClearEditor,
  };
};

export default useEditor;
