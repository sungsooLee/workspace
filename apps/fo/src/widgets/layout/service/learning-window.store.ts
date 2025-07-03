import { create } from 'zustand';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { curriculumnQueryOptions } from '@entities/curriculum';
import { queryConfig } from '@learnway/config';

interface LearningWindowStoreData {
  baseInfo: any;
  curriculum: any;
  playInfo: any;
  setBaseInfo: (v: any) => void;
  getCurrentLesson: () => any;
}
const getLessonInfo = (nowCurriculum: any, moduleId?: number, lessonId?: number) => {
  let module = nowCurriculum.moduleList.find((m: any) => m.moduleId === moduleId);
  if (!module) module = nowCurriculum.moduleList[0];
  let lesson = module.lessonList.find((l: any) => l.lessonId === lessonId);
  if (!lesson) lesson = module.lessonList[0];
  const playInfo = {
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
    const nowCurriculum = get().curriculum;
    const playInfo = getLessonInfo(nowCurriculum, moduleId, lessonId);

    set((state) => ({ ...state, playInfo: playInfo }));
  },

  setBaseInfo: (v: any) => {
    (async () => {
      const retval = await queryConfig
        .getQueryClient()
        .fetchQuery(curriculumnQueryOptions.detail(v.curriculumId));
      console.log('retval', retval);
      const playInfo = getLessonInfo(retval);
      console.log('playInfo', playInfo);
      set((state) => ({ baseInfo: v, curriculum: retval, playInfo: playInfo }));
    })();
  },
  getCurrentLesson() {
    const nowCurriculum = get().curriculum;
    const module = nowCurriculum.moduleList[0];
    const lesson = module.lessonList[0];
  },
}));
