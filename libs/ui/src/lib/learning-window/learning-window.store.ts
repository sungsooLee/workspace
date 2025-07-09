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
  lessonName?: string;
}
export interface ScormPlayerConfigProperties {
  /** 과정 차수 ID */
  sequenceId?: number;
  /** 과정Id */
  courseId?: number;
  /** 커리큘럼Id */
  curriculumId?: number;
  /** 콘텐츠 UUID */
  contentUuid?: string;
  /** 스콤 콘텐츠 구성(Organization) Id */
  orgnId?: number;
  /** Scorm Manifest Item element Id */
  scoId?: string;
}
export interface LearningWindowBaseInfo {
  courseId?: number;
  sequenceId?: number;
  curriculumId?: number;
}

interface PlayListItem {
  moduleId: number;
  lessonId: number;
  lessonName: string;
  moduleName: string;
}

interface Curriculum {
  moduleList: Module[];
}

interface Module {
  moduleId: number;
  mappingModuleType: string;
  lessonList: Lesson[];
  moduleName: string;
}

interface Lesson {
  lessonId: number;
  contentUuid: string;
  orgnId?: number;
  scoId?: string;
  contentType: EnContentType;
}

interface FunctionInfomation {
  scormInitialize: (payload: any) => void;
  scormCommit: (payload: any) => void;
  videoOnProgress: (payload: any) => void;
  curriculum: (payload: any) => void;
}

interface LearningWindowStoreData {
  playIndex: number;
  baseInfo?: LearningWindowBaseInfo;
  curriculum?: Curriculum;
  playInfo?: PlayInfo;
  playList?: PlayListItem[];
  setBaseInfo: (v?: LearningWindowBaseInfo) => void;
  setPlayInfo: (v?: PlayInfo) => void;
  setCurriculum: (v?: Curriculum) => void;
  setPlayList: (v?: PlayListItem[]) => void;
  clearInfo: () => void;

  scormInfo: any;
  setScormInfo: (v: any) => void;
  galleryInfo: any;
  setGalleryInfo: (v: any) => void;
  videoInfo: any;
  setVideoInfo: (v: any) => void;
  blogInfo: any;
  setBlogInfo: (v: any) => void;
  funcInfo?: FunctionInfomation;
  setFuncInfo: (v: FunctionInfomation) => void;
}

const useLearningWindowStore = create<LearningWindowStoreData>((set, get) => ({
  playIndex: 0,
  baseInfo: undefined,
  curriculum: undefined,
  playInfo: undefined,
  playList: undefined,
  scormInfo: undefined,
  galleryInfo: undefined,
  videoInfo: undefined,
  blogInfo: undefined,
  funcInfo: undefined,

  setPlayInfo(playInfo?: PlayInfo) {
    if (!playInfo) return;
    const playList = get().playList || [];
    const index = playList?.findIndex(
      (item) => item.moduleId === playInfo.moduleId && item.lessonId === playInfo.lessonId,
    );
    set({
      playInfo,
      playIndex: index !== -1 ? index : 0,
    });
  },

  setBaseInfo(baseInfo?: LearningWindowBaseInfo) {
    set((state) => ({ baseInfo }));
  },

  setCurriculum(curriculum?: Curriculum) {
    set((state) => ({ curriculum }));
  },
  setPlayList(playList?: PlayListItem[]) {
    set((state) => ({ playList }));
  },
  setScormInfo(scormInfo: any) {
    set((state) => ({ scormInfo }));
  },
  setGalleryInfo(galleryInfo: any) {
    set((state) => ({
      galleryInfo,
    }));
  },

  setVideoInfo(videoInfo: any) {
    set((state) => ({
      videoInfo,
    }));
  },

  setBlogInfo(blogInfo: any) {
    set((state) => ({
      blogInfo,
    }));
  },
  setFuncInfo(funcInfo: FunctionInfomation) {
    set((state) => ({
      funcInfo,
    }));
  },

  clearInfo() {
    set((state) => ({
      galleryInfo: undefined,
      scormInfo: undefined,
      videoInfo: undefined,
    }));
  },
}));

export const useLearningWindow = () => {
  const {
    scormInfo,
    galleryInfo,
    videoInfo,
    blogInfo,
    funcInfo,
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
    setGalleryInfo,
    setVideoInfo,
    setBlogInfo,
    setFuncInfo,
    clearInfo,
  } = useLearningWindowStore((state) => state);

  const genPlayInfoByCurriculum = (
    nowBaseInfo: any,
    nowCurriculum: any,
    moduleId?: number,
    lessonId?: number,
  ): PlayInfo | undefined => {
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
      lessonName: lesson.lessonName,
    };
    return playInfo;
  };

  const setPlayListByCurriculum = (curriculum: any) => {
    const playList: any[] = [];
    curriculum?.moduleList &&
      curriculum.moduleList.forEach((module: any) => {
        module?.lessonList?.forEach((lesson: any) => {
          playList.push({
            moduleId: module.moduleId,
            lessonId: lesson.lessonId,
            lessonName: lesson.lessonName,
            moduleName: module.moduleName,
          });
        });
      });
    setPlayList(playList);
  };

  const handleSetCurriculum = (curriculum: any) => {
    setCurriculum(curriculum);
    setPlayListByCurriculum(curriculum);
    if (_baseInfo) {
      const playInfo = genPlayInfoByCurriculum(_baseInfo, curriculum);
      setPlayInfo(playInfo);
    }
  };

  const handleSetPlayInfo = (moduleId: number, lessonId: number) => {
    const playInfo = genPlayInfoByCurriculum(_baseInfo, _curriculum, moduleId, lessonId);
    setPlayInfo(playInfo);
  };

  const gotoNextLesson = () => {
    const nextPoint = _playIndex + 1;
    console.log('------', nextPoint, _playList?.length);
    if (_playList && _playList.length > nextPoint) {
      console.log('------2222');
      const data = _playList[nextPoint];
      handleSetPlayInfo(data.moduleId, data.lessonId);
      return true;
    } else {
      return false;
    }
  };
  const gotoBeforeLesson = () => {
    const nextPoint = _playIndex - 1;
    console.log('before ----', nextPoint, _playList?.length);
    if (_playList && _playList.length > nextPoint && nextPoint >= 0) {
      console.log('before----2222');
      const data = _playList[nextPoint];
      handleSetPlayInfo(data.moduleId, data.lessonId);
      return true;
    } else {
      return false;
    }
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
    galleryInfo,
    setGalleryInfo,
    videoInfo,
    setVideoInfo,
    blogInfo,
    setBlogInfo,
    funcInfo,
    setFuncInfo,
    setPlayInfo: handleSetPlayInfo,
    setCurriculum: handleSetCurriculum,
    gotoNextLesson,
    gotoBeforeLesson,
    clearInfo,
  };
};
