import React from 'react';

interface SkillRating {
  skill: string;
  rating: number;
}

interface SkillCategory {
  category: string;
  skills: SkillRating[];
}

interface SkillRatingFieldProps {
  label?: string;
  value?: SkillCategory[];
  onChange?: (value: SkillCategory[]) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  ratingScale?: number;
  categories?: string[];
}

export const SkillRatingField: React.FC<SkillRatingFieldProps> = ({
  label = '기술 수준 평가',
  value = [],
  onChange,
  error,
  disabled = false,
  required = false,
  description,
  ratingScale = 5,
  categories = ['프론트엔드', '백엔드', '데이터베이스'] }) => {
  const updateRating = (categoryIndex: number, skillIndex: number, rating: number) => {
    if (!onChange) return;

    const newValue = [...value];
    if (!newValue[categoryIndex]) {
      newValue[categoryIndex] = {
        category: categories[categoryIndex],
        skills: [] };
    }

    if (!newValue[categoryIndex].skills[skillIndex]) {
      newValue[categoryIndex].skills[skillIndex] = {
        skill: `스킬 ${skillIndex + 1}`,
        rating: 0 };
    }

    newValue[categoryIndex].skills[skillIndex].rating = rating;
    onChange(newValue);
  };

  const renderStars = (rating: number, categoryIndex: number, skillIndex: number) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: ratingScale }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`h-6 w-6 ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:text-yellow-300'}`}
            onClick={() => !disabled && updateRating(categoryIndex, skillIndex, index + 1)}
            disabled={disabled}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <label className={`block text-sm font-medium ${required ? 'required' : ''}`}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {description && <p className="text-sm text-gray-600">{description}</p>}

      <div className="space-y-6">
        {categories.map((category, categoryIndex) => {
          const categoryData = value.find((v) => v.category === category);

          return (
            <div key={category} className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-3 text-sm font-medium">{category}</h4>

              <div className="space-y-3">
                {/* 기본 스킬들 - 실제로는 카테고리별로 다른 스킬 목록을 가져와야 함 */}
                {['React', 'TypeScript', 'Node.js'].map((skill, skillIndex) => {
                  const skillData = categoryData?.skills.find((s) => s.skill === skill);
                  const rating = skillData?.rating || 0;

                  return (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      {renderStars(rating, categoryIndex, skillIndex)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-500">
        ★ 1: 기초 수준 | ★★ 2: 초급 | ★★★ 3: 중급 | ★★★★ 4: 고급 | ★★★★★ 5: 전문가
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
