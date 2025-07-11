import React, { FC, useEffect, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import { isMobile } from 'react-device-detect';
import { initialConfig as editorConfig } from '../../../editor/config/editor.config'; // 임시로(?) 상대경로 설정

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowOthersPlayerComponent: FC<any> = ({ othersInfo }) => {
  useEffect(() => {
    if (!othersInfo) return;
    console.log('othersInfo', othersInfo);
  }, [othersInfo]);

  return (
    <div className={`${styles.start} ${styles.blog}`}>
      <div className={styles.header_color}></div>
      <div className={styles.container} dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      {/* {htmlContent && $generateHtmlFromNodes(jsonInfo, null)} */}
    </div>
  );
};

export const LearningWindowOthersPlayer = LearningWindowOthersPlayerComponent;
