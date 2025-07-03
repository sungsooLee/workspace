/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { SplitPanel, Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { NoticeBox } from '../../../../../../bo/src/shared/ui/';
import { SectionLayout } from '../-components/section-layout';

/* styles */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import pageStyles from './tenant-menu-management.module.css';

/* contents */
import { MainWidget } from './-contents/main-widget';
import { MainWidgetDetail } from './-contents/main-widget-detail';

export const Route = createFileRoute('/_layout/pms/menu-tenant-mainwidget-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const menuItems = [
    {
      title: '1. 테넌트 기본 정보',
      key: 'menu01',
      content: '',
    },
    {
      title: '2. 테넌트 디자인/테마관리',
      key: 'menu02',
      content: '',
    },
    {
      title: '3. 테넌트 메뉴관리',
      key: 'menu03',
      content: '',
    },
    {
      title: '4. 테넌트 카테고리 관리',
      key: 'menu04',
      content: '',
    },
    {
      title: '5. 테넌트 역할 관리',
      key: 'menu05',
      content: '',
    },
    {
      title: '6. 메인 위젯관리',
      key: 'menu06',
      content: '',
    },
    {
      title: '7. 배너관리',
      key: 'menu07',
      content: '',
    },
  ];
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={cn(styles.main_contents, pageStyles.start)}>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu06'}
        />
        <NoticeBox
          iconVisible={false}
          descriptions={[
            '위젯을 추가 등록하려면 위젯추가 버튼을 클릭해 주세요.',
            '위젯 순서 변경은 드래그앤드랍으로 변경하며, 노출 여부는 우측에서 스위치 버튼으로 설정할 수 있습니다.',
            '위젯 순서 변경 후에 저장 버튼을 클릭해야 저장됩니다.',
          ]}
          type="bullet"
        />
        <SplitPanel divider={true}>
          <MainWidget />
          <MainWidgetDetail />
        </SplitPanel>
      </div>
    </PageContainer>
  );
}
