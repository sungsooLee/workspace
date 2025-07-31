import { BaseFormFieldProps } from '@learnway/hooks';
import { cn, getRandomId } from '@learnway/shared';
import { forwardRef, useState } from 'react';
import { TableBox } from '../../grid/grid-box/table-box';
import { GridBoxProps } from '../../grid/types/grid-box';
import styles from './grid-form-field.module.css';

interface GridFormFieldComponentProps extends BaseFormFieldProps<any[]> {
  /** grid box Props */
  gridProps?: GridBoxProps;
  /** 최대로 추가 되는 경우  */
  maxRow?: number;
}

const GridFormFieldComponent = forwardRef<HTMLInputElement, GridFormFieldComponentProps>(
  ({ value, onChange, maxRow, gridProps = {} }, ref) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const { columns, rowId = 'id' } = gridProps;

    const handleAddClick = () => {
      console.log(maxRow, value);
      if (maxRow !== undefined && value.length >= maxRow) return;
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
        <TableBox
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
