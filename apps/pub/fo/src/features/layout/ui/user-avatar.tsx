import { memo, useState } from 'react';
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
      <p>내용</p>
    </div>
  );
};

const AvatarCompoment = () => {
  const [hasAvataImage] = useState<boolean>(true); // 아바타 이미지 없는 경우(true/false)

  return (
    <Popover popoverContent={<PopoverContent />}>
      <Button className={styles.btn_avatar}>
        {hasAvataImage ? (
          <Avatar imageUrl="https://github.com/shadcn.png" />
        ) : (
          // 아바타 이미지 없는 경우 CASE
          <span className={styles.name}>
            <em className={styles.text}>{'김'}</em>
          </span>
        )}
      </Button>
    </Popover>
  );
};

export const UserAvatar = memo(AvatarCompoment);
