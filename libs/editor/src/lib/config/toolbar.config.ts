// 상수: 폰트 크기 제한 및 기본값
import { ElementFormatType } from 'lexical';
import TextParagraph from '../assets/images/icons/text-paragraph.svg?react';
import TypeH1 from '../assets/images/icons/type-h1.svg?react';
import TypeH2 from '../assets/images/icons/type-h2.svg?react';
import TypeH3 from '../assets/images/icons/type-h3.svg?react';
import TypeH4 from '../assets/images/icons/type-h4.svg?react';
import TypeH5 from '../assets/images/icons/type-h5.svg?react';
import TypeH6 from '../assets/images/icons/type-h6.svg?react';
import ListUl from '../assets/images/icons/list-ul.svg?react';
import ListOL from '../assets/images/icons/list-ol.svg?react';
import Quote from '../assets/images/icons/chat-square-quote.svg?react';
import Check from '../assets/images/icons/square-check.svg?react';
export const MIN_ALLOWED_FONT_SIZE = 8; // 최소 허용 폰트 크기
export const MAX_ALLOWED_FONT_SIZE = 72; // 최대 허용 폰트 크기
export const DEFAULT_FONT_SIZE = 15; // 기본 폰트 크기

// 루트 타입을 이름으로 매핑
export const rootTypeToRootName = {
  root: 'Root', // 기본 루트
  table: 'Table', // 표
};

// 블록 타입을 이름으로 매핑
export const blockTypeItems = [
  {
    icon: TextParagraph,
    label: '일반',
    value: 'paragraph',
  },
  {
    icon: TypeH1,
    label: '제목 1',
    value: 'h1',
  },
  {
    icon: TypeH2,
    label: '제목 2',
    blockType: 'heading',
    value: 'h2',
  },
  {
    icon: TypeH3,
    label: '제목 3',
    value: 'h3',
  },
  {
    icon: TypeH4,
    label: '제목 4',
    value: 'h4',
  },
  // 현재 폰트 사이즈에서는 지원되지 않음  폰트 사이즈 재설정 해야 구분 됨
  /*{
    icon: TypeH5,
    label: '제목 5',
    value: 'h5',
    active: false,
  },
  {
    icon: TypeH6,
    label: '제목 6',
    value: 'h6',
    active: false,
  },*/
  {
    icon: ListUl,
    label: '숫자 목록',
    value: 'number',
  },
  {
    icon: ListOL,
    label: '점 목록',
    value: 'bullet',
  },
  {
    icon: Check,
    label: '체크 목록',
    value: 'check',
  },
  {
    icon: Quote,
    label: '인용구',
    value: 'quote',
  },
];
export type BlockValueType =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'number'
  | 'bullet'
  | 'check'
  | 'quote';
// 초기 툴바 상태 정의
export const INITIAL_TOOLBAR_STATE = {
  bgColor: '#fff', // 배경색
  blockType: 'paragraph' as BlockValueType, // 기본 블록 타입
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

// 삽입 아이템
export const insertItems = [
  {
    icon: TextParagraph,
    label: '일반',
    value: 'paragraph',
  },
];
