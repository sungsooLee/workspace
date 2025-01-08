// 상수: 폰트 크기 제한 및 기본값
import { ElementFormatType } from 'lexical';

export const MIN_ALLOWED_FONT_SIZE = 8; // 최소 허용 폰트 크기
export const MAX_ALLOWED_FONT_SIZE = 72; // 최대 허용 폰트 크기
export const DEFAULT_FONT_SIZE = 15; // 기본 폰트 크기

// 루트 타입을 이름으로 매핑
export const rootTypeToRootName = {
  root: 'Root', // 기본 루트
  table: 'Table', // 표
};

// 블록 타입을 이름으로 매핑
export const blockTypeToBlockName = {
  bullet: 'Bulleted List', // 불릿 목록
  check: 'Check List', // 체크리스트
  code: 'Code Block', // 코드 블록
  h1: 'Heading 1', // 헤딩 1
  h2: 'Heading 2', // 헤딩 2
  h3: 'Heading 3', // 헤딩 3
  h4: 'Heading 4', // 헤딩 4
  h5: 'Heading 5', // 헤딩 5
  h6: 'Heading 6', // 헤딩 6
  number: 'Numbered List', // 번호 목록
  paragraph: 'Normal', // 일반 텍스트
  quote: 'Quote', // 인용구
};

// 초기 툴바 상태 정의
export const INITIAL_TOOLBAR_STATE = {
  bgColor: '#fff', // 배경색
  blockType: 'paragraph' as keyof typeof blockTypeToBlockName, // 기본 블록 타입
  canRedo: false, // redo(다시 실행) 가능 여부
  canUndo: false, // undo(실행 취소) 가능 여부
  codeLanguage: '', // 코드 언어
  elementFormat: 'left' as ElementFormatType, // 요소 정렬
  fontColor: '#000', // 글자 색상
  fontFamily: 'Arial', // 글꼴
  fontSize: `${DEFAULT_FONT_SIZE}px`, // 현재 폰트 크기
  isBold: false, // 굵게 설정 여부
  isCode: false, // 코드 블록 여부
  isImageCaption: false, // 이미지 캡션 여부
  isItalic: false, // 기울임 여부
  isLink: false, // 링크 여부
  isRTL: false, // 오른쪽 정렬 여부
  isStrikethrough: false, // 취소선 여부
  isSubscript: false, // 아래 첨자 여부
  isSuperscript: false, // 위 첨자 여부
  isUnderline: false, // 밑줄 여부
  isLowercase: false, // 소문자 여부
  isUppercase: false, // 대문자 여부
  isCapitalize: false, // 첫 글자 대문자 여부
  rootType: 'root' as keyof typeof rootTypeToRootName, // 기본 루트 타입
};
