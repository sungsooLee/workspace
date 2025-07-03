import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Pagination } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/pagination')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Pagination Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/pagination/pagination.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Pagination } from '@learnway/ui';

// 적용방법(예시) 
<Pagination pageNumber={0} totalPages={100} />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">페이징</h3>
        <div className="flex_box">
          <div className="desc">
            <Pagination pageNumber={0} totalPages={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
