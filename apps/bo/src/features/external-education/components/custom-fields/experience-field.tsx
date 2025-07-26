import React from 'react';
import { Input, Button, Textarea } from '@learnway/ui';
import { IcoPlus, IcoMinus } from '@learnway/icons';

interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ExperienceFieldProps {
  label?: string;
  value?: ExperienceEntry[];
  onChange?: (value: ExperienceEntry[]) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  maxEntries?: number;
  showDuration?: boolean;
}

export const ExperienceField: React.FC<ExperienceFieldProps> = ({
  label = '경험 상세',
  value = [],
  onChange,
  error,
  disabled = false,
  required = false,
  description,
  maxEntries = 5,
  showDuration = true,
}) => {
  const addEntry = () => {
    if (value.length >= maxEntries) return;

    const newEntry: ExperienceEntry = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: '',
    };

    onChange?.([...value, newEntry]);
  };

  const removeEntry = (id: string) => {
    onChange?.(value.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id: string, field: keyof ExperienceEntry, fieldValue: string) => {
    onChange?.(value.map((entry) => (entry.id === id ? { ...entry, [field]: fieldValue } : entry)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className={`block text-sm font-medium ${required ? 'required' : ''}`}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <Button
          type="button"
          variant="text"
          size="sm"
          icon={<IcoPlus width={16} height={16} />}
          onClick={addEntry}
          disabled={disabled || value.length >= maxEntries}
        >
          추가
        </Button>
      </div>

      {description && <p className="text-sm text-gray-600">{description}</p>}

      {value.length === 0 && (
        <div className="rounded border border-dashed border-gray-300 py-4 text-center text-sm text-gray-500">
          경험을 추가해보세요
        </div>
      )}

      {value.map((entry, index) => (
        <div key={entry.id} className="space-y-3 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">경험 {index + 1}</h4>
            <Button
              type="button"
              variant="text"
              size="sm"
              icon={<IcoMinus width={16} height={16} />}
              onClick={() => removeEntry(entry.id)}
              disabled={disabled}
            >
              삭제
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="회사명"
              value={entry.company}
              onChange={(e) => updateEntry(entry.id, 'company', e.target.value)}
              disabled={disabled}
            />
            <Input
              placeholder="직책/역할"
              value={entry.position}
              onChange={(e) => updateEntry(entry.id, 'position', e.target.value)}
              disabled={disabled}
            />
          </div>

          {showDuration && (
            <Input
              placeholder="기간 (예: 2020.01 - 2022.12)"
              value={entry.duration}
              onChange={(e) => updateEntry(entry.id, 'duration', e.target.value)}
              disabled={disabled}
            />
          )}

          <Textarea
            placeholder="상세 설명"
            value={entry.description}
            onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
            disabled={disabled}
            rows={3}
          />
        </div>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
