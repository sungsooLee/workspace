// IA012 / NLP_BO_PMS_1100_6
import { cn } from '@learnway/shared';
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  Tooltip,
  ContentsRow,
  useModal,
  ModalFooter,
  Button,
} from '@learnway/ui';
import { t } from 'i18next';
import { IcoAlertCircle } from '@learnway/icons';
import { FormRow } from '@shared/ui';
import {
  CODE_GROUP,
  DynamicFormConfig,
  SelectOption,
  useCodeStore,
  useDynamicForm,
} from '@learnway/hooks';
import { useActiveMenuDepthState, useFetchAuthUser } from '@learnway/auth/entities';
import { useEffect, useState } from 'react';
import { first, flatten, get, isArray, map, mapValues, pick, values } from 'lodash';
import { useWatch } from 'react-hook-form';
import { DropdownFormField } from '@features/form';

interface ExcelDownloadReasonModalComponentProps {
  dataCount: number;
  paramLabels: Record<string, SelectOption>;
}

function ExcelDownloadReasonModalCompoment({
  dataCount,
  paramLabels,
}: ExcelDownloadReasonModalComponentProps) {
  const { close: closeModal } = useModal();
  const { data: user } = useFetchAuthUser();
  const [activeMenuDepth] = useActiveMenuDepthState();
  const { getCode } = useCodeStore();

  const formConfig: DynamicFormConfig = {
    builders: [
      {
        name: 'downloadReasonType',
        type: 'radio-group',
        label: t('LABEL.form.label.downloadReasonType', '다운로드 사유'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.excel.DownloadReasonTypeCode'],
        },
        value: '',
      },
      {
        name: 'downloadDetailReasonType',
        type: 'dropdown',
        label: t('LABEL.form.label.downloadDetailReasonType', '상세 사유'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.excel.DownloadAffairsReasonTypeCode'],
        },
        value: '',
      },
      {
        name: 'downloadDetailReason',
        type: 'textarea',
        label: t('LABEL.form.label.downloadDetailReason', '상세 사유'),
        value: '',
        maxLength: 2000,
        placeholder: t('LABEL.form.placeholder.downloadDetailReason', '세부 사유 명확하게 입력'),
      },
      { name: 'userUuid', type: 'hidden', value: user?.uuid },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('LABEL.form.label.employeeNumber', '사번'),
        readOnly: true,
        value: user?.employeeNumber,
      },
      {
        name: 'name',
        type: 'text',
        label: t('LABEL.form.label.name', '이름'),
        readOnly: true,
        value: user?.name,
      },
      {
        name: 'menuPath',
        type: 'text',
        label: t('LABEL.form.label.menuPath', '메뉴 경로'),
        readOnly: true,
        value: activeMenuDepth?.map((menu) => menu.menuName).join(' > '),
      },
      {
        name: 'requestParameter',
        type: 'chip-list',
        label: t('LABEL.form.label.requestParameter', '검색 조건'),
        readOnly: true,
        value: [],
        chipListConfig: {
          hideCloseButton: true,
        },
      },
      {
        name: 'dataCount',
        type: 'number',
        label: t('LABEL.form.label.dataCount', '조회 건'),
        readOnly: true,
        value: dataCount,
        suffixText: t('LABEL.form.label.countUnit', '건'),
      },
    ],
    validator: {
      downloadReasonType: true,
      downloadDetailReasonType: true,
      downloadDetailReason: {
        required: (values) => values.downloadReasonType === 'ETC',
      },
    },
  };
  const { provider, setValue, onSubmit } = useDynamicForm(formConfig);
  const [downloadDetailReasonTypeOptions, setDownloadDetailReasonTypeOptions] = useState<
    SelectOption[]
  >([]);

  useEffect(() => {
    (async () => {
      const options = await getCode(CODE_GROUP['pms.excel.DownloadReasonTypeCode']);
      setValue('downloadReasonType', get(first(options), 'value'));
    })();
  }, []);

  const downloadReasonType = useWatch({ control: provider.control, name: 'downloadReasonType' });
  useEffect(() => {
    if (!downloadReasonType) return;

    const DOWNLOAD_DETAIL_REASON_TYPE_CODE_GROUP: Record<string, string> = {
      AFFAIRS: CODE_GROUP['pms.excel.DownloadAffairsReasonTypeCode'],
      LEGAL_REQUEST: CODE_GROUP['pms.excel.DownloadLegalRequestReasonTypeCode'],
      OUTSIDE_SUBMIT: CODE_GROUP['pms.excel.DownloadOutsideSubmitReasonTypeCode'],
      RND: CODE_GROUP['pms.excel.DownloadRndReasonTypeCode'],
      ETC: CODE_GROUP['pms.excel.DownloadEtcReasonTypeCode'],
    };

    (async () => {
      const downloadDetailReasonTypeOption = await getCode(
        DOWNLOAD_DETAIL_REASON_TYPE_CODE_GROUP[downloadReasonType],
      );
      setDownloadDetailReasonTypeOptions(downloadDetailReasonTypeOption);
      setValue('downloadDetailReasonType', get(first(downloadDetailReasonTypeOption), 'value'));
      setValue('downloadDetailReason', '');
    })();
  }, [downloadReasonType]);

  useEffect(() => {
    setValue('requestParameter', flatten(values(paramLabels)));
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
            <FormRow provider={provider} name="downloadReasonType" />
          </ContentsRow>
          <div className={cn(downloadReasonType === 'ETC' && 'hidden')}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="downloadDetailReasonType"
                element={<DropdownFormField options={downloadDetailReasonTypeOptions} />}
              />
            </ContentsRow>
          </div>
          <div className={cn(downloadReasonType !== 'ETC' && 'hidden')}>
            <ContentsRow>
              <FormRow provider={provider} name="downloadDetailReason" />
            </ContentsRow>
          </div>
          <ContentsRow>
            <FormRow provider={provider} name="employeeNumber" />
            <FormRow provider={provider} name="name" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="menuPath" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="requestParameter" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="dataCount" />
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
