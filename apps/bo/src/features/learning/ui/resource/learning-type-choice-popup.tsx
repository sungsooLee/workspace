import {
  IcoBlog,
  IcoEntrust,
  IcoEtc,
  IcoHtml,
  IcoImage01,
  IcoInfoCircle,
  IcoMybook,
  IcoVideo01,
  IcoVideo02,
} from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { Button, useModal } from '@learnway/ui';
import { ReactNode, useState } from 'react';
import { LEARNING_TYPE } from '@learnway/config';
import clsx from 'clsx';

// 학습 유형 선택 팝업 컴포넌트
const LearningTypeChoicePopupComponent = () => {
  const { close, alert } = useModal();
  // 현재 활성화된 학습 유형의 상태를 관리 (기본값으로 learningTypes 배열의 첫 번째 학습 유형 사용)
  const [activeType, setActiveType] = useState(learningTypes[0].type);

  /**
   * 학습 유형을 선택하고 선택된 유형에 따라 추가 로직을 실행합니다.
   *
   * @param {LEARNING_TYPE} type - 선택된 학습 유형.
   */
  const handleChoiceLearningType = (type: LEARNING_TYPE) => {
    if (type === LEARNING_TYPE.E_BOOK) {
      console.log('pop');
    }
    close(type);
  };

  return (
    <div className={styles.wrap}>
      {/* 팝업의 타이틀 영역 */}
      <h2 className={styles.title}>{'등록할 학습자원의 유형을 선택하세요.'}</h2>

      {/* 학습 유형 선택 영역 */}
      <div className={styles.select_wrap}>
        {learningTypes.map((learningType, idx) => (
          <Button
            key={idx} // 각 Button 컴포넌트에 고유한 key 값을 부여
            onMouseEnter={() => setActiveType(learningType.type)} // 마우스를 올릴 때 활성화 상태 변경
            className={clsx(styles.select_item, {
              [styles.active]: activeType === learningType.type,
            })} // 동적 클래스 추가
            onClick={() => handleChoiceLearningType(learningType.type)} // 버튼 클릭 시 학습 유형 선택 로직 실행
          >
            {/* 학습 유형 아이콘 */}
            {learningType.icon}
            {/* 학습 유형 제목 */}
            <strong className={styles.select_title}>{learningType.title}</strong>
            {/* 학습 유형 설명 */}
            <p className={styles.select_text}>{learningType.text}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

// 해당 컴포넌트를 외부에서 사용할 수 있도록 export
export const LearningTypeChoicePopup = LearningTypeChoicePopupComponent;

// 학습 유형 데이터 리스트
// 각 학습 유형마다 제목, 설명, 아이콘, 유형(type)을 포함
const learningTypes: { title: string; text: string; icon: ReactNode; type: LEARNING_TYPE }[] = [
  {
    title: '동영상', // 유형 제목
    text: '1개 동영상 업로드', // 유형 설명
    icon: <IcoVideo01 className={styles.icon} />, // 유형에 해당하는 아이콘 컴포넌트
    type: LEARNING_TYPE.VIDEO, // 유형 타입 (열거형 사용)
  },
  {
    title: '멀티 동영상',
    text: '설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄',
    icon: <IcoVideo02 className={styles.icon} />,
    type: LEARNING_TYPE.MULTIPLE_VIDEO,
  },
  {
    title: 'HTML 동영상',
    text: '설명문구2줄설명',
    icon: <IcoHtml className={styles.icon} />,
    type: LEARNING_TYPE.HTML_VIDEO,
  },
  {
    title: '이미지',
    text: '설명문구2줄설명',
    icon: <IcoImage01 className={styles.icon} />,
    type: LEARNING_TYPE.IMAGE,
  },
  {
    title: '기타',
    text: '설명문구2줄설명',
    icon: <IcoEtc className={styles.icon} />,
    type: LEARNING_TYPE.ETC,
  },
  {
    title: '외부 링크',
    text: '설명문구2줄설명',
    icon: <IcoInfoCircle className={styles.icon} />,
    type: LEARNING_TYPE.EXTERNAL_LINK,
  },
  {
    title: '외부 위탁',
    text: '설명문구2줄설명',
    icon: <IcoEntrust className={styles.icon} />,
    type: LEARNING_TYPE.EXTERNAL_CONSIGNMENT,
  },
  {
    title: '블로그',
    text: '설명문구2줄설명',
    icon: <IcoBlog className={styles.icon} />,
    type: LEARNING_TYPE.BLOG,
  },
  {
    title: '이북',
    text: '설명문구2줄설명',
    icon: <IcoMybook className={styles.icon} />,
    type: LEARNING_TYPE.E_BOOK,
  },
  {
    title: '스콤',
    text: '설명문구2줄설명',
    icon: <IcoMybook className={styles.icon} />,
    type: LEARNING_TYPE.SCORM,
  },
  {
    title: '멀티 스콤',
    text: '설명문구2줄설명',
    icon: <IcoMybook className={styles.icon} />,
    type: LEARNING_TYPE.MULTIPLE_SCORM,
  },
  {
    title: '설문지',
    text: '설명문구2줄설명',
    icon: <IcoMybook className={styles.icon} />,
    type: LEARNING_TYPE.SURVEY,
  },
  {
    title: '시험지',
    text: '설명문구2줄설명',
    icon: <IcoMybook className={styles.icon} />,
    type: LEARNING_TYPE.TEST_PAGER,
  },
  {
    title: '과제',
    text: '설명문구2줄설명',
    icon: <IcoMybook className={styles.icon} />,
    type: LEARNING_TYPE.ASSIGNMENT,
  },
];
