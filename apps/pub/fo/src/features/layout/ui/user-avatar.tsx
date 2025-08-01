import { useCodeGroup } from '@learnway/hooks';
import { IcoArrowBackward, IcoClose02 } from '@learnway/icons';

import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';
import { memo, useState } from 'react';
import popoverInnerStyles from './popover-inner.module.css';
import styles from './user-avatar.module.css';

import { UserMy } from './user-my';

const PopoverContent = () => {
  const [contents, setContents] = useState<string>('profile');
  const { data } = useCodeGroup('pms.multilingual.LangCountryCode', {});

  return (
    <div className={`${styles.start} ${popoverInnerStyles.start}`}>
      <div className={popoverInnerStyles.title_area}>
        {/* 타입 언어 시 노출 */}
        {contents === 'lang' ? (
          <Button className={popoverInnerStyles.btn_back} onClick={() => setContents('profile')}>
            <IcoArrowBackward width={24} height={24} stroke="#131416" />
          </Button>
        ) : (
          ''
        )}

        <h2>{contents === 'profile' ? '내정보' : '언어'}</h2>
        <Popover.Close>
          <Button variant="expand" size="sm" onlyIcon>
            <IcoClose02 className={popoverInnerStyles.btn_close} />
          </Button>
        </Popover.Close>
      </div>
      <UserMy onChangeType={setContents} onParentChangeType={contents} />
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
