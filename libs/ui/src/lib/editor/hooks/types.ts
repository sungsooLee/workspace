// 외부 함수 제공
export interface ExposeEditorHandle {
  getHTML: () => string; // 에디터 내용 html 반환
  setHTML: (html: string) => void; // 에디터 내용 세팅
  clearEditor: () => void; // 에디터 초기화
}
