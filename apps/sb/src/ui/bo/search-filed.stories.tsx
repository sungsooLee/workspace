import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  GridBox,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ModalWrapper,
  useModal,
} from '@learnway/ui';
import { forwardRef, useState } from 'react';
import { t } from 'i18next';
import { FormRow } from '../../../../../libs/auth/src/lib/shared';
import { DynamicFormConfig, useDynamicForm } from '../../../../../libs/hooks/src';

export default {
  title: 'Bo-Components/SearchField',
  component: InputModalSelectorFormField,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
- Text Field에서 데이터를 조회하여 입력할 경우,Text Field의 우측에 검색 아이콘을 배치한다.
        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof InputModalSelectorFormField>;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
  };
};

const TestModal = forwardRef<HTMLDivElement, any>(({ ...props }, ref) => {
  const { close } = useModal();
  const { data: gridData }: any = getMockData();
  const [option, setOption] = useState<{ value: string; label: string }>();

  const columns = [{ header: t('운영자'), accessorKey: 'name' }];

  const handleRowSelect = (row: any) => {
    setOption({
      value: row.id,
      label: row.name,
    });
  };

  const handleOnClose = () => {
    close({
      id: '',
      name: '',
    });
  };
  const handleOnConfirm = () => {
    if (!option) return;
    close({ id: option.value, name: option.label });
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('운영자 리스트')}</ModalTitle>
      <ModalBody>
        <div>
          <GridBox title={'목록'} data={gridData} columns={columns} onRowSelect={handleRowSelect} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={handleOnClose} />
        <Button
          type={'button'}
          label={'확인'}
          variant={'primary'}
          size={'lg'}
          onClick={handleOnConfirm}
        />
      </ModalFooter>
    </ModalContainer>
  );
});

const SingleSearchField = (args: any) => {
  const { provider } = useDynamicForm(formConfig);

  return (
    <div className="w-full">
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'name'}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <TestModal />,
              }}
            />
          }
        />
      </ContentsRow>
    </div>
  );
};

export const SearchFieldStory: Story = {
  name: 'SearchField',
  args: {},
  decorators: [
    (Story) => (
      <>
        <h3>- 정보가 입력되지 않은 초기 상태의 경우 Placeholder를 제공할 수 있다.</h3>
        <h3>- 서치 필드는 입력하여 조회하지 않고, 팝업창을 통해 데이터를 선택한다.</h3>

        <Story />
        <ModalWrapper />
      </>
    ),
  ],
  render: (args) => <SingleSearchField {...args} />,
};

//////

const ComplexSearchField = (args: any) => {
  const { provider, onFormChange, control } = useDynamicForm(formConfig);

  return (
    <div>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'managerField'}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <TestModal />,
              }}
              leftFieldProps={{ placeholder: ' ' }}
              transformModalData={(data: any) => {
                return {
                  id: data.id,
                  name: data.name,
                };
              }}
              complexField={true}
              transformComplexData={(data: any) => {
                console.log(data);
                onFormChange({ managerField: data });
              }}
              complexName={'managerField'}
              complexFieldConfig={{
                leftKey: 'id',
                rightKey: 'name',
              }}
            />
          }
        />
      </ContentsRow>
    </div>
  );
};

export const ComplexSearchFieldStory: Story = {
  name: 'ComplexSearchField',
  args: {},
  decorators: [
    (Story) => (
      <>
        <h3>- 복합 정보(ex. Code)는 Disabled상태로 검색결과 선택 시 자동으로 입력된다.</h3>

        <Story />
        <ModalWrapper />
      </>
    ),
  ],
  render: (args) => <ComplexSearchField {...args} />,
};
////

const ChipsSearchField = (args: any) => {
  const { provider } = useDynamicForm(formConfig);

  return (
    <div className="w-full">
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantList'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'name',
                hideBorder: true,
              }}
              modalConfig={{
                content: <TestModal />,
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantList2'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'name',
                wordwrap: true,
              }}
              modalConfig={{
                content: <TestModal />,
              }}
            />
          }
        />
      </ContentsRow>
    </div>
  );
};

export const ChipsFieldStory: Story = {
  name: 'ChipsField',
  args: {},
  decorators: [
    (Story) => (
      <>
        <h3>- 팝업창을 통해 선택한 데이터가 n개일 경우, 텍스트 또는 칩스로 노출할 수 있다. .</h3>
        <h3>
          - 1줄에 노출 가능한 만큼만 노출하며, 권장하지 않는다. 칩스 노출이 필요할 경우에는 필드 2줄
          형태의 Text Area - Chips/List 를 사용하는 것을 권장한다.
        </h3>
        <Story />
        <ModalWrapper />
      </>
    ),
  ],
  render: (args) => <ChipsSearchField {...args} />,
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'name',
      type: 'custom',
      label: '단일 서치 필드',
      value: '',
    },
    {
      name: 'managerField',
      type: 'custom',
      label: '복합 서치 필드',
      value: { id: '', name: '' }, // 객체 타입
    },
    {
      name: 'tenantList',
      label: '복수 칩스 노출',
      type: 'custom',
      value: [],
      format: 'array',
      guideText: '복수 데이터 칩스 노출.',
    },
    {
      name: 'tenantList2',
      label: 'Text Area 칩스 노출',
      type: 'custom',
      value: [],
      format: 'array',
      guideText: '복수 데이터 칩스 노출.',
    },
  ],
};
