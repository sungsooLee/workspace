import { FC, useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowBlogPlayer } from './player/ui/learning-window-blog-player';
import { LearningWindowGalleryPlayer } from './player/ui/learning-window-gallery-player';
import { LearningWindowScormPlayer } from './player/ui/learning-window-scorm-player';
import { LearningWindowVideoPlayer } from './player/ui/learning-window-video-player';

import { EnContentType, useLearningWindow } from './learning-window.store';

const LearningWindowComponent: FC<any> = ({ scormRteService, onVideoProgress }) => {
  const { scormInfo, videoInfo, galleryInfo, playInfo, blogInfo } = useLearningWindow();

  return (
    <>
      {scormInfo && (
        <LearningWindowBlogPlayer
          playInfo={playInfo}
          scormInfo={scormInfo}
          scormRteService={scormRteService}
        />
      )}
      {videoInfo && (
        <LearningWindowVideoPlayer videoInfo={videoInfo} onProgress={onVideoProgress} />
      )}
      {galleryInfo && <LearningWindowGalleryPlayer />}
      {blogInfo && <LearningWindowBlogPlayer />}
    </>
  );
};

export const LearningWindow = LearningWindowComponent;
