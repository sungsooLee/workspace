import { memo, useEffect, useRef, useState } from 'react';
import { MobileView, BrowserView, isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/features/layout/popup/notice-detail-popup.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import tableListStyles from '../../../shared/ui/list/table-list.module.css';
import { Button } from '@learnway/ui/button';
import { TableBox } from '@learnway/ui/grid/grid-box/table-box';
import { useModal, ModalContainer, ModalTitle, ModalBody, ModalFooter } from '@learnway/ui/modal';

const NoticeDetailPopupComponent = () => {
  const { openModal, closeModal } = useModal();
  const columnHelper = createColumnHelper<any>();

  // thead : 'value'
  const data: any[] = [
    {
      name1: '완료',
      name2: '4',
      name3: '26-03-04 12:24pm ~ 26-03-04 12:28pm\n 26-03-04 12:24pm ~ 26-03-04 12:28pm',
    },
  ];

  // 퍼블수정 20250723 size 추가
  // Thead 정의
  const columns = [
    columnHelper.accessor('name1', {
      header: '상태',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      size: 80,
    }),
    columnHelper.accessor('name2', {
      header: '접속회수',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      size: 80,
    }),
    columnHelper.accessor('name3', {
      header: '접속로그',
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      size: 370,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ModalContainer>
      <ModalTitle>{'학습이력'}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.table_wrap}>
            <BrowserView>
              {/* 퍼블수정 class 추가 */}
              <TableBox
                className={styles.table}
                data={data}
                columns={columns}
                tableMode={true}
                showTotalCount={false}
                title=" "
              />
            </BrowserView>

            <MobileView>
              <div className={`${tableListStyles.start} ${tableListStyles.table_list}`}>
                {/* 퍼블수정 20250725 마크업 수정 */}
                <div className={tableListStyles.list_row}>
                  <div className={`${tableListStyles.row} ${tableListStyles.col}`}>
                    <span className={tableListStyles.dt}>접속로그</span>
                    <span className={tableListStyles.dd}>
                      <span>상태</span>
                      <span>완료</span>
                    </span>
                    <span className={tableListStyles.dd}>
                      <span>접속회수</span>
                      <span>4</span>
                    </span>
                  </div>
                  <div className={`${tableListStyles.row} ${tableListStyles.col}`}>
                    <span className={tableListStyles.dt}>접속로그</span>
                    <span className={tableListStyles.dd}>26-03-03 11:24pm ~ 26-03-03 11:28pm</span>
                    <span className={tableListStyles.dd}>26-03-03 11:24pm ~ 26-03-03 11:28pm</span>
                    <span className={tableListStyles.dd}>26-03-03 11:24pm ~ 26-03-03 11:28pm</span>
                    <span className={tableListStyles.dd}>26-03-03 11:24pm ~ 26-03-03 11:28pm</span>
                  </div>
                </div>
              </div>
            </MobileView>
          </div>
          <p className={styles.text_info}>관련된 안내 멘트가 있다면 오도록 합니다.</p>
        </div>
      </ModalBody>
      <ModalFooter>
        {/* 퍼블수정 20250723 버튼 사이즈 수정 */}
        <Button
          label={'확인'}
          variant={'primary'}
          size={'xl'}
          onClick={() => closeModal()}
        ></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const NoticeDetailPopup = memo(NoticeDetailPopupComponent);
