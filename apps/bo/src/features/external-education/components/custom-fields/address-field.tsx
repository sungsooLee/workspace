import React from 'react';
import { Input, Button } from '@learnway/ui';

interface AddressFieldProps {
  label?: string;
  value?: {
    zipCode: string;
    address: string;
    detailAddress: string;
  };
  onChange?: (value: { zipCode: string; address: string; detailAddress: string }) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
}

export const AddressField: React.FC<AddressFieldProps> = ({
  label = '주소',
  value = { zipCode: '', address: '', detailAddress: '' },
  onChange,
  error,
  disabled = false,
  required = false,
  description,
}) => {
  const handleZipCodeSearch = () => {
    // 실제 구현에서는 다음 주소 API 등을 사용
    // 현재는 데모용으로 빈 함수
  };

  const handleChange = (field: keyof typeof value, newValue: string) => {
    if (!onChange) return;

    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <div className="space-y-3">
      <label className={`block text-sm font-medium ${required ? 'required' : ''}`}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {description && <p className="text-sm text-gray-600">{description}</p>}

      {/* 우편번호 */}
      <div className="flex gap-2">
        <Input
          placeholder="우편번호"
          value={value.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          disabled={disabled}
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={handleZipCodeSearch} disabled={disabled}>
          검색
        </Button>
      </div>

      {/* 기본 주소 */}
      <Input
        placeholder="기본 주소"
        value={value.address}
        onChange={(e) => handleChange('address', e.target.value)}
        disabled={disabled}
      />

      {/* 상세 주소 */}
      <Input
        placeholder="상세 주소"
        value={value.detailAddress}
        onChange={(e) => handleChange('detailAddress', e.target.value)}
        disabled={disabled}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
