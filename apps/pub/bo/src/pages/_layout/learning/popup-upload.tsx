/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, useModal, ModalBody, ModalContainer, ModalFooter, UppyUpload } from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export const Route = createFileRoute('/_layout/learning/popup-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const FileUploadContent = () => {
    return (
      // 퍼블수정 20240319 : 파일업로드 */}
      <ModalContainer>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.title_wrap}>
              <h2 className={popupStyles.title}>{'파일 업로드'}</h2>
              <p className={popupStyles.text}>{'파일은 최대 1개, 4G 이하로 업로드 가능합니다.'}</p>
            </div>
            <div className={popupStyles.pop_contents}>
              <UppyUpload />
              <p className={popupStyles.sub_text}>
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
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        // title: '',
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <FileUploadContent />,
        // footer: <CustomFooter />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>파일 업로드 팝업</div>;
}
