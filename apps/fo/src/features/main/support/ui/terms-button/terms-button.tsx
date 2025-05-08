import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { Button, useModal } from '@learnway/ui';
import { useFetchAuthUser } from '@learnway/auth';

import type { TermsType } from '../../../../../types';

import { TermsModal } from './terms-modal';

interface TermsButtonComponentProps {
  termsType: TermsType;
}

function TermsButtonComponent({ termsType }: TermsButtonComponentProps) {
  const { t } = useTranslation();
  const { open: openModal } = useModal();

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
