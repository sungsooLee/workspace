import { create } from 'zustand';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { curriculumnQueryOptions } from '@entities/curriculum';
import { queryConfig } from '@learnway/config';
import { useState } from 'react';

interface LearningWindowStoreData {
  playIndex: number;
  baseInfo: any;
  curriculum: any;
  playInfo: any;
  playList: any[];
  setBaseInfo: (v: any) => void;
  setPlayInfo: (v: any) => void;
  setCurriculum: (v: any) => void;
  setPlayList: (v: any[]) => void;
}

const useLearningWindowStore = create<LearningWindowStoreData>((set, get) => ({
  playIndex: 0,
  baseInfo: undefined,
  curriculum: undefined,
  playInfo: undefined,
  playList: [],

  setPlayInfo(playInfo: any) {
    const playList = get().playList;
    set((state) => ({ playInfo }));
    playList?.forEach((item, index) => {
      if (item.moduleId === playInfo.moduleId && item.lessonId === playInfo.lessonId) {
        set((state) => ({
          playIndex: index,
        }));
      }
    });
  },

  setBaseInfo: (baseInfo: any) => {
    set((state) => ({ baseInfo }));
  },
  setCurriculum: (curriculum: any) => {
    set((state) => ({ curriculum }));
  },
  setPlayList: (playList: any[]) => {
    set((state) => ({ playList }));
  },
}));

export const useLearningWindow = () => {
  const {
    playIndex,
    playList,
    baseInfo,
    curriculum,
    playInfo,
    setBaseInfo,
    setPlayInfo,
    setCurriculum,
    setPlayList,
  } = useLearningWindowStore((state) => state);

  const genPlayInfoByCurriculum = (
    nowBaseInfo: any,
    nowCurriculum: any,
    moduleId?: number,
    lessonId?: number,
  ) => {
    if (!nowCurriculum?.moduleList?.length) {
      console.error('moduleList is not set or empty', nowCurriculum);
      return undefined;
    }

    let module = nowCurriculum.moduleList.find((m: any) => m.moduleId === moduleId);
    if (!module) module = nowCurriculum.moduleList[0];

    if (!module?.lessonList?.length) {
      console.error('lessonList is not set or empty', module);
      return undefined;
    }

    let lesson = module.lessonList.find((l: any) => l.lessonId === lessonId);
    if (!lesson) lesson = module.lessonList[0];
    const playInfo = {
      courseId: nowBaseInfo.courseId,
      sequenceId: nowBaseInfo.sequenceId,
      curriculumId: nowBaseInfo.curriculumId,
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

  const handleSetBaseInfo = async (v: any) => {
    const retval: any = await queryConfig
      .getQueryClient()
      .fetchQuery(curriculumnQueryOptions.detail(v.curriculumId));
    console.log('retval', retval);
    const playList: any[] = [];
    retval.moduleList.forEach((module: any) => {
      module?.lessonList?.forEach((lesson: any) => {
        playList.push({ moduleId: module.moduleId, lessonId: lesson.lessonId });
      });
    });
    const playInfo = genPlayInfoByCurriculum(v, retval);
    setCurriculum(retval);
    setPlayList(playList);
    setPlayInfo(playInfo);
  };

  const handleSetPlayInfo = (moduleId: number, lessonId: number) => {
    const playInfo = genPlayInfoByCurriculum(baseInfo, curriculum, moduleId, lessonId);
    setPlayInfo(playInfo);
  };

  return {
    playIndex,
    playList,
    baseInfo,
    curriculum,
    playInfo,
    setBaseInfo: handleSetBaseInfo,
    setPlayInfo: handleSetPlayInfo,
  };
};
