/* eslint-disable @nx/enforce-module-boundaries */
import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  useModal,
  ModalTitle,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ContentsRow,
  RadioGroupFormField,
  Textarea,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { IcoFormRequired } from '@learnway/icons';

/* style */
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_layout/learning/popup-question-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const QuestionAddContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>{'문항추가'}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <FormSubTitle label={'기본정보'} />
            <div className={cn(tableStyles.start, tableStyles.wrap)}>
              <table>
                <caption>{'기본정보'}</caption>
                <colgroup>
                  <col style={{ width: '240px' }} />
                  <col />
                  <col style={{ width: '240px' }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope={'row'}>{'테넌트'}</th>
                    <td>{'테넌트명'}</td>
                    <th scope={'row'}>{'채널'}</th>
                    <td>{'채널명'}</td>
                  </tr>
                  <tr>
                    <th scope={'row'}>{'유형'}</th>
                    <td>{'시험지'}</td>
                    <th scope={'row'}>{'학습자원명'}</th>
                    <td>{'학습자원명'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <FormSubTitle label={'문항정보'} underLine className={popupStyles.form_title_line} />
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>문항유형</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.segment_wrap}>
                    <RadioGroupFormField
                      options={[
                        { value: 'option01', label: '객관식' },
                        { value: 'option02', label: '다답식' },
                        { value: 'option03', label: '단답식' },
                        { value: 'option04', label: '주관식' },
                        { value: 'option05', label: 'OX' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>난이도</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.segment_wrap}>
                    <RadioGroupFormField
                      options={[
                        { value: 'option01', label: '상' },
                        { value: 'option02', label: '중' },
                        { value: 'option03', label: '하' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type3" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>문항</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id={'name-type3'}
                    rows={5}
                    cols={5}
                    maxLength={2000}
                    resize={'none'}
                    placeholder={'입력'}
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              {/* form_item */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-type4" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>해설</span>
                </label>
                <div className={formStyles.input_box}>
                  <Textarea
                    id={'name-type4'}
                    rows={5}
                    cols={5}
                    maxLength={2000}
                    resize={'none'}
                    placeholder={'입력'}
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'저장'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <QuestionAddContent />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>Hello "/_layout/learning/popup-question-detail"!</div>;
}
