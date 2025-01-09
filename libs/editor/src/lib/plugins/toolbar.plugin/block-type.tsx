import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from '@lexical/list';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import Button from '../../components/button';
import ChevronDown from '../../assets/images/icons/chevron-down.svg?react';
import { blockTypeItems, BlockValueType } from '../../config/toolbar.config';
import ListMaxIndentLevelPlugin from '../list-max-indent-level.plugin';
import { useToolbarState } from '../../context/toolbar.context';

/**
 * 문단 타입
 * HeadingNode, QuoteNode, ListItemNode, ListNode
 * @constructor
 */
const BlockType = () => {
  const { toolbarState, updateToolbarState } = useToolbarState();
  // 툴바 상태의 블록 타입과 일치하는 아이템을 찾고 메모이제이션
  const activeItem = useMemo(
    () => blockTypeItems.find((item) => item.value === toolbarState.blockType),
    [toolbarState.blockType],
  );
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 드롭다운 메뉴의 열림/닫힘 상태를 처리
  const handleOpen = () => {
    setOpen((state) => !state);
  };

  // 드롭다운 외부를 클릭했을 때 닫히는 동작을 처리
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false); // 닫기
    }
  };

  // 에디터 상태를 업데이트
  const updateEditorState = useCallback(() => {
    // 현재 선택 상태를 기준으로 에디터의 블록 타입을 판별하고, 툴바 상태에 이를 반영함.
    // 선택된 노드와 부모 노드를 분석해 리스트인지, 헤딩인지, 또는 다른 블록 타입인지 확인하며,
    // 이 정보를 활용해 툴바 UI를 동적으로 업데이트함.
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
        const type = parentList ? parentList.getListType() : element.getListType();
        updateToolbarState('blockType', type);
      } else {
        const type = $isHeadingNode(element) ? element.getTag() : element.getType();
        updateToolbarState('blockType', type as BlockValueType);
      }
    }
  }, [updateToolbarState]);

  // 드롭다운 내 블록 타입 변경 이벤트를 처리합니다.
  const handleChangeType = useCallback(
    (e: any, value: string) => {
      e.preventDefault();
      // 변경하려는 블록 타입을 확인
      const item = blockTypeItems.find((item) => item.value === value);
      if (!item) return;
      editor.update(() => {
        const selection = $getSelection();
        switch (item.value) {
          case 'paragraph':
            if ($isRangeSelection(selection)) {
              console.log('gogo');
              $setBlocksType(selection, () => $createParagraphNode());
            }
            break;
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
            $setBlocksType(selection, () => $createHeadingNode(value as HeadingTagType));
            break;
          case 'number':
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            break;
          case 'bullet':
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            break;
          case 'check':
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
            break;
          case 'quote':
            $setBlocksType(selection, () => $createQuoteNode());
            break;
        }
        setOpen(false);
        updateEditorState();
      });
    },
    [editor, updateEditorState],
  );

  // 드롭다운 외부 클릭 이벤트 리스너를 설정
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, handleClickOutside]);

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
      <div ref={ref} className={'relative'}>
        <Button className={'h-[36px] gap-2 p-2'} onClick={handleOpen}>
          {activeItem && (
            <>
              <activeItem.icon />
              <span>{activeItem.label}</span>
            </>
          )}
          <button className={'ml-1 pt-1'}>
            <ChevronDown />
          </button>
        </Button>
        {open && (
          <div
            className={
              'bg-gray-1 absolute top-[41px] z-50 w-[150px] p-2 shadow-[0_-2px_2px_rgba(0,0,0,0.1),4px_4px_6px_rgba(0,0,0,0.2),-4px_4px_6px_rgba(0,0,0,0.2)]'
            }>
            <ul>
              {blockTypeItems.map((item) => (
                <li key={item.value} className={'flex items-center'}>
                  <button
                    className={
                      'hover:bg-gray-3 flex h-full w-full items-center gap-2 rounded-lg px-2 py-1'
                    }
                    onClick={(e: any) => handleChangeType(e, item.value)}>
                    <item.icon />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ListPlugin />
      <CheckListPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <TabIndentationPlugin />
    </>
  );
};

export default BlockType;
