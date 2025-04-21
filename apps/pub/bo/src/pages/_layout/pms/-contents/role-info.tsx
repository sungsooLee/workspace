import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button, ContentsRow, Input, Textarea, Switch } from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';
/* style */
import styles from './role-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const RoleInfoComponent: FC<{}> = ({}) => {
  // switch : 사용기한
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'역할 목록'}
        actionNode={
          <>
            <Button label={'초기화'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'삭제'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 ID'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-id" type="text" placeholder="입력" value="러닝웨이" disabled />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-code" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 코드'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-code" type="text" placeholder="입력" value="러닝웨이" disabled />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-roleName" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할명'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-id" type="text" placeholder="입력" value="역할명" maxLength={40} />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-roleExplain" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 설명'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                className={formStyles.input}
                maxLength={300}
                size={'sm'}
                resize={'none'}
                placeholder={'입력'}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow type={'horizontal'}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-roleUseable" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 사용 여부'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="name-use"
                className={dynamicFormStyles.btn_switch}
                label={checked[2] ? '활용 가능' : '활용 불가'}
                checked={checked[2]}
                onCheckedChange={handleCheckedChange(2)}
              />
            </div>
          </div>
        </ContentsRow>
      </div>
    </div>
  );
};

RoleInfoComponent.displayName = 'RoleInfo';
export const RoleInfo = RoleInfoComponent;
