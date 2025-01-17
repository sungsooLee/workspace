import React, { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createLinkNode, $isAutoLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $findMatchingParent } from '@lexical/utils';
import { sanitizeUrl } from '../../../utils/url';
import { useFloatingModal } from '../../../context/floating-modal.context';
import { getSelectedNode } from '../../../utils/get-selected-node';
import CloseICon from '../../../assets/images/icons/close.svg';
import ConfirmIcon from '../../../assets/images/icons/success-alt.svg';
import ModifyIcon from '../../../assets/images/icons/pencil-fill.svg';
import TrashIcon from '../../../assets/images/icons/trash.svg';

const Contents: FC<{ editable: boolean }> = ({ editable }) => {
  const [editor] = useLexicalComposerContext();
  const { closeModal } = useFloatingModal();
  const [isEdit, setIsEdit] = useState(editable);
  const [url, setUrl] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrl(e.target.value);
  };

  /**
   * 링크 수정
   */
  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editor.update(() => {
      const selection = $getSelection();
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(url));

      if ($isRangeSelection(selection)) {
        const parent = getSelectedNode(selection).getParent();
        if ($isAutoLinkNode(parent)) {
          const linkNode = $createLinkNode(parent.getURL(), {
            rel: parent.__rel,
            target: parent.__target,
            title: parent.__title,
          });
          parent.replace(linkNode, true);
        }
      }
      closeModal();
    });
  };
  /**
   * 컨텐츠 모달 닫기
   */
  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
  };

  /**
   * 링크 수정
   * @param e
   */
  const handleModify = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  /**
   * 링크 삭제
   * @param e
   */
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    closeModal();
  };

  useEffect(() => {
    // Lexical의 Editor 상태를 읽는 동작 시작
    editor.read(() => {
      // 현재 Editor에서의 Selection(선택된 텍스트/노드 상태) 가져오기
      const selection = $getSelection();

      // Selection이 RangeSelection인지 확인
      // RangeSelection은 텍스트 또는 DOM의 특정 부분이 선택되어 있는 상태를 나타냄
      if ($isRangeSelection(selection)) {
        // 현재 선택된 노드 가져오기
        const node = getSelectedNode(selection);

        // 선택된 노드의 부모 노드 가져오기
        const parent = node.getParent();

        // 부모 노드나 현재 노드가 LinkNode인지 확인
        const isLink = $isLinkNode(parent) || $isLinkNode(node);

        // 선택된 노드에 링크 노드가 포함되어 있는지 검사
        const linkNode = $findMatchingParent(node, $isLinkNode);

        // 링크 노드인지 확인하고, 존재하는 경우 처리
        if (isLink && linkNode) {
          // 링크 노드로부터 URL 가져오기
          setUrl(linkNode.getURL());

          // 편집 모드가 아니라면, 입력 필드에 포커스하기
          if (!isEdit) {
            inputRef && inputRef.current && inputRef.current.focus();
          }
        } else {
          // 링크 노드가 없는 경우 모달 닫기
          closeModal();
        }
      }
    });
  }, [editor, closeModal, isEdit]);
  return (
    <div className={'w-full p-2'}>
      <div className={'flex gap-3'}>
        {isEdit ? (
          <>
            <input
              ref={inputRef}
              type="text"
              className={'bg-gray-3 flex-1 rounded-lg px-2 py-1'}
              value={url}
              onChange={handleUrlChange}
            />
            <div className={'flex gap-3'}>
              <button onClick={handleCancel}>
                <CloseICon className={'h-[16px] w-[16px]'} />
              </button>
              <button onClick={handleConfirm}>
                <ConfirmIcon className={'h-[16px] w-[16px]'} />
              </button>
            </div>
          </>
        ) : (
          <>
            <a href={url} target={'_blank'} className={'nlp--editor-link nlp--editor-ltr flex-1'}>
              {url}
            </a>
            <div className={'flex gap-3'}>
              <button onClick={handleModify}>
                <ModifyIcon className={'h-[16px] w-[16px]'} />
              </button>
              <button onClick={handleDelete}>
                <TrashIcon className={'h-[16px] w-[16px]'} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Contents;
