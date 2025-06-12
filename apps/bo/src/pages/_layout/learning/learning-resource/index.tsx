import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { LearningResourceFileUploadModal, LearningTypeChoiceModal } from '@features/learning';
import { LEARNING_TYPE } from '@learnway/config';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { useState } from 'react';
import { ChannelChoiceModal } from '@features/shared';
import { LearningResourceTable } from '@features/learning/ui/learning-resource';

export const Route = createFileRoute('/_layout/learning/learning-resource/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();
  // 등록 팝업 호출 여부
  const [displayContent, setDisplayContent] = useState(true);

  /**
   * 학습 컨텐츠를 등록하기 위한 Dialog 호출
   */
  const handleRegister = async () => {
    setDisplayContent(false);
    let canceled = false;

    //router.navigate({ to: '/learning/resource/education/view' });
    const typeResult = (await openModal({
      content: <LearningTypeChoiceModal />,
      width: 'lg',
    })) as LEARNING_TYPE;

    switch (typeResult) {
      // 동영상
      case LEARNING_TYPE.VIDEO: {
        const channelInfo = await openModal({
          content: <ChannelChoiceModal />,
        });
        if (channelInfo) {
          const videoUploadResult = await openModal({
            content: (
              <LearningResourceFileUploadModal channel={channelInfo} type={LEARNING_TYPE.VIDEO} />
            ),
            width: 'lg',
          });
          if (videoUploadResult) {
            router.navigate({ to: '/learning_test/resource/view/video' });
            break;
          }
        }

        setTimeout(() => handleRegister(), 5);
        canceled = true;
        break;
      }
      // HTML 동영상
      case LEARNING_TYPE.HTML_VIDEO: {
        router.navigate({ to: '/learning/resource/html-video/regist' });
        break;
      }
      // 이미지
      case LEARNING_TYPE.IMAGE: {
        router.navigate({ to: '/learning/resource/image/view' });
        break;
      }
      // 기타
      case LEARNING_TYPE.ETC: {
        router.navigate({ to: '/learning/resource/etc/view' });
        break;
      }
      // 외부링크
      case LEARNING_TYPE.EXTERNAL_LINK: {
        router.navigate({ to: '/learning/resource/external-link/view' });
        break;
      }
      // 외부위탁
      case LEARNING_TYPE.EXTERNAL_CONSIGNMENT: {
        router.navigate({ to: '/learning/resource/external_consignment/view' });
        break;
      }
      // 블로그
      case LEARNING_TYPE.BLOG: {
        router.navigate({ to: '/learning/resource/blog/view' });
        break;
      }
      // 이북
      case LEARNING_TYPE.E_BOOK: {
        router.navigate({ to: '/learning/resource/e-book/view' });
        break;
      }
      // 스콤
      case LEARNING_TYPE.SCORM: {
        router.navigate({ to: '/learning/resource/scorm/view' });
        break;
      }
      // 설문

      case LEARNING_TYPE.SURVEY: {
        router.navigate({ to: '/learning/resource/survey/view' });
        break;
      }
      // 설문
      case LEARNING_TYPE.TEST_PAGER: {
        router.navigate({ to: '/learning/resource/test-paper/view' });
        break;
      }
      // 설문
      case LEARNING_TYPE.ASSIGNMENT: {
        router.navigate({ to: '/learning/resource/assignment/view' });
        break;
      }
      default: {
        canceled = true;
      }
    }
    if (canceled) setDisplayContent(true);
  };

  return (
    <PageContainer displayContent={displayContent}>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleRegister}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <LearningResourceTable />
      </MainContents>
    </PageContainer>
  );
}
