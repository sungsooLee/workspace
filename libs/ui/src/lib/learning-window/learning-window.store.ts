import { create } from 'zustand';

export enum EnContentType {
  VIDEO = 'VIDEO',
  EBOOK = 'EBOOK',
  SCORM = 'SCORM',
  IMAGE = 'IMAGE',
  EXTERNAL_LINK = 'EXTERNAL_LINK',
}

export interface PlayInfo {
  isDirect?: boolean;
  courseId?: number;
  sequenceId?: number;
  curriculumId?: number;
  moduleId?: number;
  mappingModuleType?: string;
  lessonId?: number;
  contentUuid: string;
  orgnId?: number;
  scoId?: string;
  contentType: EnContentType;
}

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

  scormInfo: any;
  setScormInfo: (v: any) => void;
}

const useLearningWindowStore = create<LearningWindowStoreData>((set, get) => ({
  playIndex: 0,
  baseInfo: undefined,
  curriculum: undefined,
  playInfo: undefined,
  playList: [],
  scormInfo: undefined,
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
  setScormInfo: (scormInfo: any) => {
    set((state) => ({ scormInfo }));
  },
}));

export const useLearningWindow = () => {
  const {
    scormInfo,
    playIndex: _playIndex,
    playList: _playList,
    baseInfo: _baseInfo,
    curriculum: _curriculum,
    playInfo: _playInfo,
    setBaseInfo,
    setPlayInfo,
    setCurriculum,
    setPlayList,

    setScormInfo,
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
      courseId: nowBaseInfo?.courseId,
      sequenceId: nowBaseInfo?.sequenceId,
      curriculumId: nowBaseInfo?.curriculumId,
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

  const setPlayListByCurriculum = (curriculum: any) => {
    const playList: any[] = [];
    curriculum.moduleList.forEach((module: any) => {
      module?.lessonList?.forEach((lesson: any) => {
        playList.push({ moduleId: module.moduleId, lessonId: lesson.lessonId });
      });
    });
    setPlayList(playList);
  };

  const handleSetCurriculum = (curriculum: any) => {
    setCurriculum(curriculum);
    setPlayListByCurriculum(curriculum);
    if (_baseInfo) {
      const playInfo = genPlayInfoByCurriculum(_baseInfo, _curriculum);
      setPlayInfo(playInfo);
    }
  };

  const handleSetPlayInfo = (moduleId: number, lessonId: number) => {
    const playInfo = genPlayInfoByCurriculum(_baseInfo, _curriculum, moduleId, lessonId);
    setPlayInfo(playInfo);
  };

  return {
    playIndex: _playIndex,
    playList: _playList,
    baseInfo: _baseInfo,
    curriculum: _curriculum,
    playInfo: _playInfo,
    setBaseInfo,
    scormInfo,
    setScormInfo,
    setPlayInfo: handleSetPlayInfo,
    setCurriculum: handleSetCurriculum,
    /**
     * BO 미리 보기 설정용
     */
    directPlayInfo: setPlayInfo,
  };
};
