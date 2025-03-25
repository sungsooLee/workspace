import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Avatar, Button, Popover, useModal } from '@learnway/ui';
import { PasswordVerifyPopup } from '../../layout';
import { IcLogOut01 } from '@learnway/icons';
import styles from './user-avatar.module.css';

const PopoverContent = () => {
  // 퍼블수정 20250324 : alert -> confirm 으로 변경
  const { confirm: openConfirm } = useModal();
  const { open: openModal } = useModal();
  const [hasAvataImage] = useState<boolean>(true); // 아바타 이미지 없는 경우(true/false)

  const handleClickAlert1 = () => {
    openConfirm({
      title: <></>,
      description: <>로그아웃 하시겠습니까?</>,
    });
  };

  const handleClickAlert2 = () => {
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
      cancelButtonLabel: '취소',
    });
  };

  return (
    <div className={`${styles.start} ${styles.avata_area}`}>
      <div className={styles.profile_info}>
        <div className={styles.avata_img}>
          {/* 퍼블수정 20250318 : 아바타 사진 수정 */}
          {hasAvataImage ? (
            <div className={styles.avata_box}>
              <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
              <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
            </div>
          ) : (
            // 아바타 이미지 없는 경우 CASE
            <div className={styles.avata_box}>
              <span className={styles.name}>
                <em className={styles.text}>{'김'}</em>
              </span>
              <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
            </div>
          )}
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>김현대</span>
          <span className={styles.tenant}>현대오토에버</span>
          <span className={styles.team}>팀명</span>
          {/* 퍼블수정 20250317 : 최근접속 추가 */}
          <span className={styles.time}>
            <span>최근접속</span>
            <span>2026-01-01 18:28</span>
          </span>
        </div>
      </div>
      <ul className={styles.info_list}>
        <li>
          <Button
            onClick={() =>
              openModal({
                width: 's',
                content: <PasswordVerifyPopup />,
              })
            }>
            개인정보 변경
          </Button>
          {/* <Link to={''}>개인정보 변경</Link> */}
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
      sideOffset={10}>
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
