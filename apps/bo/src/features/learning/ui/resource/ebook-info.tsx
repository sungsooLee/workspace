import { FC } from 'react';
import { Button } from '@learnway/ui';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { useTranslation } from 'react-i18next';

const EbookInfoComponentComponent: FC<any> = () => {
  const { t } = useTranslation();
  // media info_list
  const infoList = [{ title: '파일명', text: 'index.html' }];

  const handleUrlViewClick = () => {
    console.log('URL보기');
  };

  const handlePreviewClick = () => {
    console.log('미리보기');
  };

  return (
    <>
      <strong className={style.title}>{t('업로드 파일')}</strong>
      <ul className={style.btn_list}>
        <li>
          <Button className={style.btn_text} label={t('URL보기')} onClick={handleUrlViewClick} />
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

export const EbookInfo = EbookInfoComponentComponent;
