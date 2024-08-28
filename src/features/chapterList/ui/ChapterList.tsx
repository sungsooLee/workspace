import { Chapter } from '@/features/chapter';
import { ChapterRender } from '@/features/chapter/ui/Chapter';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
import React from 'react';

export const ChapterList = (props: Chapter[]) => {
  const list: Chapter[] = Object.values(props);
  const firstChapterId = list[0]?.chapterId;
  return (
    <div key={`chapter-list-${firstChapterId || 'default'}`}>
      {list &&
        list.length > 0 &&
        list.map((chapter: Chapter) => {
          return (
            <FetchBoundary>
              <div className='m-2' key={chapter.chapterId}>
                <ChapterRender {...chapter} />
              </div>
            </FetchBoundary>
          );
        })}
    </div>
  );
};

export const MemoizedChapter = React.memo(ChapterList);
