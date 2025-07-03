import { createFileRoute } from '@tanstack/react-router';
import { Avatar } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/avatar')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Avatar Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/avata/avata.tsx</p>
      <p className="info">
        size(가로,세로 동일) : sm(32), md(40)-기본, lg(48), xl(56), 2xl(72), 3xl(100)
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Avatar } from '@learnway/ui';`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Avatar (이미지)</h3>
        <div className="flex_box">
          <div className="desc">
            <div className="text-center">
              <Avatar imageUrl="https://github.com/shadcn.png" size="sm" />
              sm
            </div>
            <div className="text-center">
              <Avatar imageUrl="https://github.com/shadcn.png" size="md" />
              md
            </div>
            <div className="text-center">
              <Avatar imageUrl="https://github.com/shadcn.png" size="lg" />
              lg
            </div>
            <div className="text-center">
              <Avatar imageUrl="https://github.com/shadcn.png" size="xl" />
              xl
            </div>
            <div className="text-center">
              <Avatar imageUrl="https://github.com/shadcn.png" size="2xl" />
              2xl
            </div>
            <div className="text-center">
              <Avatar imageUrl="https://github.com/shadcn.png" size="3xl" />
              3xl
            </div>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`<Avatar imageUrl="https://github.com/shadcn.png" size="md" />`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Avatar (텍스트)</h3>
        <div className="flex_box">
          <div className="desc">
            <div className="text-center">
              <Avatar fallback="AB" size="sm" />
              sm
            </div>
            <div className="text-center">
              <Avatar fallback="AB" size="md" />
              md
            </div>
            <div className="text-center">
              <Avatar fallback="AB" size="lg" />
              lg
            </div>
            <div className="text-center">
              <Avatar fallback="AB" size="xl" />
              xl
            </div>
            <div className="text-center">
              <Avatar fallback="AB" size="2xl" />
              2xl
            </div>
            <div className="text-center">
              <Avatar fallback="AB" size="3xl" />
              3xl
            </div>
          </div>
        </div>
      </div>
      <div className="code_example">
        <pre className="code_block">
          <code>{`<Avatar fallback="AB" size="md" />`}</code>
        </pre>
      </div>
    </div>
  );
}
