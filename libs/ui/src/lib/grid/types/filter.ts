export type FilterType = 'text' | 'range' | 'select';

export interface FilterValue {
  column: string;
  type: FilterType;
  value: string | [number, number] | string[];
}

export interface FilterState {
  [key: string]: FilterValue;
}
