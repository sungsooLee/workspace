/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {
  $isTextNode,
  DOMConversionMap,
  DOMExportOutput,
  DOMExportOutputMap,
  Klass,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
} from 'lexical';

import './style.css';
import theme from './theme';
import ToolbarPlugin from './plugins/toolbar/toolbar.plugin';
import { parseAllowedColor, parseAllowedFontSize } from './config/style.config';

const placeholder = 'Enter some rich text...';

/**
 * LexicalNode에서 DOM으로 변환된 결과에서 모든 인라인 스타일, 클래스, 불필요한 속성을 제거
 * LexicalNode를 처리하여 HTML 출력을 정리
 * 예)
 * if (output && isHTMLElement(output.element)) {
 *     // 출력이 유효한 HTMLElement를 포함하는지 확인합니다.
 *     // 주요 요소와 style, class, dir="ltr" 속성을 가진 모든 자식 요소를 순회합니다.
 *     for (const el of [
 *       output.element,
 *       ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
 *     ]) {
 *       el.removeAttribute('class'); // class 속성을 제거합니다.
 *       el.removeAttribute('style'); // style 속성을 제거합니다.
 *       if (el.getAttribute('dir') === 'ltr') {
 *         el.removeAttribute('dir'); // dir 속성이 "ltr"인 경우 제거합니다.
 *       }
 *     }
 *   }
 * @param editor
 * @param target
 */
const removeStylesExportDOM = (editor: LexicalEditor, target: LexicalNode): DOMExportOutput => {
  // TODO 내보내기
  return target.exportDOM(editor);
};

/**
 * DOM 출력 맵을 설정합니다. 특정 노드 클래스와 해당 DOM 변환 방식을 매핑합니다.
 */
const exportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, removeStylesExportDOM], // ParagraphNode는 스타일 제거 로직을 사용하여 DOM으로 변환합니다.
  [TextNode, removeStylesExportDOM], // TextNode도 마찬가지로 스타일 제거 로직을 사용합니다.
]);

/**
 * 주어진 HTML 요소에서 추가 스타일을 추출합니다.
 * 특정 조건을 만족하는 스타일만 처리합니다.
 * @param element
 */
const getExtraStyles = (element: HTMLElement): string => {
  let extraStyles = '';
  const fontSize = parseAllowedFontSize(element.style.fontSize); // 허용된 폰트 크기만 추출합니다.
  const backgroundColor = parseAllowedColor(element.style.backgroundColor); // 허용된 배경색만 추출합니다.
  const color = parseAllowedColor(element.style.color); // 허용된 텍스트 색상만 추출합니다.
  if (fontSize !== '' && fontSize !== '15px') {
    extraStyles += `font-size: ${fontSize};`; // 기본 값이 아닌 경우 폰트 크기를 추가합니다.
  }
  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`; // 기본 값이 아닌 경우 배경색을 추가합니다.
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
    extraStyles += `color: ${color};`; // 기본 값이 아닌 경우 텍스트 색상을 추가합니다.
  }
  return extraStyles; // 추가된 스타일 문자열을 반환합니다.
};

/**
 * DOM 변환 맵을 생성합니다. 노드의 입력 변환 방식을 설정합니다.
 */
const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {};

  // TextNode의 DOM 변환 방식을 감싸 추가 스타일을 처리하도록 합니다.
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode); // 기존 변환 로직을 가져옵니다.
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element); // 기존 변환 로직 실행.
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output; // 변환 결과가 이미 완료된 경우 그대로 반환합니다.
          }
          const extraStyles = getExtraStyles(element); // 추가 스타일을 추출합니다.
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent); // 자식 노드에 대해 변환 실행.
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles); // 기존 스타일에 추가 스타일을 병합합니다.
                }
                return textNode;
              },
            };
          }
          return output; // 스타일이 없는 경우 기본 출력을 반환합니다.
        },
      };
    };
  }

  return importMap; // 설정된 import 맵을 반환합니다.
};

// 에디터 설정 객체를 정의합니다.
const editorConfig = {
  html: {},
  namespace: 'React.js Demo', // 네임스페이스 이름.
  nodes: [ParagraphNode, TextNode], // 사용될 Lexical 노드들.
  onError(error: Error) {
    throw error; // 오류 발생 시 예외를 던집니다.
  },
  theme: theme, // 테마 설정.
};

export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={<div className="editor-placeholder">{placeholder}</div>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin /> {/* 히스토리 플러그인 */}
          <AutoFocusPlugin /> {/* 자동 포커스 플러그인 */}
          {/*<TreeViewPlugin />*/} {/* 트리 뷰 플러그인 */}
        </div>
      </div>
    </LexicalComposer>
  );
}
