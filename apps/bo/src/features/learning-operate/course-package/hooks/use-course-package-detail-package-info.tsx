import { useFetchCoursePackageTree } from '@entities/course-package';
import { findNodeByMenuId } from '@features/platform-management/platform/category-managemnet';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { findNodePath, TreeEventPayload, TreeNode } from '@learnway/ui/tree-view';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TriggerKey, useCoursePackageLastTriggered } from '../store/use-course-package-store';

export enum PACKAGE_ITEM_TYPE {
  COURSE = 'COURSE',
  SUB_PKG = 'SUB_PKG',
}

export enum PACKAGE_FORM_MODE {
  NONE = 'NONE',
  VIEW = 'VIEW',
  ADD = 'ADD',
}

export function useCoursePackageDetailPackageInfo() {
  const { provider, getValues, updateFormData, formValues, onSubmit, onFormChange } =
    useDynamicForm2();
  const lastTriggered = useCoursePackageLastTriggered();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSaveComplete, alert, saveConfirm, confirm } = useModal();
  const [treeData, setTreeData] = useState<any>();
  const { data, isLoading } = useFetchCoursePackageTree(1);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [clickedNode, setClickedNode] = useState<TreeNode | null>(null);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<PACKAGE_FORM_MODE>(PACKAGE_FORM_MODE.NONE);
  const [itemType, setItemType] = useState<PACKAGE_ITEM_TYPE>();

  const transformApiDataToTreeData = (apiData: any) => {
    console.log('## apiData', apiData);

    // 단일 노드인 경우 배열로 감싸기
    const dataArray = Array.isArray(apiData) ? apiData : [apiData];
    console.log('## dataArray', dataArray);
    // 재귀적으로 데이터 구조 변환
    const transform = (nodes: any) => {
      if (!nodes) return [];

      return nodes.map((node: any) => {
        // 새로운 노드 객체 생성
        const transformedNode = {
          ...node,
          // 필수 트리 속성
          key: node.id?.toString(),
          title: node.name || node.categoryName,
          children: node.children || [],
          isUsed: true, // TODO
          menuId: node.id?.toString(),
          // 추가 속성
          code: node.id,
          sortOrder: node.sortSeq,
        };

        // 자식 노드가 있는 경우 재귀적으로 변환
        if (node.children && node.children.length > 0) {
          node.children = node.children.map((n: any) => ({
            ...n,
            parentKey: node.id?.toString(),
            parentMenuName: node.name,
          }));
          transformedNode.children = transform(node.children);
        }

        return transformedNode;
      });
    };

    return transform(dataArray);
  };

  const renderNodeButtons = (node: TreeNode, level: number) => {
    if (level === 0) {
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddSubPkgNode(node);
              }}
              variant={
                clickedNode?.id === node.id && itemType === PACKAGE_ITEM_TYPE.SUB_PKG
                  ? 'primary'
                  : 'gray2'
              }
              size={'xs'}
              type={'button'}
              disabled={level !== 0}
              label={t('서브 패키지 추가')}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddCourseNode(node, level);
              }}
              variant={
                clickedNode?.id === node.id && itemType === PACKAGE_ITEM_TYPE.COURSE
                  ? 'primary'
                  : 'gray2'
              }
              size={'xs'}
              type={'button'}
              disabled={level !== 0}
              label={t('과정 추가')}
            />
          </div>
        </div>
      );
    } else if (node.itemType === PACKAGE_ITEM_TYPE.SUB_PKG) {
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddCourseNode(node, level);
              }}
              variant={clickedNode?.id === node.id ? 'primary' : 'gray2'}
              size={'xs'}
              type={'button'}
              label={t('과정 추가')}
            />
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (data) {
      console.log('트리 데이터 :', data);
      // const transformedData = transformApiDataToTreeData(data);
      const transformData = transformApiDataToTreeData(data);
      console.log('transformedData=>', transformData);
      setTreeData(transformData);

      // 초기 로딩 시 첫 번째 레벨 확장
      if (transformData && transformData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }

      // 새로 추가된 메뉴가 있는 경우 - lastCreatedMenuId로 체크
      if (lastCreatedMenuId) {
        // 새로 생성된 메뉴 노드 찾기
        const newNode = findNodeByMenuId(transformData, lastCreatedMenuId.toString());
        if (newNode) {
          // 노드 경로 찾기 (부모 노드들의 키)
          const nodePath = findNodePath(transformData, lastCreatedMenuId);
          if (nodePath) {
            // 부모 노드들을 펼치기 위해 expandedKeys 업데이트
            // 마지막 노드(새로 생성된 노드)는 제외하지 않고 모두 포함
            setExpandedKeys((prev) => {
              // 기존 확장된 키들과 새 경로를 합쳐서 중복 제거
              const combined = [...new Set([...prev, ...nodePath])];
              return combined;
            });
            // 새 노드 선택
            setSelectedNode(newNode);
            // setFormMode(FORM_MODE.VIEW);
            // 처리 완료 후 ID 초기화
            setLastCreatedMenuId(null);
          }
        }
      }
    }
  }, [data]);

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  // 노드 선택
  const handleSelectedNodeChange = (node: TreeNode | null) => {
    console.log('## node=>', node);
    setSelectedNode(node);
    setClickedNode(null);
    if (node) {
      setFormMode(PACKAGE_FORM_MODE.VIEW);
      if (node.itemType === PACKAGE_ITEM_TYPE.COURSE) setItemType(PACKAGE_ITEM_TYPE.COURSE);
      else if (node.itemType === PACKAGE_ITEM_TYPE.SUB_PKG) setItemType(PACKAGE_ITEM_TYPE.SUB_PKG);
    } else {
      setFormMode(PACKAGE_FORM_MODE.NONE);
    }
  };

  const calculateSortSeq = (nodeInfo: any) => {
    if (nodeInfo.position === 'INSIDE') {
      // 타겟 노드의 자식으로 이동 - 항상 첫 번째 자식이 되도록
      return 1;
    }

    const sourceNode = nodeInfo.sourceNode;
    const targetNode = nodeInfo.targetNode;

    if (!targetNode || !targetNode.sortSeq) {
      // targetNode의 sortSeq가 없으면 targetIndex 기반으로 계산
      return nodeInfo.position === 'BEFORE' ? nodeInfo.targetIndex + 1 : nodeInfo.targetIndex + 2;
    }

    // 같은 부모 내에서 이동하는 경우, 소스와 타겟의 sortSeq 관계를 고려
    const sourceSortSeq = sourceNode.sortSeq || 0;
    const targetSortSeq = targetNode.sortSeq;
    const sameParent = sourceNode.parentKey === targetNode.parentKey;

    if (nodeInfo.position === 'BEFORE') {
      // 타겟 노드 앞에 삽입
      if (sameParent && sourceSortSeq < targetSortSeq) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 -1 보정
        return targetSortSeq - 1;
      }
      return targetSortSeq;
    } else {
      // 타겟 노드 뒤에 삽입 (AFTER)
      if (sameParent && sourceSortSeq < targetSortSeq) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 보정 없이 타겟 순서 사용
        return targetSortSeq;
      }
      return targetSortSeq + 1;
    }
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    console.log('##handleTreeAction : ', event);
    setClickedNode(null);
    switch (event.type) {
      case 'NODE_MOVE': {
        const nodeInfo = event;
        if (nodeInfo.sourceNode.id) {
          if (
            nodeInfo.sourceNode.itemType === nodeInfo.targetNode?.itemType ||
            (nodeInfo.sourceNode.itemType === PACKAGE_ITEM_TYPE.SUB_PKG &&
              nodeInfo.targetNode?.itemType === PACKAGE_ITEM_TYPE.COURSE)
          ) {
            console.log('못옮겨');
            // 원본 데이터로 되돌리기
            setTreeData((prev: any) => [...prev]); // 또는 initialTreeDataRef.current
            return;
          }
          const sortSeq = calculateSortSeq(nodeInfo);
          console.log('sortSeq=>', sortSeq);
          // const payload = {
          //   id: nodeInfo.sourceNode.menuId,
          //   destinationParentId:
          //     nodeInfo.position === 'INSIDE'
          //       ? nodeInfo.targetNode?.menuId
          //       : nodeInfo.targetNode?.parentKey,
          //   sortSeq,
          // };

          // moveCategory(payload, {
          //   onSuccess: async () => {
          //     if (selectedNode?.categoryId) {
          //       await queryClient.invalidateQueries({
          //         queryKey: [...queryKeys.detail(Number(selectedNode.categoryId))],
          //       });
          //     }
          //   },
          // });
          break;
        }
      }
    }
  };

  // 과정 추가 버튼(과정ROOT > , 서브패키지 >)
  const handleAddCourseNode = (node: TreeNode, level: number) => {
    // resetInputValidations();
    setFormMode(PACKAGE_FORM_MODE.ADD);
    setItemType(PACKAGE_ITEM_TYPE.COURSE);
    setClickedNode(node);
    const initData: { [key: string]: any } = {};
    // formConfig.builders.forEach((item) => {
    //   initData[item.name] = item.value;
    // });
    // const location = (node?.menuId && findMenuPathById(treeData, node.menuId)) ?? '';

    // updateFormData({
    //   ...initData,
    //   parentKey: node.menuId,
    //   parentMenuName: node.categoryName,
    //   location,
    //   code: { fieldValue: '', checkState: DuplicateState.okStart },
    //   categoryType: 'COMMON',
    // });
    // setFormMode(FORM_MODE.ADD);
    // // setSelectedNode(null);
    // //접혀있으면 확장
    // setExpandedKeys([...expandedKeys, node.key]);
  };

  // 서브패키지  추가 버튼(과정ROOT >)
  const handleAddSubPkgNode = (node: TreeNode) => {
    console.log('서브 패키지 추가');
    setFormMode(PACKAGE_FORM_MODE.ADD);
    setItemType(PACKAGE_ITEM_TYPE.SUB_PKG);
    setClickedNode(node);
  };

  const handleUpdate = (payload: any) => {
    const run = onSubmit(async (data) => {
      console.log('data=>', data);
      console.log('payload=>', payload);
      if (await saveConfirm()) {
        console.log('수정하자');
      }
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  };

  const handleSave = (payload: any) => {
    const run = onSubmit(async (data) => {
      console.log('data=>', data);
      console.log('payload=>', payload);
      if (await saveConfirm()) {
        console.log('저장하자');
      }
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  };

  const handleOnSubmit = (data: any) => {
    if (formMode === PACKAGE_FORM_MODE.VIEW) {
      console.log(data);
      const body = {
        categoryName: data.categoryName,
        categoryCode: data.code.fieldValue,
        categoryContent: data.categoryContent,
        id: data.key,
        isUsed: data.isUsed,
      };
      handleUpdate(body);
      return;
    } else if (formMode === PACKAGE_FORM_MODE.ADD) {
      const body = {
        categoryName: data.categoryName,
        categoryCode: data.code.fieldValue,
        categoryContent: data.categoryContent,
        categoryType: 'COMMON',
        sortSeq: data.sortSeq,
        parentId: data.parentKey,
        isUsed: data.isUsed,
      };
      handleSave?.(body);
      return;
    }
  };

  // 패키지 저장(이거 기본정보/패키지 구성 같이 묶어서 사용해야 할듯)
  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({ to: '/learning/course-package' });
        break;
      case TriggerKey.SAVE:
        console.log('## 저장');
        // handleSave();
        break;
      case TriggerKey.DELETE:
        // handleDeleteAction(lastTriggered.payload);
        break;
    }
  }, [lastTriggered]);

  return {
    provider,
    getValues,
    updateFormData,
    formValues,
    onSubmit,
    onFormChange,
    treeData,
    isLoading,
    expandedKeys,
    selectedNode,
    clickedNode,
    renderNodeButtons,
    handleExpandChange,
    handleSelectedNodeChange,
    handleAddCourseNode,
    handleAddSubPkgNode,
    handleTreeAction,
    formMode,
    itemType,
    handleOnSubmit,
  };
}
