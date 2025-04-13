import { useTranslation } from 'react-i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Button, Popover, useModal } from '@learnway/ui';
import { useFetchAuthUser, useLogoutUser } from '@learnway/config';
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
    <span className={styles.name}>
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
  const { confirm: openConfirm } = useModal();
  const { data } = useFetchAuthUser();
  const { logout } = useLogoutUser();
  const { data: authUser } = useFetchAuthUser();
  //const { startSession } = useLoginTimeout();

  const PROFILE_MENU: ProfileMenu[] = useCreation(
    () => [
      {
        title: '개인정보 변경',
        action: () => router.navigate({ to: '/' }),
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

  const logoutAlert = () => {
    openConfirm({
      title: <></>,
      content: <>로그아웃 하시겠습니까?</>,

      onClose: (result: boolean) => {
        // console.log(result);
        if (result) logout();
      },
    });
  };

  const loginExtension = () => {
    openConfirm({
      title: <>로그인 시간을 연장하시겠습니까?</>,
      content: (
        <>
          로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
          <br />
          로그인 시간을 연장하시겠습니까?
          <div className="time">
            남은시간 : <strong>4분 59초</strong>
          </div>
        </>
      ),

      okButtonLabel: '로그인연장',
      onClose: (result: boolean) => {
        console.log(result);
      },
    });
  };

  // useEffect(()=>{

  // },[])

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
      <Button className={styles.btn_log} variant="text" onClick={() => logoutAlert()}>
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
