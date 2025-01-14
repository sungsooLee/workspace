import { useMemo, useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isLinkNode } from '@lexical/link';
import { $findMatchingParent } from '@lexical/utils';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import Popover, { PopoverItem } from '../../context/popover.context';
import { useToolbarState } from '../../context/toolbar.context';
import { elementFormatType } from '../../config/toolbar.config';
import { getSelectedNode } from '../../utils/get-selected-node';
const ElementFormat = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();
  const activeItem = useMemo(
    () => elementFormatType.find((item) => item.value === toolbarState.elementFormat),
    [toolbarState.elementFormat],
  );

  const handleChangeType = (type: string) => {
    switch (type) {
      case 'left':
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        break;
      case 'center':
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        break;
      case 'right':
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        break;
      case 'indent':
        editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        break;
      case 'outdent':
        editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        break;
    }
  };

  // 에디터 상태를 업데이트
  const updateEditorState = useCallback(() => {
    // 현재 선택 상태를 기준으로 에디터의 블록 타입을 판별하고, 툴바 상태에 이를 반영함.
    // 선택된 노드와 부모 노드를 분석해 리스트인지, 헤딩인지, 또는 다른 블록 타입인지 확인하며,
    // 이 정보를 활용해 툴바 UI를 동적으로 업데이트함.
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }
      const formatType =
        ($isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType()) || 'left';
      updateToolbarState('elementFormat', formatType);
    }
  }, [updateToolbarState]);

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
      {activeItem && (
        <Popover
          className={`'h-[36px] p-2' gap-2`}
          icon={<activeItem.icon className={'h-[20px] w-[20px]'} />}
          label={activeItem.label}>
          {elementFormatType.map((item) => (
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
      )}
    </>
  );
};

export default ElementFormat;
