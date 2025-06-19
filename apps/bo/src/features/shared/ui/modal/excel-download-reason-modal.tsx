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
import { DynamicFormConfig, SelectOption, useDynamicForm } from '@learnway/hooks';
import { useActiveMenuDepthState, useFetchAuthUser } from '@learnway/auth/entities';
import { useEffect } from 'react';
import { get, map, values } from 'lodash';

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

  const formConfig: DynamicFormConfig = {
    builders: [
      { name: 'userUuid', type: 'hidden', value: user?.uuid },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        readOnly: true,
        value: user?.employeeNumber,
      },
      { name: 'name', type: 'text', label: t('이름'), readOnly: true, value: user?.name },
      {
        name: 'menuPath',
        type: 'text',
        label: t('메뉴 경로'),
        readOnly: true,
        value: activeMenuDepth?.map((menu) => menu.menuName).join(' > '),
      },
      {
        name: 'searchQuery',
        type: 'chip-list',
        label: t('검색 조건'),
        disabled: true,
        value: [],
        chipListConfig: {
          hideCloseButton: true,
        },
      },
      {
        name: 'dataCount',
        type: 'number',
        label: t('조회 건'),
        readOnly: true,
        value: dataCount,
        suffixText: t('건'),
      },
      {
        name: 'downloadReasonType',
        type: 'radio-group',
        label: t('다운로드 사유'),
        optionsConfig: {
          options: [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
            { label: 'c', value: 'c' },
          ],
        },
        value: '',
      },
      {
        name: 'downloadDetailReasonType',
        type: 'dropdown',
        label: t('상세 사유'),
        optionsConfig: {
          options: [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
            { label: 'c', value: 'c' },
          ],
        },
        value: '',
      },
      {
        name: 'downloadDetailReason',
        type: 'text',
        label: t('상세 사유'),
        value: '',
      },
    ],
    validator: {
      downloadReasonType: true,
      downloadDetailReasonType: true,
      downloadDetailReason: true,
    },
  };
  const { provider, setValue, onSubmit } = useDynamicForm(formConfig);

  useEffect(() => {
    setValue('dataCount', dataCount);
  }, [dataCount]);

  useEffect(() => {
    setValue(
      'searchQuery',
      values(paramLabels).map((v) => get(v, 'label')),
    );
  }, [paramLabels]);

  function handleSubmit(query: Record<string, any>) {
    closeModal(query);
  }

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <ModalContainer>
        <ModalTitle>
          <div className={cn('flex', 'items-center')}>
            {t('엑셀 다운로드 사유')}
            <Tooltip
              side="bottom"
              align="start"
              content={
                <>
                  <h3>{t('도움말')}</h3>
                  <pre>
                    {t(
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
            <FormRow provider={provider} name="employeeNumber" />
            <FormRow provider={provider} name="name" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="menuPath" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="searchQuery" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="dataCount" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="downloadReasonType" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="downloadDetailReasonType" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="downloadDetailReason" />
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant="gray" size="lg" onClick={() => closeModal()} />
          <Button type="submit" label={t('확인')} variant="primary" size="lg" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
}

export const ExcelDownloadReasonModal = ExcelDownloadReasonModalCompoment;
