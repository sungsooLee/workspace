/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';

import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  GridBox,
  Tooltip,
} from '@learnway/ui';
import { IcoAlertCircle } from '@learnway/icons';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';

/** style */
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

export const Route = createFileRoute('/_layout/pms/popup-translation-complete')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const TabContents = () => {
    // grid
    // const [pageNumber, setPageIndex] = useState(0);
    // const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        language: 'Español',
        status: '번역 미완료',
      },
      {
        language: '日本語(일본어)',
        status: '번역 미완료',
      },
      {
        language: 'Français(프랑스어)',
        status: '번역 미완료',
      },
      {
        language: 'Englisg(영어)',
        status: '번역 미완료',
      },
    ];

    const columnHelper = createColumnHelper<any>();

    const columns = [
      columnHelper.accessor('language', {
        cell: (info) => info.getValue(),
        header: '번역언어',
        enableGrouping: false,
      }),
      columnHelper.accessor('status', {
        cell: (info) => info.getValue(),
        header: '번역상태',
        enableGrouping: false,
      }),
    ] as ColumnDef<any, unknown>[];
    return (
      <ModalContainer>
        <ModalTitle>
          {'번역언어 현황팝업'}
          <Tooltip side="bottom" align="start" content={'툴팁내용입니다.'}>
            <Button onlyIcon>
              <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          </Tooltip>
        </ModalTitle>
        <ModalBody>
          <FormSubTitle label={'타이틀'} noLine />
          <div className={cn(tableStyles.start, tableStyles.wrap)}>
            <table>
              <caption>{'번역언어정보'}</caption>
              <colgroup>
                <col style={{ width: '174px' }} />
                <col />
                <col style={{ width: '174px' }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope={'row'}>{'분류'}</th>
                  <td>{'라벨'}</td>
                  <th scope={'row'}>{'코드'}</th>
                  <td>{'라벨코드명'}</td>
                </tr>
                <tr>
                  <th scope={'row'}>{'기준명(한국어)'}</th>
                  <td colSpan={3}>{'차세대 학습 플랫폼1'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <GridBox
            data={data}
            columns={columns}
            //   pagination={{
            //     pageSize,
            //     pageNumber,
            //     totalPages: 100,
            //     onPageChange: setPageIndex,
            //     onPageSizeChange: setPageSize,
            //   }}
            title={'번역현황 목록'}
          />
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  useEffect(() => {
    openModal({
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <TabContents />,
    });
  }, [openModal]);
  return <div>플랫폼관리_라벨다국어관리_번역완료현황</div>;
}
