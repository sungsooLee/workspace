import { useModal } from '@learnway/ui/modal';
import { PageContainer } from '@shared/ui';
// IA105 / NLP_BO_CMS_1058 // IA105 / NLP_BO_CMS_1017 // IA106 / NLP_BO_CMS_1060
import {
  usePostDraftETC,
  usePostDraftHTMLVideo,
  usePostDraftScorm,
  usePostDraftVideos,
} from '@entities/learning-resource';
import {
  getDetailPathByContentType,
  LearningResourceFileUploadModal,
  LearningTypeChoiceModal,
} from '@features/learning-resource';
import { getDefaultLang, LEARNING_TYPE } from '@learnway/config';
import { ChannelChoiceModal } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import {
  PostDraftETCRes,
  PostDraftHtmlVideoRes,
  PostDraftScormRes,
  PostDraftVideosRes,
} from '@types';

import { pick } from 'lodash-es';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/learning/learning-resource/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { openModal } = useModal();

  const [selectedType, setSelectedType] = useState<LEARNING_TYPE>('');

  const [listParam, setListParam] = useState<
    { tenantId: string; channelUuid: string } | undefined
  >();

  const { create: postDraftVideos } = usePostDraftVideos({
    onSuccess: (result: PostDraftVideosRes) => {
      if (result.contents.length === 1) {
        return router.navigate({
          to: getDetailPathByContentType(LEARNING_TYPE.VIDEO),
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

  const { create: postDraftScorm } = usePostDraftScorm({
    onSuccess: (result: PostDraftScormRes) => {
      if (result.contents.length === 1) {
        return router.navigate({
          to: getDetailPathByContentType(LEARNING_TYPE.SCORM),
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

  const { upload: postDraftHTMLVideo } = usePostDraftHTMLVideo({
    onSuccess: (result: PostDraftHtmlVideoRes) => {
      if (result.contentUuid) {
        return router.navigate({
          to: getDetailPathByContentType(LEARNING_TYPE.HTML5_VIDEO),
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
  });

  const { create: postDraftETC } = usePostDraftETC({
    onSuccess: (result: PostDraftETCRes) => {
      return router.navigate({
        to: getDetailPathByContentType(LEARNING_TYPE.ETC),
        state: {
          contentUuid: result.contentUuid,
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
          to: '/learning/resource/blog/view',
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
          to: '/learning/resource/test-paper/view',
          replace: true,
        });
        break;
      }
      // 문제은행
      case LEARNING_TYPE.EXAM_POOL: {
        router.navigate({ to: '/learning/resource/question-bank/view' });
        break;
      }

      // line 3
      // 과제
      case LEARNING_TYPE.ASSIGNMENT: {
        router.navigate({
          to: '/learning/resource/assignment/view',
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
