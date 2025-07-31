import { useState } from 'react';
import { DatePicker } from '@learnway/ui/date-picker';
import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
import { PhoneNumber } from '@learnway/ui/phone-number';
import { cn } from '@learnway/shared';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course/level.module.css';
// TODO: Fix unknown imports:  from '@learnway/ui'
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';

const PreLevelTestComponent = () => {
  const gender = [
    { label: '상관없음', value: 'value1' },
    { label: '남자', value: 'value2' },
    { label: '여자', value: 'value3' },
  ];
  const [date, setDate] = useState(new Date());
  const handleDate = (value: any) => {
    setDate(value);
  };

  const [optionCardValue, setOptionCardValue] = useState<string[]>();

  return (
    <div className={styles.input_area}>
      <div className={styles.tit_box}>
        <strong>사전 레벨테스트</strong>
      </div>
      <div className={styles.box}>
        {/* 영문성명 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="name1" className={formStyles.form_label}>
              <span className={formStyles.form_text}>영문성명</span>
            </label>
            <div className={cn(formStyles.input_box, styles.input_box)}>
              <div>
                <Input
                  id="name1"
                  type="text"
                  value="text"
                  placeholder="Frist name"
                  inputSize={'lg'}
                  error
                />
                {/* error message */}
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  영문 이름을 입력해주세요
                </p>
              </div>
              <div>
                <Input
                  id="name2"
                  type="text"
                  value="text"
                  placeholder="Family name"
                  inputSize={'lg'}
                />
                {/* error message */}
                {/* <p className={cn(formStyles.guide_text, formStyles.error)}>영문 성을 입력해주세요</p> */}
              </div>
            </div>
          </div>
        </ContentsRow>
        {/* 휴대폰 번호 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <div className={formStyles.form_label}>
              <span className={formStyles.form_text}>휴대폰 번호</span>
            </div>
            <div className={formStyles.input_box}>
              <PhoneNumber
                options={[
                  { value: 'type1', label: '010' },
                  { value: 'type2', label: '011' },
                ]}
                size="lg"
                placeholder="-없이 휴대폰 번호입력(01023459876)"
              />
            </div>
            {/* error message */}
            {/* <p className={cn(formStyles.guide_text, formStyles.error)}>휴대폰 번호를 입력해주세요</p> */}
          </div>
        </ContentsRow>
        {/* 강사 선호 성별 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <div className={formStyles.form_label}>
              <span className={formStyles.form_text}>강사 선호 성별</span>
            </div>
            <div className={formStyles.input_box}>
              <OptionCard
                value={optionCardValue}
                className={styles.option_card}
                cols={3}
                options={gender}
                onOptionSelect={(option: OptionCardItem) => setOptionCardValue(option.value)}
              />
            </div>
          </div>
        </ContentsRow>
        {/* 사전 레벨테스트 가능일 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <div className={formStyles.form_label}>
              <span className={formStyles.form_text}>사전 레벨테스트 가능일</span>
            </div>
            <div className={formStyles.input_box}>
              <DatePicker onChange={handleDate} value={date} size="lg" />
            </div>
          </div>
        </ContentsRow>
        {/* 퍼블수정 20250409 : 추가 s */}
        {/* 사전 레벨테스트 가능 시간(2개 선택) */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <div className={formStyles.form_label}>
              <span className={formStyles.form_text}>사전 레벨테스트 가능 시간(2개 선택)</span>
            </div>
            <div className={formStyles.input_box}>
              <div className={styles.input_date}>
                <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
                <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
              </div>
            </div>
          </div>
        </ContentsRow>
        {/* 희망 교육 시간(2개 선택) */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <div className={formStyles.form_label}>
              <span className={formStyles.form_text}>희망 교육 시간(2개 선택)</span>
            </div>
            <div className={formStyles.input_box}>
              <div className={styles.input_date}>
                <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
                <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
              </div>
            </div>
          </div>
        </ContentsRow>
      </div>
    </div>
  );
};

export const PreLevelTest = PreLevelTestComponent;
