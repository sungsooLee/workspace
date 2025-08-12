// IA105 / NLP_BO_CMS_1058 // IA105 / NLP_BO_CMS_1017 // IA106 / NLP_BO_CMS_1060
import {
  PostDraftETCRes,
  PostDraftHtmlVideoRes,
  PostDraftScormRes,
  PostDraftVideosRes,
  usePostDraftETC,
  usePostDraftHTMLVideo,
  usePostDraftScorm,
  usePostDraftVideos,
} from '@entities/learning-resource';
import {
  CreateModal,
  LearningResourceFileUploadModal,
  LearningTypeChoiceModal,
} from '@features/learning-resource';
import { getDefaultLang, LEARNING_TYPE } from '@learnway/config';
import { useModal } from '@learnway/ui/modal';
import { PageContainer } from '@shared/ui/layout';
import { ChannelChoiceModal } from '@shared/ui/modal';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';

import { useModalStore } from '@learnway/ui/stores';
import { t } from 'i18next';
import { pick } from 'lodash-es';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { openModal, alert: openAlert } = useModal();
  const { closeModal } = useModalStore();

  const [selectedType, setSelectedType] = useState<LEARNING_TYPE>('');

  const [listParam, setListParam] = useState<
    { tenantId: string; channelUuid: string } | undefined
  >();

  const openCreateModal = async () => {
    console.log('🚀 ~ CreateModal opened');
    openModal({
      zIndex: 10000,
      width: 's',
      hideCloseButton: true,
      content: <CreateModal />,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const closeCreateModal = () => {
    console.log('🚀 ~ CreateModal closed');
    closeModal();
  };

  const openFailAlert = async () => {
    await openAlert({
      title: t('교육자원 생성이 실패되었습니다.'),
      content: t(`'확인' 선택 시 목록으로 이동합니다.`),
    });
    router.navigate({
      to: '/learning/learning-resource',
      replace: true,
    });
  };

  const { create: postDraftVideos } = usePostDraftVideos({
    onSuccess: (result: PostDraftVideosRes) => {
      closeCreateModal();
      if (result.contents.length === 1) {
        return router.navigate({
          to: '/learning/learning-resource/view',
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
      closeCreateModal();
      console.error(error);
      // 에러 얼럿 띄우면서 다시 리스트 화면으로?
      openFailAlert();
    },
  });

  const { create: postDraftScorm } = usePostDraftScorm({
    onSuccess: (result: PostDraftScormRes) => {
      closeCreateModal();
      if (result.contents.length === 1) {
        return router.navigate({
          to: '/learning/learning-resource/view',
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
      closeCreateModal();
      console.error(error);
      // 에러 얼럿 띄우면서 다시 리스트 화면으로?
      openFailAlert();
    },
  });

  const { upload: postDraftHTMLVideo } = usePostDraftHTMLVideo({
    onSuccess: (result: PostDraftHtmlVideoRes) => {
      closeCreateModal();
      if (result.contentUuid) {
        return router.navigate({
          to: '/learning/learning-resource/view',
          state: {
            contentUuid: result.contentUuid,
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
      closeCreateModal();
      console.error(error);
      openFailAlert();
    },
  });

  const { create: postDraftETC } = usePostDraftETC({
    onSuccess: (result: PostDraftETCRes) => {
      closeModal();
      return router.navigate({
        to: '/learning/learning-resource/view',
        state: {
          contentUuid: result.contentUuid,
        },
        replace: true,
      });
    },
    onError: (error: any) => {
      closeModal();
      console.error(error);
      // 에러 얼럿 띄우면서 다시 리스트 화면으로?
      openFailAlert();
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
    await openCreateModal();
    postDraftVideos({
      languageCountryCode: getDefaultLang().toUpperCase(),
      tenantId: channelInfo.tenantId,
      channelUuid: channelInfo.channelUuid,
      fileUuids,
    });
  };

  const uploadScorm = async () => {
    const channelInfo = await openModal({
      content: <ChannelChoiceModal />,
    });
    if (!channelInfo) {
      setSelectedType('');
      return;
    }

    const fileUuids = await openModal({
      content: <LearningResourceFileUploadModal channel={channelInfo} type={LEARNING_TYPE.SCORM} />,
      width: 'lg',
    });
    if (!fileUuids) {
      setSelectedType('');
      return;
    }

    setListParam(pick(channelInfo, ['tenantId', 'channelUuid']));
    await openCreateModal();
    postDraftScorm({
      languageCountryCode: getDefaultLang().toUpperCase(),
      tenantId: channelInfo.tenantId,
      channelUuid: channelInfo.channelUuid,
      fileUuids,
    });
  };

  const uploadHTML5 = async () => {
    const channelInfo = await openModal({
      content: <ChannelChoiceModal />,
    });

    if (!channelInfo) {
      setSelectedType('');
      return;
    }

    const fileUuid = await openModal({
      content: (
        <LearningResourceFileUploadModal
          channel={channelInfo}
          type={LEARNING_TYPE.HTML5_VIDEO}
          maxFileCount={1}
        />
      ),
      width: 'lg',
    });

    if (!fileUuid) {
      setSelectedType('');
      return;
    }

    setListParam(pick(channelInfo, ['tenantId', 'channelUuid']));
    await openCreateModal();
    postDraftHTMLVideo({
      languageCountryCode: getDefaultLang().toUpperCase(),
      tenantId: channelInfo.tenantId,
      channelUuid: channelInfo.channelUuid,
      fileUuid,
    });
  };

  const uploadETC = async () => {
    const channelInfo = await openModal({
      content: <ChannelChoiceModal />,
    });
    if (!channelInfo) {
      setSelectedType('');
      return;
    }

    const fileUuid = await openModal({
      content: (
        <LearningResourceFileUploadModal
          channel={channelInfo}
          type={LEARNING_TYPE.ETC}
          maxFileCount={1}
        />
      ),
      width: 'lg',
    });
    if (!fileUuid) {
      setSelectedType('');
      return;
    }

    setListParam(pick(channelInfo, ['tenantId', 'channelUuid']));
    await openCreateModal();
    postDraftETC({
      languageCountryCode: getDefaultLang().toUpperCase(),
      tenantId: channelInfo.tenantId,
      channelUuid: channelInfo.channelUuid,
      fileUuid,
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
      // 이북
      case LEARNING_TYPE.E_BOOK: {
        router.navigate({ to: '/learning/resource/e-book/view', replace: true });
        break;
      }
      // 스콤
      case LEARNING_TYPE.SCORM: {
        uploadScorm();
        break;
      }
      // HTML 동영상
      case LEARNING_TYPE.HTML5_VIDEO: {
        uploadHTML5();
        break;
      }
      // 이미지
      case LEARNING_TYPE.IMAGE: {
        router.navigate({ to: '/learning/resource/image/view', replace: true });
        break;
      }

      //line 2
      // 외부링크
      case LEARNING_TYPE.EXTERNAL_LINK: {
        router.navigate({ to: '/learning/resource/external-link/view', replace: true });
        break;
      }
      // 외부위탁
      case LEARNING_TYPE.COMMISSIONED_CONTENT: {
        router.navigate({ to: '/learning/resource/commission-contents/view', replace: true });
        break;
      }
      // 블로그
      case LEARNING_TYPE.BLOG: {
        router.navigate({
          to: '/learning/learning-resource/new',
          state: { contentType: selectedType },
          replace: true,
        });
        break;
      }
      // 설문
      case LEARNING_TYPE.SURVEY: {
        router.navigate({ to: '/learning/resource/survey/view', replace: true });
        break;
      }
      // 시험지
      case LEARNING_TYPE.EXAM: {
        router.navigate({
          to: '/learning/learning-resource/new',
          state: { contentType: selectedType },
          replace: true,
        });
        break;
      }
      // 문제은행
      case LEARNING_TYPE.EXAM_POOL: {
        router.navigate({
          to: '/learning/learning-resource/new',
          state: { contentType: selectedType },
          replace: true,
        });
        break;
      }

      // line 3
      // 과제
      case LEARNING_TYPE.ASSIGNMENT: {
        router.navigate({
          to: '/learning/learning-resource/new',
          state: { contentType: selectedType },
          replace: true,
        });
        break;
      }
      // 기타
      case LEARNING_TYPE.ETC: {
        uploadETC();
        break;
      }
    }
  }, [selectedType]);

  return <PageContainer />;
}
