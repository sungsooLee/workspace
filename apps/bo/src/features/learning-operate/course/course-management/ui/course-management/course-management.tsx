import { Button, Divider } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCoursePage } from '../../hooks/use-course-page';

import { CourseSearchForm } from '../course-search-form/course-search-form';
import { CourseGrid } from '../course-list/course-grid';

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
};

export const CourseManagement = CourseManagementComponent;
