import {
  CourseGrid,
  CourseSearchForm,
  useCoursePage,
} from '@features/learning-operate/course/course-management';
import { Divider } from '@learnway/ui';
import { MainContents, PageContainer } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';

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
