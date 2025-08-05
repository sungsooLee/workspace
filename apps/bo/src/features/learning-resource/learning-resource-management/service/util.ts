import LearningResourceService from '@entities/learning-resource/api/learning-resource';
import { AuthUser } from '@learnway/auth/types';
import { LEARNING_TYPE } from '@learnway/config';
import { CODE_GROUP, useCodeStore } from '@learnway/hooks';
import { isEmptyData } from '@learnway/shared';
import { ProcessingStatus } from '@shared/types/enums';
import { useCallback } from 'react';

export const getDetailPathByContentType = (contentType: string): string => {
  switch (contentType) {
    case LEARNING_TYPE.VIDEO:
    case LEARNING_TYPE.BLOG:
    case LEARNING_TYPE.SCORM:
    case LEARNING_TYPE.HTML5_VIDEO:
    case LEARNING_TYPE.EXAM:
    case LEARNING_TYPE.EXAM_POOL:
    case LEARNING_TYPE.ASSIGNMENT:
    case LEARNING_TYPE.ETC:
      return '/learning/learning-resource/view';
  }
  return '';
};

export const isContentCompleted = async (contentUuid: string, type: string) => {
  switch (type) {
    case LEARNING_TYPE.VIDEO: {
      return (
        (await LearningResourceService.getVideoStatus(contentUuid)).processingStatus ===
        ProcessingStatus.COMPLETE
      );
    }
    case LEARNING_TYPE.SCORM: {
      return (
        (await LearningResourceService.getScormStatus(contentUuid)).processingStatus ===
        ProcessingStatus.COMPLETE
      );
    }
    case LEARNING_TYPE.HTML5_VIDEO: {
      return (
        (await LearningResourceService.fetchHTML5Status(contentUuid)).processingStatus ===
        ProcessingStatus.COMPLETE
      );
    }
    case LEARNING_TYPE.E_BOOK:
    default:
      return true;
  }
};

export const getDetailRouterState = (contentUuid: string, contentType: string) => {
  const state = { contentUuid };
  switch (contentType) {
    case LEARNING_TYPE.EXAM:
    case LEARNING_TYPE.BLOG:
      Object.assign(state, { mode: 'UPDATE' });
      break;
    // 컨텐츠 유형에 따라 state 추가 설정
  }
  return state;
};

export const getTooltipContent = (createType?: any) => {
  switch (createType) {
    case 'TRANSLATE':
      return 'LABEL.page.tooltip.learningResourceIsTranslated';
    case 'SHARED':
      return 'LABEL.page.tooltip.learningResourceIsShared';
    case 'EXAM_MAPPING':
      return 'LABEL.page.tooltip.learningResourceIsExamMapped';
    default:
      return 'LABEL.page.tooltip.learningResourceIsUsed';
  }
};

export const useRoleInfo = (options: {
  loginUser: AuthUser | undefined;
  onChannelMemberCallback?: () => void;
}) => {
  const codeStore = useCodeStore();

  const initRoleInfo = useCallback(async () => {
    const myActiveRoleType =
      options.loginUser?.activeRole?.roleType ?? (options.loginUser?.roles ?? [])?.[0]?.roleType;

    const roleTypes = await codeStore.getCode(CODE_GROUP['pms.role.RoleType']);
    const channelMemberRoleTypes = roleTypes
      .map((role) => role.cdId)
      .filter((cdId: string) => ['CHANNEL_OWNER', 'CHANNEL_MEMBER'].includes(cdId));

    // 등록자가 채널소유자 or 채널구성원일 경우 default로 등록자 정보 입력
    if (
      (!isEmptyData(options.loginUser?.activeRole) || !isEmptyData(options.loginUser?.roles)) &&
      channelMemberRoleTypes.includes(myActiveRoleType)
    ) {
      if (options.onChannelMemberCallback) {
        options.onChannelMemberCallback();
      }
    }
  }, [codeStore]);

  return { initRoleInfo };
};
