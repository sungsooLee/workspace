import React, { FC, useEffect, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import { isMobile } from 'react-device-detect';
import { initialConfig as editorConfig } from '../../../editor/config/editor.config'; // 임시로(?) 상대경로 설정

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { Button } from '../../../button/button';
import { useLearningWindow } from '../../learnway-learning-window.store';
import { CmsEnContentType } from '@learnway/types';

const styles = isMobile ? stylesMobile : stylesWeb;

const formatFileSize = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
};

const LearningWindowOthersPlayerComponent: FC<any> = () => {
  const { playInfo, otherInfo, funcInfo } = useLearningWindow();

  const handleLinkClick = () => {
    console.log('handleClick');
    if (playInfo && otherInfo) {
      funcInfo?.otherClickButton(playInfo, otherInfo);
    }
  };

  useEffect(() => {
    if (!otherInfo) return;
    console.log('otherInfo', otherInfo);
  }, [otherInfo]);

  return (
    <div className={`${styles.start} ${styles.file}`}>
      <div className={styles.file_box}>
        <p>{otherInfo?.label}</p>
        {!isMobile && otherInfo?.fileInfo.fileSize && (
          <span>{formatFileSize(otherInfo.fileInfo.fileSize)}</span>
        )}
        {!isMobile && otherInfo?.lessonTime && <span>{otherInfo.lessonTime}</span>}
        <Button variant="line" size="sm" onClick={handleLinkClick}>
          {otherInfo?.contentType === CmsEnContentType.ETC ? `다운로드` : `바로가기`}
        </Button>
      </div>
    </div>
  );
};

export const LearningWindowOthersPlayer = LearningWindowOthersPlayerComponent;
