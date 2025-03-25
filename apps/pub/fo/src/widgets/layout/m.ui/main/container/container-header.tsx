import { memo, ReactNode, useState, useEffect } from 'react';
import { useActiveMenuDepthState } from '../../../../../features/platform';
import { useCreation } from 'ahooks';
import { last } from 'lodash';
import { Link, useRouter, useCanGoBack } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoArrowBackward, IcoXclose } from '@learnway/icons';
import { CategoryButton, Search } from '../../../../../features/layout';

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

  // 퍼블 확인용
  const [categoryPage, setCategoryPage] = useState(false);
  const [integrated, setIntegrated] = useState(false);
  useEffect(() => {
    setCategoryPage(window.location.pathname.includes('/category/'));
    setIntegrated(window.location.pathname.includes('/integrated-search/'));
  }, []);

  return (
    <div className={styles.start}>
      {!categoryPage && (
        <>
          <div className={styles.left}>
            <Button onClick={handleBack}>
              <IcoArrowBackward width={24} height={24} stroke="#131c30"></IcoArrowBackward>
            </Button>
            <h2>{title}</h2>
          </div>
          {categoryPage && <CategoryButton></CategoryButton>}
        </>
      )}

      {/* 통합검색 header */}
      {integrated && (
        <div className={styles.left}>
          <Button onClick={handleBack}>
            <IcoArrowBackward width={24} height={24} stroke="#131c30"></IcoArrowBackward>
          </Button>
          <Search />
        </div>
      )}

      {/* 로그인/회원가입관련 서브 header */}
      {/* <div className={styles.left}>
        <Button>
          <IcoArrowBackward width={24} height={24} stroke="#131c30"></IcoArrowBackward>
        </Button>
        <h2>타이틀</h2>
      </div>

      <Button>
        <IcoXclose width={24} height={24} stroke="#131C30"></IcoXclose>
      </Button> */}
    </div>
  );
}

export const MobileContainerHeader = memo(ContainerHeaderComponent);
