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
  const handleClick = () => {
    console.log('1111');
  };
  return (
    <div>
      <h2 className="guide_tit2">Chips Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/chips/chips.tsx</p>
      <p className="info">
        variant: 'primary' | 'secondary'; <br />
        size: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Chips, ChipList, SelectOption } from '@learnway/ui';

// 적용방법(예시)
<Chips
  option={{
    label: '현대자동차 H',
    value: 'H',
  }}
  prefixCharacter="#"
  onClick={handleClick}
/>`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">
          Chips 개별로 사용하는 경우(안에 label이 버튼인 경우 typeBtn props 추가)
        </h3>
        <div className="flex_box">
          <div className="desc">
            <Chips
              option={{
                label: '현대자동차 H',
                value: 'H',
              }}
              prefixCharacter="#"
              onClick={handleClick}
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
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Chips
  option={{
    label: '현대자동차 H',
    value: 'H',
  }}
  prefixCharacter="#"
  onClick={handleClick}
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
/>`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Chips List Case</h3>
        <div className="flex_box">
          <div className="desc">
            <ChipList
              options={options}
              placeholder="한글, 영문, 숫자 포함 9자 이하"
              showInput
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<ChipList
          options={options}
          placeholder="한글, 영문, 숫자 포함 9자 이하"
          showInput
          onChange={handleChange}
        />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
