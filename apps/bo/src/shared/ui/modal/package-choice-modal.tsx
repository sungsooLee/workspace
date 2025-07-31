import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { t } from 'i18next';
import { useCallback } from 'react';
import { SearchBox } from '../search-box';
import { Checkbox } from '@learnway/ui/checkbox';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';

export const PackageChoiceModal = () => {
  const { provider, getValues, setOptions, setValue, onFormChange } = useSearchBox(searchConfig());
  const { config, gridFetch } = useGridBox(gridConfig(), getValues);

  const handleOnSearch = useCallback((data: any) => {
    //gridFetch(data);
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('패키지 조회')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={provider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox
          config={config}
          multiple
          title={t('패키지 목록')}
          customButtonNode={<Checkbox size="sm" label={t('내가 등록한 패키지')} />}
        />
      </ModalBody>
    </ModalContainer>
  );
};

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'packageName',
        label: t('패키지명'),
        type: 'text',
        value: '' },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용 여부'),
        value: true,
        options: [
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ] },
      {
        name: 'createdDate',
        label: '등록일',
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined } },
    ],
  ] });

const gridConfig = (): useGridBoxConfig => ({
  query: '',
  columns: [
    {
      name: 'packageCode',
      label: t('과정 코드'),
      size: 120 },
    {
      name: 'packageName',
      label: t('패키지명') },
    {
      name: 'courseCount',
      label: t('과정수'),
      size: 80,
      meta: {
        cellAlign: 'center' } },
    {
      name: 'isUsed',
      label: t('사용 여부'),
      size: 80,
      meta: {
        cellAlign: 'center' },
      render: (info: any) => {
        info.getValue() ? t('사용') : t('미사용');
      } },
    {
      name: 'createdDate',
      label: t('등록일'),
      size: 200,
      meta: {
        cellAlign: 'center' } },
    {
      name: 'packageValidityStartDate',
      label: t('패키지 유효기간'),
      size: 200,
      meta: {
        cellAlign: 'center' } },
  ] });
