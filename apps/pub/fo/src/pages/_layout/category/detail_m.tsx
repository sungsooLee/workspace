import { IcoArray, IcoArrowDown, IcoDotpoints, IcoFilter, IcoPlay } from '@learnway/icons';
import { cn, getRandomId } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { CategoryDepthPopupM, FilterPopup } from '../../../features/layout';

import dropdownPopoverStyles from '@learnway/styles/fo/shared/ui/dropdown-popover/dropdown-popover.module.css';

import styles from './detail_m.module.css';

/* ThumbnailList */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import { Badge } from '@learnway/ui/badge';
import { Button } from '@learnway/ui/button';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Pagination } from '@learnway/ui/pagination';
import { Popover } from '@learnway/ui/popover';
import ThumbnailList from '../../../shared/ui/thumnail/list/thumb-nail-list';

export const Route = createFileRoute('/_layout/category/detail_m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();

  // dropdown
  const [divisionValues, setDivisionValues] = useState<string[]>(['분류선택']);

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>최신순</Button>
        <Button>과정명순</Button>
        <Button>조회순</Button>
      </div>
    );
  };

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment2 = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>20개씩</Button>
        <Button>50개씩</Button>
        <Button>80개씩</Button>
      </div>
    );
  };

  // 필터 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);

  // 리스트 정렬 버튼 제어
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.side;
    setIsActive(value === 'left');
  };

  const item = [
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
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
    },
  ];

  return (
    <div className={cn(styles.start, styles.detail_m)}>
      <div className={styles.gray_box}>
        <div className={styles.box}>
          {/* 분류가 1개인 경우 */}
          {/* <Dropdown
            className={styles.select}
            options={[
              { value: 'a', label: '분류선택' },
              { value: 'b', label: 'ST1' },
              { value: 'c', label: '아이오닉 6' },
              { value: 'd', label: '아이오닉 5' },
              { value: 'e', label: '코나' },
              { value: 'f', label: '넥쏘' },
              { value: 'g', label: '포터' },
              { value: 'h', label: '캐스퍼' },
            ]}
            value={divisionValues}
            onChange={(selected) => setDivisionValues(selected)}
          /> */}
          {/* 분류가 2개 이상인 경우 */}
          <Button
            className={styles.btn_drop}
            onClick={() =>
              openModal({
                width: 'm_bottom_sheet',
                content: <CategoryDepthPopupM />,
              })
            }
            icon={<IcoArrowDown width={16} height={16} stroke="#131c30" />}
            label={'분류선택'}
          />
        </div>
        <div className={styles.box}>
          <div className={styles.search_input}>
            <Input id="" type="text" placeholder="과정명 검색" inputSize={'lg'} showSearchIcon />
          </div>

          <div className={styles.filter_wrap}>
            <Button
              className={cn(styles.btn_filter, selectCheck === true ? styles.selected : '')}
              onClick={() =>
                openModal({
                  width: 'm_bottom_sheet',
                  content: <FilterPopup />,
                })
              }
            >
              <IcoFilter
                width={20}
                height={20}
                fill="none"
                stroke={selectCheck === true ? '#fff' : '#07287e'}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.lists_wrap}>
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.box}>
              <Popover
                popoverContent={<DropdownPopoverCompoment />}
                className={cn(dropdownPopoverStyles.btn, dropdownPopoverStyles.text)}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{'최신순'}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.box}>
              {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
              <Popover
                popoverContent={<DropdownPopoverCompoment2 />}
                className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
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
                data-side="left"
                onClick={handleButtonClick}
              />
              <Button
                onlyIcon={true}
                className={cn(styles.btn_order, !isActive ? styles.active : null)}
                icon={<IcoArray width={20} height={20} fill="#fff" stroke="#131416" />}
                data-side="right"
                onClick={handleButtonClick}
              />
            </div>
          </div>
        </div>

        {/* Thumnail List */}
        <ThumbnailList
          items={item}
          cols={isActive ? 1 : 2}
          direction={isActive ? 'horizontal' : 'vertical'}
        />

        {/* pagination */}
        <Pagination
          className={cn(styles.pagenation, styles.paginationItem)}
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
}
