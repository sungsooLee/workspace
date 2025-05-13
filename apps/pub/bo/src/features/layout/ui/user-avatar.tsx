import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Avatar, Button, Popover, useModal } from '@learnway/ui';
import { IcLogOut01 } from '@learnway/icons';
import styles from './user-avatar.module.css';

/* company logo image */
import imgLogo from '../../../assets/images/temp/img_temp_company_logo.png';

const PopoverContent = () => {
  const { alert: openAlert } = useModal();
  const [hasAvataImage] = useState<boolean>(true); // 아바타 이미지 없는 경우(true/false)

  const handleClickAlert1 = () => {
    openAlert({
      title: '',
      content: <>로그아웃 하시겠습니까?</>,
    });
  };

  const handleClickAlert2 = () => {
    openAlert({
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
      isConfirm: true,

      okButtonLabel: '로그인연장',
    });
  };

  return (
    <div className={`${styles.start} ${styles.avata_area}`}>
      {/* 퍼블수정 20240513 : 수정 S */}
      <div className={styles.profile_info}>
        <div className={styles.avata_img}>
          {hasAvataImage ? (
            <>
              <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
              <span className={styles.logo_wrap}>
                <img src={imgLogo} alt="" className={styles.logo_img} />
              </span>
            </>
          ) : (
            // 아바타 이미지 없는 경우 CASE
            <>
              <span className={styles.name}>
                <em className={styles.text}>{'김'}</em>
              </span>
              <span className={styles.logo_wrap}>
                <img src={imgLogo} alt="" className={styles.logo_img} />
              </span>
            </>
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
          <Link to={''}>나의 정보</Link>
        </li>
        <li>
          <Link to={''}>나의 권한</Link>
        </li>
        <li>
          <Link to={''}>문의하기 ITSM</Link>
        </li>
      </ul>
      <div className={styles.logout_wrap}>
        <Button className={styles.btn_log} variant="text" onClick={() => handleClickAlert2()}>
          <IcLogOut01 width={20} height={20} stroke="#3E4550" /> <span>로그아웃</span>
        </Button>
        <p className={styles.customer_info}>{'고객센터 02-6296-6789'}</p>
      </div>
      {/* 퍼블수정 20240513 : 수정 E */}
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
      sideOffset={10}
    >
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
