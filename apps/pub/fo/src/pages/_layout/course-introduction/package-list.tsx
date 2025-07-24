import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { Button } from '@learnway/ui';
import { IcoArrowDown, IcoShare, IcoBell02 } from '@learnway/icons';

/* style */
import pageFullInner from '@learnway/styles/fo/widgets/layout/ui/container/page-full-inner.module.css';
import styles from './package-list.module.css';

/* images */
import aiImg from '@learnway/styles/fo/assets/images/menu/course/img_course_ai.png';

export const Route = createFileRoute('/_layout/course-introduction/package-list')({
  component: RouteComponent,
});

function RouteComponent() {
  // AI 자세히보기
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleClick = () => {
    setIsActive((prev) => !prev); // 상태 토글
  };

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
                      'AI 지식 스튜디오는 인공지능을 처음 접하는 초보자부터 실무 적용을 고민하는 전문가까지, 모두를 위한 AI 학습 채널입니다. 생성형 AI, 머신러닝, 데이터 분석, 프롬프트 엔지니어링 등 AI 지식 스튜디오는 인공지능을 처음 접하는 초보자부터 실무 적용을 고민하는 전문가까지, 모두를 위한 AI 학습 채널입니다. 생성형 AI, 머신러닝, 데이터 분석, 프롬프트 엔지니어링 등AI 지식 스튜디오는 인공지능을 처음 접하는 초보자부터 실무 적용을 고민하는 전문가까지, 모두를 위한 AI 학습 채널입니다. 생성형 AI, 머신러닝, 데이터 분석, 프롬프트 엔지니어링 등AI 지식 스튜디오는 인공지능을 처음 접하는 초보자부터 실무 적용을 고민하는 전문가까지, 모두를 위한 AI 학습 채널입니다. 생성형 AI, 머신러닝, 데이터 분석, 프롬프트 엔지니어링 등'
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
      <div>2222</div>
    </div>
  );
}
