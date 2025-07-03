import React, { useCallback, useEffect } from 'react';

import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isTableSelection } from '@lexical/table';

import History from './history';
import FontSize from './font-size';
import Button from '../../components/button';
import { ReactComponent as TextBold } from '../../assets/images/icons/type-bold.svg';
import { ReactComponent as TextItalic } from '../../assets/images/icons/type-italic.svg';
import { ReactComponent as TextUnderline } from '../../assets/images/icons/type-underline.svg';
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
    <div className="nlp--editor-tool-bar border-gray-3 text-gray-8 flex border-[1px] bg-white font-semibold">
      <BlockType />
      <History />
      <FontSize />
      {/*bold*/}
      <Button
        active={toolbarState.isBold}
        className={'h-[36px] w-[34px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          updateToolbarState('isBold', true);
        }}
      >
        <TextBold className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      {/*italic*/}
      <Button
        active={toolbarState.isItalic}
        className={'h-[36px] w-[34px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          updateToolbarState('isItalic', true);
        }}
      >
        <TextItalic className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      {/*underline*/}
      <Button
        active={toolbarState.isUnderline}
        className={'h-[36px] w-[34px]'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          updateToolbarState('isUnderline', true);
        }}
      >
        <TextUnderline className={`${toolbarState.isBold ? '' : 'opacity-50'}`} />
      </Button>
      <Link />
      <FontColor />
      <BackgroundColor />
      <Insert />
      <ElementFormat />
    </div>
  );
};

export default ToolbarPlugin;

const Divider = () => {
  return <div className="bg-gray-3 m-0 mx-[4px] w-[1px]" />;
};
