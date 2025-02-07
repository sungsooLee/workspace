import { createFileRoute } from '@tanstack/react-router';
import { Chips, ChipList, SelectOption } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/chips')({
  component: RouteComponent,
});

function RouteComponent() {
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
    { label: '현대자동차 G', value: 'G' },
    { label: '현대자동차 H', value: 'H' },
    { label: '현대자동차 I', value: 'I' },
    { label: '현대자동차 J', value: 'J' },
    { label: '현대자동차 K', value: 'K' },
    { label: '현대자동차 L', value: 'L' },
    { label: '현대자동차 M', value: 'M' },
    { label: '현대자동차 N', value: 'N' },
    { label: '현대자동차 O', value: 'O' },
    { label: '현대자동차 P', value: 'P' },
    { label: '현대자동차 Q', value: 'Q' },
    { label: '현대자동차 R', value: 'R' },
  ];
  const handleChange = (event: SelectOption[]) => {
    console.log(event);
  };
  return (
    <div>
      <h2 className="guide_tit2">Chips Component Guide</h2>
      <h3 className="guide_tit3">Chips 개별로 사용하는 경우</h3>
      <Chips
        option={{
          label: '현대자동차 H',
          value: 'H',
        }}
        prefixCharacter="#"
      />
      <Chips
        option={{
          label: '현대자동차 F',
          value: 'F',
        }}
        prefixCharacter="#"
      />
      <Chips
        option={{
          label: '현대자동차 G',
          value: 'G',
        }}
        prefixCharacter="#"
      />
      <h3 className="guide_tit3">Chips List Case</h3>
      <ChipList
        options={options}
        placeholder="한글, 영문, 숫자 포함 9자 이하"
        showInput
        onChange={handleChange}
      />
    </div>
  );
}
