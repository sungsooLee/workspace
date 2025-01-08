import Button from '../../components/button';
import TextParagraph from '../../assets/images/icons/text-paragraph.svg?react';
import ChevronDown from '../../assets/images/icons/chevron-down.svg?react';

const items = [
  {
    icon: TextParagraph,
    label: 'Normal',
  },
];

const BlockType = () => {
  return (
    <div className={'relative'}>
      <Button className={'h-[36px] gap-2 p-2'}>
        <TextParagraph />
        <span>Normal</span>
        <button className={'ml-1 pt-1'}>
          <ChevronDown />
        </button>
      </Button>
      <div
        className={
          'absolute p-2 bg-gray-1 z-50 shadow-[0_-2px_2px_rgba(0,0,0,0.1),4px_4px_6px_rgba(0,0,0,0.2),-4px_4px_6px_rgba(0,0,0,0.2)] top-[41px]'
        }>
        <ul>
          <li className={'flex items-center h-[36px] gap-2'}>
            <TextParagraph />
            <span>Normal</span>
          </li>
          <li className={'flex items-center h-[36px] gap-2'}>
            <TextParagraph />
            <span>Normal</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlockType;
