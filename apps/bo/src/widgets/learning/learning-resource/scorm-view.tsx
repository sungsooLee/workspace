//  IA106 / NLP_BO_CMS_1032, NLP_BO_CMS_1014 / 학습자원조회_나의 학습자원_등록_스콤
import {
  ContentInformation,
  PutScormUpdateRes,
  usePutScormUpdate,
} from '@entities/learning-resource';
import {
  ContentTopButtons,
  convertToScormForm,
  convertToScormSubmit,
  getTooltipContent,
  LearningResourceScormDetail,
  ScormInfo,
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

function ScormViewComponent({ content, hasMapping }: Props) {
  const { confirm: openConfirm } = useModal();

  const { provider, onSubmit, updateFormData, formState, getValues } = useDynamicForm2();

  useEffect(() => {
    if (content) updateFormData(convertToScormForm(content));
  }, [content]);

  const { update: updateScormContent } = usePutScormUpdate({
    onSuccess: (result: PutScormUpdateRes) => {
      console.log('update success', result);
      updateFormData(convertToScormForm(result));
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      updateScormContent(convertToScormSubmit(data));
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
                  convertToScormSubmit(getValues()),
                )
              }
            >
              폼 데이터 확인 for debug
            </Button>
          )}
          <ContentTopButtons provider={provider} hasMapping={hasMapping} />
        </ContentsButtons>
        <MainContents>
          <LearningResourceScormDetail provider={provider} />
        </MainContents>
        <SubContents>
          <ScormInfo provider={provider} />
        </SubContents>
      </PageContainer>
    </form>
  );
}

export const ScormView = ScormViewComponent;
