import { FC, MouseEvent, ReactNode } from 'react';

import ArrowClockwise from '../../assets/icons/arrow-clockwise.svg?react';
import ArrowCounterclockwise from '../../assets/icons/arrow-counterclockwise.svg?react';
import JournalText from '../../assets/icons/journal-text.svg?react';
import Justify from '../../assets/icons/justify.svg?react';
import TextCenter from '../../assets/icons/text-center.svg?react';
import TextLeft from '../../assets/icons/text-left.svg?react';
import TextParagraph from '../../assets/icons/text-paragraph.svg?react';
import TextRight from '../../assets/icons/text-right.svg?react';
import TypeBold from '../../assets/icons/type-bold.svg?react';
import TypeItalic from '../../assets/icons/type-italic.svg?react';
import TypeStrikethrough from '../../assets/icons/type-strikethrough.svg?react';
import TypeUnderline from '../../assets/icons/type-underline.svg?react';

const icons: Record<string, ReactNode> = {
  'arrow-clockwise': <ArrowClockwise />,
  'arrow-counterclockwise': <ArrowCounterclockwise />,
  'journal-text': <JournalText />,
  justify: <Justify />,
  'text-center': <TextCenter />,
  'text-left': <TextLeft />,
  'text-paragraph': <TextParagraph />,
  'text-right': <TextRight />,
  'type-bold': <TypeBold />,
  'type-italic': <TypeItalic />,
  'type-strikethrough': <TypeStrikethrough />,
  'type-underline': <TypeUnderline />,
};

type IconKey = keyof typeof icons;

interface ButtonProps {
  icon: IconKey | ReactNode;
  disable?: boolean; // disable 여부
  onClick?: () => void; // 클릭 함수
}

/**
 * 에디터에서 사용되는 버튼
 * @constructor
 */
const Button: FC<ButtonProps> = ({ icon, disable = false, onClick }) => {
  const IconComponent = typeof icon === 'string' && icon in icons ? icons[icon as IconKey] : icon;
  /**
   * 버튼 엘리먼트의 클릭 콜백 호출 함수
   * @param event
   */
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClick && onClick();
  };
  return (
    <button
      className={`border-0 flex bg-none rounded-lg p-2 cursor-pointer align-middle`}
      disabled={disable}
      onClick={handleOnClick}>
      {IconComponent}
    </button>
  );
};

export default Button;
