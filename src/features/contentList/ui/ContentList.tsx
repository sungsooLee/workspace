import { Content } from '@/entities/content';
import { ContentRender } from '@/entities/content/ui/Content';

export const ContentList = ({ contentList }: { contentList: Content[] }) => {
  return (
    <>
      {contentList &&
        contentList.length > 0 &&
        contentList.map((content: Content) => {
          return (
            <div className='m-2' key={'content-' + content.contentId}>
              <ContentRender {...content} />
            </div>
          );
        })}
    </>
  );
};
