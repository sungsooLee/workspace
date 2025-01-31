import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './my-menu.module.css';
import { Popover } from '@learnway/ui';
import { IcoStar } from '@learnway/icons';

// import { useFetchAuthUser } from '../../../entities/user';

const PopoverContent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{t('RECENT MENU')}</div>
      <div>최근 메뉴 목록</div>
      <div>{t('FAVORITES')}</div>
      <div>즐겨찾기 목록</div>
    </div>
  );
};

const MyMenuCompoment = () => {
  const { t } = useTranslation();

  // const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      {
        <button type="button" className={styles.btn_menu}>
          <IcoStar width={18} height={18} stroke="#FFB902" fill="#FFB902" />
          <span className={styles.btn_text}>{t('My menu')}</span>
        </button>
      }
    </Popover>
  );
};

export const MyMenu = memo(MyMenuCompoment);
