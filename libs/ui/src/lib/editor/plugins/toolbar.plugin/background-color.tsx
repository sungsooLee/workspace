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
import { ReactComponent as ChevronDown } from '../../assets/images/icons/chevron-down.svg';
import { ReactComponent as BgColorIcon } from '../../assets/images/icons/bg-color.svg';
import ColorPicker from '../../components/ColorPicker';
import { useToolbarState } from '../../context/toolbar.context';
import Popover from '../../context/popover.context';

const BackgroundColor = () => {
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
      applyStyleText({ 'background-color': value }, skipHistoryStack);
    },
    [applyStyleText],
  );

  // 에디터 상태를 업데이트
  const updateEditorState = useCallback(() => {
    // 현재 선택 상태를 기준으로 배경 컬러를 분석해 툴바 상태를 업데이트 해준다..
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      updateToolbarState(
        'bgColor',
        $getSelectionStyleValueForProperty(selection, 'background-color', '#fff'),
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
        icon={<BgColorIcon className={'h-[20px] w-[20px]'} />}>
        <ColorPicker color={toolbarState.bgColor} onChange={handleChangeColor} />
      </Popover>
    </>
  );
};

export default BackgroundColor;
