import { useFetchCoursePackageTree } from '@entities/course-package';
import { findNodeByMenuId } from '@features/platform-management/platform/category-managemnet';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { findNodePath, TreeNode } from '@learnway/ui/tree-view';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TriggerKey, useCoursePackageLastTriggered } from '../store/use-course-package-store';

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
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);

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

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    setSelectedNode(node);
    // if (node) {
    //   setFormMode(FORM_MODE.VIEW);
    // } else {
    //   setFormMode(FORM_MODE.NONE);
    // }
  };

  //하위 메뉴 추가 버튼(과정ROOT, 서브패키지 > 과정)
  const handleAddCourseNode = (node: TreeNode, level: number) => {
    // resetInputValidations();
    const initData: { [key: string]: any } = {};
    // formConfig.builders.forEach((item) => {
    //   initData[item.name] = item.value;
    // });
    console.log('메뉴추가=>', node);
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

  const handleSave = () => {
    const run = onSubmit(async (data) => {
      console.log('data=>', data);
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  };

  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({ to: '/learning/course-package' });
        break;
      case TriggerKey.SAVE:
        console.log('## 저장');
        handleSave();
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
    handleExpandChange,
    handleSelectedNodeChange,
    handleAddCourseNode,
  };
}
