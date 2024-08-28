import { Content } from '@/entities/content';
import { Chapter } from '@/features/chapter';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initContent = {
  playing: false,
  volume: 0.5,
  playbackRate: 1.0,
  progress: 0,
  duration: 0,
  played: 0,
  muted: false,
  fullscreen: false,
  showSubtitles: false,
  loaded: 0,
  seeking: false,
  // allowSeek: false,
  watchTime: 0,
  lastPlayedTime: 0,
  // url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
};

interface ContentState {
  //거의 비디오 플레이어 위주의 Content-VideoPlayer 상태
  content: any;
  setContent: (obj: any) => void;
  setInitContent: () => void;

  //콜백으로 컨텐츠 변경 응답 받았을때 처리를 위해서 만듦
  chapterList: Chapter[];
  fetchChapterList: (chapterList: Chapter[]) => void;
}

const useContentStore = create(
  persist<ContentState>(
    (set) => ({
      content: initContent,
      setContent: (getContent: any) => {
        set((state: any) => ({
          content: {
            ...state.content,
            ...getContent,
          },
        }));
      },
      setInitContent: () => {
        set({
          content: initContent,
        });
      },
      chapterList: [],
      fetchChapterList: (getChapterList: Chapter[]) => {
        set({
          chapterList: [...getChapterList],
        });
      },
    }),
    {
      name: 'content-store',
    }
  )
);

export default useContentStore;
