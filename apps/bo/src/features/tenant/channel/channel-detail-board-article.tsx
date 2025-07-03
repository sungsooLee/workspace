import { useState, useCallback } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { cn } from '@learnway/shared';
import {
  Button,
  GridBox,
  Checkbox,
  DatePicker,
  Input,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { formUtils } from '@entities/form-utils';
import { ChannelDetailBoardArticleList } from './channel-detail-board-article-list';
import { ChannelDetailBoardArticleDetail } from './channel-detail-board-article-detail';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

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
