import { memo, ReactNode } from 'react';
import { useActiveMenuDepthState } from '../../../../../features/platform';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { Link, useRouter, useCanGoBack } from '@tanstack/react-router';

import { Button } from '@learnway/ui';

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
    <div>
      <Button onClick={handleBack}>&lt;</Button> {title}
    </div>
  );
}

export const MobileContainerHeader = memo(ContainerHeaderComponent);
