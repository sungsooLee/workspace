/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui';
import {
  ContentsRow,
  DatePicker,
  ImageOption,
  RadioGroupFormField,
  ThumbnailImageUpload,
  Tooltip,
  ChipList,
  SelectOption,
} from '@learnway/ui';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';

/* style */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

/* images */
import defaultImg from '../../../../assets/images/thumb/img_thumb_default.jpg';
// import defaultImg from '../../../assets/images/thumb/img_thumb_default.jpg';

const OpenSettingComponent: FC<{}> = ({}) => {
  // chip List
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
  ];
  return (
    <>
      <FormSubTitle label={'게시 '} lineType={'dark'} />
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name01" className={formStyles.form_label}>
            <span className={formStyles.form_text}>과정 사용유무</span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용입니다.'}
            >
              <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <RadioGroupFormField
              options={[
                { value: 'option01', label: '미사용' },
                { value: 'option02', label: '사용' },
              ]}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name02" className={formStyles.form_label}>
            <span className={formStyles.form_text}>노출 기간</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용입니다.'}
            >
              <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <DatePicker
              displayType={'day-time'}
              size={'md'}
              className={formStyles.datepicker_item}
            />
            <span className={formStyles.dash}></span>
            <DatePicker
              displayType={'day-time'}
              size={'md'}
              className={formStyles.datepicker_item}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name03" className={formStyles.form_label}>
            <span className={formStyles.form_text}>대표 이미지</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용입니다.'}
            >
              <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <ThumbnailImageUpload
              options={[
                /* 동영상 추출 전 */
                // { id: '1', path: defaultImg },
                /* 동영상 추출 후 */
                { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
                { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
                { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
                { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
                { id: '5', path: 'https://lodash.com/assets/img/lodash.svg' },
                { id: '6', path: defaultImg } /* default 추천 썸네일 */,
              ]}
              disabled={true}
              onChange={(options: ImageOption[]) => console.log('onChange', options)}
              onCheckedChange={(options: ImageOption[]) => console.log('onCheckedChange', options)}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name04" className={formStyles.form_label}>
            <span className={formStyles.form_text}>태그</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁 내용입니다.'}
            >
              <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <ChipList
              className={formStyles.chips_wrap}
              options={options}
              prefixCharacter="#"
              wordwrap={true}
              hideBorder={false}
            />
          </div>
          <p className={formStyles.guide_text}>
            {
              '과정소개에 노출할 태그를 20개까지 선택할 수 있습니다. 선택한 태그가 없는 경우 해당 영역이 비노출됩니다.'
            }
          </p>
        </div>
      </ContentsRow>
    </>
  );
};

OpenSettingComponent.displayName = 'OpenSetting';
export const OpenSetting = OpenSettingComponent;
