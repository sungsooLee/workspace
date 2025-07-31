import { BasicInfo, Registration, Result } from '@features/external-education';
import {
  EXTERNAL_EDUCATION_TAB_LABELS,
  ExternalEducationTab,
} from '@features/external-education/types/types';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Popup } from '../../../features/external-education/components/-tabs/popup';

export const Route = createFileRoute('/_layout/external-education/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { formId: initialFormId } = router.state.location.state || {};

  const [activeTab, setActiveTab] = useState<ExternalEducationTab>(ExternalEducationTab.BASIC_INFO);
  const [currentFormId, setCurrentFormId] = useState<number | undefined>(initialFormId);

  // 각 탭의 저장 함수를 저장할 ref
  const tabSaveFunctions = useRef<Record<string, () => Promise<boolean>>>({});

  const isCreateMode = !initialFormId;
  const mode: 'create' | 'view' = isCreateMode ? 'create' : 'view';

  // 탭 저장 함수 등록
  const registerSaveFunction = (tabKey: string, saveFn: () => Promise<boolean>) => {
    tabSaveFunctions.current[tabKey] = saveFn;
  };

  const handleFormIdCreated = useCallback((newFormId: number) => {
    setCurrentFormId(newFormId);
  }, []);

  // 탭 변경 전 검증 핸들러
  const handleBeforeTabChange = async (
    currentTabKey: string,
    nextTabKey: string,
  ): Promise<boolean> => {
    // 기본정보 탭에서 formId가 이미 있는 경우 저장하지 않음
    if (currentTabKey === ExternalEducationTab.BASIC_INFO && currentFormId) {
      return true;
    }

    const currentSaveFn = tabSaveFunctions.current[currentTabKey as ExternalEducationTab];
    if (currentSaveFn) {
      try {
        const saveSuccess = await currentSaveFn();
        if (!saveSuccess) {
          return false;
        }
      } catch (error) {
        return false;
      }
    }

    return true;
  };

  // 탭 변경 완료 핸들러 (onTabChange)
  const handleTabChange = (activeKey: string) => {
    const targetTab = activeKey as ExternalEducationTab;
    setActiveTab(targetTab);
  };

  // 저장 버튼 핸들러
  const handleSaveClick = async () => {
    const currentSaveFn = tabSaveFunctions.current[activeTab];
    if (currentSaveFn) {
      const saveSuccess = await currentSaveFn();
    }
  };

  // 삭제 버튼 핸들러
  const handleDelete = async () => {
    // if (confirm('정말 삭제하시겠습니까?')) {
    //   // TODO: 삭제 API 호출
    //   console.log('삭제 처리');
    //   router.navigate({ to: '/external-education' });
    // }
  };

  // 목록으로 돌아가기
  const handleGoToList = () => {
    router.navigate({ to: '/external-education' });
  };

  const tabItems = useMemo(
    () => [
      {
        title: EXTERNAL_EDUCATION_TAB_LABELS[ExternalEducationTab.BASIC_INFO],
        key: ExternalEducationTab.BASIC_INFO,
        content: (
          <BasicInfo
            formId={currentFormId}
            mode={mode}
            onRegisterSave={(saveFn) =>
              registerSaveFunction(ExternalEducationTab.BASIC_INFO, saveFn)
            }
            onFormIdCreated={handleFormIdCreated}
          />
        ),
      },
      {
        title: EXTERNAL_EDUCATION_TAB_LABELS[ExternalEducationTab.APPLICATION_ITEMS],
        key: ExternalEducationTab.APPLICATION_ITEMS,
        content: (
          <Registration
            formId={currentFormId}
            onRegisterSave={(saveFn) =>
              registerSaveFunction(ExternalEducationTab.APPLICATION_ITEMS, saveFn)
            }
          />
        ),
      },
      {
        title: EXTERNAL_EDUCATION_TAB_LABELS[ExternalEducationTab.RESULT_ITEMS],
        key: ExternalEducationTab.RESULT_ITEMS,
        content: (
          <Result
            formId={currentFormId}
            onRegisterSave={(saveFn) =>
              registerSaveFunction(ExternalEducationTab.RESULT_ITEMS, saveFn)
            }
          />
        ),
      },
      {
        title: EXTERNAL_EDUCATION_TAB_LABELS[ExternalEducationTab.POPUP],
        key: ExternalEducationTab.POPUP,
        content: (
          <Popup
            formId={currentFormId}
            onRegisterSave={(saveFn) => registerSaveFunction(ExternalEducationTab.POPUP, saveFn)}
          />
        ),
      },
    ],
    [currentFormId, mode, handleFormIdCreated],
  );

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" label="목록" onClick={handleGoToList} />
        <Divider orientation="vertical" />
        <Button type="button" variant="point" size="sm" label="삭제" onClick={handleDelete} />
        <Button type="button" variant="primary" size="sm" label="저장" onClick={handleSaveClick} />
      </ContentsButtons>
      <MainContents>
        <Tabs
          type="progress"
          size="sm"
          items={tabItems}
          onBeforeTabChange={handleBeforeTabChange}
          onTabChange={handleTabChange}
          selectedTabKey={activeTab}
        />
      </MainContents>
    </PageContainer>
  );
}
