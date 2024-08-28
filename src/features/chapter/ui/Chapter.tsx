import { useEffect, useState } from 'react';
import { Chapter } from '../model/types';
import { Content } from '@/entities/content';
import { ContentList } from '@/features/contentList';

export const ChapterRender = (props: Chapter) => {
  const [contentList, setContentList] = useState<any[]>();

  useEffect(() => {
    if (props && props.contentSeqList) {
      let listBySortSeq: Content[] = [...props.contentSeqList].sort((a, b) => {
        return a.seq - b.seq;
      });
      listBySortSeq.forEach((item) => {
        item.kitId = props.kitId;
        item.chapterId = props.chapterId;
      });
      if (listBySortSeq) setContentList(listBySortSeq);
    }
  }, [props]);
  return (
    <>
      <div className='w-full bg-slate-400 p-10pxr'>
        <p>{props.chapterName}</p>
        {/* {contentList && <ContentList {...contentList} />} */}
        {contentList && <ContentList contentList={contentList} />}
      </div>
    </>
  );
};
