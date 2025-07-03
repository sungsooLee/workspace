/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  useModal,
  ModalTitle,
  ModalBody,
  ModalContainer,
  ModalFooter,
  UppyUpload,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export const Route = createFileRoute('/_layout/learning/popup-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const FileUploadContent = () => {
    return (
      // 퍼블수정 20240418 : ModalTitle 추가 */}
      <ModalContainer>
        <ModalTitle>{'파일 업로드'}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.selected_area}>
              <p className={popupStyles.selected_text}>{'선택한 관리채널명채널명채널명'}</p>
            </div>
            <div className={popupStyles.title_wrap}>
              {/* <h2 className={popupStyles.title}>{'파일 업로드'}</h2> */}
              <p className={popupStyles.text}>{' 파일1개당 4G 이하로 업로드 가능합니다.'}</p>
            </div>
            <div className={popupStyles.pop_contents}>
              <UppyUpload />
              <p className={cn(popupStyles.sub_text, popupStyles.dot)}>
                {'업로드된 동영상은 학습자원목록에서 조회가능합니다.'}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  useEffect(() => {
    openModal({
      // title: '',
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <FileUploadContent />,
      // footer: <CustomFooter />,
    });
  }, [openModal]);
  return <div>파일 업로드 팝업</div>;
}
