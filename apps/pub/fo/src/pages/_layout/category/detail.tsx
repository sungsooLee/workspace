import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { cn } from '@learnway/shared';
import { Select, Button, Pagination, Input, ContentsRow, Carousel, EmptyText } from '@learnway/ui';
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

  // list (가로형, 세로형) 변경
  const [listUi, setListUi] = useState('vertical');
  const list_ui = () => {
    if (listUi === 'vertical') {
      setListUi('horizontal'); // 가로형
    } else {
      setListUi('vertical'); // 세로형
    }
  };

  // 퍼블수정 20250313 : 리스트 소팅 조건 값들 (최신순, 과정명순, 조회순) 넣기
  const arrays = {
    items: ['최신순', '과정명순', '조회순'],
    initialSelectedItem: 0, // 초기 선택값
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
            {/* 퍼블수정 20250313 : arraysData 데이터 삽입 */}
            <Arrays arraysData={arrays} className={styles.array}></Arrays>
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
                {/* 퍼블수정 20250313 : 아이콘 사이즈 수정 */}
                {listUi === 'horizontal' ? (
                  <IcoArray width={20} height={20} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={20} height={20} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* 검색결과 있음 */}
        <div className={styles.list}>
          <div className={cn(styles.list_box, styles[listUi])}>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
            <ThumnailList direction={listUi}></ThumnailList>
          </div>

          {/* pagination */}
          <Pagination
            className={cn(styles.pagenation, styles.paginationItem)}
            count={3}
            page={page}
            onChange={handlePageChange}
          />
        </div>

        {/* 검색결과 없음 */}
        <div className={styles.empty}>
          <EmptyText
            text={'검색 결과를 찾을 수 없습니다.'}
            description={'다른 과정명으로 검색해 보세요.'}
          />
        </div>
      </div>
    </div>
  );
}
