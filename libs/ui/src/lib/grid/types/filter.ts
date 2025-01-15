export interface FilterValue {
  column: string;
  type: 'text' | 'range' | 'select';
  value: string | [number, number] | string[];
}

export interface FilterState {
  [key: string]: FilterValue;
}
