import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $createReactPlayerNode } from '../nodes/react-player.node';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { ImagePayload } from '../nodes/image.node';
import { INSERT_IMAGE_COMMAND } from './images.plugin';

export type InsertImagePayload = Readonly<ImagePayload>;

const FeaturePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [src, setSrc] = useState('');
  const handleAddLink = () => {
    const url = prompt('Enter the URL'); // 사용자로부터 링크 입력받기
    if (url) {
      editor.update(() => {
        const selection = $getSelection(); // 현재 선택 상태 가져오기
        if ($isRangeSelection(selection)) {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, url); // 링크 추가
        } else {
          alert('텍스트를 선택한 후 다시 시도해주세요.');
        }
      });
    }
  };

  const handleRemoveLink = () => {
    // 선택된 텍스트에서 링크 제거
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };

  const handleAddVideo = () => {
    const url = prompt('Enter the video URL');
    if (url) {
      editor.update(() => {
        const node = $createReactPlayerNode(url);
        const selection = $getSelection();
        if (selection) {
          selection.insertNodes([node]);
        }
      });
    }
  };

  const handleAddTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: '3',
      rows: '3',
    });
  };

  const loadImage = (files: FileList | null) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        setSrc(reader.result);
      }
      return '';
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleUploadImage = () => {
    const payload: InsertImagePayload = {
      altText: '',
      src,
    };
    console.log('payload', payload);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <>
      기능
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
        <div>
          <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}>
            Bold
          </button>
          <div>
            <input id="default-checkbox" type="checkbox" value="" />
            <label htmlFor="default-checkbox">활성화여부</label>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>
            italic
          </button>
          <div>
            <input id="default-checkbox" type="checkbox" value="" />
            <label htmlFor="default-checkbox">활성화여부</label>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}>
            underline
          </button>
          <div>
            <input id="default-checkbox" type="checkbox" value="" />
            <label htmlFor="default-checkbox">활성화여부 checkbox</label>
          </div>
        </div>
        <div>
          <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}>
            code
          </button>
          <div>
            <input id="default-checkbox" type="checkbox" value="" />
            <label htmlFor="default-checkbox">활성화여부 checkbox</label>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase')}>
            lowercase
          </button>
          <div>
            <input id="default-checkbox" type="checkbox" value="" />
            <label htmlFor="default-checkbox">활성화여부</label>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase')}>
            uppercase
          </button>
          <div>
            <input id="default-checkbox" type="checkbox" value="" />
            <label htmlFor="default-checkbox">활성화여부</label>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize')}>
            첫글자대문자
          </button>
        </div>

        <div>
          {/*  @lexical/link 추가해야함  <AutoLinkPlugin /> <LinkPlugin/> AutoLinkNode, LinkNode 추가해야함*/}
          <button type="button" onClick={handleAddLink}>
            링크추가
          </button>
          <button type="button" onClick={handleRemoveLink}>
            링크삭제
          </button>
        </div>
        <div>
          <button type="button" onClick={handleAddVideo}>
            비디오추가
          </button>
        </div>

        <div>
          {/* TablePlugin , TableNode, TableRowNode  추가 해야함 */}
          <button type="button" onClick={handleAddTable}>
            테이블추가
          </button>
        </div>
        <div>
          <input type={'file'} onChange={(e) => loadImage(e.target.files)} />
          <button type="button" onClick={handleUploadImage}>
            이미지업로드
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturePlugin;
