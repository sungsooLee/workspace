import { EnFormMode } from '@shared/types/enums';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { EnChannelDetailButtonLayout, EnChannelDetailListType } from '../../../types/type';
import { ChannelDetailUserGroupDetail } from './channel-detail-user-group-detail';
import { ChannelDetailUserGroupList } from './channel-detail-user-group-list';

interface ChannelDetailUserGroupProps {
  onButtonChange: (layout: EnChannelDetailButtonLayout, listType?: EnChannelDetailListType) => void;
}

const ChannelDetailUserGroupComponent = (props: ChannelDetailUserGroupProps, ref: any) => {
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [userGroupId, setUserGroupId] = useState<number>();

  useEffect(() => {
    if (props.onButtonChange) {
      switch (formMode) {
        case EnFormMode.NONE:
          props.onButtonChange(EnChannelDetailButtonLayout.REGISTER);
          break;
        case EnFormMode.VIEW:
        case EnFormMode.ADD:
          props.onButtonChange(
            EnChannelDetailButtonLayout.RESET_AND_SAVE,
            EnChannelDetailListType.TAB_LIST,
          );
          break;
        default:
          props.onButtonChange(EnChannelDetailButtonLayout.NONE);
      }
    }
  }, [props, formMode]);

  useImperativeHandle(ref, () => ({
    register() {
      setFormMode(EnFormMode.ADD);
      setUserGroupId(undefined);
    },
  }));

  const handleOnUserChange = (userGroupId: number) => {
    setFormMode(EnFormMode.VIEW);
    setUserGroupId(userGroupId);
  };

  return (
    <>
      {formMode === EnFormMode.NONE && <ChannelDetailUserGroupList onChange={handleOnUserChange} />}
      {formMode !== EnFormMode.NONE && (
        <ChannelDetailUserGroupDetail
          ref={ref}
          mode={formMode}
          userGroupId={userGroupId}
          onCompleted={() => {
            setFormMode(EnFormMode.NONE);
          }}
        />
      )}
    </>
  );
};

export const ChannelDetailUserGroup = forwardRef(ChannelDetailUserGroupComponent);
