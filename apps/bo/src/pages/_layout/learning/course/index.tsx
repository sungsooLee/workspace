import { Button, Divider } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { CourseGrid } from './-components/course-grid';
import { CourseSearchForm } from './-components/course-search-form';
import { useCourseManagement } from './-hooks/use-course-management';

export const Route = createFileRoute('/_layout/learning/course/')({
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
    handleBatchUploadClick,
    handleCourseOpenClick,
  } = useCourseManagement();

  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/learning/course/create/view" state={{ courseId: 7 }} className="link">
          등록 테스트
        </Link>
        <Link to="/learning/course/detail/view" state={{ courseId: 7 }} className="link">
          상세 테스트
        </Link>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.courseBatchUpload')}
          onClick={handleBatchUploadClick}
        />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.courseOpen')}
          onClick={handleCourseOpenClick}
        />
      </ContentsButtons>

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
