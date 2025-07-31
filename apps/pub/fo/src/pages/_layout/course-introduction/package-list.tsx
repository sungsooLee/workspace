import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { IcoArrowDown, IcoShare, IcoBell02 } from '@learnway/icons';

/* style */
import pageFullInner from '@learnway/styles/fo/widgets/layout/ui/container/page-full-inner.module.css';
import styles from './package-list.module.css';

/* images */
import aiImg from '@learnway/styles/fo/assets/images/menu/course/img_course_ai.png';

/* tab contents */
import { CoursePackage } from './-contents/course-package';
import { Course } from './-contents/course';
import { CourseHome } from './-contents/course-home';
import { Tabs } from '@learnway/ui/tabs';
import { Button } from '@learnway/ui/button';

export const Route = createFileRoute('/_layout/course-introduction/package-list')({
  component: RouteComponent,
});

function RouteComponent() {
  // AI 자세히보기
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleClick = () => {
    setIsActive((prev) => !prev); // 상태 토글
  };

  // Tabs
  const items = [
    {
      title: '홈',
      key: 'menu1',
      content: <CourseHome />,
    },
    {
      title: '과정',
      key: 'menu2',
      content: <Course />,
    },
    {
      title: '패키지',
      key: 'menu3',
      content: <CoursePackage />,
    },
    {
      title: '공지사항',
      key: 'menu4',
      content: '추후작업',
    },
    {
      title: '커뮤니티',
      key: 'menu5',
      content: '추후작업',
    },
  ];

  return (
    <div className={cn(styles.start, styles.package_wrap)}>
      <div
        className={cn(
          pageFullInner.start,
          pageFullInner.bg_sec2,
          isMobile ? pageFullInner.inner_mobile : pageFullInner.inner,
        )}
      >
        <div className={pageFullInner.contents}>
          <div className={styles.ai_wrap}>
            <div className={styles.ai_explain_wrap}>
              <img src={aiImg} className={styles.img_logo} alt="" />
              <div className={styles.ai_copy_wrap}>
                <h3 className={styles.title}>{'AI 지식 스튜디오'}</h3>
                <div className={styles.ai_info}>
                  <span className={styles.ai_menu}>{'@AISTUDIO001'}</span>
                  <span>
                    {'구독자'} <em>{'5,477'}</em>명
                  </span>
                  <span>
                    {'과정'} <em>{'5,477'}</em>개
                  </span>
                </div>
                <div className={styles.detail_info}>
                  <p className={cn(styles.detail_text, isActive ? styles.ellipsis : null)}>
                    {
                      'AI 지식 스튜디오는 인공지능을 처음 접하는 초보자부터 실무 적용을 고민하는 전문가까지, 모두를 위한 AI 학습 채널입니다. AI 지식 스튜디오는 인공지능을 처음 접하는 초보자부터 실무 적용을 고민하는 전문가까지, 모두를 위한 AI 학습 채널입니다. '
                    }
                  </p>
                  <Button
                    label={isActive ? '자세히 보기' : '내용 접기'}
                    icon={<IcoArrowDown width={16} height={16} stroke="#131c30" />}
                    iconAlign={'right'}
                    className={cn(styles.btn_detail, isActive ? styles.active : null)}
                    onClick={handleClick}
                  />
                </div>
              </div>
            </div>
            {/* Notice */}
            <div className={styles.notice_wrap}>
              {!isMobile && <strong className={styles.notice_title}>{'Notice'}</strong>}
              <p className={styles.notice_text}>
                {'2025년 소비자는 무엇에 반응하는가’ 강의는 6월 26일 업로드 예정입니다.'}
              </p>
              <span className={styles.notice_date}>{'2025.06.25'}</span>
            </div>
            {/* Button */}
            <div className={styles.btn_wrap}>
              <Button
                onlyIcon={true}
                icon={<IcoShare width={20} height={20} stroke="#131416" />}
                size={'xl'}
                className={styles.btn_share}
              />
              <Button
                onlyIcon={true}
                size={'xl'}
                icon={<IcoBell02 width={20} height={20} stroke="#131416" />}
                className={styles.btn_alarm}
              />
              <Button
                variant={'primary'}
                size={'xl'}
                label={'구독'}
                className={styles.btn_subscribe}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabs_wrap}>
        <Tabs selectedTabKey={'menu3'} items={items} type="line" size={!isMobile ? 'xl2' : 'lg'} />
      </div>
    </div>
  );
}
