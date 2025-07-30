import React, { useEffect, useState } from 'react';
import { createFileRoute, Link, useRouterState } from '@tanstack/react-router';
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
import { Filter } from '@features/category/ui/category-filter';
import { Arrays, ThumnailList } from '@features/layout';
import { t } from 'i18next';

import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';
import { IcoArray, IcoArrowDown, IcoDotpoints } from '@learnway/icons';
import { queryOptions, useFetchCategoryDetail } from '@entities/category';
import CategoryService from '@entities/category/api/category';

export const Route = createFileRoute('/_layout/_category/category')({
  component: RouteComponent,
});

function RouteComponent() {
  const routerState = useRouterState();
  const categoryId = routerState.location.state?.categoryId;

  const { data: categoryInfo } = useFetchCategoryDetail(categoryId);

  const [depth, setDepth] = useState(3);
  const [page, setPage] = useState(0);
  const [size , setSize] = useState(20);
  const [sorting, setSorting] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [coursePayload, setCoursePayload] = useState({
    page, size, sort: sorting, categoryId, courseName
  });
  const [data, setData] = useState<any>({});
  const [sortingDisabled, setSortingDisabled] = useState(true);

  // 4,5,6 뎁스 일 때 사용
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
  const handlePageSizeChange = (value: number) => {
    setSize(value)
  }

  const handleFilterOptionChange = async (options: any) => {
    const payload = {
      ...coursePayload,
      courseType: options.map( (row: any) => row.value),
    }
    setCoursePayload(payload);
    await fetchCoursesCategory(payload)
  };

  const handleOnSearch = async () => {
    const payload = {
      ...coursePayload,
      courseName
    }
    setCoursePayload(payload)
    await fetchCoursesCategory(payload)
  }

  useEffect(() => {
    if( categoryInfo ) {
      (async () => {
        const payload = {
          ...coursePayload,
          categoryId: categoryInfo.categoryId,
        }
        setCoursePayload(payload);
        await fetchCoursesCategory(payload)
      })();
    }
  }, [categoryInfo, page, size])

  const fetchCoursesCategory = async (payload: any) => {
    const courses = await CategoryService.getFetchCoursesCategory(payload);
    setData(courses)
  }

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
              {
                /* 카테고리 4,5,6 뎁스 영역 */
                depth > 3 && (
                  <ContentsRow className={styles.search_area}>
                    <Dropdown className={styles.search_select} size="lg" options={topOptions} />
                    <Dropdown className={styles.search_select} size="lg" options={middleOptions} />
                    <Dropdown className={styles.search_select} size="lg" options={bottomOptions} />
                  </ContentsRow>
                )
              }

              <ContentsRow className={styles.search_input}>
                <Input
                  type="text"
                  placeholder="과정명 검색"
                  inputSize={'lg'}
                  showSearchIcon={false}
                  value={courseName}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}
                  onEnterKeyDown={() => handleOnSearch}
                />
                <Button
                  label={t('검색')}
                  variant={'primary'}
                  size={'lx'}
                  onClick={handleOnSearch}
                />
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
              <em>
                {
                  data.totalElements ? data.totalElements : 0
                }
              </em>개
            </span>
          </div>
          <div className={styles.right}>
            <Arrays className={styles.array} arraysData={arrays}></Arrays>
            <div className={styles.box}>
              <Popover
                popoverContent={
                  <div
                    className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}
                  >
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
              <Button
                onClick={() => {
                  setSortingDisabled(!sortingDisabled);
                }}
              >
                {sortingDisabled ? (
                  <IcoArray width={24} height={24} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={24} height={24} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {data.content && data.content.length > 0 ? (
          data.content.map((item: any) => <ThumnailList />)
        ) : (
          <div className={styles.empty}>
            <EmptyText
              text={t('검색 결과를 찾을 수 없습니다.')}
              description={t('다른 과정명으로 검색해 보세요.')}
            />
          </div>
        )}
      </div>

      {data && data.length > 0 && (
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
      )}
    </div>
  );
}
