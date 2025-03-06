import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, ContentsRow, useModal } from '@learnway/ui';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { useState } from 'react';
import { LearningTypeChoicePopup, VideoUploadPopup } from '../../../../features/learning';
import { LEARNING_TYPE } from '@learnway/config';

export const Route = createFileRoute('/_layout/learning/resource/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { openAsync } = useModal();
  // 등록 팝업 호출 여부
  const [displayContent, setDisplayContent] = useState(true);

  /**
   * 학습 컨텐츠를 등록하기 위한 Dialog 호출
   */
  const handleRegister = async () => {
    setDisplayContent(false);
    //router.navigate({ to: '/learning/resource/education/view' });
    const typeResult = (await openAsync({
      content: <LearningTypeChoicePopup />,
      width: 'lg',
      footer: true,
    })) as LEARNING_TYPE;
    switch (typeResult) {
      case LEARNING_TYPE.VIDEO: {
        /*const videoUploadResult = await openAsync({
          content: <VideoUploadPopup />,
          width: 'lg',
          footer: true,
        });
        break;*/
      }
    }
    router.navigate({ to: '/learning/resource/view/video' });
  };

  return (
    <PageContainer displayContent={displayContent}>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleRegister}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <ContentsRow>컨텐츠 영역</ContentsRow>
      </MainContents>
    </PageContainer>
  );
}
