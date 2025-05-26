import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  Input,
  GridBox,
} from '@learnway/ui';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/pms/pop-channel-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const TabContents = () => {
    // grid
    const [pageNumber, setpageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        applyId: 'IA000000',
        channelName: '채널명채널명채널명채널명',
        tenantSetting: '테넌트명1, 테넌트명2',
        type: '공개',
        proposer: '김현대',
        applyDate: '2025-01-01 07:12',
        mailSend: 'N',
        receptionist: '홍길동',
        receiptDate: '2025-01-01 07:12',
      },
      {
        applyId: 'IA000000',
        channelName: '채널명채널명채널명채널명',
        tenantSetting: '테넌트명1, 테넌트명2',
        type: '비밀',
        proposer: '김현대',
        applyDate: '2025-01-01 07:12',
        mailSend: 'N',
        receptionist: '홍길동',
        receiptDate: '2025-01-01 07:12',
      },
    ];

    const columnHelper = createColumnHelper<any>();

    const columns = [
      columnHelper.accessor('applyId', {
        cell: (info) => info.getValue(),
        header: '접수ID',
        enableGrouping: false,
        size: 132,
      }),
      columnHelper.accessor('channelName', {
        cell: (info) => info.getValue(),
        header: '채널명',
        size: 290,
        enableGrouping: false,
      }),
      columnHelper.accessor('tenantSetting', {
        cell: (info) => info.getValue(),
        header: '테넌트설정',
        size: 190,
        enableGrouping: false,
      }),
      columnHelper.accessor('type', {
        cell: (info) => info.getValue(),
        header: '구분',
        size: 60,
        enableGrouping: false,
      }),
      columnHelper.accessor('proposer', {
        cell: (info) => info.getValue(),
        header: '신청자명',
        size: 80,
        enableGrouping: false,
      }),
      columnHelper.accessor('applyDate', {
        cell: (info) => info.getValue(),
        header: '신청일시',
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('mailSend', {
        cell: (info) => info.getValue(),
        header: '메일발송',
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('receptionist', {
        cell: (info) => info.getValue(),
        header: '접수자',
        size: 100,
        enableGrouping: false,
      }),
      columnHelper.accessor('receiptDate', {
        cell: (info) => info.getValue(),
        header: '접수일시',
        enableGrouping: false,
        size: 130,
      }),
    ] as ColumnDef<any, unknown>[];
    return (
      <ModalContainer>
        <ModalTitle>{'채널 접수 조회'}</ModalTitle>
        <ModalBody>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-1" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-1'} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-2" className={searchStyles.label}>
                        <span className={searchStyles.text}>접수ID</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-2'} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-3" className={searchStyles.label}>
                        <span className={searchStyles.text}>신청자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-3'} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={searchStyles.btn_box}>
                <Button
                  type="button"
                  className={searchStyles.btn_refresh}
                  variant="search"
                  size="sm"
                  onlyIcon
                >
                  <IcoRefresh02 className={searchStyles.icon_refresh} />
                </Button>
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className="grid_wrap">
              <GridBox
                data={data}
                columns={columns}
                height={440}
                showColumnSettings={false}
                hideRowSelectionRadioBox={false}
                showNumberingColumn
                guideText={'채널 등록전 상태의 접수ID만 조회 됩니다.'}
                pagination={{
                  pageSize,
                  pageNumber,
                  totalPages: 100,
                  onPageChange: setpageNumber,
                  onPageSizeChange: setPageSize,
                }}
                title="접수 목록"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <TabContents />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>채널 접수 조회</div>;
}
