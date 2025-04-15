import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Popover } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/popover')({
  component: RouteComponent,
});

const PopoverContent = () => {
  return <div>팝오버 내용</div>;
};

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Popover Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/popover/popover.tsx</p>
      <p className="info">side: 'top' | 'right' | 'bottom' | 'left'</p>
      <p>
        클릭시 보여지는 레이어 사이즈가 애매하거나, 내용이 많을 경우는 dropdown대신 popover을
        활용한다.
      </p>

      <div className="code_example">
        <pre className="code_block">
          <code>{`// import 
import { memo } from 'react';
import { Popover } from '@learnway/ui';

const PopoverContent = () => {
  return (
    <div>
     팝오버 내용
    </div>
  );
};

const PopOverCompoment = () => {
  
  return (
    <Popover
      popoverContent={<PopoverContent />}
      className=""
      side="bottom"
      align="end"
      sideOffset={10}>
      팝오버 클릭요소
    </Popover>
  );
};

export const PopOverCompoment = memo(PopOverCompoment);`}</code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">popover (기본)</h3>

        <div className="flex_box">
          <div className="desc w-full">
            <Popover
              popoverContent={<PopoverContent />}
              className=""
              side="bottom"
              align="end"
              sideOffset={10}
            >
              팝오버 클릭요소
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
