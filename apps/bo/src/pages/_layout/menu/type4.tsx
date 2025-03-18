import { createFileRoute } from '@tanstack/react-router';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../shared/ui/search-box';
import { t } from 'i18next';
import { ContentsRow } from '@learnway/ui';

export const Route = createFileRoute('/_layout/menu/type4')({
  component: RouteComponent,
});

function RouteComponent() {
  const { config: config1 } = useSearchBox(searchConfig1);
  const { config: config2 } = useSearchBox(searchConfig2);
  const { config: config3 } = useSearchBox(searchConfig3);
  const { config: config4 } = useSearchBox(searchConfig4);
  const { config: config5 } = useSearchBox(searchConfig5);
  return (
    <div>
      <PageContainer>
        <MainContents>
          <SearchBox config={config1} />
          <SearchBox config={config2} />
          <SearchBox config={config3} />
          <SearchBox config={config4} />
          <SearchBox config={config5} />
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

const searchConfig5: any = {
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
