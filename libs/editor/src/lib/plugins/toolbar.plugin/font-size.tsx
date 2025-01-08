import Button from '../../components/button';
import Minus from '../../assets/images/icons/minus-sign.svg?react';
import Plus from '../../assets/images/icons/add-sign.svg?react';
import { useToolbarState } from '../..//context/toolbar.context';
import { useEffect, useMemo, useState } from 'react';
import { $isTableSelection } from '@lexical/table';
import {
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  NodeKey,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  DEFAULT_FONT_SIZE,
  MAX_ALLOWED_FONT_SIZE,
  MIN_ALLOWED_FONT_SIZE,
} from '../..//config/toolbar.config';

export enum UpdateFontSizeType {
  increment = 1,
  decrement,
}

/**
 * 글자 사이즈 조절
 * @constructor
 */
const FontSize = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();
  const fontSize = useMemo(() => toolbarState.fontSize.slice(0, -2), [toolbarState.fontSize]);
  const [canDecrement, canIncrement] = useMemo(
    () => [Number(fontSize) <= MIN_ALLOWED_FONT_SIZE, Number(fontSize) >= MAX_ALLOWED_FONT_SIZE],
    [fontSize],
  );

  const updateFontSize = (updateType: UpdateFontSizeType, inputValue: string) => {
    if (inputValue !== '') {
      const nextFontSize = calculateNextFontSize(Number(inputValue), updateType);
      updateFontSizeInSelection(editor, String(nextFontSize) + 'px', null);
    } else {
      updateFontSizeInSelection(editor, null, updateType);
    }
  };

  const calculateNextFontSize = (
    currentFontSize: number,
    updateType: UpdateFontSizeType | null,
  ) => {
    if (!updateType) {
      return currentFontSize;
    }

    let updatedFontSize: number = currentFontSize;
    switch (updateType) {
      case UpdateFontSizeType.decrement:
        switch (true) {
          case currentFontSize > MAX_ALLOWED_FONT_SIZE:
            updatedFontSize = MAX_ALLOWED_FONT_SIZE;
            break;
          case currentFontSize >= 48:
            updatedFontSize -= 12;
            break;
          case currentFontSize >= 24:
            updatedFontSize -= 4;
            break;
          case currentFontSize >= 14:
            updatedFontSize -= 2;
            break;
          case currentFontSize >= 9:
            updatedFontSize -= 1;
            break;
          default:
            updatedFontSize = MIN_ALLOWED_FONT_SIZE;
            break;
        }
        break;

      case UpdateFontSizeType.increment:
        switch (true) {
          case currentFontSize < MIN_ALLOWED_FONT_SIZE:
            updatedFontSize = MIN_ALLOWED_FONT_SIZE;
            break;
          case currentFontSize < 12:
            updatedFontSize += 1;
            break;
          case currentFontSize < 20:
            updatedFontSize += 2;
            break;
          case currentFontSize < 36:
            updatedFontSize += 4;
            break;
          case currentFontSize <= 60:
            updatedFontSize += 12;
            break;
          default:
            updatedFontSize = MAX_ALLOWED_FONT_SIZE;
            break;
        }
        break;

      default:
        break;
    }
    return updatedFontSize;
  };

  const updateFontSizeInSelection = (
    editor: LexicalEditor,
    newFontSize: string | null,
    updateType: UpdateFontSizeType | null,
  ) => {
    editor.update(() => {
      if (editor.isEditable()) {
        const selection = $getSelection();
        const nextFontSize = newFontSize || DEFAULT_FONT_SIZE + 'px';
        updateToolbarState('fontSize', nextFontSize);
        if (selection !== null) {
          $patchStyleText(selection, {
            'font-size': nextFontSize,
          });
        }
      }
    });
  };

  const updateSelectionFontSize = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      updateToolbarState(
        'fontSize',
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
      );
    }
  };

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateSelectionFontSize();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return (
    <div className={'flex justify-center items-center gap-1 '}>
      <Button
        disabled={canDecrement}
        className={'h-full'}
        onClick={() => {
          updateFontSize(UpdateFontSizeType.decrement, fontSize);
        }}>
        <Minus className={'opacity-50'} />
      </Button>
      <input
        type="text"
        value={fontSize}
        className={
          'w-[31px] h-[22px] rounded-md border-2 border-gray-10 focus:outline-none text-center hover:bg-gray-3 '
        }
        readOnly={true}
        style={{ borderWidth: '1px' }}
      />
      <Button
        disabled={canIncrement}
        className={'h-full'}
        onClick={() => {
          updateFontSize(UpdateFontSizeType.increment, fontSize);
        }}>
        <Plus className={'opacity-50'} />
      </Button>
    </div>
  );
};

export default FontSize;
/*
  font-weight: 700;
  font-size: 14px;
  color: #777;
  border-radius: 5px;
  border-color: gray;
  height: 15px;
  padding: 2px 4px;
  text-align: center;
  width: 20px;
  align-self: center;

*/
