import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button } from '@learnway/ui';
import { t } from 'i18next';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Curriculum } from '../../learning/course/detail/-tabs/curriculum';
import { CurriculumList } from '../../../../features/learning-operate/curriculum/curriculum-management/components/curriculum-list';

export const Route = createFileRoute('/_layout/learning-operate/curriculum/')({
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
