import React from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { $getSelection } from 'lexical';

import { insertItems } from '../../../config/toolbar.config';
import Popover, { PopoverItem } from '../../../context/popover.context';
import { ReactComponent as PlusIcon } from '../../../assets/images/icons/plus.svg';
import { useModalContext } from '../../../context/modal.context';
import Image from './image';
import Video from './video';
import Table from './table';
import ImagesPlugin, { INSERT_IMAGE_COMMAND, InsertImagePayload } from '../../images.plugin';
import TableCellResizer from '../../table-cell-resizer.plugin';

import { $createReactPlayerNode } from '../../../nodes/react-player.node';

/**
 * 삽입 플러그인
 * [HorizontalRuleNode]
 * @constructor
 */
const Insert = () => {
  const [editor] = useLexicalComposerContext();
  const { openModal, closeModal } = useModalContext();

  const handleAddImage = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    closeModal();
  };

  const handleAddTable = (rows: string, columns: string) => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows,
    });

    closeModal();
  };

  const handleAddVideo = (url: string) => {
    editor.update(() => {
      const node = $createReactPlayerNode(url);
      const selection = $getSelection();
      if (selection) {
        selection.insertNodes([node]);
        closeModal();
      }
    });
  };

  const handleChangeType = (type: string) => {
    switch (type) {
      case 'horizontal-rule':
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
        break;
      case 'image':
        openModal('title', <Image onInsert={handleAddImage} />);
        break;
      case 'table':
        openModal('table', <Table onInsert={handleAddTable} />);
        break;
      case 'video':
        openModal('Video', <Video onInsert={handleAddVideo} />);
        break;
    }
  };
  return (
    <>
      <Popover
        className={`'h-[36px] p-2' gap-2`}
        icon={<PlusIcon className={'h-[20px] w-[20px]'} />}
        label={'Insert'}
      >
        {insertItems.map((item) => (
          <PopoverItem
            key={item.value}
            className={`hover:bg-gray-3 flex h-full w-full items-center gap-2 rounded-lg px-2 py-1`}
            onClick={() => handleChangeType(item.value)}
          >
            <>
              <item.icon />
              <span>{item.label}</span>
            </>
          </PopoverItem>
        ))}
      </Popover>
      <HorizontalRulePlugin />
      <ImagesPlugin />
      <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} hasHorizontalScroll={true} />
      <TableCellResizer />
    </>
  );
};

export default Insert;
