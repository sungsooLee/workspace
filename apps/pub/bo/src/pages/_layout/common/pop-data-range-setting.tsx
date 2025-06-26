/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';

import {
  Button,
  ContentsRow,
  DatePicker,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Switch,
  Tooltip,
  useModal,
} from '@learnway/ui';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui';

/* style */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form module css
import popLayoutstyles from '@learnway/styles/bo/assets/styles/modules/popup-layout.module.css';
import dataInfostyles from '@learnway/styles/bo/assets/styles/modules/data-info.module.css';
import selectMenuStyles from '@learnway/styles/bo/assets/styles/modules/select-menu.module.css';

export const Route = createFileRoute('/_layout/common/pop-data-range-setting')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();

  const PackageContent = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const items = ['역할 사용 여부', '역할 시작일/종료일'];

    // switch : 사용기한
    const [checked, setChecked] = useState<{ [key: number]: boolean }>({
      1: false,
    });

    // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
    const handleCheckedChange = (id: number) => (checked: boolean) => {
      setChecked((prev) => ({ ...prev, [id]: checked }));
    };

    return (
      <ModalContainer>
        <ModalTitle>{'일괄적용'}</ModalTitle>
        <ModalBody>
          <div className={cn(popLayoutstyles.start, popLayoutstyles.wrap)}>
            <div className={popLayoutstyles.contents}>
              <div className={popLayoutstyles.left_contents}>
                <FormSubTitle label={'타이틀'} lineType={'light'} />
                <div className={dataInfostyles.start}>
                  <div className={dataInfostyles.title_box}>
                    <strong className={dataInfostyles.title}>{'일괄적용 대상'}</strong>
                    <span className={dataInfostyles.num}>{10}</span>
                    <span className={dataInfostyles.unit}>{'건'}</span>
                    <span className={dataInfostyles.icon_area}>
                      <IcoFormRequired className={dataInfostyles.icon_required} />
                    </span>
                    <Tooltip
                      className={formStyles.tooltip}
                      side="bottom"
                      align="start"
                      content={'툴팁 내용입니다.'}
                    >
                      <Button onlyIcon>
                        <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                      </Button>
                    </Tooltip>
                  </div>
                  <p className={dataInfostyles.text}>
                    {'선택한 항목의 정보를 일괄 수정할 수 있습니다.'}
                  </p>
                  <p className={dataInfostyles.text}>
                    {'일괄적용할 항목을 선택한 후 우측에 적용할 내용을 입력하세요.'}
                  </p>
                </div>
                <div className={selectMenuStyles.start}>
                  <p className={selectMenuStyles.title}>{'일괄적용 항목선택'}</p>
                  <ul className={selectMenuStyles.list}>
                    {items.map((label, index) => (
                      <li
                        key={index}
                        className={cn(index === activeIndex && selectMenuStyles.active)}
                      >
                        <span className={selectMenuStyles.menu}>{label}</span>
                        <Button
                          label={'선택'}
                          size={'ts'}
                          variant={index === activeIndex ? 'primary' : 'gray'}
                          className={selectMenuStyles.button}
                          onClick={() => setActiveIndex(index)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={popLayoutstyles.main_contents}>
                <FormSubTitle
                  label={'타이틀'}
                  lineType={'light'}
                  titleNode={
                    <>
                      <strong className="tit">{'전체'}</strong>
                      <span className="num">{'15'}</span>
                    </>
                  }
                />
                <ContentsRow type={'horizontal'}>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-1" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text)}>역할 사용 여부</span>
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Switch
                        id={'switch01'}
                        className={formStyles.btn_switch}
                        label={checked[1] ? '사용' : '사용안함'}
                        checked={checked[1]}
                        onCheckedChange={handleCheckedChange(1)}
                      />
                    </div>
                  </div>
                </ContentsRow>
                <ContentsRow>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-start" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text)}>역할 시작일</span>
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
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-end" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text)}>역할 종료일</span>
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
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  useEffect(() => {
    openModal({
      width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <PackageContent />,
    });
  }, [openModal]);
  return <div>Hello "/_layout/pms/pop-data-range-setting"!</div>;
}
