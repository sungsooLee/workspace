import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents'; // 정렬 가능한 블록 콘텐츠를 포함한 컴포넌트
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode'; // Lexical의 데코레이터 블록 노드
import React from 'react';
import ReactPlayer from 'react-player'; // 비디오 플레이어를 위한 ReactPlayer 라이브러리

/**
 * ReactPlayerComponentProps 타입 정의
 *
 * ReactPlayerComponent에서 사용하는 props를 정의
 */
type ReactPlayerComponentProps = Readonly<{
  className: Readonly<{
    base: string; // 기본 클래스 이름
    focus: string; // 포커스 상태 클래스 이름
  }>;
  format: ElementFormatType | null; // 요소의 정렬 형식
  nodeKey: NodeKey; // Lexical 노드 키
  videoURL: string; // 비디오 URL
}>;

/**
 * ReactPlayerComponent 컴포넌트
 *
 * ReactPlayer를 사용하여 비디오를 렌더링하고, Lexical의 정렬 가능한 블록으로 감싸기
 *
 * @param {ReactPlayerComponentProps} props - 컴포넌트에 전달되는 props
 * @returns {JSX.Element} 비디오 플레이어를 포함하는 JSX 엘리먼트
 */
function ReactPlayerComponent({ className, format, nodeKey, videoURL }: ReactPlayerComponentProps) {
  return (
    <BlockWithAlignableContents className={className} format={format} nodeKey={nodeKey}>
      <ReactPlayer url={videoURL} controls={true} width="100%" height="100%" />
    </BlockWithAlignableContents>
  );
}

/**
 * SerializedReactPlayerNode 타입 정의
 *
 * ReactPlayerNode를 직렬화할 때의 데이터 구조를 정의
 */
export type SerializedReactPlayerNode = Spread<
  {
    videoURL: string; // 비디오 URL
  },
  SerializedDecoratorBlockNode
>;

/**
 * $convertReactPlayerElement 함수
 *
 * DOM 요소를 ReactPlayerNode로 변환
 *
 * @param {HTMLElement} domNode - 변환하려는 DOM 요소
 * @returns {null | DOMConversionOutput} 변환 결과 또는 null
 */
function $convertReactPlayerElement(domNode: HTMLElement): null | DOMConversionOutput {
  const videoURL = domNode.getAttribute('data-lexical-video'); // 비디오 URL 가져오기
  if (videoURL) {
    const node = $createReactPlayerNode(videoURL); // ReactPlayerNode 생성
    return { node };
  }
  return null;
}

/**
 * ReactPlayerNode 클래스
 *
 * Lexical 에디터에서 ReactPlayer를 활용한 비디오 노드를 정의
 */
export class ReactPlayerNode extends DecoratorBlockNode {
  __url: string; // 비디오 URL

  /**
   * ReactPlayerNode의 노드 타입을 반환
   *
   * @returns {string} 노드 타입
   */
  static getType(): string {
    return 'reactplayer';
  }

  /**
   * ReactPlayerNode의 복제본을 생성
   *
   * @param {ReactPlayerNode} node - 복제할 노드
   * @returns {ReactPlayerNode} 복제된 노드
   */
  static clone(node: ReactPlayerNode): ReactPlayerNode {
    return new ReactPlayerNode(node.__url, node.__format, node.__key);
  }

  /**
   * JSON 데이터를 ReactPlayerNode로 가져옴
   *
   * @param {SerializedReactPlayerNode} serializedNode - 직렬화된 노드 데이터
   * @returns {ReactPlayerNode} ReactPlayerNode 인스턴스
   */
  static importJSON(serializedNode: SerializedReactPlayerNode): ReactPlayerNode {
    const node = $createReactPlayerNode(serializedNode.videoURL);
    node.setFormat(serializedNode.format);
    return node;
  }

  /**
   * ReactPlayerNode를 JSON으로 내보냄
   *
   * @returns {SerializedReactPlayerNode} 직렬화된 노드 데이터
   */
  exportJSON(): SerializedReactPlayerNode {
    return {
      ...super.exportJSON(),
      type: 'reactplayer',
      version: 1,
      videoURL: this.__url,
    };
  }

  /**
   * ReactPlayerNode 생성자
   *
   * @param {string} url - 비디오 URL
   * @param {ElementFormatType} [format] - 노드의 정렬 형식
   * @param {NodeKey} [key] - 노드 키
   */
  constructor(url: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__url = url;
  }

  /**
   * DOM 요소를 생성하고 반환
   *
   * @returns {DOMExportOutput} DOM 요소 출력
   */
  exportDOM(): DOMExportOutput {
    const element = document.createElement('iframe');
    element.setAttribute('data-lexical-video', this.__url);
    element.setAttribute('src', this.__url);
    element.setAttribute('frameborder', '0');
    element.setAttribute('allowfullscreen', 'true');
    element.setAttribute('title', 'Embedded video');
    return { element };
  }

  /**
   * DOM 요소를 ReactPlayerNode로 변환하기 위한 맵을 반환
   *
   * @returns {DOMConversionMap | null} DOM 변환 맵 또는 null
   */
  static importDOM(): DOMConversionMap | null {
    return {
      iframe: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-video')) {
          return null;
        }
        return {
          conversion: $convertReactPlayerElement,
          priority: 1,
        };
      },
    };
  }

  /**
   * DOM 업데이트를 처리하지 않도록 설정
   *
   * @returns {false} 항상 false 반환
   */
  updateDOM(): false {
    return false;
  }

  /**
   * 비디오 URL을 반환
   *
   * @returns {string} 비디오 URL
   */
  getUrl(): string {
    return this.__url;
  }

  /**
   * 노드의 JSX 데코레이터를 반환
   *
   * @param {LexicalEditor} _editor - Lexical 에디터
   * @param {EditorConfig} config - 에디터 설정
   * @returns {JSX.Element} JSX 데코레이터
   */
  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };
    return (
      <ReactPlayerComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        videoURL={this.__url}
      />
    );
  }
}

/**
 * ReactPlayerNode를 생성
 *
 * @param {string} videoURL - 비디오 URL
 * @returns {ReactPlayerNode} ReactPlayerNode 인스턴스
 */
export function $createReactPlayerNode(videoURL: string): ReactPlayerNode {
  return new ReactPlayerNode(videoURL);
}

/**
 * 노드가 ReactPlayerNode인지 확인
 *
 * @param {ReactPlayerNode | LexicalNode | null | undefined} node - 확인할 노드
 * @returns {boolean} ReactPlayerNode 여부
 */
export function $isReactPlayerNode(
  node: ReactPlayerNode | LexicalNode | null | undefined,
): node is ReactPlayerNode {
  return node instanceof ReactPlayerNode;
}
