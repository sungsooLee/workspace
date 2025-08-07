import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

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
  if (isMobile) {
    return (
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <TermsModal termsType={termsType} />,
          })
        }
      >
        {termsType === 'privacy-policy' ? t('개인정보처리방침') : t('이용약관')}
      </Button>
    );
  } else {
    return (
      <Link to={'/clause/$termsType'} params={{ termsType }}>
        {termsType === 'privacy-policy' ? t('개인정보처리방침') : t('이용약관')}
      </Link>
    );
  }
}

export const TermsButton = TermsButtonComponent;
