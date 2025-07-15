import { createFileRoute, useRouter, useNavigate, Link } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button } from '@learnway/ui';
import { t } from 'i18next';
import { CurriculumDetail } from '@features/learning-operate/curriculum';
import { FORM_MODE } from '../../../../../shared';
import { useState, useEffect } from 'react';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useIsManager } from '@features/learning-operate/curriculum/curriculum-management/hooks/use-role-info';

export const Route = createFileRoute('/_layout/learning-operate/curriculum/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  // const isManager = useIsManager({
  //   loginUser,
  // });
  // 초기 curriculumId (router state 또는 URL params에서 가져옴)
  // const initialCurriculumId = router.state.location.state?.curriculumId;
  const initialCurriculumId = 4;

  // 현재 커리큘럼 ID 상태 관리 (undefined = 생성 모드, number = 상세 모드)
  const [currentCurriculumId, setCurrentCurriculumId] = useState<number | undefined>(
    initialCurriculumId,
  );

  // 모드 결정: curriculumId가 있으면 상세보기, 없으면 생성
  const mode = currentCurriculumId ? FORM_MODE.detail : FORM_MODE.create;

  const handleCurriculumCreated = (newCurriculumId: number) => {
    setCurrentCurriculumId(newCurriculumId);
  };

  // 목록으로 이동
  const handleGoToList = () => {
    //
  };

  const handleCreateNew = () => {
    setCurrentCurriculumId(undefined);
  };

  return (
    <PageContainer>
      <ContentsButtons>
        {mode === FORM_MODE.create ? (
          <>
            <Button variant="point" size="sm">
              미리보기
            </Button>
            <Button variant="point" size="sm" onClick={handleGoToList}>
              목록
            </Button>
          </>
        ) : (
          <>
            <Button variant="point" size="sm">
              과정개설
            </Button>
            <Button variant="point" size="sm">
              매핑과정
            </Button>
            <Button variant="point" size="sm" onClick={handleGoToList}>
              목록
            </Button>
            <Button variant="point" size="sm">
              미리보기
            </Button>
          </>
        )}
      </ContentsButtons>
      <MainContents>
        <CurriculumDetail
          mode={mode}
          curriculumId={currentCurriculumId || 0}
          onCurriculumCreated={handleCurriculumCreated}
        />
      </MainContents>
    </PageContainer>
  );
}
