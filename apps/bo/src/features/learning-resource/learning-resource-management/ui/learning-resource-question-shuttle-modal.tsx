import { QuestionListForRetrieveRes } from '@entities/learning-resource';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ShuttleGridToGrid, ShuttleGridToGridImperative } from '@learnway/ui/shuttle-grid-to-grid';
import { TenantByRoleDropdownFormField, TenantChannelDropdownFormField } from '@shared/ui/form';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { QUESTION_LEVELS, QUESTION_TYPES } from '../service/exam-util';
import { useQuestionSearchAndCopy } from '../service/learning-resource-question-import.hook';
import { LearningResourceQuestionItemInfoModal } from './learning-resource-question-item-info-modal';

import { SearchBox } from '@shared/ui/search-box';
import { getDropdownOptions } from '../service/test-paper/common';
type QuestionShuttleModalProps = {
  examPoolUuid: string;
};

const LearningResourceQuestionShuttleComponent = ({ examPoolUuid }: QuestionShuttleModalProps) => {
  const { t } = useTranslation();

  const ref = useRef<ShuttleGridToGridImperative>(null);

  const { openModal, closeModal } = useModal();

  const { provider: sProvider } = useSearchBox(questionSearchConfig(t));

  const { handleOnSearch, gridData, handleSelectQuestions, handleCopyQuestions } =
    useQuestionSearchAndCopy(examPoolUuid);

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
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
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

const questionSearchConfig = (t: TFunction<'translation', undefined>): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'custom',
        label: t('LABEL.form.label.tenant'),
        format: 'object',
        value: '',
        element: <TenantByRoleDropdownFormField />,
      },
      {
        name: 'channelUuid',
        type: 'custom',
        label: t('LABEL.form.label.channel'),
        format: 'object',
        value: '',
        element: <TenantChannelDropdownFormField enableFilter />,
      },
      {
        name: 'contentName',
        type: 'text',
        label: t('문제은행'),
        value: '',
      },
    ],
    [
      {
        name: 'languageCountryCode',
        label: t('문항언어'),
        type: 'dropdown',
        value: 'KO',
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
        },
        readOnly: true,
      },
      {
        name: 'questionType',
        label: t('문항유형'),
        type: 'dropdown',
        value: '',
        options: [{ value: '', label: t('전체') }, ...getDropdownOptions(QUESTION_TYPES(t))],
      },
      {
        name: 'questionLevel',
        label: t('난이도'),
        type: 'dropdown',
        value: '',
        options: [{ value: '', label: t('전체') }, ...getDropdownOptions(QUESTION_LEVELS(t))],
      },
    ],
  ],
  validator: {
    tenantId: true,
    channelUuid: true,
  },
});

export const LearningResourceQuestionShuttleModal = LearningResourceQuestionShuttleComponent;
