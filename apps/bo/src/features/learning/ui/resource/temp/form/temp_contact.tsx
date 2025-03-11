import { Input, Select } from '@learnway/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { forwardRef } from 'react';

const TempContactComponent = forwardRef<any, any>(({ name }) => {
  return (
    <>
      <Select
        className={formStyles.short}
        options={[
          { value: 'type1', label: '+82' },
          { value: 'type2', label: '+83' },
        ]}
      />
      {/* <span className={formStyles.dash}></span> 25-02-20 : 삭제 */}
      <Input id="name-managerNum" type="text" placeholder="- 제외한 숫자만 입력" />
    </>
  );
});

export const TempContact = TempContactComponent;
