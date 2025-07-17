//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 학습자원조회_나의 학습자원_등록_동영상(자체)

import { createLazyFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, useModal } from '@learnway/ui';
import {
  PageContainer,
  MainContents,
  ContentsButtons,
  LinkBox,
  SubContents,
  ContentCourseMappingModal,
} from '@shared/ui';
import {
  CODE_GROUP,
  DynamicFormConfig,
  DynamicFormValues,
  useCurrentRoute,
  useDynamicForm,
  useDynamicForm2,
} from '@learnway/hooks';
import { useQuery } from '@tanstack/react-query';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { NotFound } from '@features/layout';
import { useCallback, useEffect } from 'react';
import { LearningResourceVideoDetail, MovieInfo } from '@features/learning-resource';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/video/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const {
    state: { contentUuid },
  } = useCurrentRoute();
  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  const router = useRouter();
  const { provider, onSubmit, onFormChange, getValues } = useDynamicForm2();

  useEffect(() => {
    if (data) onFormChange(data);
  }, [data]);

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  const handleCourseMapping = useCallback(() => {
    openModal({
      content: (
        <ContentCourseMappingModal
          contentUuid={contentUuid}
          channelUuid={data?.channelUuid || ''}
        />
      ),
      width: 'lg',
    });
  }, [data]);

  const permission = 'READ' as string; //user permission 정보 가져와야 함

  if (fetchError) {
    console.log('🚀 ~ RouteComponent ~ fetchError:', fetchError);
    return <NotFound />;
  }

  if (!data) {
    return <PageContainer />;
  }
  const debug = true;

  return (
    <form onSubmit={onSubmit(handleFormSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <LinkBox>
            {debug && (
              <Button
                variant="point"
                onClick={() => console.log('🚀 ~ data & Form values:', data, getValues())}
              >
                폼 데이터 확인 for debug
              </Button>
            )}
            {permission === 'READ' && (
              <>
                <Link to={'/'}>상시 학습 개설</Link>
                <Link to={'/'}>이러닝 개설</Link>
                <Link to={'/'}>라이브개설</Link>
              </>
            )}
            <Button
              variant="point"
              size="sm"
              onClick={() => router.navigate({ to: '/learning/learning-resource' })}
            >
              목록
            </Button>
          </LinkBox>
          {permission === 'READ' && (
            <>
              <Button variant="point" size="sm" onClick={handleCourseMapping}>
                매핑과정 보기
              </Button>
              <Button
                variant="point"
                size="sm"
                onClick={() => console.log('🚀 ~ RouteComponent ~ getValues:', getValues())}
              >
                공유이력 보기
              </Button>
            </>
          )}
          <Button variant="point" size="sm">
            삭제
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {permission === 'WRITE' ? '저장' : '수정'}
          </Button>
        </ContentsButtons>
        <MainContents>
          <LearningResourceVideoDetail provider={provider} />
        </MainContents>
        <SubContents>
          <MovieInfo status={'loading'} />
          <MovieInfo status={'fail'} />
          <MovieInfo status={'success'} />
        </SubContents>
      </PageContainer>
    </form>
  );
}
