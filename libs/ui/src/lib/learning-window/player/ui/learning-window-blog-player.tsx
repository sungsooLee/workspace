import React, { FC, useEffect, useRef, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';

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
  const [htmlString, setHtmlString] = useState<string>('');

  useEffect(() => {
    if (!blogInfo) return;
    console.log(blogInfo);

    const newJsonInfo = blogInfo.blogContent;
    const editor = createEditor();
    editor.setEditorState(editor.parseEditorState(newJsonInfo));
    let htmlContent = '';
    editor.update(() => {
      htmlContent = $generateHtmlFromNodes(editor, null);
    });

    console.log(htmlContent);
    setHtmlString(htmlContent);
  }, [blogInfo]);

  return (
    <div className={`${styles.start} ${styles.blog}`}>
      <div className={styles.header_color}></div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      {/* {htmlContent && $generateHtmlFromNodes(jsonInfo, null)} */}
    </div>
  );
};

export const LearningWindowBlogPlayer = LearningWindowBlogPlayerComponent;
