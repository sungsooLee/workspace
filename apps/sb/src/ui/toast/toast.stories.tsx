// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Toast, useToast } from '@learnway/ui';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Toast>;

const BaseWrapper: React.FC<any> = (args) => {
  const { toast } = useToast()
    return (
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }}
      >
        Show Toast
      </Button>
    )
}

// const BaseWrapper: React.FC<any> = (args) => {
//   // return <Toast {...args} />;
//   const [open, setOpen] = useState(false);
//   return (
//     <div>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Show Toast
//       </button>
//       <Toast {...args} open={open} onOpenChange={setOpen} />
//     </div>
//   )
// }

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ToastStory: Story = {
  name: 'Toast',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
