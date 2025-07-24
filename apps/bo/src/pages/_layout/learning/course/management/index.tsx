import { createFileRoute, Link } from '@tanstack/react-router';
import { useCoursePage } from '../-hooks/use-course-page';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button, Divider } from '@learnway/ui';
import { t } from 'i18next';
import { CourseSearchForm } from '../-components/course-search-form';
import { CourseGrid } from '../-components/course-grid';

export const Route = createFileRoute('/_layout/learning/course/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    provider,
    getValues,
    onSubmit,
    gConfig,
    selectedRows,
    buttonState,
    handleOnSearch,
    handleGridRowsSelect,
  } = useCoursePage();

  return (
    <PageContainer>
      <MainContents>
        {/* 검색 */}
        <CourseSearchForm provider={provider} onSubmit={onSubmit} onSearch={handleOnSearch} />
        {/* Divider */}
        <Divider />
        {/* 그리드 */}
        <CourseGrid
          config={gConfig}
          selectedRows={selectedRows}
          buttonState={buttonState}
          getValues={getValues}
          onRowsSelect={handleGridRowsSelect}
        />
      </MainContents>
    </PageContainer>
  );
}
