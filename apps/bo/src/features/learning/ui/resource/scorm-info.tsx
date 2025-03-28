import { FC } from 'react';
import { Button } from '@learnway/ui';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { useTranslation } from 'react-i18next';

const ScormInfoComponent: FC<any> = () => {
  const { t } = useTranslation();
  // media info_list
  const infoList = [
    { title: '파일명', text: '화면 기록 2024-11-28 오후 3.00.55.zip' },
    { title: '파일용량', text: '1.97GB' },
    { title: '파일형식', text: 'ZIP' },
  ];

  const handleDownloadClick = () => {
    console.log('원본 다운로드');
  };

  const handleRenameClick = () => {
    console.log('파일 변경');
  };

  const handlePlayClick = () => {
    console.log('스콤보기');
  };

  const handlePreviewClick = () => {
    console.log('미리보기');
  };

  return (
    <>
      <strong className={style.title}>{t('업로드 파일')}</strong>
      <ul className={style.btn_list}>
        <li>
          <Button
            className={style.btn_text}
            label={t('원본 다운로드')}
            onClick={handleDownloadClick}
          />
        </li>
        <li>
          <Button className={style.btn_text} label={t('파일 변경')} onClick={handleRenameClick} />
        </li>
        <li>
          <Button className={style.btn_text} label={t('스콤보기')} onClick={handlePlayClick} />
        </li>
        <li>
          <Button className={style.btn_text} label={t('미리보기')} onClick={handlePreviewClick} />
        </li>
      </ul>
      {/* media(비디오 영역) */}
      <div className={style.media}>
        <img src={'https://picsum.photos/200'} width="100%" alt="" />
      </div>
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
  );
};

export const ScormInfo = ScormInfoComponent;
