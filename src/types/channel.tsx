export interface ChannelProfileProps {
  title: string;
  description: string;
  profileImage: string;
}

export interface ChannelDetailProps {
  youtbeLink: string;
  subscribers: string;
  videos: string;
  views: string;
}

export interface Video {
  id: number;
  course: {
    thumbnailUrl: string;
    title: string;
    format: string;
    type: string;
    url?: string;
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
