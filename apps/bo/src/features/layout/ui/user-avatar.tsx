import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, Link } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Popover, Button } from '@learnway/ui';
import { useFetchAuthUser, useLogoutUser, useReissue } from '@learnway/auth';
import { IcLogOut01 } from '@learnway/icons';

import styles from './user-avatar.module.css';

export const AvataFallback = ({ name }: { name?: string }) => {
  const firstUnit = useCreation(() => {
    if (!name) {
      return '';
    }
    return name.substring(0, 1);
  }, [name]);
  return (
    <span className={styles.name}>
      <em className={styles.text}>{firstUnit}</em>
    </span>
  );
};

export const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { logout } = useLogoutUser();

  const { data: authUser } = useFetchAuthUser();

  return (
    <div className={`${styles.start} ${styles.avata_area}`}>
      <div className={styles.profile_info}>
        <div className={styles.avata_img}>
          <Avatar
            imageUrl={authUser?.avataImage}
            className={styles.info_avata}
            fallback={<AvataFallback name={authUser?.name} />}
          />
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>{authUser?.name}</span>
          <span className={styles.tenant}>{authUser?.activeTenant?.tenantName}</span>
          <span className={styles.team}>팀명</span>
        </div>
      </div>
      <ul className={styles.info_list}>
        <li>
          <Link to={''}>개인정보 변경</Link>
        </li>
        <li>
          <Link to={''}>프로필 작성</Link>
        </li>
      </ul>
      <Button className={styles.btn_log} variant="text" onClick={() => logout()}>
        <IcLogOut01 width={20} height={20} stroke="#3E4550" /> <span>로그아웃</span>
      </Button>
    </div>
  );
};

const AvatarComponent = () => {
  const { data: authUser } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      <Avatar imageUrl={authUser?.avataImage} fallback={<AvataFallback name={authUser?.name} />} />
    </Popover>
  );
};

export const UserAvatar = memo(AvatarComponent);
