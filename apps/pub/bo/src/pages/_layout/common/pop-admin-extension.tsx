import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  ContentsRow,
  Textarea,
  Input,
  DatePicker,
} from '@learnway/ui';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoFormRequired } from '@learnway/icons';

/* style */
import popContentsStyles from './pop-contents-layout.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_layout/common/pop-admin-extension')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const CategorySelectContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>카테고리 선택</ModalTitle>
        <ModalBody>
          <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
            <FormSubTitle label={'HRD 담당자 역할 정보'} />
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-applier" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>신청자</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id={'name-applier'}
                    type={'text'}
                    placeholder={'입력'}
                    value={'현대자동차  > 소속팀 김현대(123456)'}
                    readOnly
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-ownerRole" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>HRD 담당자 역할</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    type={'text'}
                    id={'name-ownerRole'}
                    placeholder={'입력'}
                    value={'테넌트 담당자'}
                    readOnly
                  />
                </div>
              </div>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-term" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>권한 기간</span>
                </label>
                <div className={formStyles.input_box}>
                  <DatePicker displayType={'day'} />
                </div>
              </div>
            </ContentsRow>
            <FormSubTitle label={'관리자 권한 신청 정보'} />
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-startEndDate" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>권한 신청 시작/종료일</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <DatePicker displayType={'day'} />
                  <span className={formStyles.dash}></span>
                  <DatePicker displayType={'day'} />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-reason" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>신청 사유</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id={'name-reason'}
                    rows={5}
                    cols={5}
                    maxLength={150}
                    resize={'none'}
                    placeholder={'입력'}
                    size={'md'}
                    readOnly
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-status" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>신청 상태</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    type={'text'}
                    id={'name-status'}
                    placeholder={'입력'}
                    value={'연장 신청'}
                    readOnly
                  />
                </div>
              </div>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-applyDate" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>신청일</span>
                </label>
                <div className={formStyles.input_box}>
                  <DatePicker displayType={'day'} readOnly />
                </div>
              </div>
            </ContentsRow>
            <FormSubTitle label={'관리자 권한 승인 정보'} />
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-reason02" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>반려 사유</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id={'name-reason02'}
                    rows={5}
                    cols={5}
                    maxLength={150}
                    resize={'none'}
                    placeholder={'반려 시 반려 사유를 반드시 입력해 주세요.'}
                    size={'md'}
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            icon={<IcoRefresh02 width={16} height={16} className="icon_refresh" />}
            label={'초기화'}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
          />
          <Button label={'검색'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <CategorySelectContent />,
      });
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  return <div>Hello "/_layout/common/pop-admin-extension"!</div>;
}
