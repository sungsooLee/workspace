import { queryOptions } from '@entities/course/service/course.queries';
import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { CourseTypeOptionCardModal } from '@features/learning/course';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@features/shared';
import { LMSApiPrefix } from '@learnway/config';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { Button, ContentsRow, Divider, GridBox, Input, useGridBox, useModal } from '@learnway/ui';
import { FormRow2, SearchBoxForm } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { CoursesQueryParams } from '@types';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { t } from 'i18next';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateYears } from '@learnway/shared';

export const Route = createFileRoute('/_layout/learning/course/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation();
  const { open: openModal } = useModal();
  const { provider, getValues, onSubmit } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  /**
   * 검색 실행 시 호출되는 핸들러
   * @param {any} data - 검색 조건 데이터
   */
  const handleOnSearch = useCallback((data: any) => {
    console.log('handleOnSearch.data {} => ', data);
    gridFetch(data);
  }, []);

  /**
   * 그리드의 행 선택 시 호출되는 핸들러
   * @param {any} row - 선택된 행 데이터
   */
  const handleGridRowSelect = (rows: any) => {
    console.log('handleGridRowSelect.rows {} => ', rows);
    rows && setSelectedCourses(rows);
  };

  /**
   * 과정 일괄업로드 버튼 클릭 시 호출되는 핸들러
   */
  const handleBatchUploadClick = () => {
    console.log('handleBatchUploadClick');
  };

  /**
   * '과정 개설' 버튼 클릭 시 호출되는 핸들러
   */
  const handleCourseOpenClick = async () => {
    const { value } = await openModal({
      content: <CourseTypeOptionCardModal />,
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
    });
    console.log('handleCourseOpenClick.value {} => ', value);
    router.navigate({
      to: '/learning/course/create/view',
      state: {
        courseType: value, // 다국어 분류 - 공통코드
      },
    });
    // 선택한 유형의 등록 페이지로 이동
  };

  // console.log(generateYears(10));
  console.log(111)

  return (
    <PageContainer>
      <ContentsButtons>
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
        <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
          <ContentsRow>
            {/*테넌트*/}
            <FormRow2
              provider={provider}
              name={'tenant'}
              label={t('LABEL.form.label.tenant')}
              element={<DropdownFormField options={[]} />}
              validation={{
                required: true,
                format: 'object',
              }}
            />
            {/*채널*/}
            <FormRow2
              provider={provider}
              name={'channel'}
              label={t('LABEL.form.label.channel')}
              element={<DropdownFormField options={[]} />}
              validation={{
                required: true,
                format: 'object',
              }}
            />
            {/*개설년도*/}
            <FormRow2
              provider={provider}
              name={'openingDate'}
              label={t('LABEL.form.label.openingDate')}
              element={<DropdownFormField options={generateYears(10)} />}
            />
            {/*과정유형*/}
            <FormRow2
              provider={provider}
              name={'courseType'}
              label={t('LABEL.form.label.courseType')}
              element={<DropdownFormField optionsConfig={{
                codeGroup: CODE_GROUP['lms.course.CourseType']
              }} />}
            />
          </ContentsRow>
          <ContentsRow>
            {/* 사용여부 */}
            <FormRow2
              provider={provider}
              name={'useYn'}
              label={t('LABEL.form.label.useYn')}
              element={<DropdownFormField optionsConfig={{
                codeGroup: CODE_GROUP['mock.options.use']
              }} />}
            />
            {/* 담당자/운영자 */}
            <FormRow2
              provider={provider}
              name={'adminName'}
              label={t('LABEL.form.label.coordinator/Operator')}
              element={<Input />}
            />
            {/* 과정코드 */}
            <FormRow2
              provider={provider}
              name={'courseCode'}
              label={t('LABEL.form.label.courseCode')}
              element={<Input />}
            />
            {/* 과정명 */}
            <FormRow2
              provider={provider}
              name={'courseName'}
              label={t('LABEL.form.label.courseName')}
              element={<Input />}
            />
          </ContentsRow>
        </SearchBoxForm>
        {/* <SearchBox provider={searchProvider} onSearch={handleOnSearch} /> */}
        {/* Divider */}
        <Divider />
        {/* 그리드 */}
        <GridBox
          config={gConfig}
          multiple
          showNumberingColumn
          showCopy
          onRowSelect={handleGridRowSelect}
          customButtonNode={
            <Button variant="text" size="sm" label={t('LABEL.grid.header.toShare')} />
          }
          excelButtons={
            <>
              <GridExcelUploadButton
                // url="/multilingual/exportExcel"
                validateUrl="/multilingual/excelUploadValidation"
              />
              <GridExcelDownloadButton
                url={`${LMSApiPrefix()}/multilingual/exportExcel`}
                params={getValues()}
                onBeforeDownload={async () => {
                  const keyTypeCode = getValues('keyTypeCode');
                  const targetLocale = getValues('targetLocale');
                  if (keyTypeCode === '' || targetLocale === '') {
                    alert({
                      type: 'warning',
                      content: t('분류와 번역언어는 필수 항목입니다.'),
                    });
                    throw new Error(t('분류와 번역언어는 필수 항목입니다.'));
                  }
                }}
              />
            </>
          }
        />
      </MainContents>
    </PageContainer>
  );
}

const gridConfig = {
  title: t('LABEL.grid.title.courseList'),
  query: queryOptions.all<CoursesQueryParams>,
  columns: [
    // 테넌트
    { name: 'tenant', label: () => t('LABEL.grid.column.tenant'), size: 140 },
    // 채널
    { name: 'channel', label: () => t('LABEL.grid.column.channel'), size: 90 },
    // 과정코드
    { name: 'courseCode', label: () => t('LABEL.grid.column.courseCode'), size: 90 },
    // 개설연도
    { name: 'openingDate', label: () => t('LABEL.grid.column.openingDate'), size: 90 },
    // 과정유형
    { name: 'courseType', label: () => t('LABEL.grid.column.courseType'), size: 90 },
    // 찜
    { name: 'favorite', label: () => t('LABEL.grid.column.favorite'), size: 40 },
    // 과정명
    { name: 'courseName', label: () => t('LABEL.grid.column.courseName'), size: 200 },
    // 사용
    { name: 'useYn', label: () => t('LABEL.grid.column.use'), size: 90 },
    // 차수
    { name: 'session', label: () => t('LABEL.grid.column.session'), size: 90 },
    // 조회
    { name: 'search', label: () => t('LABEL.grid.column.search'), size: 90 },
    // 좋아요
    { name: 'like', label: () => t('LABEL.grid.column.like'), size: 90 },
    // 공유
    { name: 'share', label: () => t('LABEL.grid.column.share'), size: 90 },
    // 후기
    { name: 'review', label: () => t('LABEL.grid.column.review'), size: 90 },
    // 수강생
    { name: 'student', label: () => t('LABEL.grid.column.student'), size: 90 },
    // 담당자
    { name: 'manager', label: () => t('LABEL.grid.column.manager'), size: 90 },
    // 운영자
    { name: 'operator', label: () => t('LABEL.grid.column.operator'), size: 90 },
    // 미리보기
    { name: 'preview', label: () => t('LABEL.grid.column.preview'), size: 90 },
    // URL
    { name: 'url', label: () => t('LABEL.grid.column.url'), size: 90 },
  ],
};
