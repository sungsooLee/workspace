import { PassCriteriaData } from '@entities/course';
import { BaseFormFieldProps } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import { Input } from '@learnway/ui/input';
import { NoticeBox } from '@shared/ui';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import styles from './pass-option-form-field.module.css';

interface PassOptionFormFieldProps extends BaseFormFieldProps<PassCriteriaData> {
  dummy?: boolean;
}

const PassOptionFormFieldComponent = forwardRef<HTMLDivElement, PassOptionFormFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const [criteria, setCriteria] = useState<PassCriteriaData>(value || {});

    // value prop이 변경될 때마다 criteria 상태 동기화
    useEffect(() => {
      setCriteria(value || {});
    }, [value]);

    // 항목별 이수 기준 점수 계산 후 리턴 (총점, 반영 비율, 이수 기준 점수)
    const calcPassCriteriaData = useCallback((d: PassCriteriaData) => {
      const scoreSum =
        (d.progressMinPassScore || 0) +
        (d.attendanceMinPassScore || 0) +
        (d.examMinPassScore || 0) +
        (d.asgmtMinPassScore || 0);
      const weightSum =
        (d.progressWeights || 0) +
        (d.attendanceWeights || 0) +
        (d.examWeights || 0) +
        (d.asgmtWeights || 0);
      const totalMinPassScore = scoreSum * (weightSum / 100);
      return {
        ...d,
        scoreSum,
        weightSum,
        totalMinPassScore,
      };
    }, []);

    const handleCriteriaChange = (field: keyof PassCriteriaData, newValue: string) => {
      const numericValue = newValue === '' ? undefined : Number(newValue);
      const newCriteria = {
        ...criteria,
        [field]: numericValue,
      };
      const updatedCriteria = calcPassCriteriaData(newCriteria);
      setCriteria(updatedCriteria);
      onChange?.(updatedCriteria);
    };

    return (
      <div className={styles.start}>
        <table ref={ref as any}>
          <caption>{'입력 테이블'}</caption>
          <colgroup>
            <col width={'10%'} />
            <col />
            <col />
            <col width={'20%'} />
          </colgroup>
          <thead>
            <tr>
              <th scope={'col'}>구분</th>
              <th scope={'col'}>항목별 이수 기준점수</th>
              <th scope={'col'}>가중치 반영비율</th>
              <th scope={'col'}>이수기준 점수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>진도</td>
              <td>
                <Input
                  suffixText="점 이상"
                  value={criteria.progressMinPassScore}
                  onChange={(e) => handleCriteriaChange('progressMinPassScore', e.target.value)}
                />
              </td>
              <td>
                <Input
                  suffixText="%"
                  value={criteria.progressWeights}
                  onChange={(e) => handleCriteriaChange('progressWeights', e.target.value)}
                />
              </td>
              <td rowSpan={4}>
                <NoticeBox
                  iconVisible={false}
                  type={'bullet'}
                  descriptions={[
                    '이수 기준에 해당하는 항목만 압력 해주세요. ',
                    '항목별 이수 기준 점수와 반영 비율을 입력 해주세요. ',
                    '반영비율의 총합은 항상 100%가 되어야 합니다. ',
                  ]}
                />
                {/* <p className={styles.info_text}>
                  항목별 반영비율 합이 <br />
                  <strong>{'00점'}</strong> 이상입니다.
                  <br />
                  점수 <strong>{criteria.totalMinPassScore}</strong>
                </p> */}
              </td>
            </tr>
            <tr>
              <td>출석</td>
              <td>
                <Input
                  suffixText="점 이상"
                  value={criteria.attendanceMinPassScore}
                  onChange={(e) => handleCriteriaChange('attendanceMinPassScore', e.target.value)}
                />
              </td>
              <td>
                <Input
                  suffixText="%"
                  value={criteria.attendanceWeights}
                  onChange={(e) => handleCriteriaChange('attendanceWeights', e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>평가</td>
              <td>
                <Input
                  suffixText="점 이상"
                  value={criteria.examMinPassScore}
                  onChange={(e) => handleCriteriaChange('examMinPassScore', e.target.value)}
                />
              </td>
              <td>
                <Input
                  suffixText="%"
                  value={criteria.examWeights}
                  onChange={(e) => handleCriteriaChange('examWeights', e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>과제</td>
              <td>
                <Input
                  suffixText="점 이상"
                  value={criteria.asgmtMinPassScore}
                  onChange={(e) => handleCriteriaChange('asgmtMinPassScore', e.target.value)}
                />
              </td>
              <td>
                <Input
                  suffixText="%"
                  value={criteria.asgmtWeights}
                  onChange={(e) => handleCriteriaChange('asgmtWeights', e.target.value)}
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope={'row'}>총점</th>
              <td>
                <span className={styles.info}>
                  {criteria.scoreSum ?? '-'}
                  <em className={styles.unit}>{criteria.scoreSum ? '점' : ''}</em>
                </span>
              </td>
              <td>
                {/* <span className={cn(styles.info, styles.point)}> */}
                <span className={cn(styles.info)}>
                  {criteria.weightSum ?? '-'}
                  <em className={styles.unit}>{criteria.weightSum ? '%' : ''}</em>
                </span>
              </td>
              <td>
                <span className={styles.info}>
                  {criteria.totalMinPassScore ?? '-'}
                  <em className={styles.unit}>{criteria.totalMinPassScore ? '점' : ''}</em>
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  },
);

export const PassOptionFormField = PassOptionFormFieldComponent;
