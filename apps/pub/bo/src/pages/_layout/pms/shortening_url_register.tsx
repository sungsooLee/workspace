import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  ChipList,
  ContentsRow,
  Input,
  Switch,
  Textarea,
  RadioGroupFormField,
} from '@learnway/ui';
import { IcoFormRequired, IcoCopy } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { SplitPanel } from '../../../../../../bo/src/shared/ui/';

// style
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_layout/pms/shortening_url_register')({
  component: RouteComponent,
});

function RouteComponent() {
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <FormSubTitle label={'단축 URL 정보'} lineType={'dark'} />
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-method" className={formStyles.form_label}>
                <span className={formStyles.form_text}>HTTP Method</span>
              </label>
              <div className={formStyles.input_box}>
                <RadioGroupFormField
                  options={[
                    { value: 'option01', label: 'POST' },
                    { value: 'option02', label: 'GET' },
                  ]}
                />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-url" className={formStyles.form_label}>
                <span className={formStyles.form_text}>URL</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'전체 URL 입력'} />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}></div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-title" className={formStyles.form_label}>
                <span className={formStyles.form_text}>제목</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'전체 URL 입력'} maxLength={10} />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}></div>
            {/* form_item */}
            <div className={formStyles.form_item}></div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-contents" className={formStyles.form_label}>
                <span className={formStyles.form_text}>내용</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id={'name-contents'}
                  rows={5}
                  cols={5}
                  maxLength={2000}
                  resize={'none'}
                  placeholder={'입력'}
                  size={'md'}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-title" className={formStyles.form_label}>
                <span className={formStyles.form_text}>접근 제어 사용 여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-use"
                  className={dynamicFormStyles.btn_switch}
                  label={checked[1] ? '사용' : '미사용'}
                  checked={checked[1]}
                  onCheckedChange={handleCheckedChange(1)}
                />
              </div>
              <p className={formStyles.guide_text}>
                ON인 경우 단축 URL에 접근 가능한 대상자를 직접 설정할 수
                {checked[1] ? ' 있습니다.' : ' 없습니다.'}
              </p>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}></div>
            {/* form_item */}
            <div className={formStyles.form_item}></div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-target" className={formStyles.form_label}>
                <span className={formStyles.form_text}>접근 가능 대상자</span>
              </label>
              <div className={formStyles.input_box}>
                <span className={formStyles.info_area}>
                  <Button
                    size={'sm'}
                    label={'복사'}
                    icon={<IcoCopy width={16} height={16} stroke={'#4C515E'} />}
                  />
                </span>
              </div>
            </div>
          </ContentsRow>
          <ChipList options={['김현대(1234567)']} wordwrap={true} />
        </div>
      </PageContainer>
    </form>
  );
}
