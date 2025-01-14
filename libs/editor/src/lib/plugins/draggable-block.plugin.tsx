/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin';
import { useEffect, useRef } from 'react';

import DraggableIcon from '../assets/images/icons/draggable-block-menu.svg?react';

const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu';

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('draggable block plugin');
  }, []);
  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={
        <div ref={menuRef} className="icon draggable-block-menu">
          <DraggableIcon className={'opacity-3 h-[16px] w-[16px]'} />
        </div>
      }
      targetLineComponent={<div ref={targetLineRef} className="draggable-block-target-line" />}
      isOnMenu={isOnMenu}
    />
  );
}
