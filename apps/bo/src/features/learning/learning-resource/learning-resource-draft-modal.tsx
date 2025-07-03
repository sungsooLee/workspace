import { FC } from 'react';
import { LEARNING_TYPE } from '@learnway/config';

/**
 * 학습자원 임시(draft) 등록 모달
 * @constructor
 */
interface LearningResourceDraftModalProps {
  contentsTypeCode: LEARNING_TYPE;
  channelUuid: string;
  fileUuid: string;
  fileName: string;
}

const LearningResourceDraftModalComponent: FC<LearningResourceDraftModalProps> = ({
  contentsTypeCode,
  channelUuid,
  fileUuid,
  fileName,
}) => {
  return <></>;
};

export const LearningResourceDraftModal = LearningResourceDraftModalComponent;
