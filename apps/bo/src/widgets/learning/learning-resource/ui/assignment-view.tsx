/* IA117 / NLP_BO_CMS_1301 - 나의 학습자원 > 과제 등록 및 상세 */
import {
  AssignmentTab,
  AssignmentTabRef,
} from '@features/learning-resource/learning-resource-management/service/assignment/type';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { TabItemProps, Tabs } from '@learnway/ui/tabs';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentInformation } from '@entities/learning-resource';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceAssignmentBasicInfo,
  LearningResourceAssignmentSubmission,
} from '@features/learning-resource';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { ContentCreateType } from '@shared/types/enums';
import { useModal } from '@learnway/ui/modal';

interface Props {
  content?: ContentInformation;
  hasMapping?: boolean;
}

function AssignmentViewComponent({ content, hasMapping }: Props) {
  const {
    state: { isTranslated },
  } = useCurrentRoute();
  const { t } = useTranslation();
  const { alert, confirm: openConfirm } = useModal();

  const contentUuid = content?.contentUuid ?? '';

  const basicInfoForm = useDynamicForm2();
  const { provider, onSubmit } = basicInfoForm;

  const basicInfoRef = useRef<AssignmentTabRef>(null);
  const assignmentInfoRef = useRef<AssignmentTabRef>(null);

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
        content: <LearningResourceAssignmentSubmission ref={assignmentInfoRef} content={content} />,
      },
    ],
    [basicInfoForm, content],
  );

  const [selectedTabKey, setSelectedTabKey] = useState<string>(AssignmentTab.BASIC_INFO);

  const handleTabChange = useCallback((tabKey: string) => setSelectedTabKey(tabKey), []);

  const handleBeforeTabChange = useCallback(
    async (currentTabKey: string, nextTabKey: string) => {
      if (nextTabKey === AssignmentTab.SUBMISSION && !saved) {
        await alert({
          title: t('입력한 정보를 저장하세요.'),
          content: t('저장된 적 없는 경우 다음 단계로 이동할 수 없습니다.'),
        });
        return false;
      } else if (saved) {
        const result = await openConfirm({
          title: t('이동 하시겠습니까?'),
          content: t('입력 중인 항목이 초기화됩니다.'),
        });
        return result;
      }
      return true;
    },
    [saved],
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
        title={`${t('과제')} ${!isTranslated ? t('상세') : t('번역')}`}
        tooltipProps={{
          show: !isTranslated && (!!hasMapping || content?.createType !== ContentCreateType.MANUAL),
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
                onBeforeTabChange={handleBeforeTabChange}
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
