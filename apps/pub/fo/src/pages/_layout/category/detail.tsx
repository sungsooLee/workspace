import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { cn } from '@learnway/shared';
import { Select, Button, Pagination, Input, ContentsRow, Carousel } from '@learnway/ui';
import { Arrays, Filter, ThumnailList } from '../../../features/layout';
import { Navigation } from 'swiper/modules';
import { IcoArray, IcoDotpoints } from '@learnway/icons';
import styles from './detail.module.css';

// 예시 이미지
import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';

export const Route = createFileRoute('/_layout/category/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  // 상단 배너 스와이퍼
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

  // pagenation
  const [page, setPage] = React.useState(1);
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

  return (
    <div className={styles.start}>
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
              <Select
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
              <Select
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '중분류' },
                  { value: 'b', label: 'NE PE(2024)' },
                  { value: 'c', label: 'NE(2021)' },
                ]}
              />
              <Select
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
            <Filter></Filter>
          </li>
        </ul>
      </div>

      <div className={styles.lists_wrap}>
        <p className={styles.search_text}>“파파파파”의 검색결과</p>

        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            <Arrays className={styles.array}></Arrays>
            <div className={styles.box}>
              <Select
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
            </div>
          </div>
        </div>

        {/* 가로형 */}
        <div className={cn(styles.list)}>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
          <ThumnailList direction=""></ThumnailList>
        </div>

        {/* 세로형 */}
        <div className={cn(styles.list, styles.horizontal)}>
          <ThumnailList direction="horizontal"></ThumnailList>
          <ThumnailList direction="horizontal"></ThumnailList>
          <ThumnailList direction="horizontal"></ThumnailList>
          <ThumnailList direction="horizontal"></ThumnailList>
        </div>
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
