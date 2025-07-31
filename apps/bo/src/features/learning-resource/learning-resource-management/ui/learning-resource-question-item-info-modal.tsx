import { learningResourceQueryOptions } from '@entities/learning-resource';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { GridFormField, TextareaFormField } from '@learnway/ui/form-field';
import { EditTextareaCell } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import {
  EnQuestionLevel,
  EnQuestionType,
  QuestionItemOption,
  QuestionListForRetrieveRes,
} from '@types';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FormDisplay } from '@features/form';
import {
  QUESTION_LEVELS,
  QUESTION_TYPES,
} from '@features/learning-resource/learning-resource-management/service/exam-util';
import { useDynamicForm2 } from '@learnway/hooks';
import { cn, isEmptyData } from '@learnway/shared';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/popup-question-detail.module.css';
import { FormRow2 } from '@shared/ui';

type QuestionDetailInfoProps = {
  data: QuestionListForRetrieveRes;
};

const LearningResourceQuestionInfoComponent = ({ data }: QuestionDetailInfoProps) => {
  const { t } = useTranslation();

  const { data: questionInfo } = useQuery(
    learningResourceQueryOptions.getQuestionItem(data.examQuestionUuid),
  );

  const { closeModal } = useModal();

  const { provider, updateFormData } = useDynamicForm2();

  const gridColumns = useMemo(() => {
    const columnHelper = createColumnHelper<QuestionItemOption>();

    return [
      columnHelper.accessor('examOptionText', {
        header: t('보기'),
        cell: (info) => <EditTextareaCell info={info} textarea={{ size: 'sm', maxLength: 2000 }} />,
        size: 600,
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
    ];
  }, []);

  useEffect(() => {
    if (!isEmptyData(questionInfo)) {
      updateFormData({
        ...questionInfo,
        questionTypeText: QUESTION_TYPES(t)[questionInfo?.questionType as EnQuestionType],
        questionLevel: QUESTION_LEVELS(t)[questionInfo?.questionLevel as EnQuestionLevel],
      });
    }
  }, [questionInfo]);

  return (
    <ModalContainer>
      <ModalTitle>{t('문항 정보')}</ModalTitle>
      <ModalBody>
        <div className={cn(popupStyles.wrap, styles.start)}>
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
                  <td>{data.tenantName}</td>
                  <th scope="row">{t('채널')}</th>
                  <td>{data.channelName}</td>
                </tr>
                <tr>
                  <th scope="row">{t('시험지 유형')}</th>
                  <td>-</td>
                  <th scope="row">{t('학습자원명')}</th>
                  <td>{data.contentName}</td>
                </tr>
                <tr>
                  <th scope="row">{t('언어')}</th>
                  <td>{t(`pms.multilingual.LangCountryCode.${data?.languageCountryCode}`)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <FormSubTitle label={t('문항 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow2 provider={provider} name="questionType" type="hidden" value="" />
            <FormRow2
              provider={provider}
              name="questionTypeText"
              label={t('문항유형')}
              validation={{ required: true }}
              value=""
              element={<Input readOnly />}
            />
            <FormRow2
              provider={provider}
              name="questionLevel"
              label={t('난이도')}
              validation={{ required: true }}
              value=""
              element={<Input readOnly />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="questionText"
              label={t('문항')}
              validation={{ required: true }}
              value=""
              element={<TextareaFormField readOnly />}
            />
          </ContentsRow>
          <FormDisplay
            provider={provider}
            condition="or"
            dependencies={[
              { name: 'questionType', value: EnQuestionType.SINGLE },
              { name: 'questionType', value: EnQuestionType.MULTIPLE },
              { name: 'questionType', value: EnQuestionType.OX },
            ]}
          >
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="options"
                value={[]}
                element={
                  <GridFormField
                    maxRow={10}
                    gridProps={{
                      title: t('보기목록'),
                      multiple: true,
                      showTotalCount: true,
                      columns: gridColumns,
                      showNumberingColumn: true,
                      hideRowSelectionCheckBox: true,
                    }}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" label={t('확인')} variant="primary" size="lg" onClick={closeModal} />
      </ModalFooter>
    </ModalContainer>
  );
};

LearningResourceQuestionInfoComponent.displayName = 'LearningResourceQuestionItemInfoModal';

export const LearningResourceQuestionItemInfoModal = LearningResourceQuestionInfoComponent;
