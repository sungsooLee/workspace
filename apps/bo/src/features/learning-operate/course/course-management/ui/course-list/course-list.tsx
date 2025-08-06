import { isLocalhost } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { useState } from 'react';
import { useCoursePage } from '../../hooks/use-course-page';
import { CourseSearchForm } from '../course-search-form/course-search-form';
import { CourseGrid } from './course-grid';

const CourseListComponent = () => {
  const {
    provider,
    getValues,
    onSubmit,
    onReset,
    gConfig,
    selectedRows,
    buttonState,
    handleOnSearch,
    handleGridRowsSelect,
    handleBatchUploadClick,
    handleCourseOpenClick,
    handleCopyClick,
    handleShareClick,
  } = useCoursePage();

  return (
    <PageContainer>
      <ContentsButtons>
        {/* 테스트 링크 박스 */}
        {isLocalhost() && <TestLinkBox />}
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
          onCopyClick={handleCopyClick}
          onShareClick={handleShareClick}
        />
      </MainContents>
    </PageContainer>
  );
};

export const CourseList = CourseListComponent;

// 테스트 링크 박스
const TestLinkBox = () => {
  const [courseId, setCourseId] = useState(7);
  return (
    <>
      <input
        type="text"
        value={courseId}
        onChange={(e: any) => setCourseId(e.target.value)}
        className="w-[50px]"
        aria-label="Course ID"
      />
      <Link
        to="/learning/course/create"
        state={{ courseId }}
        className="link"
        style={{ display: 'inline-block', width: 40, textAlign: 'center', border: '1px solid' }}
      >
        등록
      </Link>
      <Link
        to="/learning/course/detail"
        state={{
          courseId,
          courseName: '라우팅시 넘긴 과정 이름',
        }}
        className="link"
        style={{ display: 'inline-block', width: 40, textAlign: 'center', border: '1px solid' }}
      >
        상세
      </Link>
      <Link
        to="/learning/course/create"
        state={{ courseId, courseType: 'ELEARNING1' }}
        className="link"
        style={{ display: 'inline-block', width: 60, textAlign: 'center', border: '1px solid' }}
      >
        산규등록
      </Link>
      <Divider orientation={'vertical'} />
    </>
  );
};
