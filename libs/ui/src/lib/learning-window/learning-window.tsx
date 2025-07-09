import { FC, useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowBlogPlayer } from './player/ui/learning-window-blog-player';
import { LearningWindowGalleryPlayer } from './player/ui/learning-window-gallery-player';
import { LearningWindowScormPlayer } from './player/ui/learning-window-scorm-player';
import { LearningWindowVideoPlayer } from './player/ui/learning-window-video-player';
import { LearningWindowHtmlPlayer } from './player/ui/learning-window-html-player';
import { LearningWindowEbookPlayer } from './player/ui/learning-window-ebook-player';

import { EnContentType, useLearningWindow } from './learning-window.store';

const LearningWindowComponent: FC<any> = () => {
  const { scormInfo, videoInfo, galleryInfo, blogInfo, htmlInfo, ebookInfo, playInfo } =
    useLearningWindow();

  return (
    <>
      {scormInfo && <LearningWindowScormPlayer />}
      {videoInfo && <LearningWindowVideoPlayer />}
      {galleryInfo && <LearningWindowGalleryPlayer />}
      {blogInfo && <LearningWindowBlogPlayer playInfo={playInfo} blogInfo={blogInfo} />}
      {htmlInfo && <LearningWindowHtmlPlayer htmlInfo={htmlInfo} />}
      {ebookInfo && <LearningWindowEbookPlayer />}
    </>
  );
};

export const LearningWindow = LearningWindowComponent;
