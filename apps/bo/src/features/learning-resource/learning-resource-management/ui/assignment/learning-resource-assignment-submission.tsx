import { forwardRef, useCallback, useMemo } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { IcoCopy, IcoMinus, IcoPlus } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { FormSubTitle } from '@learnway/ui/base-form';
import { GridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { cn, isEmptyData } from '@learnway/shared';
import { AssignmentSubmissionItem, ContentInformation } from '@entities/learning-resource';
import { AssignmentSubmissionProps, AssignmentTabRef } from '../../service/assignment/type';
import { useAssignmentSubmissionInputForm } from '../../service/assignment/use-assignment-submission-input-form';
import { LearningResourceAssignmentItemModal } from './modal/learning-resource-assignment-item-modal';

import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/assignment-detail.module.css';

const LearningResourceAssignmentSubmissionComponent = forwardRef<
  AssignmentTabRef,
  AssignmentSubmissionProps
>(({ content, hasMapping = false }, ref) => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const {
    submissionList,
    selectedSubmissionItems,
    setSelectedSubmissionItems,
    handleOnCreateSuccessCallback,
    handleOnUpdateSuccessCallback,
    handleOnDeleteSuccessCallback,
  } = useAssignmentSubmissionInputForm(content?.contentUuid ?? '');

  const handleIsRowSelectable = useCallback(() => !hasMapping, [hasMapping]);

  const handleClickAddSubmissionButton = useCallback(async () => {
    if (isEmptyData(content)) {
      return;
    }

    await openModal({
      width: 'xl',
      content: (
        <LearningResourceAssignmentItemModal
          contentInfo={content as ContentInformation}
          hasMapping={hasMapping}
          onSuccessCallback={handleOnCreateSuccessCallback}
        />
      ),
    });
  }, [content]);

  const handleClickViewSubmissionButton = useCallback(async (item: AssignmentSubmissionItem) => {
    if (isEmptyData(item)) {
      return;
    }

    await openModal({
      width: 'xl',
      content: (
        <LearningResourceAssignmentItemModal
          contentInfo={content as ContentInformation}
          submissionRowItem={item}
          hasMapping={hasMapping}
          onSuccessCallback={handleOnUpdateSuccessCallback}
          onDeleteCallback={handleOnDeleteSuccessCallback}
        />
      ),
    });
  }, []);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<AssignmentSubmissionItem>();
    return [
      columnHelper.accessor('assignmentSubmissionText', {
        cell: (info) => (
          <span
            className="cursor-pointer text-[var(--gray8)] underline"
            onClick={() => handleClickViewSubmissionButton(info.row.original)}
          >
            {info.getValue()}
          </span>
        ),
        header: t('과제물'),
        enableGrouping: false,
        meta: {
          headerAlign: 'center',
          cellAlign: 'left',
          size: 'auto',
        },
      }),
      columnHelper.accessor('attachFileUuid', {
        cell: (info) => (info.getValue() ? 'Y' : 'N'),
        header: t('첨부파일'),
        size: 150,
        enableGrouping: false,
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
      columnHelper.accessor('answerFileUuid', {
        cell: (info) => (info.getValue() ? 'Y' : 'N'),
        header: t('답변파일'),
        size: 150,
        enableGrouping: false,
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
    ] as ColumnDef<any, AssignmentSubmissionItem>[];
  }, []);

  return (
    <div className={styles.wrap}>
      <FormSubTitle label={t('기본 정보')} noLine />
      <div className={cn(tableStyles.start, tableStyles.wrap)}>
        <table>
          <caption>{t('기본 정보')}</caption>
          <colgroup>
            <col style={{ width: '240px' }} />
            <col />
            <col style={{ width: '240px' }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{t('테넌트')}</th>
              <td>{content?.tenantName}</td>
              <th scope="row">{t('채널')}</th>
              <td>{content?.channelName}</td>
            </tr>
            <tr>
              <th scope="row">{t('유형')}</th>
              <td>{t(`cms.content.ContentType.${content?.contentType}`)}</td>
              <th scope="row">{t('교육자원명')}</th>
              <td>{content?.contentName}</td>
            </tr>
            <tr>
              <th scope="row">{t('설문지 언어')}</th>
              <td colSpan={3}>
                {t(`pms.multilingual.LangCountryCode.${content?.languageCountryCode}`)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <GridBox
        title={t('과제물 목록')}
        disabledSelectionToggle
        tableMode
        data={submissionList}
        columns={columns}
        isRowSelectable={handleIsRowSelectable}
        onRowsSelect={setSelectedSubmissionItems}
        multiple
        showNumberingColumn
        className={styles.list_table}
        customButtonNode={
          <>
            <Button
              type="button"
              variant="text"
              label={t('LABEL.grid.header.add', '추가')}
              icon={<IcoPlus width={16} height={16} stroke="#4C515E" />}
              onClick={handleClickAddSubmissionButton}
              disabled={hasMapping}
            />
            <Button
              type="button"
              variant="text"
              label={t('LABEL.grid.header.copy', '복사')}
              icon={<IcoCopy width={16} height={16} stroke="#4C515E" />}
              disabled={!selectedSubmissionItems.length || hasMapping}
            />
            <Button
              type="button"
              variant="text"
              label={t('LABEL.grid.header.remove', '삭제')}
              icon={<IcoMinus width={16} height={16} stroke="#131C30" />}
              disabled={!selectedSubmissionItems.length || hasMapping}
            />
          </>
        }
      />
    </div>
  );
});

LearningResourceAssignmentSubmissionComponent.displayName = 'LearningResourceAssignmentSubmission';

export const LearningResourceAssignmentSubmission = LearningResourceAssignmentSubmissionComponent;
