export interface ChannelProfileProps {
  title: string;
  description: string;
  profileImage: string;
}

export interface ChannelDetailProps {
  yotubeLink: string;
  subscribers: string;
  videos: string;
  views: string;
}

export interface Video {
  id: number;
  course: {
    thumbnailUrl: string;
    title: string;
  };
}

export interface PagenationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}
