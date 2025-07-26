import { FC, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';
import { Button, Input, Dropdown, Badge, Popover, Checkbox, Pagination } from '@learnway/ui';
import {
  IcoPlay,
  IcoStar,
  IcoEye,
  IcoHeart,
  IcoArrowForward,
  IcoArrowDown,
  IcoDotpoints,
  IcoArray,
} from '@learnway/icons';
import { Arrays } from '../../../../features/layout';
import { isMobile } from 'react-device-detect';

/* ThumbnailList */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import ThumbnailList from '../../../-components/thumb/thumb-nail-list';

/* style */
import styles from './course-contents.module.css';
import dropdownPopoverStyles from '../../../../shared/ui/dropdown-popover/dropdown-popover.module.css';

const CoursePackageComponent: FC = () => {
  // dropdown
  const [searchValues01, setSearchValues01] = useState<string[]>(['대분류']);

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

  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>20개씩</Button>
        <Button>50개씩</Button>
        <Button>80개씩</Button>
      </div>
    );
  };

  const arrays = {
    items: ['최신순', '과정명순', '조회순'],
    initialSelectedItem: 0, // 초기 선택값
  };

  // 리스트 정렬 버튼 제어
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleButtonClick = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <div className={cn(styles.start, styles.course_contents)}>
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
        <div className={styles.select_menu}>
          <Button
            variant={'text'}
            label={'더보기'}
            icon={<IcoArrowForward width={20} height={20} stroke="#4D525C" />}
            iconAlign={'right'}
            size={'sm'}
          />
        </div>
      </div>
      <div className={styles.result_list_wrap}>
        <div className={styles.sort_wrap}>
          <strong className={styles.title}>
            교육 패키지<span className={styles.num}>{'178'}</span>개
          </strong>
          <div className={styles.sort_area}>
            <Checkbox label={'학습 가능 과정'} size="sm" className={styles.check_menu} />
            <Arrays arraysData={arrays} className={styles.array} />
            <div className={styles.box}>
              <Popover
                popoverContent={<DropdownPopoverCompoment />}
                className={cn(dropdownPopoverStyles.btn, dropdownPopoverStyles.text)}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{'20개씩'}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.btn_box}>
              <Button
                onlyIcon={true}
                icon={<IcoDotpoints width={20} height={20} fill="none" />}
                className={cn(styles.btn_order, isActive ? styles.active : null)}
                onClick={() => handleButtonClick()}
              />
              <Button
                onlyIcon={true}
                className={cn(styles.btn_order, !isActive ? styles.active : null)}
                icon={<IcoArray width={20} height={20} fill="#fff" stroke="#131416" />}
                onClick={() => handleButtonClick()}
              />
            </div>
          </div>
        </div>
        {/* Thumnail List */}
        <ThumbnailList
          items={item}
          cols={isActive ? 2 : 4}
          direction={isActive ? 'horizontal' : 'vertical'}
        />
        {/* pagination */}
        <Pagination
          className={styles.pagination}
          pageNumber={0}
          totalPages={5}
          hidePageSizeOptions={true}
          hidePageInfo={true}
          showFirstButton={false}
          showLastButton={false}
        />
      </div>
    </div>
  );
};

CoursePackageComponent.displayName = 'CoursePackage';
export const CoursePackage = CoursePackageComponent;
