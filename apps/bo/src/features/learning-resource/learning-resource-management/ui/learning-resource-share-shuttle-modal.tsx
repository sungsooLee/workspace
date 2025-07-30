// IA104 / NLP_BO_CMS_1044 학습자원 현지화-공유설정(팝업)
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { cn } from '@learnway/shared';
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
import {
  SearchBox,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ContentInfo } from '@types';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { learningResourceQueryOptions } from '@entities/learning-resource';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { useQuery } from '@tanstack/react-query';

type ResourceShareShuttleModalProps = {
  data: ContentInfo;
};

const LearningResourceShareShuttleModalComponent = ({ data }: ResourceShareShuttleModalProps) => {
  const { t } = useTranslation();
  const { data: tenantData, error: tenantError } = useQuery(
    learningResourceQueryOptions.getShareTenantCodes(data.contentUuid),
  );
  console.log('🚀 ~ LearningResourceShareShuttleModalComponent ~ data:', tenantData);

  const ref = useRef<ShuttleGridToGridImperative>(null);

  const { closeModal } = useModal();

  const sharingInfoSearchConfig: SearchBoxConfig = {
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
      ],
    ],
  };

  const { provider: sProvider } = useSearchBox(sharingInfoSearchConfig);

  const [gridData, setGridData] = useState<any[]>([
    {
      sharedBoxId: 0,
      sourceTenantId: 1,
      sourceTenantName: 'tenant1',
      sourceChannelUuid: '3d3e39a1-5c08-454e-a5a3-3f977096449f',
      sourceChannelName: 'channel1',
      destTenantId: 1,
      destTenantName: 'tenant2',
      destChannelUuid: 'eb192472-e452-47a7-ba22-765a48805e61',
      destChannelName: 'channel2',
    },
    {
      sharedBoxId: 0,
      sourceTenantId: 2,
      sourceTenantName: 'tenant1',
      sourceChannelUuid: '3d3e39a1-5c08-454e-a5a3-3f977096449f',
      sourceChannelName: 'channel1',
      destTenantId: 2,
      destTenantName: 'tenant3',
      destChannelUuid: 'eb192472-e452-47a7-ba22-765a48805e64',
      destChannelName: 'channel2',
    },
  ]);

  const handleOnSearch = (params: Record<string, any>) => {
    console.log('search params', params);
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<any>();
    return [
      columnHelper.accessor('destTenantName', {
        header: t('테넌트'),
        cell: (info) => info.getValue(),
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
      columnHelper.accessor('destChannelName', {
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
          <ShuttleGridToGrid
            ref={ref}
            columns={columns}
            gridData={gridData}
            rowKey="destChannelUuid"
          />
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
