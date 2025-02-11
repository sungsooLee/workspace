import { Children, FC, isValidElement, ReactNode, useState } from 'react';
import styles from './page-contents.module.css';
import { MainContents } from './slot/main-contents';
import { SubContents } from './slot/sub-contents';
import { Button, ChipList, Input, Select, SelectOption, Textarea, Tooltip } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { IcoAlertCircle, IcoArrowDown, IcoFormRequired } from '@learnway/icons';

/**
 * 목록 또는 상세 화면에 대한 디자인 wrapping 컴포넌트
 * @param children
 * @param panel
 * @constructor
 */
const PageContentsComponent: FC<{
  children: ReactNode;
  panel?: boolean;
}> = ({ children }) => {
  const MainContentsSlot = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === MainContents,
  );
  const SubContentsSlot = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === SubContents,
  );

  // media btn list
  const buttons = [
    {
      label: '원본 다운로드',
      onClick: () => console.log('btn 1'),
    },
    {
      label: '동영상 변경',
      onClick: () => console.log('btn 2'),
    },
    {
      label: '콘텐츠 URL보기',
      onClick: () => console.log('btn 3'),
    },
    {
      label: '미리보기',
      onClick: () => console.log('btn 4'),
    },
  ];

  // media info_list
  const infoList = [
    { title: '파일명', text: '파일명이 들어갑니다' },
    { title: '재생시간', text: '1시간' },
    { title: '원본용량', text: '2GB' },
    { title: '720P  용량', text: '1.6GB' },
    { title: '480P 용량', text: '900MB' },
    { title: '해상도', text: '1902 X 968' },
    { title: '파일형식', text: 'MOV' },
    { title: '비디오 코덱', text: 'H264' },
    { title: '비디오 프레임레이트', text: '' },
    { title: '오디오 코덱', text: '' },
    { title: '오디오 샘플레이트', text: '' },
  ];

  // form toggle
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const toggleContent = (index: number) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 해당 index만 토글
    }));
  };

  // chip List
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
  ];
  const handleChange = (event: SelectOption[]) => {
    console.log(event);
  };

  return (
    <>
      {MainContentsSlot && <div className={styles.main_contents}>{MainContentsSlot}</div>}
      {SubContentsSlot && <div className={styles.sub_contents}>{SubContentsSlot}</div>}
      {/* media_wrap */}
    </>
  );
};

export const PageContents = PageContentsComponent;
