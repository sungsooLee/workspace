import React, { FC, useState } from 'react';
import { Button, List, SelectOption } from '@learnway/ui';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { useTranslation } from 'react-i18next';

const ImageInfoComponent: FC<any> = () => {
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

  const handleChangeImageClick = () => {
    console.log('이미지 변경');
  };

  const handlePreviewClick = () => {
    console.log('미리보기');
  };

  const [value, setValue] = useState<SelectOption>();

  const dummyOptions = Array(5)
    .fill(null)
    .map((d, i) => ({ value: `value${i}`, label: `label${i}`, node: <span>X</span> }));

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
          <Button
            className={style.btn_text}
            label={t('이미지 변경')}
            onClick={handleChangeImageClick}
          />
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
      <List options={dummyOptions} value={value} onOptionSelect={(option) => setValue(option)} />
    </>
  );
};

export const ImageInfo = ImageInfoComponent;
