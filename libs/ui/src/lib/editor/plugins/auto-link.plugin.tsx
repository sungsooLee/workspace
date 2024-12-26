import React from 'react';
import {
  AutoLinkPlugin as LexicalAutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from '@lexical/react/LexicalAutoLinkPlugin'; // Lexical의 AutoLinkPlugin과 정규식을 사용한 링크 매처 가져오기

// URL 정규식
// URL 패턴을 감지하기 위한 정규식으로, http, https, 또는 www로 시작하는 문자열을 매칭
const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;

// 이메일 정규식
// 이메일 주소를 감지하기 위한 정규식으로, 일반적인 이메일 형식을 매칭
const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

// Matchers 정의
// URL과 이메일 주소를 각각 감지하고, 적절한 링크 형태로 변환하는 매처 배열
const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    // URL이 http 또는 https로 시작하지 않을 경우, https를 추가
    return text.startsWith('http') ? text : `https://${text}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    // 이메일 주소에 mailto: 프로토콜을 추가
    return `mailto:${text}`;
  }),
];

/**
 * AutoLinkPlugin 컴포넌트
 *
 * Lexical 에디터에서 URL 및 이메일 주소를 자동으로 링크로 변환해주는 플러그인
 *
 * @returns {JSX.Element} 자동 링크 플러그인을 렌더링하는 JSX 엘리먼트
 */
const AutoLinkPlugin = () => {
  return <LexicalAutoLinkPlugin matchers={MATCHERS} />;
};

export default AutoLinkPlugin;
