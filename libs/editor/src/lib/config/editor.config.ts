import themeConfig from './theme.config';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { ImageNode } from '../nodes/image.node';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
// 초기 설정
export const initialConfig = {
  namespace: 'MyEditor',
  /* istanbul ignore next */
  onError: (error: Error) => {
    /* istanbul ignore next */
    console.error('Lexical Editor Error:', error);
  },
  nodes: [
    AutoLinkNode,
    LinkNode,
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    HorizontalRuleNode,
    ImageNode,
    TableCellNode,
    TableNode,
    TableRowNode,
  ],
  theme: themeConfig,
};
