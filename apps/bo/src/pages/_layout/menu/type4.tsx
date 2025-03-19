import { createFileRoute } from '@tanstack/react-router';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../shared/ui/search-box';
import { t } from 'i18next';

export const Route = createFileRoute('/_layout/menu/type4')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider: provider1 } = useSearchBox(searchConfig1);
  const { provider: provider2 } = useSearchBox(searchConfig2);
  const { provider: provider3 } = useSearchBox(searchConfig3);
  const { provider: provider4 } = useSearchBox(searchConfig4);
  const { provider: provider5 } = useSearchBox(searchConfig5);

  const onHandleSearchConfig1 = (data: any) => {
    console.log('search config1 data => ', data);
  };

  const onHandleSearchConfig2 = (data: any) => {
    console.log('search config2 data => ', data);
  };
  const onHandleSearchConfig3 = (data: any) => {
    console.log('search config3 data => ', data);
  };
  const onHandleSearchConfig4 = (data: any) => {
    console.log('search config4 data => ', data);
  };
  const onHandleSearchConfig5 = (data: any) => {
    console.log('search config5 data => ', data);
  };
  return (
    <div>
      <PageContainer>
        <MainContents>
          <SearchBox provider={provider1} onSearch={onHandleSearchConfig1} />
          <SearchBox provider={provider2} onSearch={onHandleSearchConfig2} />
          <SearchBox provider={provider3} onSearch={onHandleSearchConfig3} />
          <SearchBox provider={provider4} onSearch={onHandleSearchConfig4} />
          <SearchBox provider={provider5} onSearch={onHandleSearchConfig5} />
        </MainContents>
      </PageContainer>
    </div>
  );
}

const searchConfig1: any = {
  builders: [
    [
      {
        name: 'tenant1',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
    ],
  ],
  validator: {},
};

const searchConfig2: any = {
  builders: [
    [
      {
        name: 'tenant1',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant2',
        type: 'dropdown',
        label: t('테넌트2'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
    ],
  ],
};

const searchConfig3: any = {
  builders: [
    [
      {
        name: 'tenant1',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant2',
        type: 'dropdown',
        label: t('테넌트2'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant3',
        type: 'dropdown',
        label: t('테넌트3'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
    ],
  ],
};

const searchConfig4: any = {
  builders: [
    [
      {
        name: 'tenant1',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant2',
        type: 'dropdown',
        label: t('테넌트2'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant3',
        type: 'dropdown',
        label: t('테넌트3'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        type: 'group',
        builders: [
          {
            name: 'tenant4',
            type: 'dropdown',
            label: t('테넌트4'),
            value: '',
            options: [
              { value: '', label: t('전체') },
              { value: 'tenantA', label: t('테넌트A') },
              { value: 'tenantB', label: t('테넌트B') },
              { value: 'tenantC', label: t('테넌트C') },
              { value: 'tenantD', label: t('테넌트D') },
              { value: 'tenantE', label: t('테넌트E') },
              { value: 'tenantF', label: t('테넌트F') },
            ],
          },
          {
            name: 'tenant5',
            type: 'dropdown',
            label: t('테넌트5'),
            value: '',
            options: [
              { value: '', label: t('전체') },
              { value: 'tenantA', label: t('테넌트A') },
              { value: 'tenantB', label: t('테넌트B') },
              { value: 'tenantC', label: t('테넌트C') },
              { value: 'tenantD', label: t('테넌트D') },
              { value: 'tenantE', label: t('테넌트E') },
              { value: 'tenantF', label: t('테넌트F') },
            ],
          },
        ],
      },
    ],
  ],
};

const searchConfig5: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant1',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant2',
        type: 'dropdown',
        label: t('테넌트2'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant3',
        type: 'dropdown',
        label: t('테넌트3'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        type: 'group',
        builders: [
          {
            name: 'tenant4',
            type: 'dropdown',
            label: t('테넌트4'),
            value: '',
            options: [
              { value: '', label: t('전체') },
              { value: 'tenantA', label: t('테넌트A') },
              { value: 'tenantB', label: t('테넌트B') },
              { value: 'tenantC', label: t('테넌트C') },
              { value: 'tenantD', label: t('테넌트D') },
              { value: 'tenantE', label: t('테넌트E') },
              { value: 'tenantF', label: t('테넌트F') },
            ],
          },
          {
            name: 'tenant5',
            type: 'dropdown',
            label: t('테넌트5'),
            value: '',
            options: [
              { value: '', label: t('전체') },
              { value: 'tenantA', label: t('테넌트A') },
              { value: 'tenantB', label: t('테넌트B') },
              { value: 'tenantC', label: t('테넌트C') },
              { value: 'tenantD', label: t('테넌트D') },
              { value: 'tenantE', label: t('테넌트E') },
              { value: 'tenantF', label: t('테넌트F') },
            ],
          },
        ],
      },
    ],
    [
      {
        name: 'tenant1',
        type: 'dropdown',
        label: t('테넌트1'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant2',
        type: 'dropdown',
        label: t('테넌트2'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant3',
        type: 'dropdown',
        label: t('테넌트3'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'tenant3',
        type: 'text',
        label: t('테넌트3'),
        value: '',
      },
    ],
  ],
};
