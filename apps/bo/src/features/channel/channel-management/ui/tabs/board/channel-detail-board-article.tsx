import { useState } from 'react';
import { ChannelDetailBoardArticleDetail } from './channel-detail-board-article-detail';
import { ChannelDetailBoardArticleList } from './channel-detail-board-article-list';

const ChannelDetailBoardArticleComponent = () => {
  const [pageMode, setPageMode] = useState('list');
  const [article, setArticle] = useState(0);

  const handleArticleClick = (articleId: number) => {
    setPageMode('view');
    setArticle(articleId);
  };
  return (
    <>
      {pageMode === 'list' && <ChannelDetailBoardArticleList onArticleClick={handleArticleClick} />}
      {pageMode === 'view' && <ChannelDetailBoardArticleDetail />}
    </>
  );
};

export const ChannelDetailBoardArticle = ChannelDetailBoardArticleComponent;
