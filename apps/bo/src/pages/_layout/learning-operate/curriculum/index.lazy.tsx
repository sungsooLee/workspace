import { CurriculumList } from '@features/learning-operate/curriculum/curriculum-management/components/curriculum-list';
import { Button } from '@learnway/ui/button';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { useRouter, createLazyFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';

export const Route = createLazyFileRoute('/_layout/learning-operate/curriculum/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          label={t('LABEL.button.regist')}
          variant="primary"
          size="sm"
          onClick={() => {
            router.navigate({
              to: '/learning-operate/curriculum/management',
            });
          }}
        />
      </ContentsButtons>
      <MainContents>
        <CurriculumList />
      </MainContents>
    </PageContainer>
  );
}
