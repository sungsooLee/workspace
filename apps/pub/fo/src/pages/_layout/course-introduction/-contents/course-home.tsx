import { cn, getRandomId } from '@learnway/shared';
import { Link } from '@tanstack/react-router';
import { FC, useState } from 'react';

import {
  IcoArrowForward,
  IcoEye,
  IcoHeart,
  IcoPlay,
  IcoPlus,
  IcoSearch,
  IcoStar,
} from '@learnway/icons';
import { isMobile } from 'react-device-detect';

/* ThumbnailList */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import visualImg from '@learnway/styles/fo/assets/images/banner/img_visual_banner.png';
import shortsImg from '@learnway/styles/fo/assets/images/temp/img_shorts.jpg';
import ThumbnailList from '../../../-components/thumb/thumb-nail-list';

/* style */
import { Badge } from '@learnway/ui/badge';
import { Button } from '@learnway/ui/button';
import { Carousel } from '@learnway/ui/carousel';
import { Dropdown } from '@learnway/ui/dropdown';
import { ImageFallBack } from '@learnway/ui/image-fallback/image-fallback';
import { Input } from '@learnway/ui/input';
import { BannerItem } from './banner-item'; // 상단 배너
import styles from './course-contents.module.css';
import { ShortsItem } from './shorts-item'; // 하단 shorts

const CourseHomeComponent: FC = () => {
  // Search
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // Banner
  const bannerData = [
    {
      title: '2025 AI 트렌드',
      text: '사용자의 관심을 사로잡는 \n 23가지 기술',
      buttonLabel: '더보기',
      imageUrl: visualImg,
    },
    {
      title: '2025 AI 트렌드2',
      text: '사용자의 관심을 사로잡는 \n 23가지 기술',
      buttonLabel: '더보기',
      imageUrl: visualImg,
    },
    {
      title: '2025 AI 트렌드3',
      text: '사용자의 관심을 사로잡는 \n 23가지 기술',
      buttonLabel: '더보기',
      imageUrl: visualImg,
    },
  ];
  // Shorts
  const shortsData = [
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
    {
      title: '경청이 리더십의 시작이라는 말, 들어보셨나요?',
      badgeLabel: '마음챙김',
      imageUrl: shortsImg,
      infoNode: (
        <>
          <Badge
            variant={'text'}
            status={'primary'}
            option={{ label: 'New', value: '' }}
            size={'xs'}
          />
          <span className={styles.info}>
            <IcoEye width={16} height={16} stroke="#fff" />
            <em>{`${new Intl.NumberFormat().format(2500)}`}</em>
            {'시청'}
          </span>
        </>
      ),
    },
  ];

  const bannerItems = bannerData.map((item, index) => <BannerItem key={index} items={[item]} />);

  // Thumnail
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

  // Thumnail
  const item2 = [
    {
      imageUrl: bannerImg,
      title: '필수개발과정필수개발과정필필수개발과정필수개발과정필필수개발과정필수개발과정필',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
        />,
      ],
      infoCustomNode: [<span>{'패키지'}</span>, <span>{'12개 과정'}</span>],
      toggleButton: true,
      countInfoNode: [
        <span>
          <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
          <em>{'4.2'}</em>
        </span>,
        <span>
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
    },
    {
      imageUrl: bannerImg,
      title: '필수개발과정필수개발과정필필수개발과정필수개발과정필필수개발과정필수개발과정필',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
        />,
      ],
      infoCustomNode: [<span>{'패키지'}</span>, <span>{'12개 과정'}</span>],
      toggleButton: true,
      countInfoNode: [
        <span>
          <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
          <em>{'4.2'}</em>
        </span>,
        <span>
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
    },
  ];

  // Thumnail
  const item3 = [
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
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
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
      indexNumber: '1',
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
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
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
      indexNumber: '2',
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
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
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
      indexNumber: '3',
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
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
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
      indexNumber: '4',
    },
  ];

  // Thumnail
  const item4 = [
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
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
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
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
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
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
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      tagLabels: ['모바일전용', '사내IP전용', '#AI기술'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
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

  // shorts
  const shortsItems = shortsData.map((item, index) => <ShortsItem key={index} items={[item]} />);

  return (
    <div className={cn(styles.start, styles.course_contents)}>
      {/* Search */}
      <div className={styles.search_wrap}>
        {!isMobile ? (
          <>
            <Dropdown
              options={[
                { value: 'type1', label: '전체' },
                { value: 'type2', label: 'AI 지식 스튜디오' },
              ]}
              value={selectedValues}
              onChange={(selected) => setSelectedValues(selected)}
              size="md"
              defaultValue={'type1'}
            />
            <Input placeholder={'Text'} inputSize={'md'} showSearchIcon={true} />
          </>
        ) : (
          <Button
            onlyIcon={true}
            icon={
              <IcoSearch width={24} height={24} stroke={'#131C30'} className={styles.btn_search} />
            }
          />
        )}
      </div>
      {/* Banner */}
      <div className={styles.banner_wrap}>
        <Carousel
          items={bannerItems}
          className={cn(styles.banner_swiper, 'banner_swiper')}
          loop={true}
          spaceBetween={8}
          pagination={{ clickable: true }}
        />
      </div>
      {/* list_box_wrap */}
      <div className={styles.list_box_wrap}>
        {/* list_box */}
        <div className={styles.list_box}>
          <div className={styles.list_title}>
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
          <div className={styles.list_title}>
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
          <div className={styles.list_title}>
            <strong>{'AI 윤리 & 보안 \n 한 눈에 보기'}</strong>
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
      {/* title */}
      <strong className={styles.menu_title}>{'따로 또 같이, 알차게 준비한 패키지!'}</strong>
      {/* package_list_wrap */}
      <div className={styles.package_list_wrap}>
        <div className={styles.package_banner}>
          <ImageFallBack stacked={true} imageUrl={bannerImg} />
          <div className={styles.package_copy}>
            <div className={styles.badge_view}>
              <Badge
                variant="text"
                status="primary"
                size="xs"
                option={{ label: 'New', value: `${getRandomId()}` }}
              />
              <Badge
                variant="outline"
                status="gray"
                size="xs"
                option={{ label: '패키지', value: `${getRandomId()}` }}
              />
              <Badge
                variant="outline"
                status="gray"
                size="xs"
                option={{ label: '6개 과정', value: `${getRandomId()}` }}
              />
            </div>
            <div className={styles.title_area}>
              <strong>{'2025 트렌드'}</strong>
              <p>{'고객을 설득하는 \n 말하기, 듣기의 23가지 기술'}</p>
            </div>
            <div className={styles.count_info}>
              <span>
                <IcoEye width={20} height={20} fill="none" stroke="#fff" />
                <em>{'78,800'}</em>
              </span>
              <span>
                <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
                <em>{'153'}</em>
              </span>
            </div>
          </div>
        </div>
        {/* Thumnail List */}
        <div className={styles.list_wrapper}>
          <ThumbnailList items={item2} cols={1} direction={'horizontal'} stacked={true} />
        </div>
      </div>
      {/* title */}
      <strong className={styles.menu_title}>{'지금 보면 딱! 좋은 인기 과정'}</strong>
      <div className={styles.thumnail_wrap}>
        {/* Thumnail List */}
        <ThumbnailList items={item3} cols={2} direction={!isMobile ? 'horizontal' : 'vertical'} />
      </div>
      {/* title */}
      <strong className={styles.menu_title}>{'따끈따끈한 최신 과정'}</strong>
      <div className={styles.thumnail_wrap}>
        {/* Thumnail List */}
        <ThumbnailList items={item4} cols={2} direction={!isMobile ? 'horizontal' : 'vertical'} />
      </div>
      {/* title */}
      <strong className={styles.menu_title}>{'짧고 빠르게 볼 수 있는 최고 인기 숏츠'}</strong>
      {/* Shorts */}
      <div className={styles.shorts_wrap}>
        <Carousel
          items={shortsItems}
          className={cn(styles.shorts_swiper, 'shorts_swiper')}
          loop={false}
          slidesPerView={!isMobile ? 6 : 1.8}
          spaceBetween={20}
          showNavigation={!isMobile ? true : false}
        />
      </div>
    </div>
  );
};

CourseHomeComponent.displayName = 'CourseHome';
export const CourseHome = CourseHomeComponent;
