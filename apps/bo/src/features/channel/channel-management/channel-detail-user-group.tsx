import { EnFormMode } from '@types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ChannelDetailUserGroupDetail } from './channel-detail-user-group-detail';
import { ChannelDetailUserGroupList } from './channel-detail-user-group-list';
import { EnChannelDetailButtonLayout } from './types/type';

interface ChannelDetailUserGroupProps {
  onButtonLayoutChange?: (layout: EnChannelDetailButtonLayout) => void;
}

const ChannelDetailUserGroupComponent = (props: ChannelDetailUserGroupProps, ref: any) => {
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [userGroupId, setUserGroupId] = useState<number>();

  useEffect(() => {
    if (props.onButtonLayoutChange) {
      switch (formMode) {
        case EnFormMode.NONE:
          props.onButtonLayoutChange(EnChannelDetailButtonLayout.REGISTER);
          break;
        case EnFormMode.VIEW:
        case EnFormMode.ADD:
          props.onButtonLayoutChange(EnChannelDetailButtonLayout.RESET_AND_SAVE);
          break;
        default:
          props.onButtonLayoutChange(EnChannelDetailButtonLayout.NONE);
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
        <ChannelDetailUserGroupDetail ref={ref} mode={formMode} userGroupId={userGroupId} />
      )}
    </>
  );
};

export const ChannelDetailUserGroup = forwardRef(ChannelDetailUserGroupComponent);
