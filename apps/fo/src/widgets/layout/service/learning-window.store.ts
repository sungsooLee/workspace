import { create } from 'zustand';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { curriculumnQueryOptions } from '@entities/curriculum';
import { queryConfig } from '@learnway/config';
import { useState } from 'react';

interface LearningWindowStoreData {
  baseInfo: any;
  curriculum: any;
  playInfo: any;
  setBaseInfo: (v: any) => void;
  setPlayInfo: (v: any) => void;
  setCurriculum: (v: any) => void;
}

const useLearningWindowStore = create<LearningWindowStoreData>((set, get) => ({
  baseInfo: undefined,
  curriculum: undefined,
  playInfo: undefined,

  setPlayInfo(playInfo: any) {
    set((state) => ({ playInfo }));
  },

  setBaseInfo: (baseInfo: any) => {
    set((state) => ({ baseInfo }));
  },
  setCurriculum: (curriculum: any) => {
    set((state) => ({ curriculum }));
  },
}));

export const useLearningWindow = () => {
  const { baseInfo, curriculum, playInfo, setBaseInfo, setPlayInfo, setCurriculum } =
    useLearningWindowStore((state) => state);

  const genPlayInfoByCurriculum = (moduleId?: number, lessonId?: number) => {
    if (!curriculum?.moduleList?.length) {
      console.error('moduleList is not set or empty', curriculum);
      return undefined;
    }

    let module = curriculum.moduleList.find((m: any) => m.moduleId === moduleId);
    if (!module) module = curriculum.moduleList[0];

    if (!module?.lessonList?.length) {
      console.error('lessonList is not set or empty', module);
      return undefined;
    }

    let lesson = module.lessonList.find((l: any) => l.lessonId === lessonId);
    if (!lesson) lesson = module.lessonList[0];
    const playInfo = {
      courseId: baseInfo.courseId,
      sequenceId: baseInfo.sequenceId,
      curriculumId: baseInfo.curriculumId,
      moduleId: module.moduleId,
      mappingModuleType: module.mappingModuleType,
      lessonId: lesson.lessonId,
      contentUuid: lesson.contentUuid,
      orgnId: lesson.orgnId,
      scoId: lesson.scoId,
      contentType: lesson.contentType,
    };
    return playInfo;
  };

  const handlerSetBaseInfo = async (v: any) => {
    const retval = await queryConfig
      .getQueryClient()
      .fetchQuery(curriculumnQueryOptions.detail(v.curriculumId));
    console.log('retval', retval);
    const playInfo = genPlayInfoByCurriculum(v, retval);
    setCurriculum(retval);
    setPlayInfo(playInfo);
  };
  const handlerSetPlayInfo = (moduleId: number, lessonId: number) => {
    const playInfo = genPlayInfoByCurriculum(moduleId, lessonId);
    setPlayInfo(playInfo);
  };

  return {
    baseInfo,
    curriculum,
    playInfo,
    setBaseInfo: handlerSetBaseInfo,
    setPlayInfo: handlerSetPlayInfo,
  };
};
