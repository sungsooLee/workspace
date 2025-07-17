import { IcoStar } from '@learnway/icons';
import { CellContext } from '@tanstack/react-table';
import { CheckboxComponentProps } from '../../checkbox/checkbox';

interface EditFavoriteProps<T> {
  info: CellContext<T, boolean>;
  onClick: (value: boolean) => void;
  checkbox?: CheckboxComponentProps;
}

const EditFavorite = <T,>({ info, onClick, checkbox: checkboxProps }: EditFavoriteProps<T>) => {
  const { table, row, cell, getValue } = info;

  const handleClick = (newValue: boolean) => {
    const newVal = !getValue();
    table.options.meta?.updateData(row.index, cell.column.id, newVal);
    onClick?.(newVal);
  };

  return getValue() ? (
    <IcoStar
      width={16}
      height={16}
      stroke="#FFB902"
      fill="#FFB902"
      onClick={() => handleClick(false)}
    />
  ) : (
    <IcoStar
      width={16}
      height={16}
      stroke="#A9AFB8"
      fill="none"
      onClick={() => handleClick(true)}
    />
  );
};

export { EditFavorite };
