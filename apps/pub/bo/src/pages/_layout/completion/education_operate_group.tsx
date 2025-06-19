/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { SectionLayout } from '../-components/section-layout';
import { SplitPanel, Tabs, TreeBox, TreeContainer, TreeNode } from '@learnway/ui';
import { MainContents } from '../../../../../../bo/src/widgets/layout/ui/container/slot/main-contents';

/** tab contents */
import { HeadquartersInfo } from './-contents/headquarters-info';
import { AffiliationGroup } from './-contents/affiliation-group';
import { TalentDevelopmentTeam } from './-contents/talent-development-team';
import { CurrentTeamCharge } from './-contents/current-team-charge';

export const Route = createFileRoute('/_layout/completion/education_operate_group')({
  component: RouteComponent,
});

function RouteComponent() {
  const sampleData: TreeNode[] = [
    {
      key: '1',
      title: 'Root Node 1',
      isUsed: false,
      children: [
        {
          key: '1-1',
          title: 'Child 1',
          isUsed: true,
          children: [
            { key: '1-1-1', title: 'Grandchild 1', isUsed: true },
            { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
          ],
        },
        {
          key: '1-2',
          title: 'Child 2',
          isUsed: true,
          children: [
            { key: '2-1', title: 'Child 3', isUsed: false },
            { key: '2-2', title: 'Child 4', isUsed: false },
          ],
        },
      ],
    },
  ];
  const menuItems = [
    {
      title: '본부 정보',
      key: 'menu01',
      content: <HeadquartersInfo />,
    },
    {
      title: '소속조직',
      key: 'menu02',
      content: <AffiliationGroup />,
    },
    {
      title: '인재개발주무팀',
      key: 'menu03',
      content: <TalentDevelopmentTeam />,
    },
    {
      title: '현업팀담당',
      key: 'menu04',
      content: <CurrentTeamCharge />,
    },
  ];
  return (
    <PageContainer>
      <MainContents>
        {/* <SectionLayout contentsRatio={'thirty'}>
          <TreeContainer>
            <TreeBox data={sampleData} treeId={'menu-tree'} title={'교육본부'} />
          </TreeContainer>
          <Tabs items={menuItems} type="line" size="sm" selectedTabKey={'menu01'} />
        </SectionLayout> */}
        <SplitPanel size={['30%']}>
          <div>
            <TreeBox data={sampleData} treeId={'menu-tree'} title={'교육본부'} />
          </div>
          <div>
            <Tabs items={menuItems} type="line" size="sm" selectedTabKey={'menu01'} />
          </div>
        </SplitPanel>
      </MainContents>
    </PageContainer>
  );
}
