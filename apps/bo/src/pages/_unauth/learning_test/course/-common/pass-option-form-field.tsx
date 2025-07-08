import { forwardRef, useMemo, useState } from 'react';
import { t } from 'i18next';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Input } from '@learnway/ui';

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
      <table className="min-w-full border border-gray-300 text-center" ref={ref as any}>
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">구분</th>
            <th className="border border-gray-300 px-4 py-2">항목별 이수 기준</th>
            <th className="border border-gray-300 px-4 py-2">반영 비율</th>
            <th className="border border-gray-300 px-4 py-2">이수기준 점수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">진도</td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="점 이상"
                  value={criteria.progressMinPassScore}
                  onChange={(e) => handleCriteriaChange('progressMinPassScore', e.target.value)}
                />
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="%"
                  value={criteria.progressWeights}
                  onChange={(e) => handleCriteriaChange('progressWeights', e.target.value)}
                />
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2" rowSpan={4}>
              <div className="flex h-full flex-col justify-center">
                <p>항목별 반영비율 합이</p>
                <p>○○점 이상입니다.</p>
                <p>점수 {totalScore}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">출석</td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="점 이상"
                  value={criteria.attendanceMinPassScore}
                  onChange={(e) => handleCriteriaChange('attendanceMinPassScore', e.target.value)}
                />
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="%"
                  value={criteria.attendanceWeights}
                  onChange={(e) => handleCriteriaChange('attendanceWeights', e.target.value)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">평가</td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="점 이상"
                  value={criteria.examMinPassScore}
                  onChange={(e) => handleCriteriaChange('examMinPassScore', e.target.value)}
                />
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="%"
                  value={criteria.examWeights}
                  onChange={(e) => handleCriteriaChange('examWeights', e.target.value)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">과제</td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="점 이상"
                  value={criteria.asgmtMinPassScore}
                  onChange={(e) => handleCriteriaChange('asgmtMinPassScore', e.target.value)}
                />
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Input
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                  suffixText="%"
                  value={criteria.asgmtWeights}
                  onChange={(e) => handleCriteriaChange('asgmtWeights', e.target.value)}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
);

export const PassOptionFormField = PassOptionFormFieldComponent;
