import { FC } from 'react';
import { cn } from '@learnway/shared';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { FormSubTitle } from '@shared/ui/form';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import { Button, ContentsRow, DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
/* style */
import styles from './banner-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import fileUploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드

import { IcoFormRequired, IcoPpt, IcoTrash03 } from '@learnway/icons';

const TenantDetailBannerViewComponent: FC<{}> = ({}) => {
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'배너 정보'}
        actionNode={
          <>
            <Button label={'초기화'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'삭제'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'미리보기'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-banner" className={formStyles.form_label}>
              <span className={formStyles.form_text}>배너 이미지(PC)</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <div className={fileUploadStyles.start}>
                <div className={fileUploadStyles.upload_single}>
                  <div className={fileUploadStyles.view_file}>
                    <div className={fileUploadStyles.attach_area}>
                      <p className={fileUploadStyles.text}>버튼을 클릭하여 파일을 추가하세요.</p>
                    </div>
                  </div>
                  <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                    <input type="file" className={fileUploadStyles.input_file} />
                    {'파일첨부'}
                  </Button>
                </div>
                {/* 첨부된 파일 영역 */}
                <div className={fileUploadStyles.attached_wrap}>
                  <div className={fileUploadStyles.upload_single}>
                    <div className={fileUploadStyles.view_file}>
                      <div className={fileUploadStyles.attach_area}>
                        <p className={fileUploadStyles.attach_view}>
                          <IcoPpt
                            width={'20'}
                            height={'21'}
                            className={fileUploadStyles.icon_type}
                          />
                          <span className={fileUploadStyles.attached_name}>
                            {
                              '파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명.png'
                            }
                          </span>
                        </p>
                        <Button className={fileUploadStyles.btn_clear} onlyIcon>
                          <IcoTrash03 width={20} height={20} stroke="#131C30" />
                        </Button>
                      </div>
                    </div>
                    <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={fileUploadStyles.input_file} />
                      {'파일첨부'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentsRow>
      </div>
    </div>
  );
};

export const TenantDetailBannerView = TenantDetailBannerViewComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'bannerImage',
      type: 'custom',
      label: '이미지',
      value: [],
      placeholder: '',
    },
  ],
};
