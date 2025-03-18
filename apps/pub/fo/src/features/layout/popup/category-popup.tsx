import React, { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui';
import { Button, Chip } from '@learnway/ui';
import { Navigation } from 'swiper/modules';

import { IcoArrowDown, IcoArrowForward } from '@learnway/icons';

import bnrImage1 from '../../../assets/images/banner/banner_cate1.png';
import bnrImage2 from '../../../assets/images/banner/banner_cate2.png';

import styles from './category-popup.module.css';

const CategoryPopupComponent = () => {
  // 상단 배너 스와이퍼
  const items = [
    <Chip option={{ label: '기업경영', value: 'a' }} />,
    <Chip option={{ label: 'Ai교육', value: 'b' }} />,
    <Chip option={{ label: 'IT', value: 'c' }} />,
    <Chip option={{ label: '마케팅', value: 'd' }} />,
    <Chip option={{ label: '경영/기획', value: 'e' }} />,
  ];

  const categories = [
    {
      title: '경영전략',
      link: '', // 타이틀 링크 추가
      subCategories: [
        { name: '3dpth Category', link: '' },
        { name: '3dpth Category', link: '' },
        { name: '3dpth Category', link: '' },
        { name: '3dpth Category', link: '' },
      ],
    },
    {
      title: '경영전략',
      link: '', // 타이틀 링크 추가
      subCategories: [{ name: '3dpth Category', link: '' }],
    },
  ];

  // 각 카테고리의 열림/닫힘 상태를 배열로 관리
  const [openStates, setOpenStates] = useState(categories.map(() => false));

  // 모든 카테고리가 열려있는지 확인
  const isAllOpen = openStates.every((state) => state);

  // 전체 열기/닫기
  const categoryAll = () => {
    setOpenStates(categories.map(() => !isAllOpen));
  };

  // 개별 열기/닫기
  const categoryDepth = (index: number) => {
    setOpenStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <div className={styles.start}>
      <div className={styles.swiper}>
        <Carousel
          items={items}
          slidesPerView={'auto'}
          className={styles.category_carousel}
          spaceBetween={8}
          modules={[Navigation]}
          navigation={true}
        />
      </div>

      {/* 카테고리 영역 */}
      <div className={styles.category_wrap}>
        {/* 카테고리 영역 - 좌측메뉴 */}
        <div className={styles.menu_list_wrap}>
          <div className={styles.scroll_box}>
            {/* list 1 */}
            <ul className={`${styles.menu_list} ${styles.sec1}`}>
              <li>
                {/* 버튼 활성화 시 active 추가 */}
                <Button className={styles.active}>
                  <span>기업경영</span>
                  <IcoArrowForward
                    className={styles.ico_arrow}
                    width={16}
                    height={16}
                    stroke="#07287E"
                  />
                </Button>
              </li>
              <li>
                <Button>
                  <span>리더십/비즈스킬</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>어학</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>IT</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>HR/총무</span>
                </Button>
              </li>
            </ul>

            {/* list 2 */}
            <ul className={`${styles.menu_list} ${styles.sec2}`}>
              <li>
                <Button>
                  <span>경영/기획</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>고객 서비스</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>마케팅 및 세일즈</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>법무/보안</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>생산</span>
                </Button>
              </li>
            </ul>

            {/* list 3 */}
            <ul className={`${styles.menu_list} ${styles.sec3}`}>
              <li>
                <Button>
                  <span>서비스</span>
                </Button>
              </li>
              <li>
                <Button>
                  <span>연구개발</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* 카테고리 영역 - 뎁스영역 */}
        <div className={styles.category_inner}>
          <div className={styles.scroll_box}>
            <div className={styles.tit_head}>
              <h2>
                <Link to="" className={styles.tit}>
                  기업경영
                </Link>
                <Button
                  onClick={categoryAll}
                  className={`${styles.btn_cate} ${isAllOpen ? styles.active : ''}`}>
                  <IcoArrowDown width={16} height={16} stroke="#07287E" />
                </Button>
              </h2>
            </div>

            <div className={styles.depth_area}>
              {/* 3dapth */}
              {categories.map((category, index) => (
                <div key={index} className={styles.depth_wrap}>
                  <div className={styles.tit}>
                    <h3>
                      <Link to={category.link}>{category.title}</Link>
                    </h3>
                    <Button
                      className={`${styles.btn_cate} ${openStates[index] ? styles.active : ''}`}
                      onClick={() => categoryDepth(index)}>
                      <IcoArrowDown width={16} height={16} stroke="#A9AFB8" />
                    </Button>
                  </div>

                  {!openStates[index] && (
                    <div className={styles.depth_info}>
                      <ul className={styles.list}>
                        {category.subCategories.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link className={styles.txt} to={sub.link}>
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.banner_box}>
              <Link to="" className={styles.banner_link}>
                <img src={bnrImage1} />
              </Link>
              <Link to="" className={styles.banner_link}>
                <img src={bnrImage2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryPopup = memo(CategoryPopupComponent);
