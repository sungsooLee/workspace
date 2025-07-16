export interface CmsImageContent {
  contentUuid: string;
  contentType: string;
  images: CmsImageItem[];
}

export interface CmsImageItem {
  resourceId: number;
  contentUuid: string;
  sortOrder: number;
  fileUuid: string;
  fileName: string;
  fileSize: number;
  itemUrl: string;
}

export interface CmsVideoContent {
  contentUuid: string;
  contentName: string;
  langCountryCode: string;
  masterVideo: string;
  encodedVideos: any[];
  videoDuration: number;
  lastVideoEndTime: number;
  progress: number;
  videoSubtitles: any[];
}
