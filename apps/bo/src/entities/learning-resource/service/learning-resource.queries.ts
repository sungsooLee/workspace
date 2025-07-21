import { getQuerySkipToken } from '@learnway/shared';
import {
  BlogCreateReq,
  BlogUpdateReq,
  ContentBaseInfo,
  ContentCourseMappingParams,
  GetContentDetailRes,
  GetContentsParams,
  HtmlVideoFileChangeReq,
  HtmlVideoMetadataReq,
  PostDraftHtmlVideoParams,
  PostDraftVideosParams,
  QuestionItem,
  QuestionItemDeleteParam,
  TestPaperBasicInfoSaveReq,
} from '@types';
import LearningResourceService from '../api/learning-resource';

export const queryKeys = {
  channelsByTenantId: ['channels-by-tenant-id'] as const,
  userByUuid: ['user-by-uuid'] as const,
  contents: ['contents'] as const,
  contentDetail: ['content-detail'] as const,
  contentCourseMapping: ['content-course-mapping'] as const,
  deleteContent: ['delete-content'] as const,
  createDraftVideo: ['create-draft-video'] as const,
  learningResources: ['learning-resources'] as const,
  curriculumMapping: ['mapping-curriculum'] as const,
  mappingCourses: ['mapping-courses'] as const,
  sharedHistories: ['shared-histories'] as const,
  programGuideDownload: ['program-guide-download'] as const,
  html5Draft: ['html5-draft'] as const,
  html5MetaUpdate: ['html5-update'] as const,
  html5Resource: ['html5-resource'] as const,
  html5Status: ['html5-status'] as const,
  blogResource: ['blog-resource'] as const,
  questionBankQustionList: ['question-bank-qustion-list'] as const,
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
    queryKey: queryKeys.contentDetail,
    queryFn: () => LearningResourceService.fetchContent(contentUuid) as T,
    cacheTime: 0,
    staleTime: 0,
    enabled: !!contentUuid,
  }),
  getContentCourseMapping: (contentUuid: string, params: ContentCourseMappingParams) => ({
    queryKey: queryKeys.contentCourseMapping,
    queryFn: () => LearningResourceService.fetchContentCourseMapping(contentUuid, params),
  }),
  postDraftVideos: (params: PostDraftVideosParams) => ({
    queryKey: queryKeys.createDraftVideo,
    queryFn: () => LearningResourceService.postDraftVideos(params),
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
    queryKey: queryKeys.html5Status,
    queryFn: () => LearningResourceService.fetchHTML5Status(contentUuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
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
          queryKey: queryKeys.questionBankQustionList,
          queryFn: () => LearningResourceService.getQuestionItemList(examPoolUuid),
        }
      : getQuerySkipToken<QuestionItem[]>(),
};

export const mutateOptions = {
  postContentCopy: () => ({
    mutationFn: (contentUuid: string) => LearningResourceService.postContentCopy(contentUuid),
  }),
  postDraftVideos: () => ({
    mutationFn: (params: PostDraftVideosParams) => LearningResourceService.postDraftVideos(params),
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
};
