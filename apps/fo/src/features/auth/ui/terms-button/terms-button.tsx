import { useTranslation } from 'react-i18next';
import { Button, useModal } from '@learnway/ui';

import type { TermsType } from '../../../../types';

import { TermsModal } from './terms-modal';

import styles from '@learnway/styles/fo/features/auth/ui/terms-button/terms-modal.module.css';

interface TermsButtonComponentProps {
  termsType: TermsType;
}

function TermsButtonComponent({ termsType }: TermsButtonComponentProps) {
  const { t } = useTranslation();
  const { open: openModal } = useModal();

  return (
    <Button
      onClick={() =>
        openModal({
          width: 'sm',
          content: <TermsModal termsType={termsType} />,
        })
      }>
      {t(`CODE.TERMS_TYPE.${termsType}`)}
    </Button>
  );
}

export const TermsButton = TermsButtonComponent;
