import { FC, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';
import { Link } from '@tanstack/react-router';
import { Button, Input, Dropdown, Badge, Carousel, Thumbnail } from '@learnway/ui';
import { IcoPlay, IcoStar, IcoEye, IcoHeart, IcoPlus, IcoArrowForward } from '@learnway/icons';
import { isMobile } from 'react-device-detect';

/* ThumbnailList */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import visualImg from '@learnway/styles/fo/assets/images/banner/img_visual_banner.png';
import ThumbnailList from '../../../-components/thumb/thumb-nail-list';

/* style */
import styles from './course-contents.module.css';
import { BannerItem } from './banner-item';

const CourseHomeComponent: FC = () => {
  // dropdown
  const [searchValues01, setSearchValues01] = useState<string[]>(['대분류']);

  const data = [
    {
      title: '2025 AI 트렌드',
      text: '사용자의 관심을 사로잡는 \n 23가지 기술',
      buttonLabel: '더보기',
      imageUrl: visualImg,
    },
    // ...
  ];

  // Carousel
  const bannerItems = [
    <BannerItem items={data} />,
    <BannerItem items={data} />,
    <BannerItem items={data} />,
  ];

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

  return (
    <div className={cn(styles.start, styles.course_contents)}>
      <div className={styles.banner_wrap}>
        <Carousel
          items={bannerItems}
          className={cn(styles.banner_swiper, 'banner_swiper')}
          loop={true}
          spaceBetween={8}
          pagination={{ clickable: true }}
        />
      </div>
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
          <Thumbnail stacked={true} path={bannerImg} enableHover={false} />
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
    </div>
  );
};

CourseHomeComponent.displayName = 'CourseHome';
export const CourseHome = CourseHomeComponent;
