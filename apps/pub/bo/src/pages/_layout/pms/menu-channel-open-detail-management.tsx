/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import {
  ContentsRow,
  Button,
  Input,
  Textarea,
  RadioGroupFormField,
  Switch,
  Tabs,
} from '@learnway/ui';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

/* tab contents */
import { UserGroupSetting } from './-tabcontents/user-group-setting'; // 유저그룹 설정
import { DirectSetting } from './-tabcontents/direct-setting'; // 직접 설정
import { LearningExceptionSetting } from './-tabcontents/learning-exception-setting'; // 학습자 제외 설정

export const Route = createFileRoute('/_layout/pms/menu-channel-open-detail-management')({
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

  const [selectedTabKey] = useState<string>('a');
  const items = [
    {
      title: '유저그룹 설정',
      key: 'a',
      content: <UserGroupSetting />,
    },
    {
      title: '직접 설정',
      key: 'b',
      content: <DirectSetting />,
    },
    {
      title: '학습자 제외 설정',
      key: 'c',
      content: <LearningExceptionSetting />,
    },
  ];
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <FormSubTitle
            label={'채널 정보'}
            underLine
            actionNode={
              <>
                <p className="info_text">{`접수ID : ${45785566322}`}</p>
                <Button variant={'gray2'} size={'sm'} label={'채널 접수정보 불러오기 '} />
              </>
            }
          />
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-channel" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id={'name-channel'} type={'text'} maxLength={40} placeholder={'입력'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-channel2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널 학습대상</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id={'name-channel2'}
                  rows={10}
                  cols={5}
                  maxLength={2000}
                  resize={'none'}
                  placeholder={'입력'}
                  size={'xs'}
                />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-channel3" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널 운영목적</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id={'name-channel3'}
                  rows={10}
                  cols={5}
                  maxLength={2000}
                  resize={'none'}
                  placeholder={'입력'}
                  size={'xs'}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-address" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널주소</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'입력'} value={''} readOnly={true} />
                <Button variant={'gray'} size={'sm'}>
                  {'자동생성'}
                </Button>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type={'horizontal'}>
            {/* form_item */}
            <div className={cn(formStyles.form_item, formStyles.direction_col)}>
              <label htmlFor="name-sort2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널구분</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <RadioGroupFormField
                  options={[
                    { value: 'y', label: '공개' },
                    { value: 'n', label: '비밀' },
                  ]}
                  defaultValue={'y'}
                />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-security" className={formStyles.form_label}>
                <span className={formStyles.form_text}>보안 채널 여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-use"
                  className={cn(dynamicFormStyles.btn_switch, 'translate-y-1/2')}
                  label={checked[1] ? '보안 적용' : '보안 미적용'}
                  checked={checked[1]}
                  onCheckedChange={handleCheckedChange(1)}
                />
              </div>
              <p className={formStyles.guide_text}>
                보안채널 미 설정 시 학습자원의 불법 배포와 보안 위협에
                {checked[1] ? ' 강합니다.' : ' 취약합니다.'}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-learning" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습 대상자 설정</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Tabs selectedTabKey={selectedTabKey} items={items} type="round" />
              </div>
            </div>
          </ContentsRow>
          <ContentsHistoryInfoFormField />
        </div>
      </PageContainer>
    </form>
  );
}
