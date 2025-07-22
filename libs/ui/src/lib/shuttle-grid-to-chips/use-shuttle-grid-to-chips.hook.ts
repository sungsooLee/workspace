import { useState } from 'react';
import { SelectedChip } from '../type';

const useShuttleGridToChips = (initValue: SelectedChip[] = []) => {
  const [selectedItems, setSelectedItems] = useState<SelectedChip[]>(initValue);

  const handleSelectItem = (value: SelectedChip) => {
    // setSelectedItems([...initValue, ...value]);
    setSelectedItems((prev) =>
      prev.some(({ key }) => key === value.key)
        ? prev.filter(({ key }) => key !== value.key)
        : [value, ...prev],
    );
  };

  const cancelSelectItem = (deleteKey: string) => {
    setSelectedItems((prev) => prev.filter(({ key: previousKey }) => previousKey !== deleteKey));
  };

  const cancelAll = () => {
    setSelectedItems([]);
  };

  return {
    selectedItems,
    handleSelectItem,
    cancelSelectItem,
    cancelAll,
  };
};

export { useShuttleGridToChips };
