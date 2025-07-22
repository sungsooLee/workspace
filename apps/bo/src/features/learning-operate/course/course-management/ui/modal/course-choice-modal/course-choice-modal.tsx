import { queryOptions } from '@entities/course/service/course.queries';
import { DateRangePickerFormField } from '@features/form/ui/date-range-picker-form-field';
import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { CODE_GROUP, getCodeLabel, useDynamicForm2 } from '@learnway/hooks';
import { generateYears } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  GridBox,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useGridBox,
  useModal,
} from '@learnway/ui';
import { FormRow2 } from '@shared/ui/form/form-row2';
import { SearchBoxForm } from '@shared/ui/search-box/search-box-form';
import { CourseListItem, CoursePopupListItem } from '@types';
import { t } from 'i18next';
import { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './course-choice-modal.module.css';

export interface CourseChoiceModalProps {
  tenantIds: Array<number>;
  channelUuid: string;
}

/**
 * 과정 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const CourseChoiceModalComponent = forwardRef<HTMLDivElement, CourseChoiceModalProps>(
  ({ tenantIds, channelUuid, ...props }, ref) => {
    console.log('CourseChoiceModalComponent >> ', { tenantIds, channelUuid });
    const { t } = useTranslation();
    const { close: closeModal } = useModal();
    const [selectedRows, setSelectedRows] = useState<CourseListItem[]>([]);

    const { provider, getValues, onSubmit, watch } = useDynamicForm2();
    const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

    /**
     * 검색 실행 시 호출되는 핸들러
     * @param {any} data - 검색 조건 데이터
     */
    const handleOnSearch = useCallback((data: any) => {
      console.log('handleOnSearch.data {} => ', { ...data, tenantIds, channelUuid });
      gridFetch({ ...data, tenantIds, channelUuid }); // formRow2 에 value 초기값 설정 안되서 임시로 처리
    }, []);

    /**
     * 그리드의 행 선택 시 호출되는 핸들러
     * @param {any} row - 선택된 행 데이터
     */
    const handleGridRowsSelect = (rows: CourseListItem[]) => {
      console.log('handleGridRowsSelect.rows {} => ', rows);
      setSelectedRows(rows);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('과정조회')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            {/* 검색 */}
            <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
              <ContentsRow>
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
                {/* 과정코드 */}
                <FormRow2
                  provider={provider}
                  name={'courseId'}
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
                {/* 담당자 */}
                <FormRow2
                  provider={provider}
                  name={'coordinatorName'}
                  label={t('LABEL.form.label.coordinator')}
                  element={<Input />}
                />
              </ContentsRow>
              <ContentsRow>
                {/* 운영자 */}
                <FormRow2
                  provider={provider}
                  name={'operatorName'}
                  label={t('LABEL.form.label.operator')}
                  element={<Input />}
                />
                {/* 사용여부 */}
                <FormRow2
                  provider={provider}
                  name={'isUsed'}
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
                {/*개설년도*/}
                <FormRow2
                  provider={provider}
                  name={'openingYear'}
                  label={t('LABEL.form.label.openingDate')}
                  element={
                    <DropdownFormField
                      options={generateYears(10)}
                      presetOptionLabel={t('LABEL.form.label.all')}
                    />
                  }
                />
                {/*노출 기간*/}
                <FormRow2
                  provider={provider}
                  name={'courseValidityStartDate'}
                  label={'노출 기간'}
                  element={<DateRangePickerFormField />}
                />
              </ContentsRow>
              {/*채널*/}
              <FormRow2
                provider={provider}
                name={'channelUuid'}
                type="hidden"
                value={channelUuid}
              />
            </SearchBoxForm>
            <GridBox
              config={gConfig}
              multiple
              showNumberingColumn
              onRowsSelect={handleGridRowsSelect}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button
            label={t('확인')}
            variant={'primary'}
            size={'lg'}
            onClick={() => closeModal(selectedRows)}
          />
        </ModalFooter>
      </ModalContainer>
    );
  },
);
export const CourseChoiceModal = CourseChoiceModalComponent;

const gridConfig = {
  title: t('LABEL.grid.title.courseList'),
  query: queryOptions.getCoursePopup<CoursePopupListItem>,
  columns: [
    // 과정유형
    {
      name: 'courseType',
      label: () => t('LABEL.grid.column.courseType'),
      size: 90,
      render: (info: any) => getCodeLabel(CODE_GROUP['lms.course.CourseType'], info.getValue()),
    },
    // 과정코드
    {
      name: 'courseId',
      label: () => t('LABEL.grid.column.courseCode'),
      size: 90,
    },
    // 과정명
    {
      name: 'courseName',
      label: () => t('LABEL.grid.column.courseName'),
      size: 300,
    },
    // 담당자
    {
      name: 'coordinatorName',
      label: () => t('LABEL.grid.column.manager'),
      size: 90,
    },
    // 운영자
    {
      name: 'operatorName',
      label: () => t('LABEL.grid.column.operator'),
      size: 90,
    },
    // 사용 여부
    {
      name: 'isUsed',
      label: () => t('LABEL.grid.column.use'),
      size: 90,
    },
    // 개설년도
    {
      name: 'openingYear',
      label: () => t('LABEL.grid.column.openingDate'),
      size: 90,
    },
    // 과정 유효기간
    {
      name: 'courseValidityPeriod',
      label: () => t('LABEL.grid.column.courseValidityPeriod'),
      size: 90,
    },
  ],
};
