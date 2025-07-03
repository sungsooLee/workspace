import { memo, useEffect, useRef, useState } from 'react';
import { MobileView, BrowserView, isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
  TableBox,
} from '@learnway/ui';
import styles from './notice-detail-popup.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import tableListStyles from '../../../shared/ui/list/table-list.module.css';

const NoticeDetailPopupComponent = () => {
  const { open: openModal, close: closeModal } = useModal();
  const columnHelper = createColumnHelper<any>();

  // thead : 'value'
  const data: any[] = [
    {
      name1: '완료',
      name2: '4',
      name3: '26-03-04 12:24pm ~ 26-03-04 12:28pm\n 26-03-04 12:24pm ~ 26-03-04 12:28pm',
    },
  ];

  // Thead 정의
  const columns = [
    columnHelper.accessor('name1', {
      header: '상태',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('name2', {
      header: '접속회수',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('name3', {
      header: '접속로그',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ModalContainer>
      <ModalTitle>{'학습이력'}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.table_wrap}>
            <BrowserView>
              <TableBox data={data} columns={columns} tableMode={true} />
            </BrowserView>

            <MobileView>
              <div className={`${tableListStyles.start} ${tableListStyles.table_list}`}>
                <div className={tableListStyles.list_row}>
                  <div className={`${tableListStyles.row} ${tableListStyles.col}`}>
                    <span className={tableListStyles.dt}>상태</span>
                    <span className={tableListStyles.dd}>완료</span>
                  </div>
                  <div className={`${tableListStyles.row} ${tableListStyles.col}`}>
                    <span className={tableListStyles.dt}>접속회수</span>
                    <span className={tableListStyles.dd}>4</span>
                  </div>
                  <div className={`${tableListStyles.row} ${tableListStyles.col}`}>
                    <span className={tableListStyles.dt}>접속로그</span>
                    <span className={tableListStyles.dd}>
                      26-03-03 11:24pm ~ 26-03-03 11:28pm
                      <br />
                      26-03-04 12:24pm ~ 26-03-04 12:28pm
                      <br />
                      26-03-04 12:24pm ~ 26-03-01 10:29am
                      <br />
                      26-03-01 11:24am ~ 26-03-01 11:34am
                    </span>
                  </div>
                </div>
              </div>
            </MobileView>
          </div>
          <p className={styles.text_info}>관련된 안내 멘트가 있다면 오도록 합니다.</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          label={'확인'}
          variant={'primary'}
          size={'lg'}
          onClick={() => closeModal()}
        ></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const NoticeDetailPopup = memo(NoticeDetailPopupComponent);
