import {
  IcoBlog,
  IcoEntrust,
  IcoEtc,
  IcoExam,
  IcoHomework,
  IcoHtml,
  IcoImage01,
  IcoInfoCircle,
  IcoMybook,
  IcoSurvey,
  IcoVideo01,
  IcoVideo02,
} from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  OptionCard,
  OptionCardItem,
  useModal,
} from '@learnway/ui';
import { useState } from 'react';
import { LEARNING_TYPE } from '@learnway/config';
import { getRandomId } from '@learnway/shared';
import { EbookInstallGuideModal } from './e-book-install-guide-modal';

// 학습 유형 선택 팝업 컴포넌트
const LearningTypeChoiceModalComponent = () => {
  const { close, open } = useModal();
  // 현재 활성화된 학습 유형의 상태를 관리 (기본값으로 learningTypes 배열의 첫 번째 학습 유형 사용)
  const [activeType, setActiveType] = useState(learningTypes[0].value);

  /**
   * 학습 유형을 선택하고 선택된 유형에 따라 추가 로직을 실행합니다.
   *
   * @param {LEARNING_TYPE} type - 선택된 학습 유형.
   */
  const handleChoiceLearningType = async (option: OptionCardItem) => {
    if (option.value === LEARNING_TYPE.E_BOOK) {
      await open({
        hideCloseButton: true,
        width: 'auto',
        content: <EbookInstallGuideModal />,
      });
      return;
    }
    close(option.value);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'학습자원 유형 선택'}</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <OptionCard
            cols={5}
            size="lg"
            className={styles.select_wrap}
            options={learningTypes}
            value={activeType}
            onOptionSelect={handleChoiceLearningType}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => close()} />
      </ModalFooter>
    </ModalContainer>
  );
};

// 해당 컴포넌트를 외부에서 사용할 수 있도록 export
export const LearningTypeChoiceModal = LearningTypeChoiceModalComponent;

// 학습 유형 데이터 리스트
// 각 학습 유형마다 제목, 설명, 아이콘, 유형(type)을 포함
const learningTypes = [
  {
    label: '동영상',
    value: LEARNING_TYPE.VIDEO,
    icon: <IcoVideo01 />,
    description: '1개 동영상 업로드',
  },
  {
    label: 'HTML 동영상',
    value: LEARNING_TYPE.HTML_VIDEO,
    icon: <IcoHtml />,
    description: '설명 문구는 최대 2줄까지 노출됩니다. ',
  },
  {
    label: '이미지',
    value: LEARNING_TYPE.IMAGE,
    icon: <IcoImage01 />,
    description: '설명 문구는 최대 2줄까지 노출됩니다. ',
  },
  { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
  {
    label: '외부 링크',
    value: LEARNING_TYPE.EXTERNAL_LINK,
    icon: <IcoInfoCircle />,
    description: '설명문구2줄설명',
  },
  {
    label: '외부 위탁',
    value: LEARNING_TYPE.EXTERNAL_CONSIGNMENT,
    icon: <IcoEntrust />,
    description: '설명문구2줄설명',
  },
  { label: '블로그', value: getRandomId(), icon: <IcoBlog />, description: '설명문구2줄설명' },
  {
    label: '이북',
    value: LEARNING_TYPE.E_BOOK,
    icon: <IcoMybook />,
    description: '설명문구2줄설명',
  },
  { label: '스콤', value: LEARNING_TYPE.SCORM, icon: <IcoEtc />, description: '설명문구2줄설명' },
  {
    label: '시험지',
    value: LEARNING_TYPE.TEST_PAGER,
    icon: <IcoExam />,
    description: '설명문구2줄설명',
  },
  {
    label: '문제은행',
    value: LEARNING_TYPE.QUESTION_BANK,
    icon: <IcoExam />,
    description: '설명문구2줄설명',
  },
  {
    label: '설문지',
    value: LEARNING_TYPE.SURVEY,
    icon: <IcoSurvey />,
    description: '설명문구2줄설명',
  },
  {
    label: '과제',
    value: LEARNING_TYPE.ASSIGNMENT,
    icon: <IcoHomework />,
    description: '설명문구2줄설명',
  },
  {
    label: '라이브',
    value: LEARNING_TYPE.LIVE,
    icon: <IcoHomework />,
    description: '설명문구2줄설명',
  },
  {
    label: '라이브(HIVE)',
    value: LEARNING_TYPE.HIVE,
    icon: <IcoHomework />,
    description: '설명문구2줄설명',
  },
];
