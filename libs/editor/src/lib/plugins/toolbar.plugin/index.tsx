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
import { ReactComponent as TextBold } from '../../assets/images/icons/type-bold.svg';
import { ReactComponent as TextItalic } from '../../assets/images/icons/type-italic.svg';
import { ReactComponent as TextUnderline } from '../../assets/images/icons/type-underline.svg';
import { ReactComponent as LinkIcon } from '../../assets/images/icons/link.svg';
import { useToolbarState } from '../../context/toolbar.context';
import Link from './link';
import BlockType from './block-type';
import FontColor from './font-color';
import BackgroundColor from './background-color';
import Insert from './insert';
import ElementFormat from './element-format';
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
    <div className="nlp--editor-tool-bar bg-gray-1 border-gray-3 text-gray-8 flex border-[1px] p-[10px] font-semibold">
      <History />
      <Divider />
      <BlockType />
      <Divider />
      <FontSize />
      <Divider />
      <Button
        active={toolbarState.isBold}
        className={'h-[36px] w-[34px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          updateToolbarState('isBold', true);
        }}>
        <TextBold className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Button
        active={toolbarState.isItalic}
        className={'h-[36px] w-[34px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          updateToolbarState('isItalic', true);
        }}>
        <TextItalic className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Button
        active={toolbarState.isUnderline}
        className={'h-[36px] w-[34px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          updateToolbarState('isUnderline', true);
        }}>
        <TextUnderline className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Link />
      <FontColor />
      <BackgroundColor />
      <Divider />
      <Insert />
      <Divider />
      <ElementFormat />
    </div>
  );
};

export default ToolbarPlugin;

const Divider = () => {
  return <div className="bg-gray-3 m-0 mx-[4px] w-[1px]" />;
};
