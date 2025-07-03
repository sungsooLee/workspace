import React, { FC, useEffect } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { ReactComponent as Prev } from '../../assets/images/icons/arrow-counterclockwise.svg';
import { ReactComponent as Next } from '../../assets/images/icons/arrow-clockwise.svg';
import Button from '../../components/button';
import { useToolbarState } from '../../context/toolbar.context';

const History: FC = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();

  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };
  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState('canUndo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor, updateToolbarState]);

  return (
    <div className={'flex'}>
      <Button onClick={handleUndo} className={'h-[36px] w-[34px]'} disabled={!toolbarState.canUndo}>
        <Prev className={'text-gray-10 opacity-50'} />
      </Button>
      <Button onClick={handleRedo} className={'h-[36px] w-[34px]'} disabled={!toolbarState.canRedo}>
        <Next className={'text-gray-10 opacity-50'} />
      </Button>
      <HistoryPlugin />
    </div>
  );
};

export default History;
