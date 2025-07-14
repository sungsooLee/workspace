import React, { FC, useEffect, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import { isMobile } from 'react-device-detect';
import { initialConfig as editorConfig } from '../../../editor/config/editor.config'; // 임시로(?) 상대경로 설정

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { HtmlContent } from '@learnway/ui';

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
    console.log('blogInfo', blogInfo);

    const newJsonInfo = blogInfo.blogContent;
    const editor = createEditor(editorConfig);
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
      <div className={styles.container}>
        <HtmlContent>{htmlString}</HtmlContent>
      </div>
      {/* {htmlContent && $generateHtmlFromNodes(jsonInfo, null)} */}
    </div>
  );
};

export const LearningWindowBlogPlayer = LearningWindowBlogPlayerComponent;
