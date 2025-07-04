import { FC, useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowScormPlayer } from './player/ui/learning-window-scorm-player';

import { LearningWindowVideoPlayer } from './player/ui/learning-window-video-player';

import { EnContentType, useLearningWindow } from './learning-window.store';

const LearningWindowComponent: FC<any> = ({ scormRteService }) => {
  const { scormInfo, setScormInfo, curriculum, playInfo, setBaseInfo } = useLearningWindow();

  return (
    <>
      {scormInfo && (
        <LearningWindowScormPlayer
          playInfo={playInfo}
          scormInfo={scormInfo}
          scormRteService={scormRteService}
        />
      )}
      {/* {videoInfo && <LearningWindowVideoPlayer />} */}
    </>
  );
};

export const LearningWindow = LearningWindowComponent;
