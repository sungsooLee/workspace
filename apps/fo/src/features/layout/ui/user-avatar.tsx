import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Button, Popover, useModal } from '@learnway/ui';

import { useFetchAuthUser, useLogoutUser } from '../../../entities/user';
import { Tenant } from '../../../entities/tenant';
import styles from './user-avatar.module.css';
import { IcLogOut01 } from '@learnway/icons';
import { useLoginTimeout } from '../../../widgets/layout/service/loginTimeout.hooks';

interface ProfileMenu {
  title: string;
  action: () => void;
}

const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { alert: openAlert } = useModal();
  const { data } = useFetchAuthUser();
  const { logout } = useLogoutUser();
  const { startSession } = useLoginTimeout();

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
      {
        title: '로그인 연장 타이머 테스트',
        action: () => startSession(),
      },
    ],
    [],
  );

  const logoutAlert = () => {
    openAlert({
      title: <></>,
      description: <>로그아웃 하시겠습니까?</>,
      isConfirm: true,
      iconVisible: false,
      onClose: (result: boolean) => {
        // console.log(result);
        if (result) logout();
      },
    });
  };

  const loginExtension = () => {
    openAlert({
      title: <>로그인 시간을 연장하시겠습니까?</>,
      description: (
        <>
          로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
          <br />
          로그인 시간을 연장하시겠습니까?
          <div className="time">
            남은시간 : <strong>4분 59초</strong>
          </div>
        </>
      ),
      isConfirm: true,
      iconVisible: false,
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
          {data ? (
            <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
          ) : (
            // 아바타 이미지 없는 경우 CASE
            <span className={styles.name}>
              <em className={styles.text}>{'김'}</em>
            </span>
          )}
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>{data?.userName}</span>
          <span className={styles.tenant}>{data?.orgName}</span>
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

const AvatarCompoment = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={styles.btn_avatar}
      side="bottom"
      align="end"
      sideOffset={10}>
      {data ? (
        <Avatar imageUrl="https://github.com/shadcn.png" />
      ) : (
        <span className={styles.name}>
          <em className={styles.text}>{'김'}</em>
        </span>
      )}
    </Popover>
  );
};

export const UserAvatar = AvatarCompoment;
