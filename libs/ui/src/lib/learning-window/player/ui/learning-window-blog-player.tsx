import React, { FC, useEffect, useRef, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';

import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { ScormHandler } from '../service/scorm-handler';
import { ScormDataManager } from '../service/scorm-data-manager';
import { ScormRteClient } from '../service/scorm-rte-client';

const styles = isMobile ? stylesMobile : stylesWeb;
const LearningWindowBlogPlayerComponent: FC<any> = ({
  playInfo,
  blogInfo,
}: {
  playInfo: any;
  blogInfo: any;
}) => {
  const [jsonInfo, setJsonInfo] = useState<any>();

  useEffect(() => {
    if (!blogInfo) return;
    console.log(blogInfo);

    const jsonInfo = blogInfo.json;

    setJsonInfo(jsonInfo);
  }, [blogInfo]);

  return (
    <div className={`${styles.start} ${styles.blog}`}>
      <div className={styles.header_color}></div>
      {$generateHtmlFromNodes(jsonInfo)}
    </div>
  );
};

export const LearningWindowBlogPlayer = LearningWindowBlogPlayerComponent;
