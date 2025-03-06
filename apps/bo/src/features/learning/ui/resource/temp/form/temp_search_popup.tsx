import { Button, CardComponentProps, Input } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';
import formStyles from './form-style.module.css';
import { forwardRef } from 'react';
const TempSearchPopupComponent = forwardRef<any, any>(({ name }) => {
  return (
    <div className={formStyles.search_wrap}>
      <Input
        id="name-channel"
        type="text"
        placeholder="채널명을 선택하세요."
        value="채널명노출"
        borderNone
        className={formStyles.input}
      />
      <Button className={formStyles.btn_search}>
        <IcoSearch className={formStyles.icon_search} />
      </Button>
    </div>
  );
});

export const TempSearchPopup = TempSearchPopupComponent;
