import React, { FC, useEffect, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Navigation } from 'swiper/modules';
import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from '@learnway/styles/fo/pages/_layout/category/category.module.css';
import { cn } from '@learnway/shared';
import { Filter } from '@features/category/ui/category-filter';
import { Arrays } from '@features/layout';
import { t } from 'i18next';

import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';
import { IcoArray, IcoArrowDown, IcoDotpoints } from '@learnway/icons';
import { useFetchCategoryDetail } from '@entities/category';
import CategoryService from '@entities/category/api/category';
import { CategoryDetailComponentProps } from '@pages/_layout/_category/category';

import { Carousel } from '@learnway/ui/carousel';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Dropdown } from '@learnway/ui/dropdown';
import { Input } from '@learnway/ui/input';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';
import { EmptyText } from '@learnway/ui/empty-text';
import { Pagination } from '@learnway/ui/pagination';
import { ThumbnailList } from '@shared/ui/thumnail/list/thumbnail-list';

// 4,5,6 뎁스 일 때 사용하는 더미 데이터
const topOptions = (
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
const middleOptions = (
  [
    { value: 'a', label: '중분류' },
    { value: 'b', label: 'NE PE(2024)' },
    { value: 'c', label: 'NE(2021)' },
  ]
);
const bottomOptions = (
  [
    { value: 'a', label: '소분류' },
    { value: 'b', label: '상품정보' },
    { value: 'c', label: '기술정보' },
  ]
);
// 배너 관리 더미 데이터
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

const CategoryDetailComponent: FC<any> = ({categoryId} : CategoryDetailComponentProps) => {
  const { data: categoryInfo } = useFetchCategoryDetail(categoryId);

  const [depth, setDepth] = useState(3);
  const [page, setPage] = useState(0);
  const [size , setSize] = useState(20);
  const [sorting, setSorting] = useState(['createdDate,DESC']);
  const [courseName, setCourseName] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [coursePayload, setCoursePayload] = useState({
    page, size, sort: sorting, categoryId, courseName
  });
  const [data, setData] = useState<any>({});
  const [sortingDisabled, setSortingDisabled] = useState(true);

  const arrays = {
    items: [t('최신순'), t('과정명순'), t('조회순')],
    initialSelectedItem: 0, // 초기 선택값
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };
  const handlePageSizeChange = async (value: number) => {
    setSize(value)
    setPage(0);
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
    setSearchResult(courseName)
  }

  const handleSearchSortable = async (sortingIdx: any) => {
    const payload = {
      ...coursePayload,
    }
    switch (sortingIdx) {
      case 1:
        setSorting(['courseName']);
        payload.sort = ['courseName'];
        setCoursePayload(payload)
        break;
      case 2:
        setSorting(['likeCount,DESC']);
        payload.sort = ['likeCount,DESC'];
        setCoursePayload(payload)
        break;
      default:
        setSorting(['createdDate,DESC']);
        payload.sort = ['createdDate,DESC'];
        setCoursePayload(payload)
        break;
    }

    await fetchCoursesCategory(payload)
  }

  useEffect(() => {
    if( categoryInfo ) {
      (async () => {
        console.log('### categoryInfo => ', categoryInfo);
        const payload = {
          ...coursePayload,
          page, size,
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
            {/* 수강신청 필터는 '이러닝1, 라이브, 설문' 일때는 비표시 */}
            <Filter onOptionChange={handleFilterOptionChange} />
          </li>
        </ul>
      </div>

      <div className={styles.lists_wrap}>
        {searchResult !== '' && (
          <p className={styles.search_text}>
            “{searchResult}”{t('의 검색결과')}
          </p>
        )}
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>{data.totalElements ? data.totalElements : 0}</em>개
            </span>
          </div>
          <div className={styles.right}>
            <Arrays
              className={styles.array}
              arraysData={arrays}
              onChange={handleSearchSortable}
            ></Arrays>
            <div className={styles.box}>
              <Popover
                popoverContent={
                  <div
                    className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}
                  >
                    <Popover.Close onClick={() => handlePageSizeChange(20)}>
                      {20 + t('개씩')}
                    </Popover.Close>
                    <Popover.Close onClick={() => handlePageSizeChange(50)}>
                      {50 + t('개씩')}
                    </Popover.Close>
                    <Popover.Close onClick={() => handlePageSizeChange(80)}>
                      {80 + t('개씩')}
                    </Popover.Close>
                  </div>
                }
                className={cn(dropdownPopoverStyles.btn, dropdownPopoverStyles.text)}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{size + t('개씩')}</span>
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
          <ThumbnailList
            direction={sortingDisabled ? 'vertical' : 'horizontal'}
            items={data.content}
            cols={sortingDisabled ? 4 : 2}
          />
        ) : (
          <div className={styles.empty}>
            <EmptyText
              text={t('검색 결과를 찾을 수 없습니다.')}
              description={t('다른 과정명으로 검색해 보세요.')}
            />
          </div>
        )}
      </div>

      {data.content && data.content.length > 0 && (
        <Pagination
          className={cn(styles.pagenation, styles.paginationItem)}
          pageNumber={page}
          totalPages={data.totalPages}
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

export const CategoryDetail = CategoryDetailComponent;
