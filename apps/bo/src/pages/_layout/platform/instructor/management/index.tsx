import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer, MainContents, ContentsButtons } from '@shared/ui';
import { Button, useModal } from '@learnway/ui';
import { pageRouteConfig } from '@features/auth/index';
import { InstructorList } from '@features/platform/instructor';
import { InstructorListPopup } from '@features/platform/instructor/management/modal/instructor-list-modal';
import { EnPageMode } from '@types';
import { InstructorRegistPopup } from '@features/platform/instructor/management/modal/instructor-regist-modal';

export const Route = createFileRoute('/_layout/platform/instructor/management/')({
  component: RouteComponent,
  ...pageRouteConfig({}),
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          label={t('리스트 팝업')}
          variant="gray2"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            openModal({
              width: 'xl',
              content: <InstructorListPopup />,
              onClose: (data?: any) => {
                console.log('## closed', data);
              },
            });
          }}
        />
        <Button
          label={t('단건 조회 팝업')}
          variant="gray2"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            openModal({
              width: 'md',
              content: <InstructorRegistPopup instructorId={1} readOnly={true} />,
            });
          }}
        />

        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            router.navigate({
              to: '/platform/instructor/management/instructor-regist',
            })
          }
        >
          {t('등록')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <InstructorList viewMode={EnPageMode.PAGE} />
      </MainContents>
    </PageContainer>
  );
}
