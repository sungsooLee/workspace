interface Video {
  id: number;
  progress: number;
  userId: string;
  course: {
    thumbnailUrl: string;
    title: string;
    format: string;
    type: string;
    url?: string;
  };
}

interface VideoProgress extends Video {
  videoId: string;
}

interface VideoDetailRequest {
  videoId: string;
  userId: string;
}
