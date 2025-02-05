import { useState } from 'react';
import { useCategories } from '../services/category.service';
import { CategoryBadgeList } from './category-badge-list';
import { CategoryNavigation } from './category-navigation';
import { CategoryDetail } from './category-detail';
import styles from './category-layer.module.css';
import { Link } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose, IcoArrowDown, IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui';

import bnrImage1 from '../../../assets/images/banner/banner_cate1.png';
import bnrImage2 from '../../../assets/images/banner/banner_cate2.png';

interface CategoryLayerProps {
  isOpen: boolean;
}

export function CategoryLayer({ isOpen }: CategoryLayerProps) {
  const { data: categories } = useCategories();
  const [selectedDepth1, setSelectedDepth1] = useState<number | null>(null);

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <div className={`${styles.category} ${isOpen ? styles.active : ''}`}>
        <CategoryBadgeList />
        {/* <div className="flex flex-1">
        <div className="w-60 bg-blue-900">
          <CategoryNavigation
            categories={categories}
            selectedId={selectedDepth1}
            onSelect={setSelectedDepth1}
          />
        </div>

        <div className="flex-1">
          <CategoryDetail categories={categories} selectedDepth1={selectedDepth1} />
        </div>
      </div> */}

        <div className={styles.category_container}>
          {/* 카테고리 영역 - 좌측메뉴 */}
          <div className={styles.category_menu}>
            <h2>
              <Link to={'/'} className={styles.tit}>
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
                      <Link to={'/'}>리더십/비즈스킬</Link>
                    </li>
                    <li>
                      <Link to={'/'}>어학</Link>
                    </li>
                    <li>
                      <Link to={'/'}>IT</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec2) */}
                <div className={`${styles.menu_section} ${styles.sec2}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={'/'}>경영/기획</Link>
                    </li>
                    <li>
                      <Link to={'/'}>고객 서비스</Link>
                    </li>
                    <li>
                      <Link to={'/'}>마케팅 및 세일즈마케팅 및 세일즈 메케팅 및 세일즈</Link>
                    </li>
                    <li>
                      <Link to={'/'}>생산</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec3) */}
                <div className={`${styles.menu_section} ${styles.sec3}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={'/'}>서비스</Link>
                    </li>
                    <li>
                      <Link to={'/'}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={'/'}>품질</Link>
                    </li>
                    <li>
                      <Link to={'/'}>서비스</Link>
                    </li>
                    <li>
                      <Link to={'/'}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={'/'}>품질</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec4) */}
                <div className={`${styles.menu_section} ${styles.sec1}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={'/'}>리더십/비즈스킬</Link>
                    </li>
                    <li>
                      <Link to={'/'}>어학</Link>
                    </li>
                    <li>
                      <Link to={'/'}>IT</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec5) */}
                <div className={`${styles.menu_section} ${styles.sec2}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={'/'}>경영/기획</Link>
                    </li>
                    <li>
                      <Link to={'/'}>고객 서비스</Link>
                    </li>
                    <li>
                      <Link to={'/'}>마케팅 및 세일즈마케팅 및 세일즈 메케팅 및 세일즈</Link>
                    </li>
                    <li>
                      <Link to={'/'}>생산</Link>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec6) */}
                <div className={`${styles.menu_section} ${styles.sec3}`}>
                  <ul className={styles.list}>
                    <li>
                      <Link to={'/'}>서비스</Link>
                    </li>
                    <li>
                      <Link to={'/'}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={'/'}>품질</Link>
                    </li>
                    <li>
                      <Link to={'/'}>서비스</Link>
                    </li>
                    <li>
                      <Link to={'/'}>연구개발</Link>
                    </li>
                    <li>
                      <Link to={'/'}>품질</Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.banner_list}>
                  <Link to={'/'} className={styles.banner}>
                    <img src={bnrImage1} alt="" />
                  </Link>
                  <Link to={'/'} className={styles.banner}>
                    <img src={bnrImage2} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 카테고리 영역 - 뎁스영역 */}
          <div className={styles.category_inner}>
            {/* <div className={styles.tit_head}>
            <h2>기업경영</h2>
            <Button
              onClick={categoryAll}
              className={`${styles.btn_cate} ${isAllOpen ? styles.active : ''}`}>
              <IcoArrowDown width={16} height={16} stroke="#07287E" />
            </Button>
          </div> */}

            {/* <div className={styles.depth_area}>
            {categories.map((category, index) => (
              <div key={index} className={styles.depth_wrap}>
                <div className={styles.tit}>
                  <h3>{category.title}</h3>
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
                          <Link to={category.link}>{sub}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
