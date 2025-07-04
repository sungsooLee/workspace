import { useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import {
  LearningWindowScormPlayer,
  ScormPlayerConfigProperties,
} from './player/ui/learning-window-scorm-player';

import { LearningWindowVideoPlayer } from './player/ui/learning-window-video-player';

import { EnContentType, useLearningWindow } from './learning-window.store';

function LearningWindowComponent() {
  const { scormInfo, setScormInfo, curriculum, playInfo, setBaseInfo } = useLearningWindow();

  return (
    <>
      {scormInfo && <LearningWindowScormPlayer playInfo={playInfo} scormInfo={scormInfo} />}
      {/* {videoInfo && <LearningWindowVideoPlayer />} */}
    </>
  );
}

export const LearningWindow = LearningWindowComponent;
