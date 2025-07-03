import React, { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $getSelection,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import Button from '../../../components/button';
import { useToolbarState } from '../../../context/toolbar.context';
import { ReactComponent as LinkIcon } from '../../../assets/images/icons/link.svg';
import { sanitizeUrl } from '../../../utils/url';
import { useFloatingModal } from '../../../context/floating-modal.context';
import AutoLinkPlugin from '../../../plugins/auto-link.plugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { getSelectedNode } from '../../../utils/get-selected-node';
import Contents from './contents';

/**
 * Toolbar Link 버튼
 * AutoLinkNode, LinkNode 필요함
 *
 * @constructor
 */
const Link = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();
  const { isOpen, openModal, closeModal } = useFloatingModal();

  // 링크 삽입 핸들러
  const handleInsertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      // 링크 삽입 명령 실행
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      // 링크 제거 명령 실행
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }

    openModal(<Contents editable={true} />);
  }, [editor, toolbarState.isLink, openModal]);

  // 링크 편집 가능한 플로팅 모달 오픈
  const handleOpenEditorLink = useCallback(() => {
    openModal(<Contents editable={false} />);
  }, [openModal]);

  //  에디터 상태 업데이트 핸들러
  const updateEditorState = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // 선택된 노드와 부모 노드를 확인해 현재 선택 영역이 링크인지 판단하고, 그 결과를 툴바 상태에 반영해 UI를 동적으로 업데이트함.
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);
      if (isLink) {
        handleOpenEditorLink();
      } else {
        isOpen && closeModal();
      }
    }
  }, [closeModal, handleOpenEditorLink, isOpen, updateToolbarState]);

  // 에디터 리스너 등록
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateEditorState();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateEditorState]);

  return (
    <>
      <Button
        active={toolbarState.isLink}
        className={'h-[36px] w-[34px]'}
        onClick={handleInsertLink}>
        {/*<LinkIcon className={`${toolbarState.isLink ? '' : 'opacity-50'}`} />*/}
        <LinkIcon />
      </Button>
      <AutoLinkPlugin />
      <LinkPlugin />
    </>
  );
};

export default Link;
