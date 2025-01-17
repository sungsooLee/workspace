import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Popover } from '@learnway/ui';

interface ProfileMenu {
  title: string;
  action: () => void;
}

const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return <div></div>;
};

const AvatarCompoment = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      <Avatar imageUrl="https://github.com/shadcn.png" />
    </Popover>
  );
};

export const UserAvatar = memo(AvatarCompoment);
