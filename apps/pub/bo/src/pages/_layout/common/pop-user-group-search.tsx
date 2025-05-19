import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Tabs,
  Button,
} from '@learnway/ui';
import { IcoRefresh02 } from '@learnway/icons';

/* tab contents */
import { UserGroup } from './-tabcontents/group';

export const Route = createFileRoute('/_layout/common/pop-user-group-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const UserGroupSearchContent = () => {
    const tabItems = [
      {
        title: '조직',
        key: 'tab01',
        content: <UserGroup />,
      },
      {
        title: '보직',
        key: 'tab02',
        content: '',
      },
      {
        title: '직군',
        key: 'tab03',
        content: '',
      },
      {
        title: '호칭',
        key: 'tab04',
        content: '',
      },
      {
        title: '직무',
        key: 'tab05',
        content: '',
      },
      {
        title: '사용자 정의',
        key: 'tab06',
        content: '',
      },
    ];
    return (
      <ModalContainer>
        <ModalTitle>유저 그룹 조회</ModalTitle>
        <ModalBody>
          <Tabs items={tabItems} type="line" size={'sm'} selectedTabKey={'tab01'} />
        </ModalBody>
        <ModalFooter>
          <Button
            variant={'gray'}
            size={'lg'}
            icon={<IcoRefresh02 width={16} height={16} className="icon_refresh" />}
            onClick={() => closeModal()}
            label={'초기화'}
          />
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <UserGroupSearchContent />,
      });
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  return <div>Hello "/_layout/common/pop-user-group-search"!</div>;
}
