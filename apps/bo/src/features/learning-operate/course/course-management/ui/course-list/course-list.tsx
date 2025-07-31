import { Divider } from '@learnway/ui/elements';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCoursePage } from '../../hooks/use-course-page';
import { CourseGrid } from './course-grid';
import { CourseSearchForm } from '../course-search-form/course-search-form';
import { isLocalhost } from '@learnway/shared';
import { Button } from '@learnway/ui/button';

const CourseListComponent = () => {
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
    handleCopyClick,
    handleShareClick } = useCoursePage();

  return (
    <PageContainer>
      <ContentsButtons>
        {isLocalhost() && (
          <>
            <Link to="/learning/course/create" className="link">
              신규 /
            </Link>
            <Link to="/learning/course/create" state={{ courseId: 7 }} className="link">
              등록7 /
            </Link>
            <Link
              to="/learning/course/detail"
              state={{
                courseId: 7,
                courseName: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES구축' }}
              className="link"
            >
              상세7
            </Link>
            <Divider orientation={'vertical'} />
          </>
        )}
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
          onCopyClick={handleCopyClick}
          onShareClick={handleShareClick}
        />
      </MainContents>
    </PageContainer>
  );
};

export const CourseList = CourseListComponent;
