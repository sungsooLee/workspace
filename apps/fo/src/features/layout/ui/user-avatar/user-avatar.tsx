import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { IcoClose02 } from '@learnway/icons';
import { cn, getFullImagePath } from '@learnway/shared';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';

import popoverInnerStyles from '@learnway/styles/fo/features/layout/ui/user-avatar/popover-inner.module.css';
import styles from '@learnway/styles/fo/features/layout/ui/user-avatar/user-avatar.module.css';

import { UserAvatarContents } from './user-avatar-contents';
import { AvataFallback } from './user-avatar-fallback';

const PopoverContent = () => {
  const { t } = useTranslation();
  const [contentType, setContentType] = useState<'profile' | 'lang'>('profile');

  // const handleClickAlert2 = () => {
  //   openConfirm({
  //     title: <>로그인 시간을 연장하시겠습니까?</>,
  //     content: (
  //       <>
  //         로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
  //         <br />
  //         로그인 시간을 연장하시겠습니까?
  //         <div className="time">
  //           남은시간 : <strong>4분 59초</strong>
  //         </div>
  //       </>
  //     ),
  //     okButtonLabel: '로그인연장',
  //     cancelButtonLabel: '취소',
  //   });
  // };

  return (
    <div className={`${styles.start} ${popoverInnerStyles.start}`}>
      <div className={popoverInnerStyles.title_area}>
        <h2>{contentType === 'profile' ? t('내정보') : t('언어')}</h2>
        {contentType === 'profile' ? (
          <Popover.Close asChild>
            <Button variant="expand" size="sm" onlyIcon>
              <IcoClose02 className={popoverInnerStyles.btn_close} />
            </Button>
          </Popover.Close>
        ) : (
          <Button variant="expand" size="sm" onlyIcon onClick={() => setContentType('profile')}>
            <IcoClose02 className={popoverInnerStyles.btn_close} />
          </Button>
        )}
      </div>
      <UserAvatarContents contentType={contentType} setContentType={setContentType} />
    </div>
  );
};

// TODO 직군/직무, 각종 링크, 포인트, 이벤트 메뉴 확인필요
/**
 * @description FO GNB 아바타 FO_COM_1004
 *
 */
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
      <Avatar
        imageUrl={getFullImagePath(authUser?.avataImage)}
        fallback={<AvataFallback name={authUser?.name} />}
      />
    </Popover>
  );
};

export const UserAvatar = AvatarCompoment;
