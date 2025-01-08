import React, { useCallback, useEffect } from 'react';

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
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isTableSelection } from '@lexical/table';

import History from './history';
import FontSize from './font-size';
import Button from '../../components/button';
import TextBold from '../../assets/images/icons/type-bold.svg?react';
import TextItalic from '../../assets/images/icons/type-italic.svg?react';
import TextUnderline from '../../assets/images/icons/type-underline.svg?react';
import { useToolbarState } from '../../context/toolbar.context';
import Link from './link';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();

  const updateSelection = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      updateToolbarState('isBold', selection.hasFormat('bold'));
      updateToolbarState('isItalic', selection.hasFormat('italic'));
      updateToolbarState('isUnderline', selection.hasFormat('underline'));
    }
  }, [updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateSelection();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateSelection]);

  return (
    <div className="nlp--editor-tool-bar flex p-[10px] bg-gray-1 border-[1px] border-gray-3  text-gray-8 font-semibold">
      <History />
      <Divider />
      <FontSize />
      <Divider />
      <Button
        active={toolbarState.isBold}
        className={'w-[34px] h-[36px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          updateToolbarState('isBold', true);
        }}>
        <TextBold className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Button
        active={toolbarState.isItalic}
        className={'w-[34px] h-[36px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          updateToolbarState('isItalic', true);
        }}>
        <TextItalic className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Button
        active={toolbarState.isUnderline}
        className={'w-[34px] h-[36px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          updateToolbarState('isUnderline', true);
        }}>
        <TextUnderline className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Link />
    </div>
  );
};

export default ToolbarPlugin;

const Divider = () => {
  return <div className="w-[1px] bg-gray-3 m-0 mx-[4px]" />;
};
