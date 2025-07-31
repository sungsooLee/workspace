import { CurriculumList } from '@features/learning-operate/curriculum/curriculum-management/components/curriculum-list';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button } from '@learnway/ui/button';

export const Route = createFileRoute('/_layout/learning-operate/curriculum/')({
  component: RouteComponent });

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
              to: '/learning-operate/curriculum/management' });
          }}
        />
      </ContentsButtons>
      <MainContents>
        <CurriculumList />
      </MainContents>
    </PageContainer>
  );
}
