// IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 교육자원조회_나의 교육자원_등록_동영상
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { NotFound } from '@features/layout';
import { LEARNING_TYPE } from '@learnway/config';
import { useCurrentRoute } from '@learnway/hooks';
import { PageContainer } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  BlogView,
  EtcView,
  HtmlView,
  ScormView,
  VideoView,
} from '@widgets/learning/learning-resource';
import { ExamView } from '@widgets/learning/learning-resource/exam-view';
import { QuestionBasicInfoDetail, TestPaperBasicInfoDetail } from '@types';
import { ExamPoolView } from '@widgets/learning/learning-resource/exam-pool-view';

export const Route = createFileRoute('/_layout/learning/learning-resource/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    state: { contentUuid },
  } = useCurrentRoute();
  const { data: content, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  if (!contentUuid || fetchError) {
    if (fetchError) console.error('🚀 ~ RouteComponent ~ fetchError:', fetchError);
    return <NotFound />;
  }

  if (!content) {
    return <PageContainer />;
  }

  switch (content.contentType) {
    case LEARNING_TYPE.VIDEO:
      return <VideoView content={content} hasMapping={hasMapping} />;
    case LEARNING_TYPE.SCORM:
      return <ScormView content={content} hasMapping={hasMapping} />;
    case LEARNING_TYPE.ETC:
      return <EtcView content={content} hasMapping={hasMapping} />;
    case LEARNING_TYPE.HTML5_VIDEO:
      return <HtmlView content={content} hasMapping={hasMapping} />;
    case LEARNING_TYPE.BLOG:
      return <BlogView content={content} hasMapping={hasMapping} />;
    case LEARNING_TYPE.EXAM:
      return <ExamView content={content as TestPaperBasicInfoDetail} hasMapping={hasMapping} />;
    case LEARNING_TYPE.EXAM_POOL:
      return <ExamPoolView content={content as QuestionBasicInfoDetail} hasMapping={hasMapping} />;
  }

  return <NotFound />;
}
