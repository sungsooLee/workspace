import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Popover } from '@learnway/ui';
import styles from './user-avatar.module.css';

interface ProfileMenu {
  title: string;
  action: () => void;
}

const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div>
      <p>11111</p>
    </div>
  );
};

const AvatarCompoment = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      <Button className={styles.btn_avatar}>
        <span>{'김'}</span>
        <Avatar imageUrl="https://github.com/shadcn.png" />
      </Button>
    </Popover>
  );
};

export const UserAvatar = memo(AvatarCompoment);
