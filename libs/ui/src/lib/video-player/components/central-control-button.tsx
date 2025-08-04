import { t } from 'i18next';
import { VideoPlayerContainerProps } from '../types';
import { IcoVideoStop, IcoVideoPlay, IcoNextPlayFill, IcoPrevPlayFill } from '@learnway/icons';
import { isMobile } from 'react-device-detect';

import styles from './central-control-button.module.css';
import { useLearningWindow } from '../../learning-window/learnway-learning-window.store';
import { useModal } from '../../modal/modal.hook';

const CentralControlButton = ({
  playing,
  togglePlay,
}: Pick<VideoPlayerContainerProps, 'playing' | 'togglePlay'>) => {
  const { openModal, confirm: openConfirm } = useModal();
  const { playIndex, playList, gotoBeforeLesson, gotoNextLesson } = useLearningWindow();

  const handlePriveNextClick = async (isNext: boolean) => {
    const addValue = isNext ? 1 : -1;
    const moduleName = playList ? playList[playIndex + addValue].moduleName : '';
    const lessonName = playList ? playList[playIndex + addValue].lessonName : '';
    const result = await openConfirm({
      title: `${moduleName} (${lessonName})`,
      content: t('삭제버튼을 누르면 선택하신 항목이 모두 저장되며, 복구할 수 없습니다.'),
      okButtonLabel: isNext ? t('다음 강의') : t('이전 강의'),
      cancelButtonLabel: t('다시보기'),
    });
    if (result) {
      if (isNext) {
        gotoNextLesson();
      } else {
        gotoBeforeLesson();
      }
    }
  };

  return (
    <div className={`${styles.start} ${styles.control}`}>
      <button
        disabled={playIndex === 0}
        onClick={() => {
          handlePriveNextClick(false);
        }}
      >
        <IcoPrevPlayFill width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
      </button>
      <button className={styles.btn_control} onClick={togglePlay}>
        {playing ? (
          <IcoVideoStop width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
        ) : (
          <IcoVideoPlay width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
        )}
      </button>

      <button
        disabled={playList && playList.length <= playIndex + 1}
        onClick={() => {
          handlePriveNextClick(true);
        }}
      >
        <IcoNextPlayFill width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
      </button>
    </div>
  );
};

export default CentralControlButton;
