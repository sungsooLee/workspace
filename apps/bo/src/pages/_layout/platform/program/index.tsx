import { createFileRoute } from '@tanstack/react-router';
import { pageRouteConfig } from '../../../../features/auth';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { Tabs, TreeNode } from '@learnway/ui';
import { cn } from '@learnway/shared';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { useEffect, useRef, useState } from 'react';
import { ProgramTree } from '../../../../features/program/ui/program-tree';
import { useFetchPrograms } from '../../../../entities/program/service/program-manage.hook';
import { transformApiDataToApiTreeData } from '../../../../features/menu/service/menu.service';

export const Route = createFileRoute('/_layout/platform/program/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '플랫폼 API 관리',
    },
  }),
});

function RouteComponent() {
  const [treeData, setTreeData] = useState();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const [lastCreateProgramId, setLastCreateProgramId] = useState<string | null>(null);
  const prevDataRef = useRef(null);

  // 프로그램 트리 목록 조회
  const { data } = useFetchPrograms(selectedTabKey);

  useEffect(() => {
    if (data) {
      prevDataRef.current = data;

      const transformedData = transformApiDataToApiTreeData(data);
      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [data]);

  const renderTabContent = (tabKey: string) => {
    // console.log(data);
    return (
      <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
        {/* {tabKey} */}
        {treeData && <ProgramTree treeData={treeData} />}
      </div>
    );
  };
  const items = [
    {
      title: '학습자 메뉴',
      key: 'FO',
      content: renderTabContent('FO'),
    },
    {
      title: 'HRD센터 메뉴',
      key: 'BO',
      content: renderTabContent('BO'),
    },
  ];

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      // 1. 선택된 탭 업데이트
      setSelectedTabKey(tabKey);

      // 2. 선택된 노드 초기화
      //   setSelectedNode(null);

      // 3. 모드를 init으로 설정
      //   setMode('init');

      // 4. 부모 노드 초기화
      //   setParentNode(null);

      // 5. expandedKeys 초기화
      setExpandedKeys([]);
    }
  };
  return (
    <PageContainer scrollHidden={true}>
      <MainContents>
        <Tabs
          selectedTabKey={selectedTabKey}
          items={items}
          className={styles.tab_wrap}
          type="line"
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
