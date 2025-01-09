import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CODE_GROUP } from '@learnway/config';
import { Avatar, Popover } from '@learnway/ui';

import { useSetLanguage } from '../../../features/system';
import { useFetchAuthUser } from '../../../entities/user';
import { useCodesByCodeGroup } from '../../../entities/system';
import type { Code } from '../../../entities/system';

const PopoverContent = ({ data }: { data?: Code[] }) => {
  const { t } = useTranslation();

  const { set: setLanguage } = useSetLanguage();

  const handleLang = (lang: string) => {
    setLanguage(lang);
  };

  if (!data || !data?.length) {
    return <></>;
  }

  return (
    <div>
      <li key={`LANGUAGE-TITLE`}>{t('LANGUAGE')}</li>
      {data.map((code: Code, index: number) => {
        return (
          <li value={code.code} key={`LANGUAGE${index}`} onClick={() => handleLang(code.code)}>
            {code.label}
          </li>
        );
      })}
    </div>
  );
};

const LanguageComponent = () => {
  const { data } = useFetchAuthUser();
  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);

  return (
    <Popover popoverContent={<PopoverContent data={languageCodes} />}>
      <Avatar imageUrl="https://*.png" fallback="Lang" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
