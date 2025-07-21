import { FC, useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowBlogPlayer } from './player/ui/learning-window-blog-player';
import { LearningWindowGalleryPlayer } from './player/ui/learning-window-gallery-player';
import { LearningWindowScormPlayer } from './player/ui/learning-window-scorm-player';
import { LearningWindowVideoPlayer } from './player/ui/learning-window-video-player';
import { LearningWindowHtmlPlayer } from './player/ui/learning-window-html-player';
import { LearningWindowEbookPlayer } from './player/ui/learning-window-ebook-player';

import { EnContentType, useLearningWindow } from './learnway-learning-window.store';
import { LearningWindowOthersPlayer } from './player/ui/learning-window-others-player';

const LearningWindowComponent: FC<any> = () => {
  const { scormInfo, videoInfo, galleryInfo, blogInfo, htmlInfo, ebookInfo, otherInfo, playInfo } =
    useLearningWindow();

  return (
    <>
      {scormInfo && <LearningWindowScormPlayer />}
      {videoInfo && <LearningWindowVideoPlayer />}
      {galleryInfo && <LearningWindowGalleryPlayer />}
      {blogInfo && <LearningWindowBlogPlayer />}
      {htmlInfo && <LearningWindowHtmlPlayer />}
      {ebookInfo && <LearningWindowEbookPlayer />}
      {otherInfo && <LearningWindowOthersPlayer />}
    </>
  );
};

export const LearningWindow = LearningWindowComponent;
