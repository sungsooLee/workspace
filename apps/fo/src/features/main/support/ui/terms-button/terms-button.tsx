import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';

import type { TermsType } from '@entities/terms';

import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { TermsModal } from './terms-modal';

interface TermsButtonComponentProps {
  termsType: TermsType;
}

function TermsButtonComponent({ termsType }: TermsButtonComponentProps) {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const { data } = useFetchAuthUser();

  // 세션 정보가 있는 경우 routing
  if (data) {
    return (
      <Link to={'/clause/$termsType'} params={{ termsType }}>
        {termsType === 'privacy-policy' ? t('개인정보처리방침') : t('이용약관')}
      </Link>
    );
  }

  // 세션 정보가 없는 경우 Modal
  return (
    <Button
      onClick={() =>
        openModal({
          width: 'sm',
          content: <TermsModal termsType={termsType} />,
        })
      }
    >
      {t(`CODE.TERMS_TYPE.${termsType}`)}
    </Button>
  );
}

export const TermsButton = TermsButtonComponent;
