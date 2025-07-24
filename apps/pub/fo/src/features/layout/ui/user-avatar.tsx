import { cn } from '@learnway/shared';
import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Avatar, Button, Popover, useModal } from '@learnway/ui';
import { PasswordVerifyPopup } from '../../layout';
import { IcLogOut01, IcoXclose } from '@learnway/icons';
import styles from './user-avatar.module.css';
import fallbackStyles from './fallback.module.css';

const PopoverContent = () => {
  // 퍼블수정 20250324 : alert -> confirm 으로 변경
  const { confirm: openConfirm } = useModal();
  const { open: openModal } = useModal();
  const [hasAvataImage] = useState<boolean>(true); // 아바타 이미지 없는 경우(true/false)

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
    <div className={`${styles.start} ${styles.avatar_area}`}>
      <div className={styles.profile_info}>
        <div className={styles.avatar_img}>
          {/* 이미지일경우 */}
          <Avatar imageUrl="https://github.com/shadcn.png" size="2xl" />
          {/* 텍스트일경우 */}
          {/* <Avatar fallback="AB" size="2xl" /> */}
        </div>
        <div className={styles.profile}>
          <div className={styles.info_box}>
            <span className={styles.name}>김현대</span>
            <Button size="sm" underline={true} label={'개인정보변경'} />
          </div>
          <div className={styles.tenant}>
            <span>현대오토에버</span>
            <span>Sales & Marketing</span>
            <span>책임연구원</span>
          </div>
        </div>
      </div>

      <div className={styles.point_box}>
        <span className={styles.txt}>나의 포인트</span>
        <span className={styles.point}>
          <em>243</em>P
        </span>
      </div>

      <Button variant="primary" size="xl">
        나의 학습
      </Button>

      {/* 최근방문 */}
      <div className={styles.recent_visits}>
        <h3>최근 방문</h3>
        <dl>
          <dt></dt>
          <dd>결재함</dd>
        </dl>
      </div>
      <ul className={styles.info_list}>
        <li>
          <Button
            onClick={() =>
              openModal({
                width: 's',
                content: <PasswordVerifyPopup />,
              })
            }
          >
            개인정보 변경
          </Button>
          {/* <Link to={'/'}>개인정보 변경</Link> */}
        </li>
        <li>
          <Link to={'/'}>프로필 작성</Link>
        </li>
        {/* 퍼블수정 20250328 : 로그인 설정 추가 */}
        <li>
          <Link to={'/'}>SNS 로그인 설정</Link>
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
      sideOffset={10}
    >
      {hasAvataImage ? (
        <Avatar imageUrl="https://github.com/shadcn.png" size="sm" />
      ) : (
        // 아바타 이미지 없는 경우 CASE
        <Avatar fallback="A" size="sm" />
      )}
    </Popover>
  );
};

export const UserAvatar = memo(AvatarCompoment);
