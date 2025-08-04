import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { useDynamicForm2 } from '@learnway/hooks';
import { ContentTopButtons } from '@features/learning-resource';
import { useAssignmentLoaderData } from '@features/learning-resource/learning-resource-management/service/assignment/use-assignment-loader-data';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { AssignmentTab } from '@features/learning-resource/learning-resource-management/service/assignment/type';
import { TabItemProps, Tabs } from '@learnway/ui/tabs';
import { LearningResourceAssignmentBasicInfo } from '@features/learning-resource/learning-resource-management/ui/learning-resource-assignment-basic-info';
import { LearningResourceAssignmentSubmission } from '@features/learning-resource/learning-resource-management/ui/learning-resource-assignment-submission';

export const Route = createLazyFileRoute('/_layout/learning/resource/assignment/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const { mode, contentUuid, listParam, data, refetchContentDetail, hasMapping } =
    useAssignmentLoaderData();

  const form = useDynamicForm2();
  const { provider, onSubmit } = form;

  const basicInfoRef = useRef(null);
  const assignmentInfoRef = useRef(null);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(AssignmentTab.BASIC_INFO);

  const handleTabChange = useCallback((tabKey: string) => setSelectedTabKey(tabKey), []);

  const [saved, setSaved] = useState<boolean>(false);

  const tabItems = useMemo<TabItemProps[]>(
    () => [
      {
        title: t('과제 정보'),
        key: AssignmentTab.BASIC_INFO,
        content: <LearningResourceAssignmentBasicInfo />,
      },
      {
        title: t('과제물 관리'),
        key: AssignmentTab.SUBMISSION,
        content: <LearningResourceAssignmentSubmission />,
      },
    ],
    [],
  );

  return (
    <form>
      <PageContainer>
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>
        <MainContents>
          <div className="form_row">
            <div className={styles.main_contents}>
              <Tabs
                type="progress"
                size="sm"
                selectedTabKey={selectedTabKey}
                items={tabItems}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </MainContents>
      </PageContainer>
    </form>
  );
}
