import { useEffect, useRef, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  useModal,
  ModalContainer,
  ModalBody,
  ModalFooter,
  ModalTitle,
  GridBox,
} from '@learnway/ui';

export const Route = createFileRoute('/_layout/learning/pop-program-guide')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const GuideContent = () => {
    // grid
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        fileName: 'TOAST 프로그램 설치파일',
        download: (
          // <Link to={'/'} className="link">
          //   다운로드
          // </Link>
          <Button className="link" label={'다운로드'} />
        ),
      },
    ];

    const columnHelper = createColumnHelper<any>();

    const columns = [
      columnHelper.accessor('fileName', {
        cell: (info) => info.getValue(),
        header: '파일명',
        size: 516,
        enableGrouping: false,
      }),
      columnHelper.accessor('download', {
        cell: (info) => info.getValue(),
        header: '다운로드',
        size: 220,
        enableGrouping: false,
      }),
    ] as ColumnDef<any, unknown>[];
    return (
      <ModalContainer>
        <ModalTitle>프로그램/가이드 다운로드</ModalTitle>
        <ModalBody>
          <div className="grid_wrap">
            <GridBox
              data={data}
              columns={columns}
              height={370}
              showColumnSettings={false}
              pagination={{
                pageSize,
                pageIndex,
                totalRows: 100,
                onPageChange: setPageIndex,
                onPageSizeChange: setPageSize,
              }}
              title="공유현황"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'닫기'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <GuideContent />,
      });
      hasRun.current = true;
    }
  }, []);
  return <div>제작프로그램/가이드 다운로드 팝업</div>;
}
