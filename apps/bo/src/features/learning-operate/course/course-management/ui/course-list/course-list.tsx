import { Button, Divider } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCoursePage } from '../../hooks/use-course-page';
import { CourseGrid } from './course-grid';
import { CourseSearchForm } from '../course-search-form/course-search-form';

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
  } = useCoursePage();

  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/learning/course/create" className="link">
          신규 /
        </Link>
        <Link to="/learning/course/create" state={{ courseId: 7 }} className="link">
          등록7 /
        </Link>
        <Link to="/learning/course/detail" state={{ courseId: 7 }} className="link">
          상세7
        </Link>
        <Divider orientation={'vertical'} />
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
};

export const CourseList = CourseListComponent;
