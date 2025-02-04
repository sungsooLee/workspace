import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose, IcoArrowForward } from '@learnway/icons';
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
      subCategories: ['3dpth Category'],
    },
    {
      title: '마케팅 전략',
      link: '',
      subCategories: ['Market Analysis', 'SEO Planning'],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [isActive, setIsActive] = useState(false);

  const openCategory = () => {
    setIsActive(!isActive);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAll = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.start} ${styles.category_area}`}>
      <Button
        onlyIcon
        className={`${styles.btn_category} ${isActive ? styles.active : ''}`}
        onClick={openCategory}>
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
          <div className={styles.category_inner}>
            <div className={styles.tit_head}>
              <h2>기업경영</h2>
              <Button className={styles.btn_cate} onClick={toggleAll}>
                <IcoArrowForward width={16} height={16} stroke="#07287E" />
              </Button>
            </div>

            {/* 3dapth */}
            {categories.map((category, index) => (
              <div key={index} className={styles.depth_wrap}>
                <div className={styles.tit}>
                  <h3>{category.title}</h3>
                  <Button className={styles.btn_cate} onClick={() => toggleCategory(index)}>
                    <IcoArrowForward width={16} height={16} stroke="#07287E" />
                  </Button>
                </div>

                {/* openIndex 상태에 따라 열리고 닫힘 */}
                {openIndex === index && (
                  <div className={styles.depth_info}>
                    <ul>
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
  );
};

export const Category = memo(CategoryCompoment);
