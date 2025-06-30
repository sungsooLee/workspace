import { useEffect } from 'react';
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

/* tab contents */
import { UserMenu } from './-tabcontents/user-menu';
import { OutsideUserMenu } from './-tabcontents/outside-user-menu';

export const Route = createFileRoute('/_layout/common/pop-user-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const UserSearchContent = () => {
    const tabItems = [
      {
        title: '유저',
        key: 'tab01',
        content: <UserMenu />,
      },
      {
        title: '사외 이용자',
        key: 'tab02',
        content: <OutsideUserMenu />,
      },
    ];
    return (
      <ModalContainer>
        <ModalTitle>유저 조회</ModalTitle>
        <ModalBody>
          <Tabs items={tabItems} type="line" size={'sm'} selectedTabKey={'tab01'} />
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
      width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <UserSearchContent />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  return <div>유저조회</div>;
}
