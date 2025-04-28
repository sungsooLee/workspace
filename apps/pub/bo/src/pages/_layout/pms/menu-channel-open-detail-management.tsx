/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { ContentsRow, Button, Input, Textarea } from '@learnway/ui';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_layout/pms/menu-channel-open-detail-management')({
  component: RouteComponent,
});

function RouteComponent() {
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
                  size={'sm'}
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
                  size={'sm'}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-sort2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널구분</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id={'name-channel2'}
                  rows={10}
                  cols={5}
                  maxLength={2000}
                  resize={'none'}
                  placeholder={'입력'}
                  size={'sm'}
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
                  size={'sm'}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsHistoryInfoFormField />
        </div>
      </PageContainer>
    </form>
  );
}
