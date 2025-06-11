import { memo } from 'react';
import { useTranslation } from 'react-i18next';
// import { t } from 'i18next';

import { useRouter, Link } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Popover, Button, useModal } from '@learnway/ui';
import { useFetchAuthUser, useLogoutUser, useReissue, useUserDetail } from '@learnway/auth';
import { IcLogOut01 } from '@learnway/icons';
import imgLogo from '@assets/images/temp/img_temp_company_logo.png';

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
  // const router = useRouter();
  const { confirm: openConfirm } = useModal();
  const { logout } = useLogoutUser();

  const { data: authUser } = useFetchAuthUser();
  const { data: user } = useUserDetail();

  const logoutAlert = async () => {
    const feedback = await openConfirm({
      title: t('LABEL.confirm.logout.title'),
      content: t('LABEL.confirm.logout.message'),
    });
    feedback && logout();
  };

  return (
    <div className={`${styles.start} ${styles.avata_area}`}>
      <div className={styles.profile_info}>
        <div className={styles.avata_img}>
          <Avatar
            imageUrl={authUser?.avataImage}
            className={styles.info_avata}
            fallback={<AvataFallback name={user?.name} />}
          />
          <span className={styles.logo_wrap}>
            <img src={imgLogo} alt="" className={styles.logo_img} />
          </span>
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>{user?.name}</span>
          <span className={styles.tenant}>{authUser?.activeTenant?.tenantName}</span>
          <span className={styles.team}>{user?.dept?.deptName}</span>
        </div>
      </div>
      <ul className={styles.info_list}>
        <li>
          <Popover.Close asChild>
            <Link to="/my-page/info">{t('LABEL.common.myInfo')}</Link>
          </Popover.Close>
        </li>
        <li>
          <Popover.Close asChild>
            <Link to="/my-page/role">{t('LABEL.common.myRole')}</Link>
          </Popover.Close>
        </li>

        <li>
          {/* TODO ITSM 추후 진행 */}
          {/* <Popover.Close asChild>
            <a href={'https://naver.com'} target="_blank" rel="noopener noreferrer">
              {t('LABEL.common.itsm')}
            </a>
          </Popover.Close> */}
        </li>
      </ul>

      <div className={styles.logout_wrap}>
        <Button className={styles.btn_log} variant="text" onClick={logoutAlert}>
          <IcLogOut01 width={20} height={20} stroke="#3E4550" />
          <span>{t('LABEL.common.logout')}</span>
        </Button>
        <p className={styles.customer_info}>{`${t('LABEL.common.customerCenter')} 02-6296-6789`}</p>
      </div>
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
