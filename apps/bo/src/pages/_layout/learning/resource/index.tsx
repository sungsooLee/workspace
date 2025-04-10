import { useState } from 'react';
import { Button, useModal } from '@learnway/ui';
import { LEARNING_TYPE } from '@learnway/config';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import {
  LearningTypeChoiceModal,
  LearningResourceFileUploadModal,
} from '../../../../features/learning';
import { t } from 'i18next';
import { SearchBox } from '../../../../shared/ui/search-box';
import { useSearchBox } from '@learnway/hooks';

export const Route = createFileRoute('/_layout/learning/resource/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: searchProvider } = useSearchBox(searchConfig);
  const { open: openModal } = useModal();
  // 등록 팝업 호출 여부
  const [displayContent, setDisplayContent] = useState(true);

  /**
   * 학습 컨텐츠를 등록하기 위한 Dialog 호출
   */
  const handleRegister = async () => {
    setDisplayContent(false);
    //router.navigate({ to: '/learning/resource/education/view' });
    const typeResult = (await openModal({
      content: <LearningTypeChoiceModal />,
      width: 'lg',
    })) as LEARNING_TYPE;
    console.log('typeResult => ', typeResult);
    switch (typeResult) {
      // 동영상
      case LEARNING_TYPE.VIDEO: {
        /*const videoUploadResult = await openModal({
          content: <LearningResourceFileUploadModal />,
          width: 'lg',
        });*/
        router.navigate({ to: '/learning/resource/video/view', state: { permission: 'WRITE' } });
        break;
      }
      // HTML 동영상
      case LEARNING_TYPE.HTML_VIDEO: {
        router.navigate({ to: '/learning/resource/html-video/view' });
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
    }
    setDisplayContent(true);
  };

  return (
    <PageContainer displayContent={displayContent}>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleRegister}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={searchProvider} />
      </MainContents>
    </PageContainer>
  );
}
const searchConfig: any = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'channel',
        type: 'dropdown',
        label: t('채널'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'channelA', label: t('채널A') },
          { value: 'channelB', label: t('채널B') },
          { value: 'channelC', label: t('채널C') },
          { value: 'channelD', label: t('채널D') },
          { value: 'channelE', label: t('채널E') },
          { value: 'channelF', label: t('채널F') },
        ],
      },
      {
        name: 'type',
        type: 'dropdown',
        label: t('유형'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'typeA', label: t('유형A') },
          { value: 'typeB', label: t('유형B') },
          { value: 'typeC', label: t('유형C') },
          { value: 'typeD', label: t('유형D') },
          { value: 'typeE', label: t('유형E') },
          { value: 'typeF', label: t('유형F') },
        ],
      },
      {
        name: 'learningResourceName',
        type: 'text',
        label: t('학습자원명'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
    ],
  ],
};
