import { cloneElement, FC, MouseEvent, ReactElement, ReactNode } from 'react';

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

const DEFAULT_CLASS = `bg-contain h-[18px] w-[18px] mt-[2px] align-middle`;

const icons: Record<string, ReactElement> = {
  'arrow-clockwise': <ArrowClockwise className={DEFAULT_CLASS} />,
  'arrow-counterclockwise': <ArrowCounterclockwise className={DEFAULT_CLASS} />,
  'journal-text': <JournalText className={DEFAULT_CLASS} />,
  justify: <Justify className={DEFAULT_CLASS} />,
  'text-center': <TextCenter className={DEFAULT_CLASS} />,
  'text-left': <TextLeft className={DEFAULT_CLASS} />,
  'text-paragraph': <TextParagraph className={DEFAULT_CLASS} />,
  'text-right': <TextRight className={DEFAULT_CLASS} />,
  'type-bold': <TypeBold className={DEFAULT_CLASS} />,
  'type-italic': <TypeItalic className={DEFAULT_CLASS} />,
  'type-strikethrough': <TypeStrikethrough className={DEFAULT_CLASS} />,
  'type-underline': <TypeUnderline className={DEFAULT_CLASS} />,
};

type IconKey = keyof typeof icons;

interface ButtonProps {
  icon: IconKey;
  active?: boolean; // 활성화 여부
  ariaLabel?: string; //
  disable?: boolean; // disable 여부
  onClick?: () => void; // 클릭 함수
}

/**
 * 에디터에서 사용되는 버튼
 * @constructor
 */
const Button: FC<ButtonProps> = ({
  icon,
  onClick,
  disable = false,
  active = false,
  ariaLabel = '',
}) => {
  /*const IconComponent: ReactNode =
    typeof icon === 'string' && icon in icons
      ? cloneElement(icons[icon as IconKey] as JSX.Element, {
          className: `${DEFAULT_CLASS} disabled:`,
        })
      : icon;*/
  /**
   * 버튼 엘리먼트의 클릭 콜백 호출 함수
   * @param event
   */
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disable) {
      onClick && onClick();
    }
  };
  return (
    <button
      className={`border-0 flex rounded-lg p-[8px] cursor-pointer align-middle disabled:cursor-not-allowed ${
        active ? 'bg-blue-100' : 'bg-none'
      } ${!disable ? 'hover:bg-gray-200' : ''}`}
      disabled={disable}
      onClick={handleOnClick}>
      <IConComponent
        icon={icon}
        className={`${disable ? 'opacity-10' : 'opacity-60'} ${active ? 'opacity-100' : ''}`}
      />
    </button>
  );
};

export default Button;

const IConComponent: FC<{ icon: IconKey; className: string }> = ({ icon, className }) => {
  return cloneElement(icons[icon], {
    className: `${DEFAULT_CLASS} ${className}`,
  });
};
