import { useState } from 'react';
import { TreeData } from '../tree-view/type';

const useShuttleTreeToChips = (initValue: TreeData[] = []) => {
  const [selectedItems, setSelectedItems] = useState<TreeData[]>(initValue);

  // 단일 선택
  const handleSelectItem = (value: TreeData) => {
    // if (value.isCombined) {
    //   setSelectedItems((prev) =>
    //     prev.some(({ key }) => key === value.key) ? prev : [value, ...prev],
    //   );
    // } else {
    setSelectedItems((prev) =>
      prev.some(({ key }) => key === value.key)
        ? prev.filter(({ key }) => key !== value.key)
        : [value, ...prev],
    );
    // }
  };

  // 하위 노드 전체 선택
  // const handleSelectItemWithChildren = (value: TreeData) => {
  //   let nodesToAdd = [value];
  //   if (value.children && value.children.length > 0) {
  //     nodesToAdd = flattenNodeWithChildren(value);
  //   }

  //   // const selectableNodes = nodesToAdd.filter((node) => node.apiNodeType === 'API');

  //   const filteredNodesToAdd = nodesToAdd.filter(
  //     (n) => !selectedItems.some((item) => item.key === n.key),
  //   );

  //   setSelectedItems([...selectedItems, ...filteredNodesToAdd]);
  // };

  const cancelSelectItem = (value: TreeData) => {
    setSelectedItems((prev) => prev.filter((v) => v !== value));
  };

  const cancelAll = () => {
    setSelectedItems([]);
  };

  return {
    selectedItems,
    handleSelectItem,
    // handleSelectItemWithChildren,
    cancelSelectItem,
    cancelAll,
  };
};

export { useShuttleTreeToChips };
