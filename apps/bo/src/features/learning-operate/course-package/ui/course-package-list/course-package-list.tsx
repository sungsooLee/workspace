import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox } from '@learnway/ui/grid';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { t } from 'i18next';
import { useCoursePackagePage } from '../../hooks/use-course-package-page';
import { CoursePackageSearchForm } from '../course-package-search-form/course-package-search-form';

/**
 * NLP_BO_LMS_0021 : 패키지 관리 목록
 * @returns
 */
const CoursePackageListComponent = () => {
  const {
    provider,
    getValues,
    onSubmit,
    onReset,
    gConfig,
    // selectedRows,
    // buttonState,
    handleOnSearch,
    handleSavePackage,
    // handleGridRowsSelect,
    // handleBatchUploadClick,
    // handleCourseOpenClick,
    // handleCopyClick,
    // handleShareClick,
  } = useCoursePackagePage();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.savePackage')}
          onClick={handleSavePackage}
        />
      </ContentsButtons>
      <MainContents>
        <CoursePackageSearchForm
          provider={provider}
          onSubmit={onSubmit}
          onSearch={handleOnSearch}
          onReset={onReset}
        />
        <Divider />
        <GridBox config={gConfig} multiple={true} disabledSelectionToggle />
      </MainContents>
    </PageContainer>
  );
};

export const CoursePackageList = CoursePackageListComponent;
