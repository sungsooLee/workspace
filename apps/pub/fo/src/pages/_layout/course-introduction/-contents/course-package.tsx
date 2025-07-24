import { FC, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';
import { Link } from '@tanstack/react-router';
import { Button, Input, Dropdown, Badge } from '@learnway/ui';
import { IcoPlay, IcoStar, IcoEye, IcoHeart, IcoPlus, IcoArrowForward } from '@learnway/icons';
import { isMobile } from 'react-device-detect';

/* ThumbnailList */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import ThumbnailList from '../../../-components/thumb/thumb-nail-list';

/* style */
import styles from './course-package.module.css';

const CoursePackageComponent: FC = () => {
  // dropdown
  const [searchValues01, setSearchValues01] = useState<string[]>(['대분류']);

  const item = [
    {
      imageUrl: bannerImg,
      title: '회의 분위기는 시작 멘트에서 갈린다',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="gray"
          size="xs"
          option={{ label: '접수중', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="caution"
          size="xs"
          option={{ label: 'D-7', value: `${getRandomId()}` }}
        />,
      ],
      infoCustomNode: [
        <span>{'라이브'}</span>,
        <span>
          <IcoPlay width={16} height={16} stroke="#4C515E" />
          {'05:00'}
        </span>,
      ],
      toggleButton: true,
      countInfoNode: [
        <span>
          <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
          <em>{'4.2'}</em>
        </span>,
        <span>
          <IcoEye width={20} height={20} fill="none" stroke="#4D525C" />
          <em>{'78,800'}</em>
        </span>,
        <span>
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
    },
    {
      imageUrl: bannerImg,
      title: '목표에서 실행까지: 전략 리더십 전략 프로세스 바로 알기 #1',
      tagLabels: ['이러닝', '문제해결력', '논리적사고'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="gray"
          size="xs"
          option={{ label: '접수중', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="caution"
          size="xs"
          option={{ label: 'D-7', value: `${getRandomId()}` }}
        />,
      ],
      infoCustomNode: [
        <span>{'라이브'}</span>,
        <span>
          <IcoPlay width={16} height={16} stroke="#4C515E" />
          {'05:00'}
        </span>,
      ],
      toggleButton: true,
      countInfoNode: [
        <span>
          <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
          <em>{'4.2'}</em>
        </span>,
        <span>
          <IcoEye width={20} height={20} fill="none" stroke="#4D525C" />
          <em>{'78,800'}</em>
        </span>,
        <span>
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
      tagLabels: ['이러닝', '문제해결력', '논리적사고'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="gray"
          size="xs"
          option={{ label: '접수중', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="caution"
          size="xs"
          option={{ label: 'D-7', value: `${getRandomId()}` }}
        />,
      ],
      infoCustomNode: [
        <span>{'이러닝'}</span>,
        <span>
          <IcoPlay width={16} height={16} stroke="#4C515E" />
          {'05:00'}
        </span>,
      ],
      toggleButton: true,
      countInfoNode: [
        <span>
          <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
          <em>{'4.2'}</em>
        </span>,
        <span>
          <IcoEye width={20} height={20} fill="none" stroke="#4D525C" />
          <em>{'78,800'}</em>
        </span>,
        <span>
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
    },
  ];

  return (
    <div className={cn(styles.start, styles.course_package)}>
      <div className={styles.search_box_wrap}>
        <div className={styles.select_area}>
          <Dropdown
            className={styles.search_select}
            size="lg"
            options={[
              { value: 'a', label: '패키지' },
              { value: 'b', label: '패키지2' },
              { value: 'c', label: '패키지3' },
            ]}
            value={searchValues01}
            onChange={(selected) => setSearchValues01(selected)}
          />
          <div className={styles.search_input}>
            <Input type="text" placeholder="검색어" inputSize={'lg'} />
            <Button label={'검색'} variant={'primary'} size={'lx'} />
          </div>
        </div>
      </div>
      {/* list_box */}
      <div className={styles.list_box}>
        <div className={cn(styles.list_title, styles.type_mint)}>
          <strong>{'요즘 뜨는 \n AI 트렌드 코스'}</strong>
          <p>{'함께 배워볼까요?'}</p>
          <Link to={'/'} className={styles.list_link}>
            <IcoPlus width={16} height={16} stroke={'#4D525C'} />
            {'더보기'}
            <IcoArrowForward width={16} height={16} stroke={'#4D525C'} />
          </Link>
        </div>
        {/* Thumnail List */}
        <ThumbnailList items={item} cols={!isMobile ? 3 : 2} />
      </div>
      {/* list_box */}
      <div className={styles.list_box}>
        <div className={cn(styles.list_title, styles.type_blue)}>
          <strong>{'AI 입문부터 \n 시작'}</strong>
          <p>{'어디 까지 알고 계신가요?'}</p>
          <Link to={'/'} className={styles.list_link}>
            <IcoPlus width={16} height={16} stroke={'#4D525C'} />
            {'더보기'}
            <IcoArrowForward width={16} height={16} stroke={'#4D525C'} />
          </Link>
        </div>
        {/* Thumnail List */}
        <ThumbnailList items={item} cols={!isMobile ? 3 : 2} />
      </div>
      {/* list_box */}
      <div className={styles.list_box}>
        <div className={cn(styles.list_title, styles.type_purple)}>
          <strong>{'AI 윤리 & 보안 \n 한 눈에 보기'}</strong>
          <p>{'함께 배워볼까요?'}</p>
          <Link to={'/'} className={styles.list_link}>
            <IcoPlus width={16} height={16} stroke={'#4D525C'} />
            {'더보기'}
            <IcoArrowForward width={16} height={16} stroke={'#4D525C'} />
          </Link>
        </div>
        {/* Thumnail List */}
        <ThumbnailList items={item} cols={!isMobile ? 3 : 2} />
      </div>
    </div>
  );
};

CoursePackageComponent.displayName = 'CoursePackage';
export const CoursePackage = CoursePackageComponent;
