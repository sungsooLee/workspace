import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
// IA012 / NLP_BO_PMS_1100_6
import { useActiveMenuDepthState, useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, SelectOption, useCodeStore, useDynamicForm2 } from '@learnway/hooks';
import { IcoAlertCircle } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { FormRow2 } from '@learnway/ui/base-form';
import { RadioGroupFormField, TextareaFormField } from '@learnway/ui/form-field';
import { Tooltip } from '@learnway/ui/tooltip';

import { ChipListFormField, DropdownFormField } from '@shared/ui/form';
import { t } from 'i18next';
import { first, flatten, get, isArray, map, mapValues, pick, values } from 'lodash-es';
import { useEffect } from 'react';

interface ExcelDownloadReasonModalComponentProps {
  dataCount: number;
  paramLabels: Record<string, SelectOption>;
}

function ExcelDownloadReasonModalCompoment({
  dataCount,
  paramLabels,
}: ExcelDownloadReasonModalComponentProps) {
  const { closeModal } = useModal();
  const { data: user } = useFetchAuthUser();
  const { activeMenuDepthMenu } = useActiveMenuDepthState((state) => state);
  const { getCode } = useCodeStore();

  const { provider, setValue, onSubmit, watch } = useDynamicForm2();

  useEffect(() => {
    (async () => {
      const options = await getCode(CODE_GROUP['pms.excel.DownloadReasonTypeCode']);
      setValue('downloadReasonType', get(first(options), 'value'));
    })();
  }, []);

  const downloadReasonType = watch('downloadReasonType');

  const DOWNLOAD_DETAIL_REASON_TYPE_CODE_GROUP: Record<string, string> = {
    AFFAIRS: CODE_GROUP['pms.excel.DownloadAffairsReasonTypeCode'],
    LEGAL_REQUEST: CODE_GROUP['pms.excel.DownloadLegalRequestReasonTypeCode'],
    OUTSIDE_SUBMIT: CODE_GROUP['pms.excel.DownloadOutsideSubmitReasonTypeCode'],
    RND: CODE_GROUP['pms.excel.DownloadRndReasonTypeCode'],
    ETC: CODE_GROUP['pms.excel.DownloadEtcReasonTypeCode'],
  };

  useEffect(() => {
    if (!downloadReasonType) return;

    (async () => {
      const downloadDetailReasonTypeOption = await getCode(
        DOWNLOAD_DETAIL_REASON_TYPE_CODE_GROUP[downloadReasonType],
      );
      setValue('downloadDetailReasonType', get(first(downloadDetailReasonTypeOption), 'value'));
      setValue('downloadDetailReason', '');
    })();
  }, [downloadReasonType]);

  useEffect(() => {
    setValue('requestParameter', flatten(values(paramLabels)));
    console.log('🚀 ~ ExcelDownloadReasonModalCompoment ~ paramLabels:', paramLabels);
  }, [paramLabels]);

  useEffect(() => {
    setValue('dataCount', dataCount);
  }, [dataCount]);

  function handleSubmit(query: Record<string, any>) {
    closeModal({
      ...pick(query, [
        'userUuid',
        'menuPath',
        'dataCount',
        'downloadReasonType',
        'downloadDetailReasonType',
        'downloadDetailReason',
      ]),
      requestParameter: JSON.stringify(
        mapValues(paramLabels, (option) =>
          isArray(option) ? map(option, (_) => get(_, 'value')) : get(option, 'value'),
        ),
      ),
    });
  }

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <ModalContainer>
        <ModalTitle>
          <div className={cn('flex', 'items-center')}>
            {t('LABEL.modal.excelDownloadReason.title', '엑셀 다운로드 사유')}
            <Tooltip
              side="bottom"
              align="start"
              content={
                <>
                  <h3>{t('LABEL.modal.excelDownloadReason.tooltip.title', '도움말')}</h3>
                  <pre>
                    {t(
                      'LABEL.modal.excelDownloadReason.tooltip.content',
                      'ISMS 정보보호 관리체계 인증을 위해 개인정보 엑셀 다운로드 사유를 입력해 주세요.',
                    )}
                  </pre>
                </>
              }
            >
              <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Tooltip>
          </div>
        </ModalTitle>
        <ModalBody>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="downloadReasonType"
              label={t('LABEL.form.label.downloadReasonType', '다운로드 사유')}
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    codeGroup: CODE_GROUP['pms.excel.DownloadReasonTypeCode'],
                  }}
                />
              }
            />
          </ContentsRow>
          <div className={cn(downloadReasonType === 'ETC' && 'hidden')}>
            <ContentsRow>
              <FormRow2
                key={downloadReasonType}
                provider={provider}
                name="downloadDetailReasonType"
                label={t('LABEL.form.label.downloadDetailReasonType', '상세 사유')}
                optionsConfig={{
                  codeGroup: DOWNLOAD_DETAIL_REASON_TYPE_CODE_GROUP[downloadReasonType],
                }}
                element={<DropdownFormField />}
              />
            </ContentsRow>
          </div>
          <div className={cn(downloadReasonType !== 'ETC' && 'hidden')}>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="downloadDetailReason"
                label={t('LABEL.form.label.downloadDetailReason', '상세 사유')}
                value=""
                maxLength={2000}
                placeholder={t(
                  'LABEL.form.placeholder.downloadDetailReason',
                  '세부 사유 명확하게 입력',
                )}
                element={<TextareaFormField />}
              />
            </ContentsRow>
          </div>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="employeeNumber"
              label={t('LABEL.form.label.employeeNumber', '사번')}
              readOnly
              value={user?.employeeNumber}
              element={<Input />}
            />
            <FormRow2
              provider={provider}
              name="name"
              label={t('LABEL.form.label.name', '이름')}
              readOnly
              value={user?.name}
              element={<Input />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="menuPath"
              label={t('LABEL.form.label.menuPath', '메뉴 경로')}
              readOnly
              value={activeMenuDepthMenu?.map((menu) => menu.menuName).join(' > ')}
              element={<Input />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="requestParameter"
              label={t('LABEL.form.label.requestParameter', '검색 조건')}
              readOnly
              value={[]}
              element={<ChipListFormField chipListConfig={{ hideCloseButton: true }} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="dataCount"
              label={t('LABEL.form.label.dataCount', '조회 건')}
              readOnly
              value={dataCount}
              element={<Input type="number" suffixText={t('LABEL.form.label.countUnit', '건')} />}
            />
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button
            label={t('LABEL.button.cancel', '취소')}
            variant="gray"
            size="lg"
            onClick={() => closeModal()}
          />
          <Button type="submit" label={t('LABEL.button.ok', '확인')} variant="primary" size="lg" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
}

export const ExcelDownloadReasonModal = ExcelDownloadReasonModalCompoment;
