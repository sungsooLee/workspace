import React, { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { Button, Chip, ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';
import { Navigation } from 'swiper/modules';

import { IcoArrowUp, IcoArrowForward, IcoArrowBackward } from '@learnway/icons';

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

  type SubItem = { id: number; label: string; link: string };
  type MenuItem = { id: number; label: string; subItems?: SubItem[]; link: string };

  const menuData: MenuItem[] = [
    {
      id: 1,
      label: '경영전략 1',
      link: '',
      subItems: [
        { id: 101, label: '3Depth', link: '' },
        { id: 102, label: '3Depth-1', link: '' },
      ],
    },
    { id: 2, label: '경영전략 2', link: '' }, // 3depth 없음
    {
      id: 3,
      label: '경영전략 3',
      link: '',
      subItems: [
        { id: 301, label: '3Depth', link: '' },
        { id: 302, label: '3Depth-1', link: '' },
      ],
    },
  ];

  const firstMenuWithSub = menuData.find((item) => item.subItems)?.id ?? null;
  const [openId, setOpenId] = useState<number | null>(firstMenuWithSub);

  const handleClick = (id: number, hasSub: boolean) => {
    if (!hasSub) return;
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <ModalContainer>
      <ModalTitle>{'학습테마'}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          {/* 카테고리 영역 */}
          <div className={styles.category_wrap}>
            {/* 카테고리 영역 - 좌측메뉴 */}
            <div className={styles.menu_list_wrap}>
              <div className={styles.scroll_box}>
                <ul className={styles.menu_list}>
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
                <ul className={styles.menu_list}>
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
                <ul className={styles.menu_list}>
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
                <div className={styles.depth_area}>
                  {menuData.map(({ id, label, subItems, link }) => (
                    <div key={id} className={styles.menu_item}>
                      <div
                        className={cn(
                          styles.menu_title,
                          subItems && openId === id ? styles.active : '',
                        )}
                      >
                        <Link to={link}>{label}</Link>
                        {subItems && (
                          <Button
                            className={styles.btn_cate}
                            onClick={() => handleClick(id, !!subItems)}
                            icon={<IcoArrowUp />}
                          />
                        )}
                      </div>

                      {subItems && openId === id && (
                        <div className={styles.sub_menu}>
                          {subItems.map((sub) => (
                            <div key={sub.id} className={styles.sub_menu_item}>
                              <Link to={sub.link}>{sub.label}</Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.swiper}>
            <Carousel
              items={items}
              slidesPerView={'auto'}
              className={styles.category_carousel}
              spaceBetween={8}
              modules={[Navigation]}
              showNavigation={true}
              prevIcon={<IcoArrowBackward />}
              nextIcon={<IcoArrowForward />}
            />
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CategoryPopup = memo(CategoryPopupComponent);
