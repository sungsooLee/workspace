import React, { FC, useEffect, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import { isMobile } from 'react-device-detect';
import { initialConfig as editorConfig } from '../../../editor/config/editor.config'; // 임시로(?) 상대경로 설정

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { Button } from '@learnway/ui';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowOthersPlayerComponent: FC<any> = ({ othersInfo }) => {
  useEffect(() => {
    if (!othersInfo) return;
    console.log('othersInfo', othersInfo);
  }, [othersInfo]);

  return (
    <div className={`${styles.start} ${styles.file}`}>
      <div className={styles.file_box}>
        <p>비즈니스 영어 단어&숙어집 Part 2.pdf</p>
        {!isMobile && <span>200MB</span>}
        <Button variant="line" size="sm">
          다운로드
        </Button>
      </div>
    </div>
  );
};

export const LearningWindowOthersPlayer = LearningWindowOthersPlayerComponent;
