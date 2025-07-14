import { FormSubTitle, List } from '@learnway/ui';

const LeftPanelComponent = ({ value, onChange }: any) => {
  const dummyOptions = Array(5)
    .fill(null)
    .map((d, i) => ({ value: `value${i}`, label: `label${i}` }));

  const handleOptionSelect = (option: any) => {
    onChange?.(option.value);
  };

  return (
    <>
      <FormSubTitle label={'List'} />
      <List options={dummyOptions} value={value} onOptionSelect={handleOptionSelect} />
    </>
  );
};

export const LeftPanel = LeftPanelComponent;
