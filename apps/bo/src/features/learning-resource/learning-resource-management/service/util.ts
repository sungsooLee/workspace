import { useCallback } from 'react';
import { AuthUser } from '@learnway/auth/types';
import { CODE_GROUP, useCodeStore } from '@learnway/hooks';
import { isEmptyData } from '@learnway/shared';
import { LEARNING_TYPE } from '@learnway/config';

export const getDetailPathByContentType = (contentType: string): string => {
  switch (contentType) {
    case LEARNING_TYPE.VIDEO:
      return '/learning/learning-resource/video/view';
    case LEARNING_TYPE.BLOG:
      return '/learning/resource/blog/view';
    case LEARNING_TYPE.SCORM:
      return '/learning/learning-resource/scorm/view';
    case LEARNING_TYPE.HTML5_VIDEO:
      return '/learning/resource/html-video/view';
    case LEARNING_TYPE.EXAM:
      return '/learning/resource/test-paper/view';
    case LEARNING_TYPE.EXAM_POOL:
      return '/learning/resource/question-bank/view';
  }
  return '';
};

export const getDetailRouterState = (contentUuid: string, contentType: string) => {
  const state = { contentUuid };
  switch (contentType) {
    case LEARNING_TYPE.EXAM:
      Object.assign(state, { mode: 'UPDATE' });
      break;
    // 컨텐츠 유형에 따라 state 추가 설정
  }
  return state;
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
