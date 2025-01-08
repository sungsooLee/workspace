import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isLinkNode, $createLinkNode, $isAutoLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $getSelection,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import Button from '../../../components/button';
import { useToolbarState } from '../../../context/toolbar.context';
import LinkIcon from '../../../assets/images/icons/link.svg?react';
import { sanitizeUrl } from '../../../utils/url';
import { useFloatingModal } from '../../../context/floating-modal.context';
import AutoLinkPlugin from '../../../plugins/auto-link.plugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { getSelectedNode } from '../../../utils/get-selected-node';
import Contents from './contents';
/**
 * Toolbar Link 버튼
 * @constructor
 */
const Link = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();
  const { isOpen, openModal, closeModal } = useFloatingModal();

  const handleInsertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }

    openModal(<Contents editable={true} />);
  }, [editor, toolbarState.isLink, openModal]);

  const handleOpenEditorLink = useCallback(() => {
    openModal(<Contents editable={false} />);
  }, [openModal]);

  const updateModal = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);
      if (isLink) {
        handleOpenEditorLink();
      } else {
        isOpen && closeModal();
      }
      //const linkNode = $findMatchingParent(node, $isLinkNode);
    }
  }, [closeModal, handleOpenEditorLink, isOpen, updateToolbarState]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          console.log('click command');
          updateModal();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload) => {
          console.log('change command');
          updateModal();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor, updateModal]);

  return (
    <>
      <Button
        active={toolbarState.isLink}
        className={'w-[34px] h-[36px]'}
        onClick={handleInsertLink}>
        <LinkIcon className={`${toolbarState.isLink ? '' : 'opacity-50'}`} />
      </Button>
      <AutoLinkPlugin />
      <LinkPlugin />
    </>
  );
};

export default Link;
