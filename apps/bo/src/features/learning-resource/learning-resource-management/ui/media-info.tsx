import {
  isProcessing,
  isProcessingCompleted,
  isProcessingFailed,
  isProcessingNone,
} from '@entities/learning-resource';
import { LEARNING_TYPE } from '@learnway/config';
import { IcoStatusFail } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { Button } from '@learnway/ui/button';
import { Spinner } from '@learnway/ui/spinner';
import { ProcessingStatus } from '@types';
import { t } from 'i18next';
import ReactPlayer from 'react-player';

interface MediaInfoComponentProps {
  status: ProcessingStatus;
  buttons: { label: string; onClick: () => void }[];
  type: LEARNING_TYPE;
  url?: string | null;
  infoList: { title: string; text?: string }[];
}

const MediaInfoComponent = ({ status, buttons, type, url, infoList }: MediaInfoComponentProps) => {
  if (isProcessingNone(status)) return null;
  return (
    <>
      <strong className={style.title}>{t('업로드 파일')}</strong>
      {/* 인코딩 진행 중 */}
      {isProcessing(status) && (
        <div className={style.status_wrap}>
          <Spinner isLoading={true} showBackdrop className={style.loading} />
          <p className={style.text}>
            {type === LEARNING_TYPE.VIDEO && (
              <>
                <strong>{t('인코딩 진행 중입니다.')}</strong>
                {t('인코딩 대기 및 영상 길이에 따라 인코딩 시간이 오래 걸릴수도 있습니다.')}
              </>
            )}
            {[LEARNING_TYPE.SCORM, LEARNING_TYPE.HTML5_VIDEO].includes(type) && (
              <>
                <strong>{t('패키지 등록 중입니다.')}</strong>
                {t('등록 대기 및 파일 크기에 따라 등록 시간이 오래 걸릴수도 있습니다.')}
              </>
            )}
          </p>
        </div>
      )}
      {/* 인코딩 실패 */}
      {isProcessingFailed(status) && (
        <div className={style.status_wrap}>
          <IcoStatusFail className={style.fail} />
          <p className={style.text}>
            <strong>
              {type === LEARNING_TYPE.VIDEO && t('인코딩이 실패되었습니다.')}
              {type === LEARNING_TYPE.SCORM && t('패키지 등록이 실패되었습니다.')}
            </strong>
          </p>
          <div className={style.btn_box}>
            <Button className={style.btn} variant="gray" size="sm">
              {t('재시도')}
            </Button>
            <Button className={style.btn} variant="primary" size="sm" onClick={buttons[1].onClick}>
              {type === LEARNING_TYPE.VIDEO && t('동영상 변경')}
              {type === LEARNING_TYPE.SCORM && t('파일 변경')}
            </Button>
          </div>
        </div>
      )}
      {isProcessingCompleted(status) && (
        <>
          <ul className={style.btn_list}>
            {buttons.map((btn, index) => (
              <li key={index}>
                <Button onClick={btn.onClick} className={style.btn_text}>
                  {btn.label}
                </Button>
              </li>
            ))}
          </ul>
          {/* media(비디오 영역) */}
          {type === LEARNING_TYPE.VIDEO && url && (
            <div className={style.media}>
              <ReactPlayer url={url} controls width={416} />
            </div>
          )}
          {type === LEARNING_TYPE.SCORM && (
            <div className={style.media}>
              <img src={'https://picsum.photos/320/180'} width="100%" />
            </div>
          )}
          {/* info_list */}
          <ul className={style.info_list}>
            {infoList.map((item, index) => (
              <li key={index}>
                <span className={style.title}>{item.title}</span>
                <span className={style.text}>{item.text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export const MediaInfo = MediaInfoComponent;
