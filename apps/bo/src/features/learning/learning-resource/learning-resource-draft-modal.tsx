import { FC } from 'react';
import { LEARNING_TYPE } from '@learnway/config';

/**
 * 학습자원 임시(draft) 등록 모달
 * @constructor
 */
interface LeaningResourceDraftModalProps {
  contentsTypeCode: LEARNING_TYPE;
  channelUuid: string;
  fileUuid: string;
  fileName: string;
}

const LeaningResourceDraftModalComponent: FC<LeaningResourceDraftModalProps> = ({
  contentsTypeCode,
  channelUuid,
  fileUuid,
  fileName,
}) => {
  return <></>;
};

export const LeaningResourceDraftModal = LeaningResourceDraftModalComponent;
