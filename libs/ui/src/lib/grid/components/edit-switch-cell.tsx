import React, { useEffect, useMemo, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Switch, SwitchComponentProps } from '@learnway/ui';

interface EditSwitchCellProps<T> {
  info: CellContext<T, boolean>;
  switch?: SwitchComponentProps;
  /**
   * 값에 따라 label 변경 하는 경우 설정
   */
  switchConfig?: {
    /**
     * 함수에 또는 문자로 설정
     * @param value
     * @returns
     */
    label?: (value: boolean) => string | string;
  };
}

const EditSwitchCell = <T,>({
  info,
  switch: switchProps,
  switchConfig,
}: EditSwitchCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());

  const handleChange = (value: boolean) => {
    setValue(value);
    table.options.meta?.updateData(row.index, cell.column.id, value);
  };

  const fieldLabel = useMemo<string>(() => {
    if (!switchConfig?.label) return '';
    return switchConfig
      ? typeof switchConfig.label === 'string'
        ? switchConfig.label
        : switchConfig.label(value)
      : '';
  }, [value]);

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <Switch {...switchProps} label={fieldLabel} checked={value} onCheckedChange={handleChange} />
  );
};

export { EditSwitchCell };
