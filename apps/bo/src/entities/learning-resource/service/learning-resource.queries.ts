import { BlogCreateReq, BlogUpdateReq, BlogWatchLogReq, PostDraftVideosParams } from '@types';
import LearningResourceService from '../api/learning-resource';

export const queryKeys = {
  channelsByTenantId: ['channels-by-tenant-id'] as const,
  userByUuid: ['user-by-uuid'] as const,
  contents: ['contents'] as const,
  contentDetail: ['content-detail'] as const,
  createDraftVideo: ['create-draft-video'] as const,
  s3FileDownload: ['file-s3-download'] as const,
  learningResources: ['learning-resources'] as const,
  curriculumMapping: ['mapping-curriculum'] as const,
  mappingCourses: ['mapping-courses'] as const,
  sharedHistories: ['shared-histories'] as const,
  programGuideDownload: ['program-guide-download'] as const,
  html5Draft: ['html5-draft'] as const,
  html5FileChange: ['html5-file-change'] as const,
  html5Resource: ['html5-resource'] as const,
  blogResource: ['blog-resource'] as const,
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
  getContents: (params: any) => ({
    queryKey: queryKeys.contents,
    queryFn: () => LearningResourceService.fetchContents(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getContent: (contentUuid: string) => ({
    queryKey: queryKeys.contentDetail,
    queryFn: () => LearningResourceService.fetchContent(contentUuid),
  }),
  postDraftVideos: (params: PostDraftVideosParams) => ({
    queryKey: queryKeys.createDraftVideo,
    queryFn: () => LearningResourceService.postDraftVideos(params),
  }),
  getS3FileDownload: (key: string, fileName: string) => ({
    queryKey: queryKeys.s3FileDownload,
    queryFn: () => LearningResourceService.fetchS3FileDownload(key, fileName),
    cacheTime: 1000 * 60 * 60,
    staleTime: 0,
    enabled: true,
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
  }),
  getCoursesMapping: (contentUuid: string) => ({
    queryKey: queryKeys.mappingCourses,
    queryFn: () => LearningResourceService.fetchCourseMapping(contentUuid),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getSharedHistories: (params: any) => ({
    queryKey: queryKeys.mappingCourses,
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

  createHTML5Draft: (params: {
    tenantId: string;
    tenantName: string;
    channelUuid: string;
    languageCountryCode: string;
    fileUuid: string;
  }) => ({
    queryKey: queryKeys.html5Draft,
    queryFn: () => LearningResourceService.createHTML5Draft(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  updateHTML5FileChange: (params: { contentUuid: string; fileUuid: string }) => ({
    queryKey: queryKeys.html5FileChange,
    queryFn: () => LearningResourceService.updateHTML5FileChange(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getHTML5Resource: (contentUuid: string) => ({
    queryKey: queryKeys.html5Resource,
    queryFn: () => LearningResourceService.fetchHTML5Resource(contentUuid),
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
};

export const mutateOptions = {
  postDraftVideos: () => ({
    mutationFn: (params: PostDraftVideosParams) => LearningResourceService.postDraftVideos(params),
  }),
  createBlogContent: () => ({
    mutationFn: (params: BlogCreateReq) => LearningResourceService.createBlogContent(params),
  }),
  updateBlogContent: () => ({
    mutationFn: (params: BlogUpdateReq) => LearningResourceService.updateBlogContent(params),
  }),
  saveBlogWatchLog: () => ({
    mutationFn: (params: BlogWatchLogReq) => LearningResourceService.saveBlogWatchLog(params),
  }),
};
