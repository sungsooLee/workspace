import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button } from '@learnway/ui';
import { t } from 'i18next';
import { CurriculumDetail } from '@features/learning-operate/curriculum';
import { FORM_MODE } from '../../../../../shared';

export const Route = createFileRoute('/_layout/learning-operate/curriculum/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  // 커리큘럼 ID 조회 해오기
  const { curriculumId } = router.state.location.state;
  // 커리큘럼 ID가 없으면 등록 모드, 있으면 상세 모드로 진입 CurriculumDetail 컴포넌트에 전달
  const mode = curriculumId ? FORM_MODE.detail : FORM_MODE.create;

  return (
    <PageContainer>
      <ContentsButtons>
        {mode === FORM_MODE.create ? (
          <>
            <Button variant="point" size="sm">
              미리보기
            </Button>
            <Button variant="point" size="sm">
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
            <Button variant="point" size="sm">
              목록
            </Button>
            <Button variant="point" size="sm">
              미리보기
            </Button>
          </>
        )}
      </ContentsButtons>
      <MainContents>
        <CurriculumDetail mode={mode} curriculumId={curriculumId} />
      </MainContents>
    </PageContainer>
  );
}
