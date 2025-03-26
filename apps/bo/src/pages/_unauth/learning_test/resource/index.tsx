import { useState } from 'react';
import { Button, useModal } from '@learnway/ui';
import { LEARNING_TYPE } from '@learnway/config';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { LearningTypeChoiceModal } from '../../../../features/learning';
import { t } from 'i18next';
import { SearchBox } from '../../../../shared/ui/search-box';
import { useSearchBox } from '@learnway/hooks';

export const Route = createFileRoute('/_unauth/learning_test/resource/')({
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
      case LEARNING_TYPE.VIDEO: {
        /*const videoUploadResult = await openAsync({
          content: (
            <UploadProvider>
              <VideoUploadPopup />
            </UploadProvider>
          ),
          width: 'lg',
        });*/
        router.navigate({ to: '/learning_test/resource/view/video' });
        break;
      }
      case LEARNING_TYPE.EXTERNAL_CONSIGNMENT: {
        router.navigate({ to: '/learning_test/resource/view/consignment' });
        break;
      }
      case LEARNING_TYPE.BLOG: {
        router.navigate({ to: '/learning_test/resource/view/blog' });
        break;
      }
      case LEARNING_TYPE.E_BOOK: {
        router.navigate({ to: '/learning_test/resource/view/ebook' });
        break;
      }
      case LEARNING_TYPE.SCORM: {
        router.navigate({ to: '/learning_test/resource/view/scorm' });
        break;
      }
    }
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
