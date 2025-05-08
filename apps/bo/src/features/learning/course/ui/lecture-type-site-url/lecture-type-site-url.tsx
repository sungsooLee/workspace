import { forwardRef, useEffect, useState } from 'react';
import { Button, Input, RadioGroup } from '@learnway/ui';
import { isEqual } from 'lodash';
import { cn } from '@learnway/shared';
import styles from './lecture-type-site-url.module.css';

const LectureTypeSiteUrlComponent = forwardRef<HTMLDivElement, any>(
  ({ name, value, onChange }, ref) => {
    // LectureTypeSiteUrl 컴포넌트에서 임시로 사용할 form data object (backend response 에 따라 변경 예정)
    const [data, setData] = useState({
      ...value,
      officeType: '사내', // 사내, 사외
      outOfficeType: '', // 별도 앱, 사외 사이트
      siteUrl: '',
    });

    useEffect(() => {
      if (!isEqual(data, value)) {
        onChange(data);
      }
    }, [data]);

    return (
      <div ref={ref} className={cn(styles.root, styles.lecture_wrap)}>
        {/* 버튼 - 강의 타입 */}
        <Button>이러닝</Button>
        {/* 라디오 버튼 - 사내, 사외 */}
        <RadioGroup
          className={styles.radio_box}
          value={data.officeType}
          options={[
            { label: '사내', value: '사내' },
            { label: '사외', value: '사외' },
          ]}
          onValueChange={(selectedValue) => setData({ ...data, officeType: selectedValue })}
        />
        <div className={styles.option_contents}>
          {'('}
          {/* 라디오 버튼 - 별도 앱, 사외 사이트 */}
          <RadioGroup
            className={styles.radio_box}
            value={data.outOfficeType}
            options={[
              { label: '별도 앱', value: '별도 앱' },
              { label: '사외 사이트', value: '사외 사이트' },
            ]}
            disabled={data.officeType !== '사외'}
            onValueChange={(selectedValue) => setData({ ...data, outOfficeType: selectedValue })}
          />
          {/* 인풋 - 사외 사이트 */}
          <div className={styles.input_wrap}>
            <Input
              className={styles.input_area}
              value={data.siteUrl}
              disabled={data.outOfficeType !== '사외 사이트'}
              placeholder="URL 입력"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, siteUrl: event.target.value })
              }
            />
            {/* 라벨 -사회 사이트 설명 */}
            <p className={styles.text}>http://붙여서 입력하세요.</p>
          </div>
          {')'}
        </div>
      </div>
    );
  },
);

export const LectureTypeSiteUrl = LectureTypeSiteUrlComponent;
