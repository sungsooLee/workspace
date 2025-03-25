import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';
import { last } from 'lodash';
import { Link, useRouter, useCanGoBack } from '@tanstack/react-router';

import { IcoArrowBackward, IcoXclose } from '@learnway/icons';
import { Button } from '@learnway/ui';

import { isSigninPage, useCurrentRoute } from '../../../../../features/platform';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/auth/auth-container/auth-container-header.module.css';

//interface ContainerHeaderComponentProps {}

function ContainerHeaderComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { meta } = useCurrentRoute();
  /*
  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title ?? '모바일 페이지 제목';
  }, [activeMenuDepth]);
*/
  const handleBack = () => {
    if (canGoBack) {
      // 이전 페이지가 있으면 뒤로 가기
      router.history.go(-1);
    } else {
      // 이전 페이지가 없으면 기본 경로로 이동
      handleClose();
    }
  };

  const handleClose = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={styles.start}>
      <div className={styles.left}>
        <Button onClick={handleBack}>
          <IcoArrowBackward width={24} height={24} stroke="#131c30"></IcoArrowBackward>
        </Button>
        <h2>{t(meta?.title)}</h2>
      </div>

      <Button onClick={handleClose}>
        <IcoXclose width={24} height={24} stroke="#131C30"></IcoXclose>
      </Button>
    </div>
  );
}

export const MobileAuthContainerHeader = memo(ContainerHeaderComponent);
