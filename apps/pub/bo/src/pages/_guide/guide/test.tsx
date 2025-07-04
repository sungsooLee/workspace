import { createFileRoute } from '@tanstack/react-router';
import {
  Carousel,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  ContentsRow,
  DatePicker,
  Editor,
} from '@learnway/ui';
import { Navigation } from 'swiper/modules';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_guide/guide/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <div>
      Hello "/_guide/guide/test"!
      <Carousel
        items={[<h3>item A</h3>, <h3>item B</h3>, <h3>item C</h3>]}
        modules={[Navigation]}
        navigation={true}
      />
      <br />
      <Button
        onClick={() =>
          openModal({
            width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
            height: 'fix',
            content: <ContentModal />,
          })
        }
      >
        모달 팝업 열기
      </Button>
      <Editor value={undefined} />
    </div>
  );
}

const ContentModal = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'타이틀'}</ModalTitle>
      <ModalBody>
        {/* <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p> */}
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name" className={formStyles.form_label}>
              <span className={formStyles.form_text}>파일 올리기</span>
            </label>
            <div className={formStyles.input_box}>
              <DatePicker displayType={'day'} />
            </div>
          </div>
        </ContentsRow>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};
