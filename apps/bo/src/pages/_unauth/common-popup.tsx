import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { CompanyChoiceModal } from '@features/shared';
import { Button, ContentsRow, useModal } from '@learnway/ui';

import styles from '@learnway/styles/bo/pages/_auth/login.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '@widgets/layout/ui/container/page-container';

export const Route = createFileRoute('/_unauth/common-popup')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <PageContainer scrollHidden={true}>
      <MainContents>
        <div className={layoutStyles.inner}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>{t('공통팝업')}</h3>
          </div>
        </div>
        <Button
          type="button"
          size="xl"
          variant="primary"
          onClick={async () => {
            const data = await openModal({
              content: <CompanyChoiceModal />,
              width: 'xl',
              height: 'auto',
              closeOnOutsideClick: true,
            });
            console.log('page data :::::', data);
          }}
        >
          회사선택
        </Button>
      </MainContents>
    </PageContainer>
  );
}
