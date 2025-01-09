import { useCallback, useEffect, useRef, useState } from 'react';
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

const FontColor = () => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const { toolbarState, updateToolbarState } = useToolbarState();
  const ref = useRef<HTMLDivElement>(null);

  // 드롭다운 메뉴의 열림/닫힘 상태를 처리
  const handleOpen = () => {
    setOpen((state) => !state);
  };

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

  // 드롭다운 외부를 클릭했을 때 닫히는 동작을 처리
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false); // 닫기
    }
  };

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

  // 드롭다운 외부 클릭 이벤트 리스너를 설정
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, handleClickOutside]);

  return (
    <>
      <div ref={ref} className={'relative'}>
        <Button className={'h-[36px] gap-1 p-2'} onClick={handleOpen}>
          <FontColorIcon className={'h-[20px] w-[20px]'} />
          <button className={'pt-1'}>
            <ChevronDown />
          </button>
        </Button>
        {open && (
          <div
            className={
              'bg-gray-1 absolute top-[41px] z-50 p-2 shadow-[0_-2px_2px_rgba(0,0,0,0.1),4px_4px_6px_rgba(0,0,0,0.2),-4px_4px_6px_rgba(0,0,0,0.2)]'
            }>
            <ColorPicker color={toolbarState.fontColor} onChange={handleChangeColor} />
          </div>
        )}
      </div>
    </>
  );
};

export default FontColor;
