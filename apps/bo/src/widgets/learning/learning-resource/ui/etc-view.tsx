// IA109 / NLP_BO_CMS_1027, NLP_BO_CMS_1009
import { ContentInformation, PutETCUpdateRes, usePutETCUpdate } from '@entities/learning-resource';
import {
  ContentTopButtons,
  convertToETCForm,
  convertToETCSubmit,
  ETCInfo,
  getTooltipContent,
  LearningResourceETCDetail,
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

function EtcViewComponent({ content, hasMapping }: Props) {
  const { confirm: openConfirm } = useModal();

  const { provider, onSubmit, updateFormData, formState, getValues } = useDynamicForm2();

  useEffect(() => {
    if (content) updateFormData(convertToETCForm(content));
  }, [content]);

  const { update: updateETCContent } = usePutETCUpdate({
    onSuccess: (result: PutETCUpdateRes) => {
      console.log('update success', result);
      updateFormData(convertToETCForm(result));
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      updateETCContent(convertToETCSubmit(data));
    }
  };

  if (!content) {
    return <PageContainer />;
  }
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
                  convertToETCSubmit(getValues()),
                )
              }
            >
              폼 데이터 확인 for debug
            </Button>
          )}
          <ContentTopButtons provider={provider} hasMapping={hasMapping} />
        </ContentsButtons>
        <MainContents>
          <LearningResourceETCDetail provider={provider} />
        </MainContents>
        <SubContents>
          <ETCInfo provider={provider} />
        </SubContents>
      </PageContainer>
    </form>
  );
}

export const EtcView = EtcViewComponent;
