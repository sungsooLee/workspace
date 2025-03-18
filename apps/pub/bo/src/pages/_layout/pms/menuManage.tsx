import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
export const Route = createFileRoute('/_layout/pms/menuManage')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}></div>
    </PageContainer>
  );
}
