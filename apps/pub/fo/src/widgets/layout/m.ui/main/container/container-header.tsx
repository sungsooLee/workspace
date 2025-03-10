import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '../../../../../features/platform';
import { useCreation } from 'ahooks';
import { last } from 'lodash';
import { Link, useRouter, useCanGoBack } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoArrowBackward } from '@learnway/icons';
import { CategoryButton } from '../../../../../features/layout';

import styles from './container-header.module.css';

//interface ContainerHeaderComponentProps {}

function ContainerHeaderComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title ?? '모바일 페이지 제목';
  }, [activeMenuDepth]);

  const handleBack = () => {
    if (canGoBack) {
      // 이전 페이지가 있으면 뒤로 가기
      router.history.go(-1);
    } else {
      // 이전 페이지가 없으면 기본 경로로 이동
      router.navigate({ to: '/' });
    }
  };

  return (
    <div className={styles.start}>
      <div className={styles.left}>
        <Button onClick={handleBack}>
          <IcoArrowBackward width={24} height={24} stroke="#131c30"></IcoArrowBackward>
        </Button>
        <h1>{title}</h1>
      </div>
      <CategoryButton></CategoryButton>
    </div>
  );
}

export const MobileContainerHeader = memo(ContainerHeaderComponent);
