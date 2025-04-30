// const

import { Button, TreeBox } from '@learnway/ui';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';
import { roleTreeMockData } from '../../../../entities/mock/role';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../shared/ui';
import { DynamicFormConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../shared/ui/search-box';
import { IcoFormRequired } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

export const RoleGrant = ({ type }: any) => {
  const { provider: sProvider } = useSearchBox(searchConfig);
  const roles = () => roleTreeMockData;

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox data={roles()} initLevel={2} treeId={'1'} showSearchKeyword title={'역할 목록'} />
      <div className={cn(styles.start, styles.wrap)}>
        <FormSubTitle
          label={'역할 정보'}
          actionNode={<Button label={'저장'} variant={'save'} size={'sm'} />}
          underLine={true}
        />
        <div className={styles.contents_wrap}>
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'개별사용자 역할부여'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <SearchBox provider={sProvider} />
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

const formConfig: DynamicFormConfig = {
  builders: [
    // {
    //     name: ''
    // }
  ],
};

const searchConfig: any = {
  builders: [
    [
      {
        name: 'company',
        type: 'text',
        label: t('회사'),
        value: '',
      },
    ],
  ],
};
