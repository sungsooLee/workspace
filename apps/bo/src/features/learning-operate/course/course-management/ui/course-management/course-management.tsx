import { Divider } from '@learnway/ui/elements';
import { MainContents, PageContainer } from '@shared/ui/layout';
import { useCoursePage } from '../../hooks/use-course-page';

import { CourseGrid } from '../course-list/course-grid';
import { CourseSearchForm } from '../course-search-form/course-search-form';

const CourseManagementComponent = () => {
  const {
    provider,
    getValues,
    onSubmit,
    gConfig,
    selectedRows,
    buttonState,
    handleOnSearch,
    handleGridRowsSelect,
    onReset,
  } = useCoursePage();

  return (
    <PageContainer>
      <MainContents>
        {/* 검색 */}
        <CourseSearchForm
          provider={provider}
          onSubmit={onSubmit}
          onSearch={handleOnSearch}
          onReset={onReset}
        />
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
};

export const CourseManagement = CourseManagementComponent;
