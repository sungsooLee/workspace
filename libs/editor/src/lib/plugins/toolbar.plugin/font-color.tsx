import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';

import Button from '../../components/button';
import ChevronDown from '../../assets/images/icons/chevron-down.svg?react';
import FontColorIcon from '../../assets/images/icons/font-color.svg?react';
import ColorPicker from '../../components/ColorPicker';
import { useToolbarState } from '../../context/toolbar.context';
import Popover, { PopoverItem } from '../../context/popover.context';

const FontColor = () => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const { toolbarState, updateToolbarState } = useToolbarState();

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      editor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? { tag: 'historic' } : {},
      );
    },
    [editor],
  );

  const handleChangeColor = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ color: value }, skipHistoryStack);
    },
    [applyStyleText],
  );

  // 에디터 상태를 업데이트
  const updateEditorState = useCallback(() => {
    // 현재 선택 상태를 기준으로 폰트 컬러를 분석해 툴바 상태를 업데이트 해준다..
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      updateToolbarState(
        'fontColor',
        $getSelectionStyleValueForProperty(selection, 'color', '#000'),
      );
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
      <Popover
        className={`'h-[36px] p-2' gap-2`}
        icon={<FontColorIcon className={'h-[20px] w-[20px]'} />}>
        <ColorPicker color={toolbarState.fontColor} onChange={handleChangeColor} />
      </Popover>
    </>
  );
};

export default FontColor;
