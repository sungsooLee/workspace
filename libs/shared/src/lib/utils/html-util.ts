import parse, { DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { ReactNode } from 'react';

/**
 * @description HTML String -> ReactNode
 * @returns ReactNode
 */
export const htmlParse = function (
  htmlString: string,
  option?: HTMLReactParserOptions,
): ReactNode | string {
  try {
    const html = DOMPurify.sanitize(htmlString);
    return parse(html, option);
  } catch (error) {
    return '';
  }
};

/**
 * 옵션 예시
 */
// const option = {
//   replace: (domNode: DOMNode) => {
//     if (domNode.type === 'tag') {
//       if (domNode.name && domNode.name === 'div') {
//         domNode.name = 'span';
//       }
//     }
//   },
// };
