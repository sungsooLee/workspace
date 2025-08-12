import {
  isProcessing,
  isProcessingCompleted,
  isProcessingFailed,
  isProcessingNone,
} from '@entities/learning-resource';
import { LEARNING_TYPE } from '@learnway/config';
import { IcoStatusFail } from '@learnway/icons';
import scormDefaultImage from '@learnway/styles/bo/assets/images/cms/scom.jpg';
import htmlVideoDefaultImage from '@learnway/styles/bo/assets/images/cms/html.jpg';
import etcDefaultImage from '@learnway/styles/bo/assets/images/cms/etc.jpg';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { Button } from '@learnway/ui/button';
import { Spinner } from '@learnway/ui/spinner';
import { ProcessingStatus } from '@shared/types/enums';
import { t } from 'i18next';
import ReactPlayer from 'react-player';
import { cn } from '@learnway/shared';

interface MediaInfoComponentProps {
  status: ProcessingStatus;
  buttons: { label: string; onClick: () => void }[];
  type: LEARNING_TYPE;
  url?: string | null;
  infoList: { title: string; text?: string }[];
}

const MediaInfoComponent = ({ status, buttons, type, url, infoList }: MediaInfoComponentProps) => {
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
      {(isProcessingFailed(status) || isProcessingNone(status)) && (
        <div className={style.status_wrap}>
          <IcoStatusFail className={style.fail} />
          <p className={style.text}>
            {isProcessingFailed(status) && (
              <strong>
                {type === LEARNING_TYPE.VIDEO && t('인코딩이 실패되었습니다.')}
                {[LEARNING_TYPE.SCORM, LEARNING_TYPE.HTML5_VIDEO].includes(type) &&
                  t('패키지 등록이 실패되었습니다.')}
              </strong>
            )}
            {isProcessingNone(status) && ( // 컨텐츠 복사 후
              <strong>{t('파일을 업로드 하세요.')}</strong>
            )}
          </p>
          <div className={style.btn_box}>
            {isProcessingFailed(status) && (
              <Button className={style.btn} variant="gray" size="sm">
                {t('재시도')}
              </Button>
            )}
            <Button className={style.btn} variant="primary" size="sm" onClick={buttons[1].onClick}>
              {type === LEARNING_TYPE.VIDEO ? t('동영상 변경') : t('파일 변경')}
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
          {/* 스콤 영역 */}
          {type === LEARNING_TYPE.SCORM && (
            <div className={cn(style.media, 'max-w-[416px]')}>
              <img src={scormDefaultImage} width="100%" alt="" />
            </div>
          )}
          {/* HTML5 영역 */}
          {type === LEARNING_TYPE.HTML5_VIDEO && (
            <div className={cn(style.media, 'max-w-[416px]')}>
              <img src={htmlVideoDefaultImage} width="100%" alt="" />
            </div>
          )}
          {type === LEARNING_TYPE.ETC && (
            <div className={cn(style.media, 'max-w-[416px]')}>
              <img src={etcDefaultImage} width="100%" alt="" />
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
