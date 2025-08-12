import { IcoHeart } from '@learnway/icons';
import { createFileRoute } from '@tanstack/react-router';
import { ToggleActionButton } from '../../../shared/ui/toggle-button/toggle-action-button';
import { ToggleActionButtonList } from '../../../shared/ui/toggle-button/toggle-action-button-list';

export const Route = createFileRoute('/_guide/guide/action-button')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: 'Button 1', iconNode: <IcoHeart /> },
    {
      label: 'Button 2',
      showCloseButton: true,
      imageUrl: 'https://github.com/shadcn.png',
    },
    { label: 'Button 3', disabled: true },
  ];
  return (
    <div>
      <h2 className="guide_tit2">action button Component</h2>
      <p className="loc react">토글, 삭제 기능이 있는 버튼 시 사용</p>

      <div className="group">
        <h3 className="guide_tit3">action button 단독 사용</h3>
        <div className="flex_box">
          <div className="desc">
            <ToggleActionButton label={'버튼'} showCloseButton={true} iconNode={<IcoHeart />} />
            <ToggleActionButton label={'버튼'} iconNode={<IcoHeart />} rounded={true} />
            <ToggleActionButton label={'버튼'} iconNode={<IcoHeart />} disabled={true} />
            <ToggleActionButton
              label={'버튼'}
              iconNode={<IcoHeart />}
              showCloseButton={true}
              disabled={true}
            />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import { ToggleActionButton } from '../../../shared/ui/toggle-button/toggle-action-button';

const items = [
    { label: 'Button 1', iconNode: <IcoHeart /> },
    {
      label: 'Button 2',
      showCloseButton: true,
      imageUrl: 'https://github.com/shadcn.png',
    },
    { label: 'Button 3', disabled: true },
  ];

// 사용 예제
<ToggleActionButton label={'버튼'} showCloseButton iconNode={<IcoHeart />} />
`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">action button 리스트 타입</h3>
        <div className="flex_box">
          <div className="desc">
            <ToggleActionButtonList items={items} commonProps={{ size: 'lg', rounded: true }} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import { ToggleActionButtonList } from '../../../shared/ui/toggle-button/toggle-action-button-list';

// 사용 예제
<ToggleActionButtonList items={items} commonProps={{ size: 'lg', rounded: true }} />
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
