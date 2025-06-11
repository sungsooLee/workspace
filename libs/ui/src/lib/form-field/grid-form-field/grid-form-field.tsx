import React, { forwardRef, useState } from 'react';
import styles from './grid-form-field.module.css';
import { cn, getRandomId } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';
import { GridBox, GridBoxProps } from '@learnway/ui';

interface GridFormFieldComponentProps extends BaseFormFieldProps<any[]> {
  /** grid box Props */
  gridProps?: GridBoxProps;
}

const GridFormFieldComponent = forwardRef<HTMLInputElement, GridFormFieldComponentProps>(
  ({ value, onChange, gridProps = {} }, ref) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const { columns, rowId = 'id' } = gridProps;

    const handleAddClick = () => {
      const newValue = [...value, { [rowId]: getRandomId() }];
      onChange?.(newValue);
    };

    const handleRemoveClick = () => {
      const newValue = value.filter((d) => {
        const isSelected = selectedRows?.find((x: any) => x[rowId] === d[rowId]);
        return !isSelected;
      });
      onChange?.(newValue);
    };

    return (
      <div className={cn(styles.start)} role="button">
        <GridBox
          {...gridProps}
          onAddClick={handleAddClick}
          onRemoveClick={handleRemoveClick}
          disabledSelectionToggle
          data={value}
          columns={columns}
          onRowsSelect={(rows: any) => {
            console.log(rows);
            setSelectedRows(rows);
          }}
          onChange={(newData: any) => onChange(newData)}
        />
      </div>
    );
  },
);

export const GridFormField = GridFormFieldComponent;
