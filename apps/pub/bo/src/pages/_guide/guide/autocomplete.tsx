import { createFileRoute } from '@tanstack/react-router';
import { AutoCompleteDropdown, DropdownOption } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/autocomplete')({
  component: RouteComponent,
});

const sampleOptions: DropdownOption[] = [
  { value: '서울', label: '서울특별시' },
  { value: '부산', label: '부산광역시' },
  { value: '대구', label: '대구광역시' },
  { value: '인천', label: '인천광역시' },
  { value: '광주', label: '광주광역시' },
  { value: '대전', label: '대전광역시' },
  { value: '울산', label: '울산광역시' },
  { value: '세종', label: '세종특별자치시' },
  { value: '경기', label: '경기도' },
  { value: '강원', label: '강원도' },
];

const loadOptions = (inputValue: string): Promise<DropdownOption[]> => {
  return new Promise<DropdownOption[]>((resolve) => {
    console.log('API 호출 해야함' + inputValue);
    setTimeout(() => {
      const filteredOptions = sampleOptions.filter(
        (option) => option?.label && option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      resolve(filteredOptions);
    }, 500); // 0.5초 지연
  });
};

function RouteComponent() {
  return (
    <div>
      <AutoCompleteDropdown loadOptions={loadOptions} />
    </div>
  );
}
