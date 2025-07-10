import { queryOptions } from '@entities/course/service/course.queries';
import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import {
  CourseChoiceModal,
  CourseTypeOptionCardModal,
} from '@features/learning-operate/course/course-management';
import { LMSApiPrefix } from '@learnway/config';
import { CODE_GROUP, getCodeLabel, useDynamicForm2 } from '@learnway/hooks';
import { Button, ContentsRow, Divider, GridBox, Input, useGridBox, useModal } from '@learnway/ui';
import {
  FormRow2,
  GridExcelDownloadButton,
  GridExcelUploadButton,
  SearchBoxForm,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { CourseListItem, CoursesQueryParams } from '@types';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateYears } from '@learnway/shared';
import { size } from 'lodash';

export const Route = createFileRoute('/_unauth/learning_test/course/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation();
  const { open: openModal } = useModal();
  const { provider, getValues, onSubmit, watch } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedRows, setSelectedRows] = useState<CourseListItem[]>([]);

  // 버튼 활성화/비활성화 상태를 관리
  const buttonState = useMemo(() => {
    const count = selectedRows?.length;
    const hasSelection = count > 0;
    return {
      copy: hasSelection, // 복사 버튼 활성화 조건
      share: hasSelection, // 공유 버튼 활성화 조건 (나중에 다른 조건 추가 가능)
    };
  }, [selectedRows]);

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
  const handleGridRowsSelect = (rows: CourseListItem[]) => {
    console.log('handleGridRowsSelect.rows {} => ', rows);
    setSelectedRows(rows);
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
      to: '/learning_test/course/create/view',
      state: {
        courseType: value, // 다국어 분류 - 공통코드
      },
    });
    // 선택한 유형의 등록 페이지로 이동
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/learning_test/course/create/view" state={{ courseId: 5 }} className="link">
          상세 테스트
        </Link>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('과정조회 팝업')}
          onClick={() => {
            openModal({
              content: <CourseChoiceModal tenantIds={[11]} channelUuid={'102309812093812093812'} />,
              width: 'lg',
            });
          }}
        />
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
              name={'tenantId'}
              label={t('LABEL.form.label.tenant')}
              element={
                <DropdownFormField
                  optionsConfig={{
                    codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
                  }}
                  presetOptionLabel={t('LABEL.form.label.select', '선택')}
                />
              }
              validation={{
                required: true,
                format: 'object',
              }}
            />
            {/*채널*/}
            <FormRow2
              provider={provider}
              name={'channelUuid'}
              label={t('LABEL.form.label.channel')}
              element={<TenantChannelDropdownFormField tenantId={watch('tenantId')} />}
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
              element={
                <DropdownFormField
                  options={generateYears(10)}
                  presetOptionLabel={t('LABEL.form.label.all')}
                />
              }
            />
            {/*과정유형*/}
            <FormRow2
              provider={provider}
              name={'courseType'}
              label={t('LABEL.form.label.courseType')}
              element={
                <DropdownFormField
                  presetOptionLabel={t('LABEL.form.label.all')}
                  optionsConfig={{
                    codeGroup: CODE_GROUP['lms.course.CourseType'],
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            {/* 사용여부 */}
            <FormRow2
              provider={provider}
              name={'useYn'}
              label={t('LABEL.form.label.useYn')}
              element={
                <DropdownFormField
                  presetOptionLabel={t('LABEL.form.label.all')}
                  optionsConfig={{
                    codeGroup: CODE_GROUP['mock.options.use'],
                  }}
                />
              }
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
        {/* Divider */}
        <Divider />
        {/* 그리드 */}
        <GridBox
          config={gConfig}
          multiple
          showNumberingColumn
          copyButton={{
            disabled: buttonState.copy,
            onClick: () => console.log('Copy click'),
          }}
          onRowsSelect={handleGridRowsSelect}
          customButtonNode={
            <Button
              variant="text"
              size="sm"
              label={t('LABEL.grid.header.toShare')}
              disabled={!buttonState.share}
            />
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
    { name: 'tenantName', label: () => t('LABEL.grid.column.tenant'), size: 140 },
    // 채널
    { name: 'channelName', label: () => t('LABEL.grid.column.channel'), size: 90 },
    // 과정코드
    { name: 'courseId', label: () => t('LABEL.grid.column.courseCode'), size: 90 },
    // 개설연도
    { name: 'openingYear', label: () => t('LABEL.grid.column.openingDate'), size: 90 },
    // 과정유형
    {
      name: 'courseType',
      label: () => t('LABEL.grid.column.courseType'),
      size: 90,
      render: (info: any) => getCodeLabel(CODE_GROUP['lms.course.CourseType'], info.getValue()),
    },
    // 찜
    { name: 'isBookmarks', label: () => t('LABEL.grid.column.favorite'), size: 40 },
    // 과정명
    {
      name: 'courseName',
      label: () => t('LABEL.grid.column.courseName'),
      size: 300,
      render: ({ row }: any) => (
        <Link
          to="/learning_test/course/create/view"
          state={{ courseId: row.original.courseId }}
          className="link"
        >
          {row.original.courseName}
        </Link>
      ),
    },
    // 사용
    { name: 'isUsed', label: () => t('LABEL.grid.column.use'), size: 90 },
    // 차수
    { name: 'sequenceCount', label: () => t('LABEL.grid.column.session'), size: 90 },
    // 조회
    { name: 'viewCount', label: () => t('LABEL.grid.column.search'), size: 90 },
    // 좋아요
    { name: 'likesCount', label: () => t('LABEL.grid.column.like'), size: 90 },
    // 공유
    { name: 'shareCount', label: () => t('LABEL.grid.column.share'), size: 90 },
    // 후기
    { name: 'reviewCount', label: () => t('LABEL.grid.column.review'), size: 90 },
    // 수강생
    { name: 'studentCount', label: () => t('LABEL.grid.column.student'), size: 90 },
    // 담당자
    { name: 'coordinatorName', label: () => t('LABEL.grid.column.manager'), size: 90 },
    // 운영자
    { name: 'operatorName', label: () => t('LABEL.grid.column.operator'), size: 90 },
    // 미리보기
    { name: 'preview', label: () => t('LABEL.grid.column.preview'), size: 90 },
    // URL
    { name: 'url', label: () => t('LABEL.grid.column.url'), size: 90 },
  ],
};
