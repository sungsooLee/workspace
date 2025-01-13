import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Button, ModalWrapper, useModalContext, useModalControl } from '@learnway/ui';

const ModalDemo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ModalWrapper />
    </div>
  );
};

const meta = {
  title: 'Components/Modal',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '모달의 제목',
      defaultValue: 'Default Title',
    },
    description: {
      control: 'text',
      description: '모달의 설명',
      defaultValue: 'Default Description',
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '모달의 너비',
      defaultValue: 'md',
    },
    height: {
      control: 'select',
      options: ['auto', 'sm', 'md', 'lg', 'full'],
      description: '모달의 높이',
      defaultValue: 'auto',
    },
  },
  decorators: [
    (Story) => (
      <ModalDemo>
        <Story />
      </ModalDemo>
    ),
  ],
} satisfies Meta<typeof ModalWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicModalContent = () => {
  return <div>Content</div>;
};

export const Basic: Story = {
  name: 'Info Modal',
  args: {
    title: 'Title',
    description: 'description',
  },
  render: function RenderBasic(args) {
    const { open } = useModalControl();

    return <Button onClick={() => open(<BasicModalContent />, args)}>OPEN</Button>;
  },
};

export const OnCloseModal: Story = {
  args: {
    title: 'onCloseModal',
    description: 'TEST!!!!',
  },

  name: 'onClose Callback',

  render: function RenderColoseModal(args) {
    const [closeResult, setCloseResult] = useState('');
    const { open } = useModalControl();

    const handleClose = (data?: any) => {
      setCloseResult(data ? `Received ${data}` : `No Data`);
    };

    const TmpComponent = () => {
      const { closeModal } = useModalContext();
      const [tmpString, setTmpString] = useState('');
      return (
        <div className="flex flex-col space-y-5">
          <input value={tmpString} onChange={(data) => setTmpString(data.target.value)} />
          <Button onClick={() => closeModal(tmpString)}>전송</Button>
        </div>
      );
    };
    return (
      <div>
        <Button onClick={() => open(<TmpComponent />, args, handleClose)}>OPEN</Button>
        {closeResult && <p>결과: {closeResult}</p>}
      </div>
    );
  },
};

export const WithCustomFooter: Story = {
  name: 'Custom Footer',
  args: {
    title: '커스텀 푸터 모달',
    description: '',
  },
  render: function RenderWithCustomFooter(args) {
    const { open } = useModalControl();
    const CustomFooter = () => {
      const { closeModal } = useModalContext();
      return (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => closeModal()}>
            취소
          </Button>
          <Button onClick={() => closeModal()}>확인</Button>
        </div>
      );
    };

    return (
      <div>
        <Button
          onClick={() =>
            open(<BasicModalContent />, {
              ...args,
              footer: <CustomFooter />,
            })
          }>
          OPEN
        </Button>
      </div>
    );
  },
};

export const NestedModals: Story = {
  name: 'Nested Modals',
  render: function RenderNestedModals() {
    const { open } = useModalControl();

    const FirstModalContent = () => {
      const { closeModal } = useModalContext();
      const { open: openModal } = useModalControl();

      const openSecondModal = () => {
        openModal(<SecondModalContent />, { title: 'SECOND' });
      };

      return (
        <div>
          <p>첫 번째 모달</p>
          <div className="p-10 space-x-5 flex flex-row">
            <Button onClick={openSecondModal}>두 번째 모달 열기</Button>
            <Button variant="outline" onClick={() => closeModal()}>
              첫 번째 모달 닫기
            </Button>
          </div>
        </div>
      );
    };

    const SecondModalContent = () => {
      const { closeModal } = useModalContext();
      return (
        <div>
          <p>두 번째 모달</p>
          <Button variant="outline" onClick={() => closeModal()}>
            두 번째 모달 닫기
          </Button>
        </div>
      );
    };

    return (
      <Button onClick={() => open(<FirstModalContent />, { title: 'FIRST' })}>
        첫 번째 모달 열기
      </Button>
    );
  },
};

export const InteractionTest: Story = {
  args: {
    title: 'Interaction Modal',
  },
  render: function RenderInteraction(args) {
    const { open } = useModalControl();
    return <Button onClick={() => open(<BasicModalContent />, args)}>OPEN</Button>;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByText('OPEN');
    await userEvent.click(openButton);

    const modal = await document.querySelector('[role="dialog"]');
    expect(modal).toBeInTheDocument();

    const modalTitle = within(document.body).getByText('Interaction Modal');
    expect(modalTitle).toBeInTheDocument();

    const closeButton = within(document.body).getByText('Close');
    await userEvent.click(closeButton);

    expect(modalTitle).not.toBeInTheDocument();
  },
};
