//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 학습자원조회_나의 학습자원_등록_동영상(자체)
import {
  ContentInformation,
  PutVideoUpdateRes,
  usePutVideoUpdate,
} from '@entities/learning-resource';
import {
  ContentTopButtons,
  convertToVideoForm,
  convertToVideoSubmit,
  getTooltipContent,
  LearningResourceVideoDetail,
  MovieInfo,
} from '@features/learning-resource';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { ContentCreateType } from '@shared/types/enums';

import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui/layout';
import { t } from 'i18next';
import { useEffect } from 'react';

interface Props {
  content: ContentInformation;
  hasMapping?: boolean;
}

function VideoViewComponent({ content, hasMapping }: Props) {
  const { confirm: openConfirm } = useModal();

  const { provider, onSubmit, updateFormData, formState, getValues } = useDynamicForm2();

  useEffect(() => {
    if (content) updateFormData(convertToVideoForm(content));
  }, [content]);

  const { update: updateVideoContent } = usePutVideoUpdate({
    onSuccess: (result: PutVideoUpdateRes) => {
      console.log('update success', result);
      updateFormData(convertToVideoForm(result));
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      updateVideoContent(convertToVideoSubmit(data));
    }
  };

  const debug = true;

  return (
    <form onSubmit={onSubmit(handleFormSubmit)}>
      <PageContainer
        tooltipProps={{
          show: !!hasMapping || content?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(content?.createType)),
          type: content?.createType,
        }}
      >
        <ContentsButtons>
          {debug && (
            <Button
              variant="point"
              onClick={() =>
                console.log(
                  '🚀 ~ data & Form values:',
                  formState.isDirty,
                  content,
                  convertToVideoSubmit(getValues()),
                )
              }
            >
              폼 데이터 확인 for debug
            </Button>
          )}
          <ContentTopButtons provider={provider} hasMapping={hasMapping} />
        </ContentsButtons>
        <MainContents>
          <LearningResourceVideoDetail provider={provider} />
        </MainContents>
        <SubContents>
          <MovieInfo provider={provider} />
        </SubContents>
      </PageContainer>
    </form>
  );
}

export const VideoView = VideoViewComponent;
