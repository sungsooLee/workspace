import { useState } from 'react';
import { t } from 'i18next';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { queryOptions } from '@entities/channel/service/channel.queries';
import { ChannelParam } from '@types';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

type Props = {
  roleId?: string;
};

const ChannelListModalComponent = ({ roleId = '' }: Props) => {
  const { closeModal } = useModal();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'dropdown',
          format: 'object',
          label: t('테넌트'),
          value: undefined,
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.tenant.tenantId'] },
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            isSearchable: true,
            placeholder: '입력 선택' } },
        {
          name: 'channelName',
          type: 'dropdown',
          label: t('채널'),
          value: undefined,
          format: 'object',
          options: [{ value: 'COMMON_CODE', label: t('채널') }],
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            isSearchable: true,
            placeholder: '입력 선택' } },
        {
          name: 'companyId',
          type: 'dropdown',
          label: t('회사'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.all'),
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.company.companyId'] },
          isSearchable: true,
          isClearable: true,
          placeholder: '입력 선택' },
      ],
      [
        {
          name: 'channelOwnerId',
          label: t('채널 소유자'),
          type: 'text',
          value: '',
          placeholder: '입력' },
        {
          name: 'isSecretChannel',
          type: 'dropdown',
          label: t('채널 구분'),
          value: '',
          format: 'object',
          presetOptionLabel: t('LABEL.form.label.all'),
          options: [
            {
              value: '비밀채널',
              label: t('비밀채널') },
            {
              value: '일반채널',
              label: t('일반채널') },
          ] },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('사용여부'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all'),
          options: [
            { value: 'true', label: t('사용') },
            { value: 'false', label: t('미사용') },
          ] },
      ],
    ] };

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const gridConfig = {
    query: (data: ChannelParam) => queryOptions.list(roleId, data),
    columns: [
      {
        name: 'tenantName',
        label: t('테넌트'),
        render: (info: any) => info.row.original.tenantName },
      {
        name: 'channelName',
        label: t('채널'),
        render: (info: any) => info.row.original.channelName },
      {
        name: 'companyName',
        label: t('회사'),
        render: (info: any) => info.row.original.companyName },
      {
        name: 'channelOwnerName',
        label: t('채널 소유자'),
        render: (info: any) => info.row.original.channelOwnerName },
      {
        name: 'isUniversalChannel',
        label: t('채널구분'),
        render: (info: any) => {
          return info.row.original.isUniversalChannel
            ? t('LABEL.common.enable')
            : t('LABEL.common.disable');
        } },
      {
        name: 'isUsed',
        label: '사용여부',
        render: (info: any) => {
          return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
        } },
    ],
    data: [],

    pagination: {
      pageSize: 10,
      pageIndex: 0,
      totalRows: 0 } };
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  return (
    <ModalContainer>
      <ModalTitle>채널 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={gridFetch} />
          <Divider />
          <GridBox
            onRowSelect={handleRowSelect}
            config={gConfig}
            //   columns={columns}
            // showColumnSettings={false}
            title={t('채널 목록')}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
};

export const ChannelListChoiceModal = ChannelListModalComponent;
