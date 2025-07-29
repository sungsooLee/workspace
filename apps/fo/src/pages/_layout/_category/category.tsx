import React, { useEffect, useState } from 'react';
import { createFileRoute, Link, useRouter, useRouterState } from '@tanstack/react-router';
import { Navigation } from 'swiper/modules';
import {
  Carousel,
  ContentsRow,
  Input,
  Pagination,
  Dropdown,
  EmptyText,
  Button,
  Popover,
} from '@learnway/ui';
import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from '@learnway/styles/fo/pages/_layout/category/category.module.css';
import { cn } from '@learnway/shared';
import { Filter } from '../../../features/category/ui/category-filter/category-filter';
import { Arrays, ThumnailList } from '@features/layout';
import { t } from 'i18next';

import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';
import { IcoArray, IcoArrowDown, IcoDotpoints } from '@learnway/icons';
import { useFetchCategoryDetail } from '@entities/category';

export const Route = createFileRoute('/_layout/_category/category')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const tenantId = router.state.location.state?.tenantId;
  const categoryId = router.state.location.state?.categoryId;

  const { data: categoryInfo } = useFetchCategoryDetail(categoryId);
  const [data, setData] = useState<any[]>([]);

  const [depth, setDepth] = useState(3);
  const [page, setPage] = useState(1);
  const [listUi, setListUi] = useState('type');
  const [topOptions, setTopOptions] = useState<any[]>(
    [
      { value: 'a', label: '대분류' },
      { value: 'b', label: 'ST1' },
      { value: 'c', label: '아이오닉 6' },
      { value: 'd', label: '아이오닉 5' },
      { value: 'e', label: '코나' },
      { value: 'f', label: '넥쏘' },
      { value: 'g', label: '포터' },
      { value: 'h', label: '캐스퍼' },
    ]
  );
  const [middleOptions, setMiddleOptions] = useState<any[]>(
    [
      { value: 'a', label: '중분류' },
      { value: 'b', label: 'NE PE(2024)' },
      { value: 'c', label: 'NE(2021)' },
    ]
  );
  const [bottomOptions, setBottomOptions] = useState<any[]>(
    [
      { value: 'a', label: '소분류' },
      { value: 'b', label: '상품정보' },
      { value: 'c', label: '기술정보' },
    ]
  );

  const items = [
    <Link to={'/'}>
      <img src={bnrCImage1} alt="" />
    </Link>,
    <Link to={'/'}>
      <img src={bnrCImage2} alt="" />
    </Link>,
    <Link to={'/'}>
      <img src={bnrCImage1} alt="" />
    </Link>,
  ];
  const arrays = {
    items: ['최신순', '과정명순', '조회순'],
    initialSelectedItem: 0, // 초기 선택값
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handlerListUi = () => {
    if (listUi === 'type') {
      setListUi('type2');
    } else {
      setListUi('type');
    }
  };

  const handleFilterOptionChange = (options: any) => {
    // 카테고리 필터 변경되면 검색 API 호출
  };

  const handleOnSearch = (data: any) => {
    console.log('### data : ', data)
  }

  useEffect(() => {
    console.log(`2. tenantId=${tenantId} | categoryId=${categoryId}`);
  }, [routerState.location.state.tenantId, routerState.location.state.categoryId]);

  useEffect(() => {
    if( categoryInfo ) {
      console.log('categoryInfo => ', categoryInfo)
    }
  }, [categoryInfo])

  return (
    <div className={styles.start}>
      {/* ■ 마케팅 영역 - 어드민에서 1,2 Depth 화면에서만 노출/비노출 설정 가능*/}
      <div className={styles.swiper}>
        <Carousel
          items={items}
          className={`${styles.recent_swiper} category_swiper`}
          spaceBetween={20}
          slidesPerView={2.2}
          modules={[Navigation]}
          navigation={true}
        />
      </div>

      <div className={styles.gray_box}>
        <ul className={styles.divisio_box}>
          <li>
            <div className={styles.search_division}>
              { /* 카테고리 4,5,6 뎁스 영역 */
                depth > 3 && (
                  <ContentsRow className={styles.search_area}>
                    <Dropdown
                      className={styles.search_select}
                      size="lg"
                      options={topOptions}
                    />
                    <Dropdown
                      className={styles.search_select}
                      size="lg"
                      options={middleOptions}
                    />
                    <Dropdown
                      className={styles.search_select}
                      size="lg"
                      options={bottomOptions}
                    />
                  </ContentsRow>
                )
              }

              <ContentsRow className={styles.search_input}>
                <Input id="courseName" type="text" placeholder="과정명 검색" inputSize={'lg'} showSearchIcon={false} />
                <Button label={t('검색')} variant={'primary'} size={'lx'} />
              </ContentsRow>
            </div>
          </li>
          <li>
            <Filter onOptionChange={handleFilterOptionChange} />
          </li>
        </ul>
      </div>

      <div className={styles.lists_wrap}>
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            <Arrays className={styles.array} arraysData={arrays}></Arrays>
            <div className={styles.box}>
              <Popover
                popoverContent={
                  <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
                    <Button>20개씩</Button>
                    <Button>50개씩</Button>
                    <Button>80개씩</Button>
                  </div>
                }
                className={cn(dropdownPopoverStyles.btn, dropdownPopoverStyles.text)}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{'20개씩'}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.box}>
              <Button onClick={handlerListUi}>
                {listUi === 'type2' ? (
                  <IcoArray width={24} height={24} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={24} height={24} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {
          ( data && data.length > 0 ) ? (
            <>
              <ThumnailList />
            </>
          ) : (
            <div className={styles.empty}>
              <EmptyText
                text={'검색 결과를 찾을 수 없습니다.'}
                description={'다른 과정명으로 검색해 보세요.'}
              />
            </div>
          )
        }
      </div>

      {
        ( data && data.length > 0 ) && (
          <Pagination
            className={cn(styles.pagenation, styles.paginationItem)}
            pageNumber={0}
            totalPages={5}
            hidePageSizeOptions={true}
            hidePageInfo={true}
            showFirstButton={false}
            showLastButton={false}
            onChange={handlePageChange}
          />
        )
      }
    </div>
  );
}
