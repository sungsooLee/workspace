import Button from '../../components/button';
import TextParagraph from '../../assets/images/icons/text-paragraph.svg?react';
import ChevronDown from '../../assets/images/icons/chevron-down.svg?react';
import TypeH1 from '../../assets/images/icons/type-h1.svg?react';
import TypeH2 from '../../assets/images/icons/type-h2.svg?react';
import TypeH3 from '../../assets/images/icons/type-h3.svg?react';
import TypeH4 from '../../assets/images/icons/type-h4.svg?react';
import TypeH5 from '../../assets/images/icons/type-h5.svg?react';
import TypeH6 from '../../assets/images/icons/type-h6.svg?react';
import ListUl from '../../assets/images/icons/list-ul.svg?react';
import ListOL from '../../assets/images/icons/list-ol.svg?react';
import Quote from '../../assets/images/icons/chat-square-quote.svg?react';
import Check from '../../assets/images/icons/square-check.svg?react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const items = [
  {
    icon: TextParagraph,
    label: '일반',
    value: 'paragraph',
  },
  {
    icon: TypeH1,
    label: '제목 1',
    value: 'h1',
  },
  {
    icon: TypeH2,
    label: '제목 2',
    blockType: 'heading',
    value: 'h2',
  },
  {
    icon: TypeH3,
    label: '제목 3',
    value: 'h3',
  },
  {
    icon: TypeH4,
    label: '제목 4',
    value: 'h4',
  },
  {
    icon: TypeH5,
    label: '제목 5',
    value: 'h5',
  },
  {
    icon: TypeH6,
    label: '제목 6',
    value: 'h6',
  },
  {
    icon: ListUl,
    label: '숫자 목록',
    value: 'list-ul',
  },
  {
    icon: ListOL,
    label: '점 목록',
    value: 'list-ol',
  },
  {
    icon: Check,
    label: '체크 목록',
    value: 'check',
  },
  {
    icon: Quote,
    label: '인용구',
    value: 'quote',
  },
];

const BlockType = () => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleOpen = () => {
    setOpen((state) => !state);
  };
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false); // 닫기
    }
    const parentRootElement = editor.getRootElement();
    console.log(parentRootElement);
  };
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);
  return (
    <div ref={ref} className={'relative'}>
      <Button className={'h-[36px] gap-2 p-2'} onClick={handleOpen}>
        <TextParagraph />
        <span>Normal</span>
        <button className={'ml-1 pt-1'}>
          <ChevronDown />
        </button>
      </Button>
      {open && (
        <div
          className={
            'bg-gray-1 absolute top-[41px] z-50 w-[150px] p-2 shadow-[0_-2px_2px_rgba(0,0,0,0.1),4px_4px_6px_rgba(0,0,0,0.2),-4px_4px_6px_rgba(0,0,0,0.2)]'
          }>
          <ul>
            {items.map((item) => (
              <li key={item.value} className={'flex items-center'}>
                <button
                  className={
                    'hover:bg-gray-3 flex h-full w-full items-center gap-2 rounded-lg px-2 py-1'
                  }>
                  <item.icon />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlockType;
