/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '../../components/ui/button';
import DropDown from '../../components/ui/dropdown';
import FontSize from './font-size';
import DropdownColorPicker from '../../components/ui/dropdown-color-picker';
const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

const TollbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <Button
        icon={'arrowClockwise'}
        disable={!canUndo}
        ariaLabel={'Undo'}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      />
      <Button
        icon={'arrowCounterclockwise'}
        disable={!canRedo}
        ariaLabel={'Redo'}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      />
      <Divider />
      <DropDown
        items={[
          { value: '1', label: 'Heading1', icon: 'heading1', active: true },
          { value: '2', label: 'Heading2', icon: 'heading2', active: false },
          { value: '3', label: 'Heading3', icon: 'heading3', active: false },
          { value: '4', label: 'Heading4', icon: 'heading4', active: false },
          { value: '5', label: 'Heading5', icon: 'heading5', active: false },
          { value: '6', label: 'Heading6', icon: 'heading6', active: false },
        ]}
      />
      <Divider />
      <FontSize />
      <Divider />
      <Button
        icon={'typeBold'}
        active={isBold}
        ariaLabel={'Format Bold'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      />
      <Button
        icon={'typeItalic'}
        active={isItalic}
        ariaLabel={'Format Italics'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      />
      <Button
        icon={'typeUnderline'}
        active={isUnderline}
        ariaLabel={'Format Underline'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      />
      <Button
        icon={'typeStrikethrough'}
        active={isStrikethrough}
        ariaLabel={'Format Strikethrough'}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      />
      <Button
        icon={'code'}
        active={false}
        ariaLabel={'Insert code block'}
        onClick={() => {
          // TODO. 활성화된 에디터가 필요함
        }}
      />
      <Button
        icon={'link'}
        active={false}
        ariaLabel={'Insert link'}
        onClick={() => {
          // TODO. 활성화된 에디터가 필요함
        }}
      />

      <DropdownColorPicker icon={'fontColor'} />
      <DropdownColorPicker icon={'bgColor'} />
      <Divider />
      <Button
        icon={'indent'}
        active={false}
        ariaLabel={'Indent'}
        onClick={() => {
          // TODO. 활성화된 에디터가 필요함
        }}
      />
      <Button
        icon={'outdent'}
        active={false}
        ariaLabel={'Outdent'}
        onClick={() => {
          // TODO. 활성화된 에디터가 필요함
        }}
      />
      <DropDown
        items={[
          { value: '1', label: '왼쪽정렬', icon: 'textLeft', active: true },
          { value: '2', label: '가운데정렬', icon: 'textCenter', active: false },
          { value: '3', label: '오른쪽정렬', icon: 'textRight', active: false },
        ]}
      />
      <DropDown
        icon={'plus'}
        label={'컨텐츠'}
        items={[
          { value: '1', label: '가로줄', icon: 'horizontalRule' },
          { value: '2', label: '이미지', icon: 'fileImage' },
          { value: '2', label: '테이블', icon: 'table' },
          { value: '2', label: '비디오', icon: 'video' },
        ]}
      />
    </div>
  );
};

export default TollbarPlugin;
