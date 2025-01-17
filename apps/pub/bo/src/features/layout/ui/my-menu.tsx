import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Popover } from '@learnway/ui';

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

  return <Popover popoverContent={<PopoverContent />}>{t('MY MENU')}</Popover>;
};

export const MyMenu = memo(MyMenuCompoment);
