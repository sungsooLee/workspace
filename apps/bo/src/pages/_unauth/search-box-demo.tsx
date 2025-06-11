import { formUtils } from '@entities/form-utils';
import { ALL_OPTION, SelectOption, useSearchBox } from '@learnway/hooks';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { createFileRoute } from '@tanstack/react-router';
import { MainContents, PageContainer } from '@widgets/layout';
import { mapValues } from 'lodash';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

export const Route = createFileRoute('/_unauth/search-box-demo')({
  component: RouteComponent,
});

function ModalComponent({ values }: { values: Record<string, any> }) {
  return (
    <ModalContainer>
      <ModalTitle>페이로드</ModalTitle>
      <ModalBody>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </ModalBody>
    </ModalContainer>
  );
}

const tenants = [
  { value: 'tenant1', label: '테넌트1' },
  { value: 'tenant2', label: '테넌트2' },
  { value: 'tenant3', label: '테넌트3' },
  { value: 'tenant4', label: '테넌트4' },
  { value: 'tenant5', label: '테넌트5' },
];
const channel = {
  [tenants[0].value]: [
    { value: 'channel1-1', label: '채널1-1' },
    { value: 'channel1-2', label: '채널1-2' },
    { value: 'channel1-3', label: '채널1-3' },
    { value: 'channel1-4', label: '채널1-4' },
    { value: 'channel1-5', label: '채널1-5' },
  ],
  [tenants[1].value]: [
    { value: 'channel2-1', label: '채널2-1' },
    { value: 'channel2-2', label: '채널2-2' },
    { value: 'channel2-3', label: '채널2-3' },
    { value: 'channel2-4', label: '채널2-4' },
    { value: 'channel2-5', label: '채널2-5' },
  ],
  [tenants[2].value]: [
    { value: 'channel3-1', label: '채널3-1' },
    { value: 'channel3-2', label: '채널3-2' },
    { value: 'channel3-3', label: '채널3-3' },
    { value: 'channel3-4', label: '채널3-4' },
    { value: 'channel3-5', label: '채널3-5' },
  ],
  [tenants[3].value]: [
    { value: 'channel4-1', label: '채널4-1' },
    { value: 'channel4-2', label: '채널4-2' },
    { value: 'channel4-3', label: '채널4-3' },
    { value: 'channel4-4', label: '채널4-4' },
    { value: 'channel4-5', label: '채널4-5' },
  ],
  [tenants[4].value]: [
    { value: 'channel5-1', label: '채널5-1' },
    { value: 'channel5-2', label: '채널5-2' },
    { value: 'channel5-3', label: '채널5-3' },
    { value: 'channel5-4', label: '채널5-4' },
    { value: 'channel5-5', label: '채널5-5' },
  ],
};

function RouteComponent() {
  const { open: openModal } = useModal();

  const searchConfig: any = {
    builders: [
      [
        {
          name: 'tenantUuid',
          type: 'dropdown',
          label: '테넌트 - 필터 기준',
          value: '',
          presetOptionLabel: '선택',
          optionsConfig: {
            options: tenants,
          },
        },
        {
          name: 'channelUuid',
          type: 'dropdown',
          label: '채널 - 필터 결과',
          value: '',
          presetOptionLabel: '선택',
          optionsConfig: {
            options: [],
          },
        },
        {
          name: 'multi-dropdown',
          type: 'dropdown',
          label: '드롭다운 멀티',
          value: [ALL_OPTION],
          isMulti: true,
          variant: 'text',
          presetOptionLabel: '전체',
          optionsConfig: {
            options: [
              { value: 'optionA', label: '옵션A' },
              { value: 'optionB', label: '옵션B' },
              { value: 'optionC', label: '옵션C' },
              { value: 'optionD', label: '옵션D' },
            ],
          },
        },
      ],
      [
        {
          name: 'single-dropdown',
          type: 'dropdown',
          label: '드롭다운 싱글',
          value: '',
          presetOptionalLabel: '전체',
          optionsConfig: {
            options: [
              { value: 'true', label: '사용' },
              { value: 'false', label: '미사용' },
            ],
          },
        },
        {
          name: 'single-input-dropdown',
          type: 'dropdown',
          label: '드롭다운 싱글/입력',
          value: '',
          isSearchable: true,
          isClearable: true,
          optionsConfig: {
            options: [
              { value: 'apple', label: '사과' },
              { value: 'banana', label: '바나나' },
              { value: 'cherry', label: '체리' },
              { value: 'grape', label: '포도' },
            ],
          },
        },
        {
          name: 'text-input',
          type: 'text',
          label: '텍스트 입력',
          value: '',
        },
      ],
      [
        {
          name: 'date-range-input',
          type: 'date-range',
          label: '기간 입력',
          value: {
            from: formUtils.now(),
            to: formUtils.now({ unit: 'day', offset: 7 }),
          },
        },
      ],
    ],
    validator: {
      tenantUuid: true,
      channelUuid: true,
      'multi-dropdown': true,
    },
  };

  const { provider, getValues, setValue, setOptions } = useSearchBox(searchConfig);

  const tenantUuid = useWatch({ control: provider.control, name: 'tenantUuid' });

  async function getChannels(tenantUuid: string): Promise<SelectOption[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(channel[tenantUuid] || []);
      }, 200);
    });
  }

  useEffect(() => {
    (async () => {
      setValue('channelUuid', '');
      setOptions('channelUuid', await getChannels(tenantUuid));
    })();
  }, [tenantUuid]);

  const handleSearch = (data: Record<string, any>) => {
    openModal({
      width: 'sm',
      content: <ModalComponent values={data} />,
    });
  };

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={provider} onSearch={handleSearch} />
      </MainContents>
    </PageContainer>
  );
}
