import { useState, useEffect } from "react";
import { SelectComponentProps } from './select';
import { SelectOption } from './type';

export default function useSelect({ options, onChange }: SelectComponentProps) {
  const [selectedItem, setSelectedItem] = useState<SelectOption>()

  useEffect(() => {
    const defaultSelectedItem = selectedItem ? selectedItem : options[0]
    setSelectedItem(defaultSelectedItem)
  }, [])

  function setCurrentSelectedItem(value: string) {
    const item = options.find(option => option.value === value)
    setSelectedItem(item)

    if (onChange) {
      return onChange(item)
    }
  }

  return {
    selectedItem,
    setCurrentSelectedItem
  }
}
