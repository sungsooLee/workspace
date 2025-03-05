import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { GroupBase } from 'react-select';
import { DropdownOption } from './type';

// 옵션 타입 정의
interface OptionType {
  value: string;
  label: string;
}

const sampleOptions: OptionType[] = [
  { value: '서울', label: '서울특별시' },
  { value: '부산', label: '부산광역시' },
  { value: '대구', label: '대구광역시' },
  { value: '인천', label: '인천광역시' },
  { value: '광주', label: '광주광역시' },
  { value: '대전', label: '대전광역시' },
  { value: '울산', label: '울산광역시' },
  { value: '세종', label: '세종특별자치시' },
  { value: '경기', label: '경기도' },
  { value: '강원', label: '강원도' }
];

const AutoCompleteExample: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  // Promise 기반 옵션 로딩 함수
  const loadOptions = (inputValue: string): Promise<OptionType[]> => {
    return new Promise<OptionType[]>((resolve) => {
        console.log('API 호출 해야함'+ inputValue)
      setTimeout(() => {
        const filteredOptions = sampleOptions.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        resolve(filteredOptions);
      }, 500); // 0.5초 지연
    });
  };

  return (
    <div className="auto-complete-container">
      <h2>Auto Complete - 입력형</h2>
      <AsyncSelect<OptionType, false, GroupBase<OptionType>>
        cacheOptions
        defaultOptions
        value={selectedOption}
        onChange={(newValue) => setSelectedOption(newValue)}
        loadOptions={loadOptions}
        placeholder="검색어를 입력하세요"
        noOptionsMessage={() => "결과가 없습니다"}
        loadingMessage={() => "검색 중..."}
      />
    </div>
  );
};

export default AutoCompleteExample;