import { QuestionListForRetrieveRes } from '@entities/learning-resource';
import { useQuestionImport } from '@features/learning-resource/learning-resource-management';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ShuttleGridToGrid, ShuttleGridToGridImperative } from '@learnway/ui/shuttle-grid-to-grid';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyQuestionSearchForm } from '../components/learning-resource-question-search-form';
import { LearningResourceQuestionItemInfoModal } from './learning-resource-question-item-info-modal';

type QuestionShuttleModalProps = {
  examPoolUuid: string;
  languageCountryCode?: string;
};

const LearningResourceQuestionShuttleComponent = ({
  examPoolUuid,
  languageCountryCode = 'KO',
}: QuestionShuttleModalProps) => {
  const { t } = useTranslation();

  const ref = useRef<ShuttleGridToGridImperative>(null);

  const { openModal, closeModal } = useModal();

  const {
    handleOnSearch,
    provider,
    onSubmit,
    gridData,
    handleSelectQuestions,
    handleCopyQuestions,
  } = useQuestionImport(examPoolUuid);

  const handleViewQuestionButtonClick = useCallback(async (item: QuestionListForRetrieveRes) => {
    await openModal({
      width: 'xl',
      height: 'fix',
      content: <LearningResourceQuestionItemInfoModal data={item} />,
    });
  }, []);

  const handleClickCloseButton = useCallback(() => {
    closeModal();
  }, []);

  const handleClickSaveButton = () => {
    handleCopyQuestions();
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<QuestionListForRetrieveRes>();
    return [
      columnHelper.accessor('contentName', {
        header: t('문제은행'),
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
      columnHelper.accessor('questionText', {
        header: t('대상'),
        cell: (info) => (
          <span
            className="cursor-pointer text-[var(--gray8)] underline"
            onClick={() => handleViewQuestionButtonClick(info.row.original)}
          >
            {info.getValue()}
          </span>
        ),
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
    ] as ColumnDef<any, unknown>[];
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('문항 선택')}</ModalTitle>
      <ModalBody>
        <CopyQuestionSearchForm
          provider={provider}
          onSubmit={onSubmit}
          onSearch={handleOnSearch}
          languageCountryCode={languageCountryCode}
        />
        <Divider />
        <ShuttleGridToGrid
          ref={ref}
          columns={columns}
          showNumberingColumn={false}
          gridData={gridData}
          rowKey="examQuestionUuid"
          onSelectedChange={handleSelectQuestions}
          leftTitle={t('문항 목록')}
          rightTitle={t('선택 목록')}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant="gray" size="lg" onClick={handleClickCloseButton} />
        <Button
          type="button"
          label={t('확인')}
          variant="primary"
          size="lg"
          onClick={handleClickSaveButton}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

LearningResourceQuestionShuttleComponent.displayName = 'LearningResourceQuestionShuttleModal';

export const LearningResourceQuestionShuttleModal = LearningResourceQuestionShuttleComponent;
