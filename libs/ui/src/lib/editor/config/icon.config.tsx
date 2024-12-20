import { ReactElement } from 'react';
import ArrowClockwise from '../assets/icons/arrow-clockwise.svg?react';
import ArrowCounterclockwise from '../assets/icons/arrow-counterclockwise.svg?react';
import JournalText from '../assets/icons/journal-text.svg?react';
import Justify from '../assets/icons/justify.svg?react';
import TextCenter from '../assets/icons/text-center.svg?react';
import TextLeft from '../assets/icons/text-left.svg?react';
import TextParagraph from '../assets/icons/text-paragraph.svg?react';
import TextRight from '../assets/icons/text-right.svg?react';
import TypeBold from '../assets/icons/type-bold.svg?react';
import TypeItalic from '../assets/icons/type-italic.svg?react';
import TypeStrikethrough from '../assets/icons/type-strikethrough.svg?react';
import TypeUnderline from '../assets/icons/type-underline.svg?react';
import ChevronDown from '../assets/icons/chevron-down.svg?react';
import Heading1 from '../assets/icons/type-h1.svg?react';
import Heading2 from '../assets/icons/type-h2.svg?react';
import Heading3 from '../assets/icons/type-h3.svg?react';
import Heading4 from '../assets/icons/type-h4.svg?react';
import Heading5 from '../assets/icons/type-h5.svg?react';
import Heading6 from '../assets/icons/type-h6.svg?react';
import Plus from '../assets/icons/plus.svg?react';
import Minus from '../assets/icons/minus-sign.svg?react';
import Code from '../assets/icons/code.svg?react';
import Link from '../assets/icons/link.svg?react';
import FontColor from '../assets/icons/font-color.svg?react';
import BgColor from '../assets/icons/bg-color.svg?react';
import Indent from '../assets/icons/indent.svg?react';
import Outdent from '../assets/icons/outdent.svg?react';
import HorizontalRule from '../assets/icons/horizontal-rule.svg?react';
import PageBreak from '../assets/icons/scissors.svg?react';
import FileImage from '../assets/icons/file-image.svg?react';
import Table from '../assets/icons/table.svg?react';
import Video from '../assets/icons/youtube.svg?react';

export const icons: Record<string, ReactElement> = {
  arrowClockwise: <ArrowClockwise />,
  arrowCounterclockwise: <ArrowCounterclockwise />,
  journalText: <JournalText />,
  justify: <Justify />,
  textCenter: <TextCenter />,
  textLeft: <TextLeft />,
  textParagraph: <TextParagraph />,
  textRight: <TextRight />,
  typeBold: <TypeBold />,
  typeItalic: <TypeItalic />,
  typeStrikethrough: <TypeStrikethrough />,
  typeUnderline: <TypeUnderline />,
  chevronDown: <ChevronDown />,
  heading1: <Heading1 />,
  heading2: <Heading2 />,
  heading3: <Heading3 />,
  heading4: <Heading4 />,
  heading5: <Heading5 />,
  heading6: <Heading6 />,
  plus: <Plus />,
  minus: <Minus />,
  code: <Code />,
  link: <Link />,
  fontColor: <FontColor />,
  bgColor: <BgColor />,
  indent: <Indent />,
  outdent: <Outdent />,
  pageBreak: <PageBreak />,
  horizontalRule: <HorizontalRule />,
  fileImage: <FileImage />,
  table: <Table />,
  video: <Video />,
};
