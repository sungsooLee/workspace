import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { useFetchAuthUser } from '@learnway/auth/entities';

import type { TermsType } from '../../../../../types';

import { TermsModal } from './terms-modal';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

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
        {t(`CODE.TERMS_TYPE.${termsType}`)}
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
