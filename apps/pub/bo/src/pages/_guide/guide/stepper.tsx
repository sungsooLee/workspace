import { createFileRoute } from '@tanstack/react-router';
import { SelectOption, Stepper } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/stepper')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '스텝 1', subLabel: 'help label', value: 'step1' },
    { label: '스텝 2', subLabel: 'help label', value: 'step2' },
    { label: '스텝 3', subLabel: 'help label', value: 'step3' },
    { label: '스텝 4', subLabel: 'help label', value: 'step4' },
    { label: '스텝 5', subLabel: 'help label', value: 'step5' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div>
      <h2 className="guide_tit2">Stepper Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/stepper/stepper.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
                import { Switch } from '@learnway/ui';
                
                // 적용방법(예시)
                <Stepper items={items} enableMoveStep onChange={handleChange} />
                `}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">stepper FO 기본</h3>
        <Stepper items={items} enableMoveStep onChange={handleChange} variant="check" />
        <h3 className="guide_tit3">stepper BO 기본</h3>
        <Stepper items={items} enableMoveStep onChange={handleChange} />
      </div>
    </div>
  );
}
