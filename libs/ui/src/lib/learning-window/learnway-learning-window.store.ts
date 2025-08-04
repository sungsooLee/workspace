import { create } from 'zustand';
import {
  CmsBlogResource,
  CmsContentProgressMultiReq,
  CmsContentProgressMultiRes,
  CmsContentProgressReq,
  CmsContentProgressResDto,
  CmsEnContentType,
  CmsHtml5LearningReq,
  CmsHtml5Resource,
  CmsImageLearningReq,
  CmsImageResource,
  CmsLearningCompletionStatus,
  CmsOtherInfo,
  CmsScormRteCommitReq,
  CmsScormRteInitializeReq,
  CmsScormRteScoInfo,
  CmsVideoResource,
  CmsVideoWatchLogReq,
  CmsVideoWatchLogStatisticsReq,
} from '@learnway/types';

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
  contentType: CmsEnContentType;
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
  /** 과정 이름 */
  courseName: string;
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
  isDummy: boolean;
  moduleId: number;
  mappingModuleType: string;
  lessonList: Lesson[];
  moduleName: string;
  lessonId: number;
  contentUuid: string;
  orgnId: number;
  itemId: number;
}

/** 레슨 정보 */
interface Lesson {
  lessonId: number;
  contentUuid: string;
  orgnId?: number;
  scoId?: string;
  contentType: CmsEnContentType;
}

/** 스콤 및 비디오 player 에서 사용할 함수 정보 */
interface FunctionInfomation {
  /** 스콤  Initialize 호출 함수 */
  scormInitialize: (payload: CmsScormRteInitializeReq) => void;
  /** 스콤 Commit 호출 함수 */
  scormCommit: (payload: CmsScormRteCommitReq) => void;
  /** 비디오 Progress 호출 함수 */
  videoOnProgress: (payload: CmsVideoWatchLogReq) => void;
  /** 비디오 이력 정제 처리 호출 */
  videoWatchStatistics: (payload: CmsVideoWatchLogStatisticsReq) => void;
  /** Html5 학습 이력 저장 */
  html5LearningHistory: (payload: CmsHtml5LearningReq) => void;
  /** galleary 학습 이력 저장 */
  galleryLearningHistory: (payload: CmsImageLearningReq) => void;
  /** 커리큘럼의 모든 lesson의 진척 조회 함수 */
  lessonProgress: (payload: CmsContentProgressMultiReq) => Promise<CmsContentProgressMultiRes>;
  /** 기타/라이브/링크 클릭 */
  otherClickButton: (playInfo: LearningWindowPlayInfo, otherInfo: any) => Promise<void>;
}

interface LearningWindowStoreData {
  playIndex: number;
  baseInfo?: LearningWindowBaseInfo;
  curriculum?: Curriculum;
  playInfo?: LearningWindowPlayInfo;
  playList?: PlayListItem[];
  progressInfo: Map<string, CmsContentProgressResDto>;
  setBaseInfo: (v?: LearningWindowBaseInfo) => void;
  setPlayInfo: (v?: LearningWindowPlayInfo) => void;
  setCurriculum: (v?: Curriculum) => void;
  setPlayList: (v?: PlayListItem[]) => void;
  setProgressInfo: (v: Map<string, CmsContentProgressResDto>) => void;
  clearInfo: () => void;

  scormInfo?: CmsScormRteScoInfo;
  setScormInfo: (v?: CmsScormRteScoInfo) => void;
  galleryInfo?: CmsImageResource;
  setGalleryInfo: (v?: CmsImageResource) => void;
  videoInfo?: CmsVideoResource;
  setVideoInfo: (v?: CmsVideoResource) => void;
  blogInfo?: CmsBlogResource;
  setBlogInfo: (v?: CmsBlogResource) => void;
  htmlInfo?: CmsHtml5Resource;
  setHtmlInfo: (v?: CmsHtml5Resource) => void;
  /** ebookInfo 는 scormInfo 와 동일 한 값이다. (스콤 변형 형태로 컨텐츠를 제공 하는 것으로 보임) */
  ebookInfo?: any;
  setEbookInfo: (v?: any) => void;

  otherInfo?: CmsOtherInfo;
  setOtherInfo: (v?: CmsOtherInfo) => void;

  funcInfo?: FunctionInfomation;
  setFuncInfo: (v?: FunctionInfomation) => void;
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
  otherInfo: undefined,
  funcInfo: undefined,
  progressInfo: new Map(),

  setPlayInfo(playInfo?: LearningWindowPlayInfo) {
    if (!playInfo) {
      set({ playInfo });
      return;
    }
    const playList = get().playList || [];
    const index = playList.findIndex(
      (item) => item.moduleId === playInfo.moduleId && item.lessonId === playInfo.lessonId,
    );
    set({
      playInfo,
      playIndex: index !== -1 ? index : 0,
    });
  },

  setBaseInfo(baseInfo) {
    set((state) => ({ baseInfo }));
  },
  setProgressInfo(progressInfo) {
    set((state) => ({ progressInfo }));
  },
  setCurriculum(curriculum) {
    set((state) => ({ curriculum }));
  },
  setPlayList(playList) {
    set((state) => ({ playList }));
  },
  setScormInfo(scormInfo) {
    set((state) => ({ scormInfo }));
  },
  setGalleryInfo(galleryInfo) {
    set((state) => ({
      galleryInfo,
    }));
  },

  setVideoInfo(videoInfo) {
    set((state) => ({
      videoInfo,
    }));
  },

  setBlogInfo(blogInfo) {
    set((state) => ({
      blogInfo,
    }));
  },
  setHtmlInfo(htmlInfo) {
    set((state) => ({
      htmlInfo,
    }));
  },
  setEbookInfo(ebookInfo: any) {
    set((state) => ({
      ebookInfo,
    }));
  },
  setOtherInfo(otherInfo) {
    set((state) => ({
      otherInfo,
    }));
  },
  setFuncInfo(funcInfo) {
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
    otherInfo,
    funcInfo,
    playIndex: _playIndex,
    playList: _playList,
    baseInfo: _baseInfo,
    curriculum: _curriculum,
    playInfo: _playInfo,
    progressInfo,
    setBaseInfo,
    setProgressInfo,
    setPlayInfo,
    setCurriculum,
    setPlayList,

    setScormInfo,
    setGalleryInfo,
    setVideoInfo,
    setBlogInfo,
    setHtmlInfo,
    setEbookInfo,
    setOtherInfo,
    setFuncInfo,
    clearInfo,
  } = useLearningWindowStore((state) => state);

  const readAllLessonProgress = async (curriculum: Curriculum) => {
    //_baseInfo
    const contents: CmsContentProgressReq[] = [];
    if (curriculum.moduleList) {
      curriculum.moduleList.forEach((module) => {
        if (module.isDummy) {
          contents.push({
            courseSequenceId: _baseInfo?.sequenceId,
            courseId: _baseInfo?.courseId,
            curriculumId: _baseInfo?.curriculumId,
            moduleId: module.moduleId,
            lessonId: module.lessonId,
            contentUuid: module.contentUuid,
            orgnId: module.orgnId,
            itemId: module.itemId,
          });
        } else if (module.lessonList) {
          module.lessonList.forEach((lesson: any) => {
            contents.push({
              courseSequenceId: _baseInfo?.sequenceId,
              courseId: _baseInfo?.courseId,
              curriculumId: _baseInfo?.curriculumId,
              moduleId: module.moduleId,
              lessonId: lesson.lessonId,
              contentUuid: lesson.contentUuid,
              orgnId: lesson.orgnId,
              itemId: lesson.itemId,
            });
          });
        }
      });
    }
    if (contents.length > 0) {
      const payload: any = { contents };
      const data = await funcInfo?.lessonProgress(payload);
      console.log('lesson Progress', data);
      if (data && data.progressList) {
        const progressMap = new Map();
        data.progressList.forEach((item: any) => {
          progressMap.set(`${item.moduleId}_${item.lessonId}`, item);
        });
        setProgressInfo(progressMap);
      }
    }
  };

  /**
   * moduleId와 lessonId 가 없는 경우 학습창 처음 lesson으로 playInfo를 만듬
   * @param nowBaseInfo
   * @param nowCurriculum
   * @param moduleId
   * @param lessonId
   * @returns
   */
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
    if (module.isDummy) {
      return {
        courseId: nowBaseInfo?.courseId,
        sequenceId: nowBaseInfo?.sequenceId,
        curriculumId: nowBaseInfo?.curriculumId,
        moduleId: module.moduleId,
        mappingModuleType: module.mappingModuleType,
        lessonId: module.lessonId,
        contentUuid: module.contentUuid,
        orgnId: module.orgnId,
        scoId: module.scoId,
        contentType: module.contentType,
        lessonName: module.lessonName,
      };
    }
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
        if (module?.isDummy) {
          playList.push({
            moduleId: module.moduleId,
            lessonId: module.lessonId,
            lessonName: module.lessonName,
            moduleName: module.moduleName,
          });
        } else {
          module?.lessonList?.forEach((lesson: any) => {
            playList.push({
              moduleId: module.moduleId,
              lessonId: lesson.lessonId,
              lessonName: lesson.lessonName,
              moduleName: module.moduleName,
            });
          });
        }
      });
    setPlayList(playList);
  };

  const handleSetCurriculum = (curriculum: any) => {
    clearInfo();
    setPlayInfo(undefined);
    setCurriculum(curriculum);
    setPlayListByCurriculum(curriculum);
    if (_baseInfo) {
      if (_baseInfo.moduleId && _baseInfo.lessonId) {
        handleSetPlayInfo(_baseInfo.moduleId, _baseInfo.lessonId, curriculum);
      } else {
        const playInfo = genPlayInfoByCurriculum(_baseInfo, curriculum);
        setPlayInfo(playInfo);
      }
      //lesson Progress 정보 처리
      readAllLessonProgress(curriculum);
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

  const getProgressNumber = (moduleId: number, lessonId: number) => {
    if (progressInfo) {
      const key = `${moduleId}_${lessonId}`;
      const item = progressInfo.get(key);
      if (item) {
        return item.completionStatus === CmsLearningCompletionStatus.COMPLETED ? 100 : 0;
      }
    }

    return 0;
  };

  const resetProgressive = () => {
    if (_curriculum) {
      readAllLessonProgress(_curriculum);
    }
  };

  return {
    playIndex: _playIndex,
    playList: _playList,
    baseInfo: _baseInfo,
    curriculum: _curriculum,
    playInfo: _playInfo,
    progressInfo,

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
    otherInfo,
    setOtherInfo,
    funcInfo,
    setFuncInfo,
    setPlayInfo: handleSetPlayInfo,
    setCurriculum: handleSetCurriculum,
    gotoNextLesson,
    gotoBeforeLesson,
    clearInfo,
    getProgressNumber,
    resetProgressive,
  };
};
