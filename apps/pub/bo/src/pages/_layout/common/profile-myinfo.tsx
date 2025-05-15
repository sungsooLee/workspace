import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import contentsStyles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import styles from './profile-myinfo.module.css';

export const Route = createFileRoute('/_layout/common/profile-myinfo')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer hideOutLine={true}>
      {/* main_contents */}
      <div className={contentsStyles.main_contents}>
        <div className={styles.start}>
          <div className={styles.profile_wrap}></div>
          <div className={styles.info_wrap}></div>
        </div>
      </div>
    </PageContainer>
  );
}
