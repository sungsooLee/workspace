import { EnButtonLayout } from '@pages/_layout/tenant/channel/management/detail.lazy';
import { forwardRef, useEffect } from 'react';

interface ChannelDetailRoleProps {
  onButtonLayoutChange: (layout: EnButtonLayout) => void;
}

const ChannelDetailRoleComponent = (props: ChannelDetailRoleProps, ref: any) => {
  useEffect(() => {
    props.onButtonLayoutChange && props.onButtonLayoutChange(EnButtonLayout.NONE);
  }, []);

  return <h3>Content</h3>;
};

export const ChannelDetailRole = forwardRef(ChannelDetailRoleComponent);
