import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, ModalContainer, ModalBody, ModalTitle, GridBox } from '@learnway/ui';

function ProgramGuideModalComponent() {
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
    </ModalContainer>
  );
}

export const ProgramGuideModal = ProgramGuideModalComponent;
