import { getQuerySkipToken } from '@learnway/shared';
import {
  BlogCreateReq,
  BlogUpdateReq,
  ContentBaseInfo,
  ContentCourseMappingParams,
  ExamQuestionGenType,
  GetContentDetailRes,
  GetContentsParams,
  HtmlVideoFileChangeReq,
  HtmlVideoMetadataReq,
  PostDraftHtmlVideoParams,
  PostDraftScormParams,
  PostDraftVideosParams,
  PutScormChangeParams,
  PutScormUpdateParams,
  PutVideoChangeParams,
  PutVideoUpdateParams,
  QuestionsCopyReq,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionListForRetrieveReq,
  QuestionStatusUpdateReq,
  RandomQuestionCountUpdateReq,
  TestPaperBasicInfoSaveReq,
  PostDraftETCParams,
} from '@types';
import LearningResourceService from '../api/learning-resource';

export const queryKeys = {
  channelsByTenantId: ['channels-by-tenant-id'] as const,
  userByUuid: ['user-by-uuid'] as const,
  contents: ['contents'] as const,
  contentDetail: (contentUuid: string) => ['content-detail', contentUuid] as const,
  contentCourseMapping: (contentUuid: string) => ['content-course-mapping', contentUuid] as const,
  deleteContent: ['delete-content'] as const,
  createDraftVideo: ['create-draft-video'] as const,
  videoChange: ['video-change'] as const,
  learningResources: ['learning-resources'] as const,
  curriculumMapping: ['mapping-curriculum'] as const,
  mappingCourses: ['mapping-courses'] as const,
  sharedHistories: ['shared-histories'] as const,
  programGuideDownload: ['program-guide-download'] as const,
  html5Draft: ['html5-draft'] as const,
  html5MetaUpdate: ['html5-update'] as const,
  html5Resource: ['html5-resource'] as const,
  html5Status: (contentUuid: string) => ['html5-status', contentUuid] as const,
  html5FileChangeStatus: (changeId: number) => ['html5-file-change-status', changeId] as const,
  blogResource: ['blog-resource'] as const,
  questionBankQuestionList: ['question-bank-question-list'] as const,
  questionBankQuestionItem: (examQuestionUuid: string) =>
    ['question-bank-question-item', examQuestionUuid] as const,
  randomQuestionCount: (examUuid: string) => ['random-question-count', examUuid] as const,
  questionListForRetrieve: ['question-list-for-retrieve'] as const,
};

export const learningResourceQueryOptions = {
  getChannelsByTenantId: (param: { tenantId: string | number; channelName?: string }) => ({
    queryKey: queryKeys.channelsByTenantId,
    queryFn: () => LearningResourceService.fetchChannelsByTenantId(param),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getUser: (uuid: string) => ({
    queryKey: queryKeys.userByUuid,
    queryFn: () => LearningResourceService.fetchUser(uuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getContents: (params: GetContentsParams) => ({
    queryKey: queryKeys.contents,
    queryFn: () => LearningResourceService.fetchContents(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getContent: <T = GetContentDetailRes>(contentUuid: string) => ({
    queryKey: queryKeys.contentDetail(contentUuid),
    queryFn: () => LearningResourceService.fetchContent(contentUuid) as T,
    cacheTime: 0,
    staleTime: 0,
    enabled: !!contentUuid,
  }),
  getContentCourseMapping: (contentUuid: string, params: ContentCourseMappingParams) => ({
    queryKey: queryKeys.contentCourseMapping(contentUuid),
    queryFn: () => LearningResourceService.fetchContentCourseMapping(contentUuid, params),
  }),
  getLearningResources: (params: any) => ({
    queryKey: queryKeys.learningResources,
    queryFn: () => LearningResourceService.fetchLearningResources(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getCurriculumsMapping: (contentUuid: string) => ({
    queryKey: queryKeys.curriculumMapping,
    queryFn: () => LearningResourceService.fetchCurriculumMapping(contentUuid),
    enabled: !!contentUuid,
  }),
  getSharedHistories: (params: any) => ({
    queryKey: queryKeys.sharedHistories,
    queryFn: () => LearningResourceService.fetchSharedHistories(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getProgramGuideDownload: (params: any) => ({
    queryKey: queryKeys.programGuideDownload,
    queryFn: () => LearningResourceService.fetchProgramGuideDownload(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),

  getHTML5Resource: (contentUuid: string) => ({
    queryKey: queryKeys.html5Resource,
    queryFn: () => LearningResourceService.fetchHTML5Resource(contentUuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getHTML5Status: (contentUuid: string) => ({
    queryKey: queryKeys.html5Status(contentUuid),
    queryFn: () => LearningResourceService.fetchHTML5Status(contentUuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!contentUuid,
  }),
  getHTML5FileChangeStatus: (changeId: number) => ({
    queryKey: queryKeys.html5FileChangeStatus(changeId),
    queryFn: () => LearningResourceService.fetchHTML5FileChangeStatus(changeId),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!changeId,
  }),
  getBlogContent: (contentUuid: string) => ({
    queryKey: queryKeys.blogResource,
    queryFn: () => LearningResourceService.fetchBlogResource(contentUuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getQuestionItemList: (examPoolUuid?: string) =>
    examPoolUuid
      ? {
          queryKey: queryKeys.questionBankQuestionList,
          queryFn: () => LearningResourceService.getQuestionItemList(examPoolUuid),
          enabled: !!examPoolUuid,
        }
      : getQuerySkipToken<QuestionItem[]>(),

  getQuestionItem: (examQuestionUuid?: string) =>
    examQuestionUuid
      ? {
          queryKey: queryKeys.questionBankQuestionItem(examQuestionUuid),
          queryFn: () => LearningResourceService.getQuestionItem(examQuestionUuid),
          enabled: !!examQuestionUuid,
        }
      : getQuerySkipToken<QuestionItem>(),

  getExamRandomQuestionCount: (examUuid: string, questionGenType: ExamQuestionGenType) => ({
    queryKey: queryKeys.randomQuestionCount(examUuid),
    queryFn: () => LearningResourceService.fetchExamRandomQuestionCount(examUuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!examUuid && questionGenType === ExamQuestionGenType.RANDOM,
  }),

  getQuestionListForRetrieve: (params: QuestionListForRetrieveReq) => ({
    queryKey: queryKeys.questionListForRetrieve,
    queryFn: () => LearningResourceService.fetchQuestionListForRetrieve(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
};

export const mutateOptions = {
  postContentCopy: () => ({
    mutationFn: (contentUuid: string) => LearningResourceService.postContentCopy(contentUuid),
  }),
  postDraftVideos: () => ({
    mutationFn: (params: PostDraftVideosParams) => LearningResourceService.postDraftVideos(params),
  }),
  postDraftScorm: () => ({
    mutationFn: (params: PostDraftScormParams) => LearningResourceService.postDraftScorm(params),
  }),
  postDraftETC: () => ({
    mutationFn: (params: PostDraftETCParams) => LearningResourceService.postDraftETC(params),
  }),
  putVideoUpdate: () => ({
    mutationFn: (params: PutVideoUpdateParams) => LearningResourceService.putVideoUpdate(params),
  }),
  putScormUpdate: () => ({
    mutationFn: (params: PutScormUpdateParams) => LearningResourceService.putScormUpdate(params),
  }),
  putVideoChange: () => ({
    mutationFn: (params: PutVideoChangeParams) => LearningResourceService.putVideoChange(params),
  }),
  putScormChange: () => ({
    mutationFn: (params: PutScormChangeParams) => LearningResourceService.putScormChange(params),
  }),
  postDraftHTML5: () => ({
    mutationFn: (params: PostDraftHtmlVideoParams) =>
      LearningResourceService.createHTML5Draft(params),
  }),
  updateHTML5Metadata: () => ({
    mutationFn: (params: HtmlVideoMetadataReq) =>
      LearningResourceService.updateHTML5Metadata(params),
  }),
  updateHTML5FileChange: () => ({
    mutationFn: (params: HtmlVideoFileChangeReq) =>
      LearningResourceService.updateHTML5FileChange(params),
  }),
  createBlogContent: () => ({
    mutationFn: (params: BlogCreateReq) => LearningResourceService.createBlogContent(params),
  }),
  updateBlogContent: () => ({
    mutationFn: (params: BlogUpdateReq) => LearningResourceService.updateBlogContent(params),
  }),
  deleteContent: () => ({
    mutationFn: (contentUuid: string) => LearningResourceService.deleteContent(contentUuid),
  }),
  createExamPaperContent: () => ({
    mutationFn: (params: TestPaperBasicInfoSaveReq) =>
      LearningResourceService.createExamPaperContent(params),
  }),
  updateExamPaperContent: () => ({
    mutationFn: (params: TestPaperBasicInfoSaveReq) =>
      LearningResourceService.updateExamPaperContent(params),
  }),
  createQuestionBankContent: () => ({
    mutationFn: (params: ContentBaseInfo) =>
      LearningResourceService.createQuestionBankContent(params),
  }),

  updateQuestionBankContent: () => ({
    mutationFn: (params: ContentBaseInfo) =>
      LearningResourceService.updateQuestionBankContent(params),
  }),
  createQuestionItem: () => ({
    mutationFn: (params: QuestionItem) => LearningResourceService.createQuestionItem(params),
  }),
  deleteQuestionItemList: () => ({
    mutationFn: (param: QuestionItemDeleteParam) =>
      LearningResourceService.deleteQuestionItemList(param),
  }),
  updateQuestionStatus: () => ({
    mutationFn: (params: QuestionStatusUpdateReq) =>
      LearningResourceService.updateQuestionStatus(params),
  }),
  updateExamPaperQuestionCountInfo: () => ({
    mutationFn: (params: RandomQuestionCountUpdateReq) =>
      LearningResourceService.updateExamPaperQuestionCountInfo(params),
  }),
  copyQuestionsToExamPaper: () => ({
    mutationFn: (params: QuestionsCopyReq) =>
      LearningResourceService.copyQuestionsToExamPaper(params),
  }),
};
