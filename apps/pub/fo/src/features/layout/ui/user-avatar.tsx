import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Button, useModalControl } from '@learnway/ui';
import { IcLogOut01 } from '@learnway/icons';

import { Avatar, Popover } from '@learnway/ui';
import styles from './user-avatar.module.css';

const PopoverContent = () => {
  const { alert: openAlert } = useModalControl();
  const [hasAvataImage] = useState<boolean>(true); // 아바타 이미지 없는 경우(true/false)

  const handleClickAlert1 = () => {
    openAlert({
      title: <></>,
      description: <>로그아웃 하시겠습니까?</>,
      isConfirm: true,
      iconVisible: false,
    });
  };

  const handleClickAlert2 = () => {
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
    });
  };

  return (
    <div className={`${styles.start} ${styles.avata_area}`}>
      <div className={styles.profile_info}>
        <div className={styles.avata_img}>
          {hasAvataImage ? (
            <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
          ) : (
            // 아바타 이미지 없는 경우 CASE
            <span className={styles.name}>
              <em className={styles.text}>{'김'}</em>
            </span>
          )}
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>김현대</span>
          <span className={styles.tenant}>현대오토에버</span>
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
      <Button className={styles.btn_log} variant="text" onClick={() => handleClickAlert2()}>
        <IcLogOut01 width={20} height={20} stroke="#3E4550" /> <span>로그아웃</span>
      </Button>
    </div>
  );
};

const AvatarCompoment = () => {
  const [hasAvataImage] = useState<boolean>(true); // 아바타 이미지 없는 경우(true/false)

  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={styles.btn_avatar}
      side="bottom"
      align="end"
      sideOffset={65}>
      {hasAvataImage ? (
        <Avatar imageUrl="https://github.com/shadcn.png" />
      ) : (
        // 아바타 이미지 없는 경우 CASE
        <span className={styles.name}>
          <em className={styles.text}>{'김'}</em>
        </span>
      )}
    </Popover>
  );
};

export const UserAvatar = memo(AvatarCompoment);
