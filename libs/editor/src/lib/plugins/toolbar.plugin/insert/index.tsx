import React, { useMemo } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';

import { insertItems } from '../../../config/toolbar.config';
import Popover, { PopoverItem } from '../../../context/popover.context';
import { useToolbarState } from '../../../context/toolbar.context';
import PlusIcon from '../../../assets/images/icons/plus.svg?react';
import { useModal } from '../../..//context/modal.context';
import Image from './image';
import Video from './video';
import Table from './table';
import ImagesPlugin, { INSERT_IMAGE_COMMAND, InsertImagePayload } from '../../images.plugin';

/**
 * 삽입 플러그인
 * [HorizontalRuleNode]
 * @constructor
 */
const Insert = () => {
  const [editor] = useLexicalComposerContext();
  const { openModal, closeModal } = useModal();

  const handleChangeImage = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    closeModal();
  };

  const handleChangeType = (type: string) => {
    console.log('type =>', type);
    switch (type) {
      case 'horizontal-rule':
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
        break;
      case 'image':
        openModal('title', <Image onInsert={handleChangeImage} />);
        break;
      case 'table':
        openModal('table', <Table />);
        break;
      case 'video':
        openModal('Video', <Video />);
        break;
    }
  };
  return (
    <>
      <Popover
        className={`'h-[36px] p-2' gap-2`}
        icon={<PlusIcon className={'h-[20px] w-[20px]'} />}
        label={'Insert'}>
        {insertItems.map((item) => (
          <PopoverItem
            key={item.value}
            className={`hover:bg-gray-3 flex h-full w-full items-center gap-2 rounded-lg px-2 py-1`}
            onClick={() => handleChangeType(item.value)}>
            <>
              <item.icon />
              <span>{item.label}</span>
            </>
          </PopoverItem>
        ))}
      </Popover>
      <HorizontalRulePlugin />
      <ImagesPlugin />
    </>
  );
};

export default Insert;
