import { create } from 'zustand';

export enum EnContentType {
  VIDEO = 'VIDEO',
  EBOOK = 'EBOOK',
  SCORM = 'SCORM',
  IMAGE = 'IMAGE',
  BLOG = 'BLOG',
  HTML5_VIDEO = 'HTML5_VIDEO',
  EXTERNAL_LINK = 'EXTERNAL_LINK',
}

export interface LearningWindowPlayInfo {
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

/**
 * 학습창 호출 기본 정보
 */
export interface LearningWindowBaseInfo {
  /** 과정 ID   */
  courseId: number;
  /** 과정 차수 ID */
  sequenceId: number;
  /** 커리큘럼Id */
  curriculumId: number;

  // 커리큘럼의 레슨을 직접 학습 하기 위한 정보
  /** 커리큘럼 모듈 ID */
  moduleId?: number;
  /** 커리큘럼 모듈 의 레슨 ID */
  lessonId?: number;
}

/** 이전 다음 처리를 위한 모든 레슨 순서 아이템 */
interface PlayListItem {
  moduleId: number;
  lessonId: number;
  lessonName: string;
  moduleName: string;
}

/** 커리큘럼 정보 */
interface Curriculum {
  moduleList: Module[];
}

/** 모듈 정보 */
interface Module {
  moduleId: number;
  mappingModuleType: string;
  lessonList: Lesson[];
  moduleName: string;
}

/** 레슨 정보 */
interface Lesson {
  lessonId: number;
  contentUuid: string;
  orgnId?: number;
  scoId?: string;
  contentType: EnContentType;
}

/** 스콤 및 비디오 player 에서 사용할 함수 정보 */
interface FunctionInfomation {
  /** 스콤  Initialize 호출 함수 */
  scormInitialize: (payload: any) => void;
  /** 스콤 Commit 호출 함수 */
  scormCommit: (payload: any) => void;
  /** 비디오 Progress 호출 함수 */
  videoOnProgress: (payload: any) => void;
  /** 커리큘럼의 모든 lesson의 진척 조회 함수 */
  lessonProgress: (payload: any) => void;
}

interface LearningWindowStoreData {
  playIndex: number;
  baseInfo?: LearningWindowBaseInfo;
  curriculum?: Curriculum;
  playInfo?: LearningWindowPlayInfo;
  playList?: PlayListItem[];
  setBaseInfo: (v?: LearningWindowBaseInfo) => void;
  setPlayInfo: (v?: LearningWindowPlayInfo) => void;
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
  htmlInfo: any;
  setHtmlInfo: (v: any) => void;
  /** ebookInfo 는 scormInfo 와 동일 한 값이다. (스콤 변형 형태로 컨텐츠를 제공 하는 것으로 보임) */
  ebookInfo: any;
  setEbookInfo: (v: any) => void;

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
  htmlInfo: undefined,
  ebookInfo: undefined,
  funcInfo: undefined,

  setPlayInfo(playInfo?: LearningWindowPlayInfo) {
    if (!playInfo) return;
    const playList = get().playList || [];
    const index = playList.findIndex(
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
  setHtmlInfo(htmlInfo: any) {
    set((state) => ({
      htmlInfo,
    }));
  },
  setEbookInfo(ebookInfo: any) {
    set((state) => ({
      ebookInfo,
    }));
  },
  setFuncInfo(funcInfo?: FunctionInfomation) {
    set((state) => ({
      funcInfo,
    }));
  },

  clearInfo() {
    set((state) => ({
      galleryInfo: undefined,
      scormInfo: undefined,
      videoInfo: undefined,
      blogInfo: undefined,
      htmlInfo: undefined,
      ebookInfo: undefined,
    }));
  },
}));

export const useLearningWindow = () => {
  const {
    scormInfo,
    galleryInfo,
    videoInfo,
    blogInfo,
    htmlInfo,
    ebookInfo,
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
    setHtmlInfo,
    setEbookInfo,
    setFuncInfo,
    clearInfo,
  } = useLearningWindowStore((state) => state);

  const genPlayInfoByCurriculum = (
    nowBaseInfo: any,
    nowCurriculum: any,
    moduleId?: number,
    lessonId?: number,
  ): LearningWindowPlayInfo | undefined => {
    if (!nowCurriculum?.moduleList?.length) {
      console.error('moduleList is not set or empty', nowCurriculum);
      return undefined;
    }

    let module = nowCurriculum.moduleList.find((m: any) => m.moduleId === moduleId);
    console.log('module 1', module);
    if (!module) module = nowCurriculum.moduleList[0];
    console.log('module 2', module);
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
      if (_baseInfo.moduleId && _baseInfo.lessonId) {
        handleSetPlayInfo(_baseInfo.moduleId, _baseInfo.lessonId, curriculum);
      } else {
        const playInfo = genPlayInfoByCurriculum(_baseInfo, curriculum);
        setPlayInfo(playInfo);
      }
    }
  };

  const handleSetPlayInfo = (moduleId: number, lessonId: number, curriculum?: any) => {
    const workCurriculum = curriculum || _curriculum;
    const playInfo = genPlayInfoByCurriculum(_baseInfo, workCurriculum, moduleId, lessonId);
    console.log('============', playInfo);
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
    htmlInfo,
    setHtmlInfo,
    ebookInfo,
    setEbookInfo,
    funcInfo,
    setFuncInfo,
    setPlayInfo: handleSetPlayInfo,
    setCurriculum: handleSetCurriculum,
    gotoNextLesson,
    gotoBeforeLesson,
    clearInfo,
  };
};
