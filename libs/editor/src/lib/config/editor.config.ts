import themeConfig from './theme.config';
import { AutoLinkNode, LinkNode } from '@lexical/link';

// 초기 설정
export const initialConfig = {
  namespace: 'MyEditor',
  /* istanbul ignore next */
  onError: (error: Error) => {
    /* istanbul ignore next */
    console.error('Lexical Editor Error:', error);
  },
  nodes: [AutoLinkNode, LinkNode],
  theme: themeConfig,
};
