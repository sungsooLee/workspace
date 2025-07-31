import { EnButtonLayout } from '@pages/_layout/tenant/channel/management/detail.lazy';
import { EnFormMode } from '@types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ChannelDetailUserGroupDetail } from './channel-detail-user-group-detail';
import { ChannelDetailUserGroupList } from './channel-detail-user-group-list';

interface ChannelDetailUserGroupProps {
  onButtonLayoutChange?: (layout: EnButtonLayout) => void;
}

const ChannelDetailUserGroupComponent = (props: ChannelDetailUserGroupProps, ref: any) => {
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [userGroupId, setUserGroupId] = useState<number>();

  useEffect(() => {
    if (props.onButtonLayoutChange) {
      switch (formMode) {
        case EnFormMode.NONE:
          props.onButtonLayoutChange(EnButtonLayout.REGISTER);
          break;
        case EnFormMode.VIEW:
        case EnFormMode.ADD:
          props.onButtonLayoutChange(EnButtonLayout.RESET_AND_SAVE);
          break;
        default:
          props.onButtonLayoutChange(EnButtonLayout.NONE);
      }
    }
  }, [props, formMode]);

  useImperativeHandle(ref, () => ({
    register() {
      setFormMode(EnFormMode.ADD);
      setUserGroupId(undefined);
    } }));

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
