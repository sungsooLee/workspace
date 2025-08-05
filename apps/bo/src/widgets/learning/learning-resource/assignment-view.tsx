/* IA117 / NLP_BO_CMS_1301 - 나의 학습자원 > 과제 등록 및 상세 */
import {
  AssignmentTab,
  AssignmentTabRef,
} from '@features/learning-resource/learning-resource-management/service/assignment/type';
import { LearningResourceAssignmentBasicInfo } from '@features/learning-resource/learning-resource-management/ui/learning-resource-assignment-basic-info';
import { LearningResourceAssignmentSubmission } from '@features/learning-resource/learning-resource-management/ui/learning-resource-assignment-submission';
import { useDynamicForm2 } from '@learnway/hooks';
import { TabItemProps, Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentInformation } from '@entities/learning-resource';
import { ContentTopButtons, getTooltipContent } from '@features/learning-resource';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { ContentCreateType } from '@shared/types/enums';

interface Props {
  content?: ContentInformation;
  hasMapping?: boolean;
}

function AssignmentViewComponent({ content, hasMapping }: Props) {
  const { t } = useTranslation();

  const contentUuid = content?.contentUuid ?? '';

  const basicInfoForm = useDynamicForm2();
  const { provider, onSubmit } = basicInfoForm;

  const basicInfoRef = useRef<AssignmentTabRef>(null);
  const assignmentInfoRef = useRef<AssignmentTabRef>(null);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(AssignmentTab.BASIC_INFO);

  const handleTabChange = useCallback((tabKey: string) => setSelectedTabKey(tabKey), []);

  const [saved, setSaved] = useState<boolean>(false);

  const tabItems = useMemo<TabItemProps[]>(
    () => [
      {
        title: t('과제 정보'),
        key: AssignmentTab.BASIC_INFO,
        content: (
          <LearningResourceAssignmentBasicInfo
            ref={basicInfoRef}
            basicInfoForm={basicInfoForm}
            content={content}
          />
        ),
      },
      {
        title: t('과제물 관리'),
        key: AssignmentTab.SUBMISSION,
        content: <LearningResourceAssignmentSubmission ref={assignmentInfoRef} />,
      },
    ],
    [basicInfoForm, content],
  );

  const handleOnSubmit = (data: Record<string, any>) => {
    if (basicInfoRef.current) {
      basicInfoRef.current?.save?.(data);
    } else if (assignmentInfoRef.current) {
      //
    }
  };

  useEffect(() => {
    if (contentUuid) {
      setSaved(true);
    }
  }, [contentUuid]);

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer
        title={t('과제 상세')}
        tooltipProps={{
          show: !!hasMapping || content?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(content?.createType)),
          type: content?.createType,
        }}
      >
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

AssignmentViewComponent.displayName = 'AssignmentView';

export const AssignmentView = AssignmentViewComponent;
