import { forwardRef, useMemo, useState } from 'react';
import { t } from 'i18next';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Input } from '@learnway/ui';
import styles from './pass-option-form-field.module.css';

interface PassCriteriaData {
  progressMinPassScore?: number; // 항목별 이수 기준 (진도)
  attendanceMinPassScore?: number; // 항목별 이수 기준 (출석)
  examMinPassScore?: number; // 항목별 이수 기준 (평가)
  asgmtMinPassScore?: number; // 항목별 이수 기준 (과제)
  totalMinPassScore?: number; // 항목별 이수 기준 (총점)
  progressWeights?: number; // 반영 비율 (진도)
  attendanceWeights?: number; // 반영 비율 (출석)
  examWeights?: number; // 반영 비율 (시험)
  asgmtWeights?: number; // 반영 비율 (과제)
}

interface PassOptionFormFieldProps extends BaseFormFieldProps<PassCriteriaData> {
  tenantId: number;
}

const PassOptionFormFieldComponent = forwardRef<HTMLDivElement, PassOptionFormFieldProps>(
  ({ value, onChange, tenantId, ...props }, ref) => {
    const [criteria, setCriteria] = useState<PassCriteriaData>(value || {});

    // 이수기준 점수
    const totalScore = useMemo(() => {
      const progressScore =
        ((criteria.progressMinPassScore || 0) * (criteria.progressWeights || 0)) / 100;
      const attendanceScore =
        ((criteria.attendanceMinPassScore || 0) * (criteria.attendanceWeights || 0)) / 100;
      const examScore = ((criteria.examMinPassScore || 0) * (criteria.examWeights || 0)) / 100;
      const asgmtScore = ((criteria.asgmtMinPassScore || 0) * (criteria.asgmtWeights || 0)) / 100;
      return progressScore + attendanceScore + examScore + asgmtScore;
    }, [criteria]);

    const handleCriteriaChange = (field: keyof PassCriteriaData, newValue: string) => {
      const numericValue = newValue === '' ? undefined : Number(newValue);
      const newCriteria = {
        ...criteria,
        totalMinPassScore: totalScore,
        [field]: numericValue,
      };
      setCriteria(newCriteria);
      onChange?.(newCriteria);
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
              <th scope={'col'}>항목별 이수 기준</th>
              <th scope={'col'}>반영 비율</th>
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
                <p className={styles.info_text}>
                  항목별 반영비율 합이 <br />
                  <strong>{'00점'}</strong> 이상입니다.
                  <br />
                  점수 <strong>{totalScore}</strong>
                </p>
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
        </table>
      </div>
    );
  },
);

export const PassOptionFormField = PassOptionFormFieldComponent;
