import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Navigation } from 'swiper/modules';

import { Carousel, ContentsRow, Input, Pagination, Dropdown } from '@learnway/ui';
import styles from '@learnway/styles/fo/pages/_layout/category/category.module.css';
import { cn } from '@learnway/shared';

import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';
import { Filter } from '../../../features/category/ui/category-filter/category-filter';

export const Route = createFileRoute('/_layout/_category/category')({
  component: RouteComponent,
});

function RouteComponent() {
  // const { categoryId } = Route.useParams();
  const { state } = Route.useRouteContext();
  console.log('state', state);

  const items = [
    <Link to="">
      <img src={bnrCImage1} alt="" />
    </Link>,
    <Link to="">
      <img src={bnrCImage2} alt="" />
    </Link>,
    <Link to="">
      <img src={bnrCImage1} alt="" />
    </Link>,
  ];

  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [listUi, setListUi] = useState('type');
  const list_ui = () => {
    if (listUi === 'type') {
      setListUi('type2');
    } else {
      setListUi('type');
    }
  };

  const handleFilterOptionChange = (options: any) => {
    // 카테고리 필터 변경되면 검색 API 호출
  };

  return (
    <div className={styles.start}>
      {/* ■ 마케팅 영역 
어드민에서 1,2 Depth 화면에서만 노출/비노출 설정 가능*/}
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
              {/*
              카테고리 4,5,6 뎁스 영역
              */}
              <Dropdown
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '대분류' },
                  { value: 'b', label: 'ST1' },
                  { value: 'c', label: '아이오닉 6' },
                  { value: 'd', label: '아이오닉 5' },
                  { value: 'e', label: '코나' },
                  { value: 'f', label: '넥쏘' },
                  { value: 'g', label: '포터' },
                  { value: 'h', label: '캐스퍼' },
                ]}
              />
              <Dropdown
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '중분류' },
                  { value: 'b', label: 'NE PE(2024)' },
                  { value: 'c', label: 'NE(2021)' },
                ]}
              />
              <Dropdown
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '소분류' },
                  { value: 'b', label: '상품정보' },
                  { value: 'c', label: '기술정보' },
                ]}
              />
              <ContentsRow className={styles.search}>
                <Input id="" type="text" placeholder="과정명 검색" showSearchIcon={true} />
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
            {/* <Arrays className={styles.array}></Arrays>
            <div className={styles.box}>
              <Dropdown
                options={[
                  { value: '20', label: '20개씩' },
                  { value: '50', label: '50개씩' },
                  { value: '80', label: '80개씩' },
                ]}
              />
            </div>
            <div className={styles.box}>
              <Button onClick={list_ui}>
                {listUi === 'type2' ? (
                  <IcoArray width={24} height={24} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={24} height={24} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div> */}
          </div>
        </div>

        {/* <ThumnailList className={styles.list} listUi={listUi}></ThumnailList> */}
      </div>

      <Pagination
        className={cn(styles.pagenation, styles.paginationItem)}
        count={3}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
