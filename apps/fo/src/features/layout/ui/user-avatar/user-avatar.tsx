import { useTranslation } from 'react-i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Button, Popover, useModal } from '@learnway/ui';
import { useFetchAuthUser, useLogoutUser, PasswordVerifyModal } from '@learnway/auth';
import { cn } from '@learnway/shared';
import { IcLogOut01 } from '@learnway/icons';

import styles from './user-avatar.module.css';

//import { useLoginTimeout } from '../../../feature/platform/service/loginTimeout.hooks';

export const AvataFallback = ({ name }: { name?: string }) => {
  const firstUnit = useCreation(() => {
    if (!name) {
      return '';
    }
    return name.substring(0, 1);
  }, [name]);
  return (
    <span className={cn(styles.fallback, styles.name)}>
      <em className={styles.text}>{firstUnit}</em>
    </span>
  );
};

interface ProfileMenu {
  title: string;
  action: () => void;
}

const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { confirm: openConfirm, open } = useModal();
  const { data } = useFetchAuthUser();
  const { logout } = useLogoutUser();

  const { data: authUser } = useFetchAuthUser();
  //const { startSession } = useLoginTimeout();

  const PROFILE_MENU: ProfileMenu[] = useCreation(
    () => [
      {
        title: '개인정보 변경',
        action: () => {
          open({
            width: 's',
            content: <PasswordVerifyModal />,
            onClose: (verify?: any) => {
              if (!verify) {
                return;
              }
              router.navigate({ to: '/my-page/privacy' });
            },
          });
        },
      },
      {
        title: '프로필 작성',
        action: () => router.navigate({ to: '/' }),
      },
      /*{
        title: '로그인 연장 타이머 테스트',
        action: () => startSession(),
      },*/
    ],
    [],
  );

  const logoutAlert = async (e: any) => {
    const feedback = await openConfirm({
      title: <></>,
      content: <>로그아웃 하시겠습니까?</>,
    });
    feedback && logout();
  };

  return (
    // <div>
    //   <li key={`MY-PROFILE-TITLE`}>{t('PROFILE')}</li>
    //   {map(PROFILE_MENU, (menu: ProfileMenu, index: number) => {
    //     return (
    //       <li key={`MY-PROFILE${index}`} onClick={menu.action}>
    //         {t(menu.title)}
    //       </li>
    //     );
    //   })}
    //   {map(data?.tenants, (tenant: Tenant, index: number) => {
    //     return <li key={`MY-PROFILE-TENAT${index}`}>{tenant.name}</li>;
    //   })}
    // </div>
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
          <span className={styles.name}>{data?.name}</span>
          <span className={styles.tenant}>{data?.companyCode}</span>
          <span className={styles.team}>팀명</span>
        </div>
      </div>
      <ul className={styles.info_list}>
        {map(PROFILE_MENU, (menu: ProfileMenu, index: number) => {
          return (
            <li key={`MY-PROFILE${index}`} onClick={menu.action}>
              <Link to={'/'}>{t(menu.title)}</Link>
            </li>
          );
        })}
      </ul>
      <Button className={styles.btn_log} variant="text" onClick={(e) => logoutAlert(e)}>
        <IcLogOut01 width={20} height={20} stroke="#3E4550" /> <span>로그아웃</span>
      </Button>
    </div>
  );
};

const AvatarCompoment = ({ className }: any) => {
  const { data: authUser } = useFetchAuthUser();

  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={cn(styles.btn_avatar, className)}
      side="bottom"
      align="end"
      sideOffset={10}
    >
      <Avatar imageUrl={authUser?.avataImage} fallback={<AvataFallback name={authUser?.name} />} />
    </Popover>
  );
};

export const UserAvatar = AvatarCompoment;
