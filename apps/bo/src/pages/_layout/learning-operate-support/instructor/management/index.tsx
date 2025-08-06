import {
  InstructorList,
  InstructorListPopup,
  InstructorRegistPopup,
} from '@features/learning-operate-support/instructor-tutor/instructor-management';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { EnPageMode } from '@shared/types/enums';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

export const Route = createFileRoute('/_layout/learning-operate-support/instructor/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { openModal } = useModal();

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
              to: '/learning-operate-support/instructor/management/instructor-regist',
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
