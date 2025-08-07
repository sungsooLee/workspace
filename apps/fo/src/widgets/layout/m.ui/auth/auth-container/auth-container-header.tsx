import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { memo, useMemo } from 'react';

import { useCurrentRoute } from '@learnway/hooks';
import { IcoArrowBackward, IcoXclose } from '@learnway/icons';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/auth/auth-container/auth-container-header.module.css';
import { Button } from '@learnway/ui/button';

import { useMobileAuthTitle } from '@widgets/layout/service/mobile-auth-title';

function ContainerHeaderComponent() {
  const router = useRouter();
  const { title } = useMobileAuthTitle(router.state.location.pathname);
  const { meta } = useCurrentRoute();
  const canGoBack = useCanGoBack();

  const authTitle = useMemo(() => {
    return meta?.title || title;
  }, [title, meta]);

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
        <h2>{authTitle}</h2>
      </div>

      <Button onClick={handleClose}>
        <IcoXclose width={24} height={24} stroke="#131C30"></IcoXclose>
      </Button>
    </div>
  );
}

/**
 * @description MO 로그인 페이지 제외 모든 화면 타이틀 영역
 */
export const MobileAuthContainerHeader = memo(ContainerHeaderComponent);
