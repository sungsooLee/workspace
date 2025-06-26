import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  ChipList,
  RadioGroupFormField,
  CheckboxGroupFormField,
  Input,
  DatePicker,
} from '@learnway/ui';

import { IcoPlus, IcoFormRequired } from '@learnway/icons';

/* style */
import styles from './main-basic-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const MainBasicInfoCopmonent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start)}>
      <ContentsRow type={'horizontal'}>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-1" className={formStyles.form_label}>
            <span className={formStyles.form_text}>테넌트</span>
            {/* 필수 케이스 */}
            <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <span className={formStyles.info_area}>
              <Button
                size={'sm'}
                label={'추가'}
                icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
              />
            </span>
          </div>
          <ChipList options={['김현대(1234567)']} wordwrap={true} />
        </div>
      </ContentsRow>

      <ContentsRow>
        {/* form_item */}
        <div className={cn(formStyles.form_item, formStyles.direction_col)}>
          <label htmlFor="name-2" className={formStyles.form_label}>
            <span className={formStyles.form_text}>디바이스</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <CheckboxGroupFormField
              options={[
                { value: 'y', label: 'PC' },
                { value: 'n', label: 'Mobile' },
              ]}
              defaultValue={'y'}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-3" className={formStyles.form_label}>
            <span className={formStyles.form_text}>노출 위치</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'y', label: '로그인 화면' },
                { value: 'n', label: 'Main 화면' },
              ]}
              defaultValue={'y'}
            />
          </div>
        </div>
      </ContentsRow>

      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>제목</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-4"
              type="text"
              placeholder="입력"
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
      </ContentsRow>

      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>내용</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
        </div>
      </ContentsRow>

      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>팝업창 사이즈</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input type="number" placeholder="입력" prefixText="가로" suffixText="px" />
            <Input type="number" placeholder="입력" prefixText="세로" suffixText="px" />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>팝업창 위치</span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              type="number"
              label="Unit Text"
              placeholder="입력"
              prefixText="상단으로부터"
              suffixText="px"
              className={formStyles.input}
            />
            <Input
              type="number"
              label="Unit Text"
              placeholder="입력"
              prefixText="좌측으로부터"
              suffixText="px"
              className={formStyles.input}
            />
          </div>
        </div>
      </ContentsRow>

      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>노출 중요도</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'a', label: '높음' },
                { value: 'b', label: '중간' },
                { value: 'c', label: '낮음' },
              ]}
              defaultValue={'a'}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>노출 기간</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <DatePicker displayType={'day-time'} size={'md'} placeholder={'0000-00-00'} />
            <span className={formStyles.hyphen}>-</span>
            <DatePicker displayType={'day-time'} size={'md'} placeholder={'0000-00-00'} />
          </div>
        </div>
      </ContentsRow>

      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>사용 여부</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'a', label: '사용' },
                { value: 'b', label: '미사용' },
              ]}
              defaultValue={'a'}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-4" className={formStyles.form_label}>
            <span className={formStyles.form_text}>다시 안보기</span>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'a', label: '설정안함' },
                { value: 'b', label: '오늘 하루 안보기' },
                { value: 'c', label: '3일동안 안보기' },
                { value: 'd', label: '7일동안 안보기' },
              ]}
              defaultValue={'a'}
            />
          </div>
        </div>
      </ContentsRow>
    </div>
  );
};

MainBasicInfoCopmonent.displayName = 'MainBasicInfo';
export const MainBasicInfo = MainBasicInfoCopmonent;
