// IA105 / NLP_BO_CMS_1058 // IA105 / NLP_BO_CMS_1017 // IA106 / NLP_BO_CMS_1060
import { usePostDraftVideos } from '@entities/learning-resource';
import {
  LearningResourceFileUploadModal,
  LearningTypeChoiceModal,
} from '@features/learning-resource';
import { ChannelChoiceModal } from '@shared/ui';
import { getDefaultLang, LEARNING_TYPE } from '@learnway/config';
import { useModal } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PostDraftVideosRes } from '@types';
import { PageContainer } from '@widgets/layout';
import { pick } from 'lodash';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/learning/learning-resource/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();

  const [selectedType, setSelectedType] = useState<LEARNING_TYPE>('');

  const [listParam, setListParam] = useState<
    { tenantId: string; channelUuid: string } | undefined
  >();

  const { create: postDraftVideos } = usePostDraftVideos({
    onSuccess: (result: PostDraftVideosRes) => {
      if (result.contents.length === 1) {
        return router.navigate({
          to: '/learning/learning-resource/video/view',
          state: {
            contentUuid: result.contents[0].contentUuid,
          },
          replace: true,
        });
      }
      router.navigate({
        to: '/learning/learning-resource',
        state: {
          listParam,
        },
        replace: true,
      });
    },
    onError: (error: any) => {
      console.error(error);
      // 에러 얼럿 띄우면서 다시 리스트 화면으로?
    },
  });

  const uploadVideo = async () => {
    const channelInfo = await openModal({
      content: <ChannelChoiceModal />,
    });
    if (!channelInfo) {
      setSelectedType('');
      return;
    }

    const fileUuids = await openModal({
      content: <LearningResourceFileUploadModal channel={channelInfo} type={LEARNING_TYPE.VIDEO} />,
      width: 'lg',
    });
    if (!fileUuids) {
      setSelectedType('');
      return;
    }

    setListParam(pick(channelInfo, ['tenantId', 'channelUuid']));
    postDraftVideos({
      languageCountryCode: getDefaultLang().toUpperCase(),
      tenantId: channelInfo.tenantId,
      channelUuid: channelInfo.channelUuid,
      fileUuids,
    });
  };

  const selectType = async () => {
    const type = await openModal({
      content: <LearningTypeChoiceModal />,
      width: 'lg',
    });
    if (!type) {
      router.navigate({
        to: '/learning/learning-resource',
        replace: true,
      });
    } else setSelectedType(type);
  };

  useEffect(() => {
    if (!selectedType) {
      selectType();
      return;
    }

    switch (selectedType) {
      // 동영상
      case LEARNING_TYPE.VIDEO: {
        uploadVideo();
        break;
      }
      // HTML 동영상
      case LEARNING_TYPE.HTML_VIDEO: {
        router.navigate({ to: '/learning/resource/html-video/regist', replace: true });
        break;
      }
      // 이미지
      case LEARNING_TYPE.IMAGE: {
        router.navigate({ to: '/learning/resource/image/view', replace: true });
        break;
      }
      // 기타
      case LEARNING_TYPE.ETC: {
        router.navigate({ to: '/learning/resource/etc/view', replace: true });
        break;
      }
      // 외부링크
      case LEARNING_TYPE.EXTERNAL_LINK: {
        router.navigate({ to: '/learning/resource/external-link/view', replace: true });
        break;
      }
      // 외부위탁
      case LEARNING_TYPE.EXTERNAL_CONSIGNMENT: {
        router.navigate({ to: '/learning/resource/external_consignment/view', replace: true });
        break;
      }
      // 블로그
      case LEARNING_TYPE.BLOG: {
        router.navigate({ to: '/learning/resource/blog/regist', replace: true });
        break;
      }
      // 이북
      case LEARNING_TYPE.E_BOOK: {
        router.navigate({ to: '/learning/resource/e-book/view', replace: true });
        break;
      }
      // 스콤
      case LEARNING_TYPE.SCORM: {
        router.navigate({ to: '/learning/resource/scorm/view', replace: true });
        break;
      }
      // 설문

      case LEARNING_TYPE.SURVEY: {
        router.navigate({ to: '/learning/resource/survey/view', replace: true });
        break;
      }
      // 설문
      case LEARNING_TYPE.TEST_PAGER: {
        router.navigate({ to: '/learning/resource/test-paper/view', replace: true });
        break;
      }
      // 설문
      case LEARNING_TYPE.ASSIGNMENT: {
        router.navigate({ to: '/learning/resource/assignment/view', replace: true });
        break;
      }
    }
  }, [selectedType]);

  return <PageContainer />;
}
