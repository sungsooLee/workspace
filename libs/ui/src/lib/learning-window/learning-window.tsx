import { FC, useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowBlogPlayer } from './player/ui/learning-window-blog-player';
import { LearningWindowGalleryPlayer } from './player/ui/learning-window-gallery-player';
import { LearningWindowScormPlayer } from './player/ui/learning-window-scorm-player';
import { LearningWindowVideoPlayer } from './player/ui/learning-window-video-player';

import { EnContentType, useLearningWindow } from './learning-window.store';

const LearningWindowComponent: FC<any> = () => {
  const { scormInfo, videoInfo, galleryInfo, blogInfo, playInfo } = useLearningWindow();

  return (
    <>
      {scormInfo && <LearningWindowScormPlayer />}
      {videoInfo && <LearningWindowVideoPlayer />}
      {galleryInfo && <LearningWindowGalleryPlayer />}
      {blogInfo && <LearningWindowBlogPlayer playInfo={playInfo} blogInfo={blogInfo} />}
    </>
  );
};

export const LearningWindow = LearningWindowComponent;
