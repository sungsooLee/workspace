import { SelectOption, Stepper } from '@/libs/ui/src';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/stepper')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '스텝 1', text: '111', value: 'step1' },
    { label: '스텝 2', text: '222', value: 'step2' },
    { label: '스텝 3', text: '333', value: 'step3' },
    { label: '스텝 4', text: '444', value: 'step4' },
    { label: '스텝 5', text: '555', value: 'step5' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div>
      <Stepper items={items} selectedStep="1" onChange={handleChange} isVisible />
    </div>
  );
}
