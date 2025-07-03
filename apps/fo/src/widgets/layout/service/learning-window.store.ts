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
}
const getLessonInfo = (baseInfo: any, nowCurriculum: any, moduleId?: number, lessonId?: number) => {
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

export const useLearningWindowStore = create<LearningWindowStoreData>((set, get) => ({
  baseInfo: undefined,
  curriculum: undefined,
  playInfo: undefined,

  setPlayInfo(moduleId: number, lessonId: number) {
    const { curriculum: nowCurriculum, baseInfo: nowBaseInfo } = get();
    const playInfo = getLessonInfo(nowBaseInfo, nowCurriculum, moduleId, lessonId);

    set((state) => ({ ...state, playInfo: playInfo }));
  },

  setBaseInfo: async (v: any) => {
    const retval = await queryConfig
      .getQueryClient()
      .fetchQuery(curriculumnQueryOptions.detail(v.curriculumId));
    console.log('retval', retval);
    const playInfo = getLessonInfo(v, retval);
    console.log('playInfo', playInfo);
    set((state) => ({ baseInfo: v, curriculum: retval, playInfo: playInfo }));
  },
}));
