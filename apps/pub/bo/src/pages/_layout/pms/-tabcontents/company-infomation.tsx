import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from './company-infomation.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import {
  Button,
  ContentsRow,
  Textarea,
  CheckboxGroupFormField,
  Switch,
  Tooltip,
  Input,
  RadioGroupFormField,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
// eslint-disable-next-line no-empty-pattern
const CompanyInfomationComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={dynamicFormStyles.title_wrap}>
        <strong className={dynamicFormStyles.title}>{'회사 기본 정보'}</strong>
      </div>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-menu" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'회사(법인) 유형구분'}</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.radio_wrap}>
              <RadioGroupFormField
                options={[
                  { value: 'a', label: '완성차' },
                  { value: 'b', label: '그룹사' },
                  { value: 'c', label: '현대 해외법인' },
                  { value: 'd', label: '현대 해외딜러' },
                  { value: 'e', label: '현대 판매대리점' },
                  { value: 'f', label: '현대 서비스 협력사' },
                  { value: 'g', label: '현대 생산 협력사' },
                  { value: 'h', label: '기아 해외법인' },
                  { value: 'i', label: '기아 해외딜러' },
                  { value: 'j', label: '기아 판매대리점' },
                  { value: 'k', label: '기아 서비스 협력사 ' },
                  { value: 'l', label: '기아 생산 협력사' },
                  { value: 'm', label: '기타' },
                ]}
              />
            </div>
          </div>
        </div>
      </ContentsRow>
    </div>
  );
};

CompanyInfomationComponent.displayName = 'CompanyInfomation';
export const CompanyInfomation = CompanyInfomationComponent;
