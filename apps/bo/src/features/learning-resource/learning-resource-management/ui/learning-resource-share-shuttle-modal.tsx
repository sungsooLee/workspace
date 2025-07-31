// IA104 / NLP_BO_CMS_1044 학습자원 현지화-공유설정(팝업)
import { learningResourceQueryOptions } from '@entities/learning-resource';
import LearningResourceService from '@entities/learning-resource/api/learning-resource';
import { useSearchBox } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import {
  Button,
  Divider,
  FormSubTitle,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
  useModal,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ContentInfo, TenantChannelCodeType, TenantCodeType } from '@types';
import { pick } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ResourceShareShuttleModalProps = {
  data: ContentInfo;
};

const LearningResourceShareShuttleModalComponent = ({ data }: ResourceShareShuttleModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const ref = useRef<ShuttleGridToGridImperative>(null);

  const { closeModal } = useModal();

  const sharingInfoSearchConfig: any = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'dropdown',
          label: t('LABEL.form.label.tenant', '테넌트'),
          format: 'object',
          value: data.tenantId,
          optionsConfig: {
            api: {
              fn: () => LearningResourceService.getShareTenantCodes(data.contentUuid),
              select: (tenants: TenantCodeType[]) =>
                tenants.map(({ tenantId, tenantName }) => ({ label: tenantName, value: tenantId })),
            },
          },
        },
        {
          name: 'channelName',
          type: 'text',
          label: t('LABEL.form.label.channel', '채널'),
          format: 'string',
          value: '',
        },
        {
          type: 'empty',
        },
        {
          type: 'empty',
        },
      ],
    ],
    validator: {
      tenantId: true,
    },
  };

  const { provider: sProvider, getValues } = useSearchBox(sharingInfoSearchConfig);

  const [gridData, setGridData] = useState<TenantChannelCodeType[]>([]);

  const handleOnSearch = async (params: Record<string, any>) => {
    const result = await queryClient.fetchQuery(
      learningResourceQueryOptions.getShareTenantsChannels({
        contentUuid: data.contentUuid,
        ...pick(params, 'tenantId', 'channelName'),
      }),
    );
    setGridData(result);
  };

  useEffect(() => {
    handleOnSearch(getValues());
  }, []);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<any>();
    return [
      columnHelper.accessor('tenantName', {
        header: t('테넌트'),
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
      columnHelper.accessor('channelName', {
        header: t('채널'),
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
    ] as ColumnDef<any, unknown>[];
  }, []);

  const handleClickCloseButton = useCallback(() => {
    closeModal();
  }, []);

  const handleClickSaveButton = () => {
    console.log('save');
    closeModal();
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('공유')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
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
                  <td>{data?.tenantName}</td>
                  <th scope="row">{t('채널')}</th>
                  <td>{data?.channelName}</td>
                </tr>
                <tr>
                  <th scope="row">{t('학습자원명')}</th>
                  <td>{data?.contentName}</td>
                  <th scope="row">{t('언어')}</th>
                  <td>{t(`pms.multilingual.LangCountryCode.${data?.languageCountryCode}`)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <FormSubTitle label={t('공유 정보')} />
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <Divider />
          <ShuttleGridToGrid ref={ref} columns={columns} gridData={gridData} rowKey="channelUuid" />
        </div>
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

LearningResourceShareShuttleModalComponent.displayName = 'LearningResourceShareShuttleModal';

export const LearningResourceShareShuttleModal = LearningResourceShareShuttleModalComponent;
