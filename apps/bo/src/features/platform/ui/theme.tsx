import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { values } from 'lodash';

import { Avatar, Popover } from '@learnway/ui';

import { useFetchAuthUser } from '../../../entities/auth';

enum Themes {
  DEFAULT = 'default',
  RED = 'red',
  GREEN = 'green',
}

const PopoverContent = () => {
  const handleTheme = (theme: string) => {
    document.documentElement.classList.remove('red');
    document.documentElement.classList.remove('green');
    if (theme === Themes.DEFAULT) {
      return;
    }
    document.documentElement.classList.add(theme);
  };

  return (
    <div>
      {values(Themes).map((code: string, index: number) => {
        return (
          <li key={`THEME${index}`} onClick={() => handleTheme(code)}>
            {code}
          </li>
        );
      })}
    </div>
  );
};

const ThemeComponent = () => {
  const { t, i18n } = useTranslation();

  const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      <Avatar imageUrl="https://*.png" fallback="Theme" />
    </Popover>
  );
};

export const Theme = memo(ThemeComponent);
