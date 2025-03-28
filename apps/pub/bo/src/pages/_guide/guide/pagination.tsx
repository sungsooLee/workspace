import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Pagination } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/pagination')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <h2 className="guide_tit2">Pagination Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/pagination/pagination.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
      import { Pagination } from '@learnway/ui';

      const [page, setPage] = React.useState(1);
      const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
      
      // 적용방법(예시) 
     <Pagination count={100} page={page} onChange={handlePageChange} />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">페이징</h3>
        <div className="flex_box">
          <div className="desc">
            <Pagination count={100} page={page} onChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
