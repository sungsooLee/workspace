import { useEffect } from 'react';
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
      {
        fileName: 'TOAST 이북 제작 가이드',
        download: (
          // <Link to={'/'} className="link">
          //   다운로드
          // </Link>
          <Button className="link" label={'다운로드'} />
        ),
      },
      {
        fileName: '스콤 제작 가이드',
        download: (
          // <Link to={'/'} className="link">
          //   다운로드
          // </Link>
          <Button className="link" label={'다운로드'} />
        ),
      },
      {
        fileName: '이러닝 개발 표준 가이드',
        download: (
          // <Link to={'/'} className="link">
          //   다운로드
          // </Link>
          <Button className="link" label={'다운로드'} />
        ),
      },
      {
        fileName: '이러닝 개발 필수 스크립트',
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
        size: 510,
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
            <GridBox data={data} columns={columns} showColumnSettings={false} title="공유현황" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'닫기'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  useEffect(() => {
    openModal({
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <GuideContent />,
    });
  }, [openModal]);
  return <div>제작프로그램/가이드 다운로드 팝업</div>;
}
