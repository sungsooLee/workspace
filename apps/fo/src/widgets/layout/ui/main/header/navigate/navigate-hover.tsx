import { memo, useRef, useEffect, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';
import styles from './navigate-hover.module.css';

interface NavigateHoverComponentProps {
  onClose: () => void;
  isOpen: boolean;
}

function NavigateHoverComponent({ isOpen, onClose }: NavigateHoverComponentProps) {
  const router = useRouter();
  const menuData = [
    {
      title: '교육제도',
      link: '/',
      subMenu: [
        { title: '금융자격지원제도', link: '/' },
        { title: 'SPA 승진제도', link: '/' },
      ],
    },
    {
      title: '학습계획',
      link: '',
      subMenu: [
        { title: '진단', link: '' },
        { title: '계획수립', link: '' },
      ],
    },
    {
      title: 'HMCP',
      link: '',
      subMenu: [
        { title: '안내', link: '' },
        { title: '시험결과', link: '' },
      ],
    },
    {
      title: '채널',
      link: '/',
    },
    {
      title: '나의학습',
      link: '',
      subMenu: [
        { title: '학습현황', link: '' },
        { title: '학습노트', link: '' },
        { title: '학습실적', link: '' },
        { title: '학습이력', link: '' },
        { title: '나의활동', link: '' },
        { title: '배지', link: '' },
        { title: '설문', link: '' },
        { title: '평가', link: '' },
        { title: '결재함', link: '' },
      ],
    },
    {
      title: '팀현황',
      link: '',
      subMenu: [
        { title: '팀결재함', link: '' },
        { title: '팀진단현황', link: '' },
        { title: '팀계획수립', link: '' },
        { title: '팀학습현황', link: '' },
        { title: '팀학습이력', link: '' },
        { title: '팀학습실적', link: '' },
        { title: '팀교육지원현황', link: '' },
        { title: '팀어학점수', link: '' },
        { title: '팀자격증현황', link: '' },
      ],
    },
    {
      title: '교육지원',
      link: '',
      subMenu: [
        { title: '공지', link: '' },
        { title: 'FAQ', link: '' },
        { title: 'Q&A', link: '' },
        { title: '강의장예약', link: '' },
        { title: '교육비지원', link: '' },
        { title: '출강신청', link: '' },
        { title: '교육/채널요청', link: '' },
        { title: '1:1문의', link: '' },
      ],
    },
    {
      title: '커뮤니티',
      link: '',
      subMenu: [
        { title: '러닝맵', link: '' },
        { title: '지식공유', link: '' },
        { title: 'OJT', link: '' },
        { title: '코칭', link: '' },
        { title: '교육비지원', link: '' },
      ],
    },
  ];

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      onClose();
    });
  }, [router.history, onClose]);

  return (
    <div className={`${styles.start} ${styles.menu_all} ${isOpen ? styles.active : ''}`}>
      <div className={styles.menu_inner}>
        {menuData.map((menu, index) => (
          <div key={index} className={styles.menu_div}>
            <div className={styles.menu_list}>
              <h2 className={styles.tit}>
                {menu.link ? (
                  <Link to={menu.link}>
                    <span>{menu.title}</span>
                    <IcoArrowForward width={16} height={16} stroke="#6F798B" />
                  </Link>
                ) : (
                  <span>{menu.title}</span>
                )}
              </h2>

              {menu.subMenu && menu.subMenu.length > 0 && (
                <ul className={styles.list}>
                  {menu.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.link}>{subItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const NavigateHover = memo(NavigateHoverComponent);
