import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './my-menu.module.css';
import { Chips, Popover } from '@learnway/ui';
import { IcoStar, IcoAnnouncement03 } from '@learnway/icons';
import { cn } from '@learnway/shared';

// import { useFetchAuthUser } from '../../../entities/user';

interface menuInfo {
  id: number;
  label: string;
  value: string;
}

const items: menuInfo[] = [
  { id: 1, label: '학습운영', value: 'A' },
  { id: 2, label: '수강신청/현황', value: 'B' },
  { id: 3, label: '대리 결재자 지정', value: 'C' },
  { id: 4, label: '컨퍼런스/포럼/워크샵', value: 'E' },
  { id: 5, label: '전시관리', value: 'F' },
  { id: 6, label: 'COP결과 관리', value: 'g' },
];

const PopoverContent = () => {
  // const { t } = useTranslation();

  const [menu, setMymenus] = useState<menuInfo[]>(items);

  const handleDelete = (id: number) => {
    setMymenus(menu.filter((notif) => notif.id !== id));
    console.log('111');
  };

  return (
    <div className={cn(styles.start, styles.mymenu_wrap)}>
      <strong className={styles.tit}>{'최근 메뉴'}</strong>
      <div className={styles.word_contents}>
        {/* 최근 자주 사용한 메뉴 없는 경우 */}
        {items.length === 0 ? (
          <p className={styles.text}>
            <IcoAnnouncement03
              className={styles.icon_menu}
              width={32}
              height={32}
              stroke="#131C30"
            />
            최근 자주 사용한 메뉴를
            <br />
            최대 10개 까지 볼 수 있습니다.
          </p>
        ) : (
          <div className={styles.word_wrap}>
            {items.map(({ id, label, value }) => (
              <Chips
                key={id}
                className={styles.word_item}
                size={'sm'}
                option={{ label: label, value: value }}
              />
            ))}
          </div>
        )}
      </div>
      <strong className={styles.tit}>{'즐겨찾기'}</strong>
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
