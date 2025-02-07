import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoMenu01, IcoXclose, IcoArrowDown, IcoArrowForward } from '@learnway/icons';
import { Button, Popover } from '@learnway/ui';
import styles from './category.module.css';
import { RecentVisits } from './recent_visits';
import bnrImage1 from '../../../assets/images/banner/banner_cate1.png';
import bnrImage2 from '../../../assets/images/banner/banner_cate2.png';

const PopoverContent = () => {
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
    <div className={`${styles.start} ${styles.category_area}`}>
      <div className={styles.category}>
        {/* 최근방문 */}
        <RecentVisits />

        {/* 카테고리 영역 */}
        <div className={styles.category_container}>
          {/* 카테고리 영역 - 좌측메뉴 */}
          <div className={styles.category_menu}>
            <div className={styles.menu_list_wrap}>
              <div className={styles.menu_list}>
                {/* 카테고리 영역 - 좌측메뉴(sec1) - sec1~sec3 loop */}
                <div className={`${styles.menu_section} ${styles.sec1}`}>
                  <ul className={styles.list}>
                    <li>
                      <Button className={styles.active}>
                        <span>리더십/비즈스킬</span>
                        <i>
                          <IcoArrowForward width={16} height={16} stroke="#07287E" />
                        </i>
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
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec2) */}
                <div className={`${styles.menu_section} ${styles.sec2}`}>
                  <ul className={styles.list}>
                    <li>
                      <Button>
                        <span>경영/기획</span>
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <span>마케팅 및 세일즈마케팅 및 세일즈 메케팅 및 세일즈</span>
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <span>생산</span>
                      </Button>
                    </li>
                  </ul>
                </div>

                {/* 카테고리 영역 - 좌측메뉴(sec3) */}
                <div className={`${styles.menu_section} ${styles.sec3}`}>
                  <ul className={styles.list}>
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

                {/* 카테고리 영역 - 좌측메뉴(sec4) */}
                <div className={`${styles.menu_section} ${styles.sec1}`}>
                  <ul className={styles.list}>
                    <li>
                      <Button>
                        <span>리더십/비즈스킬</span>
                      </Button>
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
              <h2>
                <Link to={''}>기업경영</Link>
              </h2>
              <Button
                onClick={categoryAll}
                className={`${styles.btn_cate} ${isAllOpen ? styles.active : ''}`}>
                <IcoArrowDown width={16} height={16} stroke="#07287E" />
              </Button>
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
                            <Link to={sub.link}>{sub.name}</Link>
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

const CategoryCompoment = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.start}>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        popoverContent={<PopoverContent />}
        className={`${styles.btn_category} ${isOpen ? styles.active : ''}`}>
        {isOpen ? (
          <IcoXclose width={24} height={24} stroke="#ffffff" />
        ) : (
          <IcoMenu01 width={24} height={24} stroke="#131C30" />
        )}
      </Popover>
    </div>
  );
};

export const Category = memo(CategoryCompoment);
