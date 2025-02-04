import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose, IcoArrowDown, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';
import styles from './category.module.css';
import { RecentVisits } from './recent_visits';
import bnrImage1 from '../../../assets/images/banner/banner_cate1.png';
import bnrImage2 from '../../../assets/images/banner/banner_cate2.png';

const CategoryCompoment = () => {
  const categories = [
    {
      title: '경영전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category',
        '3dpth Category3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: [
        '3dpth Category',
        '3dpth Category 3dpth Category3dpth Category3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
        '3dpth Category',
      ],
    },
  ];

  const [isActive, setIsActive] = useState(false);

  const toggleCategory = () => {
    setIsActive(!isActive);
  };

  // 각 카테고리의 열림/닫힘 상태를 배열로 관리
  const [openStates, setOpenStates] = useState(categories.map(() => false));

  // 모든 카테고리가 열려있는지 확인
  const isAllOpen = openStates.every((state) => state);

  // 전체 열기/닫기
  const categoryAll = () => {
    setOpenStates(categories.map(() => !isAllOpen));
  };

  // 개별 열기/닫기
  const categoryDepth = (index) => {
    setOpenStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <Button
        onlyIcon
        className={`${styles.btn_category} ${isActive ? styles.active : ''}`}
        onClick={toggleCategory}>
        {isActive ? (
          <IcoXclose width={24} height={24} stroke="#ffffff" />
        ) : (
          <IcoMenu01 width={24} height={24} stroke="#131C30" />
        )}
      </Button>

      {/* 카테고리 전체 메뉴 */}
      <div className={`${styles.category} ${isActive ? styles.active : ''}`}>
        {/* 최근방문 */}
        <RecentVisits />

        {/* 카테고리 영역 */}
        <div className={styles.category_container}>
          {/* 카테고리 영역 - 좌측메뉴 */}
          <div className={styles.category_menu}>
            <h2>
              <Link to={''} className={styles.tit}>
                기업경영
              </Link>
              <i>
                <IcoArrowForward width={16} height={16} stroke="#07287E" />
              </i>
            </h2>

            <div className={styles.menu_list_wrap}>
              <div className={styles.menu_list}>
                {/* 카테고리 영역 - 좌측메뉴(sec1) - sec1~sec3 loop */}
                <div className={`${styles.menu_section} ${styles.sec1}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={''}>리더십/비즈스킬</Link>
                    </li>
                    <li>
                      <Link to={''}>어학</Link>
                    </li>
                    <li>
                      <Link to={''}>IT</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec2) */}
                <div className={`${styles.menu_section} ${styles.sec2}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={''}>경영/기획</Link>
                    </li>
                    <li>
                      <Link to={''}>고객 서비스</Link>
                    </li>
                    <li>
                      <Link to={''}>마케팅 및 세일즈마케팅 및 세일즈 메케팅 및 세일즈</Link>
                    </li>
                    <li>
                      <Link to={''}>생산</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec3) */}
                <div className={`${styles.menu_section} ${styles.sec3}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={''}>서비스</Link>
                    </li>
                    <li>
                      <Link to={''}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={''}>품질</Link>
                    </li>
                    <li>
                      <Link to={''}>서비스</Link>
                    </li>
                    <li>
                      <Link to={''}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={''}>품질</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec4) */}
                <div className={`${styles.menu_section} ${styles.sec1}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={''}>리더십/비즈스킬</Link>
                    </li>
                    <li>
                      <Link to={''}>어학</Link>
                    </li>
                    <li>
                      <Link to={''}>IT</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec5) */}
                <div className={`${styles.menu_section} ${styles.sec2}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={''}>경영/기획</Link>
                    </li>
                    <li>
                      <Link to={''}>고객 서비스</Link>
                    </li>
                    <li>
                      <Link to={''}>마케팅 및 세일즈마케팅 및 세일즈 메케팅 및 세일즈</Link>
                    </li>
                    <li>
                      <Link to={''}>생산</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec6) */}
                <div className={`${styles.menu_section} ${styles.sec3}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={''}>서비스</Link>
                    </li>
                    <li>
                      <Link to={''}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={''}>품질</Link>
                    </li>
                    <li>
                      <Link to={''}>서비스</Link>
                    </li>
                    <li>
                      <Link to={''}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={''}>품질</Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.banner_list}>
                  <Link to={''} className={styles.banner}>
                    <img src={bnrImage1} alt="" />
                  </Link>
                  <Link to={''} className={styles.banner}>
                    <img src={bnrImage2} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 카테고리 영역 - 뎁스영역 */}
          <div className={`${styles.category_inner} ${isAllOpen ? styles.active : ''}`}>
            <div className={styles.tit_head}>
              <h2>기업경영</h2>
              <Button className={styles.btn_cate} onClick={categoryAll}>
                <IcoArrowDown width={16} height={16} stroke="#07287E" />
              </Button>
            </div>

            <div className={styles.depth_area}>
              {/* 3dapth */}
              {categories.map((category, index) => (
                <div key={index} className={styles.depth_wrap}>
                  <div className={styles.tit}>
                    <h3>{category.title}</h3>
                    <Button className={styles.btn_cate} onClick={() => categoryDepth(index)}>
                      <IcoArrowDown width={16} height={16} stroke="#A9AFB8" />
                    </Button>
                  </div>

                  {openStates[index] && (
                    <div className={styles.depth_info}>
                      <ul className={styles.list}>
                        {category.subCategories.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link to={category.link}>{sub}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Category = memo(CategoryCompoment);
