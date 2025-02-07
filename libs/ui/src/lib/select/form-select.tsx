import React from 'react';
import { Select } from './select';

const FormSelectComponent: FC<any> = ({}) => {
  return (
    <Select
      value={'01'}
      onChange={() => {}}
      options={[
        {
          value: '',
          label: '전체',
        },
        {
          value: '01',
          label: '사내',
        },
        {
          value: '02',
          label: '사외',
        },
      ]}
    />
  );
};

export const FormSelect = FormSelectComponent;
