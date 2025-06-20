import {
  Button,
  findNodePath,
  TreeBox,
  TreeEventPayload,
  TreeNode,
  useModal,
  ContentsRow,
  Input,
  Textarea,
  TreeContainer,
  findParentNode,
} from '@learnway/ui';
import { useEffect, useRef, useState } from 'react';
import {
  useCheckExistsCategory,
  useCreateCategory,
  useDeleteCategory,
  useFetchCategory,
  useFetchCategoryDetail,
  useMoveCategory,
  useUpdateCategory,
  queryKeys,
} from '@entities/category';
import {
  findMenuPathById,
  findNodeByMenuId,
  transformApiDataToTreeData,
} from '@features/platform/category';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { FormRow, SwitchFormField } from '@shared/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { IcoMinus } from '@learnway/icons';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { useQueryClient } from '@tanstack/react-query';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

export const CategoryManage = () => {
  const [treeData, setTreeData] = useState([]);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const queryClient = useQueryClient();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);
  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };
  const initialFromValuesRef = useRef<any>(null);

  const {
    confirm: openConfirm,
    showSaveComplete,
    showDeleteComplete,
    showUpdateComplete,
  } = useModal();

  // 추후 현재 locale 정보 값 파라미터로 넘겨주기.
  const { data, refetch } = useFetchCategory();
  const { data: detailData } = useFetchCategoryDetail(selectedNode?.id);

  const { create } = useCreateCategory({});

  // 삭제
  const { delete: deleteCategory } = useDeleteCategory({});

  // 수정 mutation
  const { update: updateCategory } = useUpdateCategory({});

  // 이동
  const { move: moveCategory } = useMoveCategory({});
  const { checkExistsCategory: checkExists } = useCheckExistsCategory({});

  const duplicateCheck = async (code: string) => {
    console.log(code);
    const result = await new Promise((resolve) => {
      checkExists(code, { onSuccess: resolve });
    });
    if (!result) return DuplicateState.duplicated;
    return DuplicateState.ok;
  };

  useEffect(() => {
    // 이전 데이터와 현재 데이터가 다른 경우에만 처리 (데이터 로드 감지)
    if (data !== null && data !== undefined) {
      const transformedData = transformApiDataToTreeData(data);
      setTreeData(transformedData);

      // 초기 로딩 시 첫 번째 레벨 확장
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }

      // 새로 추가된 메뉴가 있는 경우 - lastCreatedMenuId로 체크
      if (lastCreatedMenuId) {
        // 새로 생성된 메뉴 노드 찾기
        const newNode = findNodeByMenuId(transformedData, lastCreatedMenuId.toString());
        if (newNode) {
          // 노드 경로 찾기 (부모 노드들의 키)
          const nodePath = findNodePath(transformedData, lastCreatedMenuId);
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
            setFormMode(FORM_MODE.VIEW);
            // 처리 완료 후 ID 초기화
            setLastCreatedMenuId(null);
          }
        }
      }
    }
  }, [data, lastCreatedMenuId]);

  useEffect(() => {
    if (detailData && treeData) {
      if (formMode === FORM_MODE.VIEW) {
        const location = selectedNode?.menuId && findMenuPathById(treeData, selectedNode?.menuId);
        const initialData = selectedNode && {
          location: detailData.categoryPath || location,
          key: selectedNode.key,
          parentKey: selectedNode.parentKey,
          parentMenuName: detailData.parentCategoryName || selectedNode.parentMenuName,
          name: detailData.name,
          code: { fieldValue: detailData.categoryCode, checkState: DuplicateState.okStart },
          categoryContent: detailData.categoryContent,
          categoryType: 'COMMON',
          sortSeq: selectedNode?.children?.length ?? 0 + 1,
          isUsed: detailData.isUsed,
        };
        fetchData({ ...initialData });
        initialFromValuesRef.current = { ...initialData };
        console.log(initialFromValuesRef.current);
      }
    }
  }, [detailData, formMode]);

  const handleReset = async () => {
    const isReset = await openConfirm({
      title: t('LABEL.confirm.reset.title'),
    });
    if (isReset) {
      onFormChange();
      if (formMode === FORM_MODE.VIEW) fetchData({ ...initialFromValuesRef.current });
    }
  };

  //하위 메뉴 추가 버튼
  const handleAddSubMenu = (node: TreeNode) => {
    clearAllFormErrors();
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });

    const location = (node?.menuId && findMenuPathById(treeData, node.menuId)) ?? '';

    fetchData({
      ...initData,
      parentKey: node.menuId,
      parentMenuName: node.name,
      location: location,
      code: { fieldValue: '', checkState: DuplicateState.okStart },
      categoryType: 'COMMON',
    });
    setFormMode(FORM_MODE.ADD);
    // setSelectedNode(null);
    //접혀있으면 확장
    setExpandedKeys([...expandedKeys, node.key]);
  };

  // 메뉴 저장 핸들러
  const handleSave = (payload: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    openConfirm({
      title: t('LABEL.confirm.save.title'),
      content: <p>{t('LABEL.confirm.save.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          create(payload, {
            onSuccess: async (data: any) => {
              showSaveComplete();
              if (data) {
                setLastCreatedMenuId(data.toString());
              }
              setIsSubmitting(false);
            },
            onError: () => {
              setIsSubmitting(false);
            },
          });
        } else {
          setIsSubmitting(false);
        }
      },
    });
  };

  const handleUpdate = (payload: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    openConfirm({
      title: t('LABEL.confirm.modify.title'),
      content: <p>{t('LABEL.confirm.modify.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          updateCategory(payload, {
            onSuccess: async (data: any) => {
              showUpdateComplete();
              if (data) {
                setLastCreatedMenuId(data.toString());
              }
              setIsSubmitting(false);
            },
            onError: () => {
              setIsSubmitting(false);
            },
          });
        } else {
          setIsSubmitting(false);
        }
      },
    });
  };

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  const handleDelete = (payload: any) => {
    //TODO: 삭제 이전에 해당 메뉴 테넌트 사용 여부 체크.
    console.log(selectedNode);
    openConfirm({
      title: t('LABEL.confirm.delete.title'),
      content: (
        <p>{t('LABEL.confirm.delete.message', { type: t('LABEL.common.code.category') })}</p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          deleteCategory(selectedNode?.menuId, {
            onSuccess: async (data: any) => {
              showDeleteComplete();
              setFormMode(FORM_MODE.NONE);
            },
          });
        }
      },
    });
  };

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddSubMenu(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}
          disabled={level === 5}
        >
          {/* '카테고리 추가' : '하위카테고리 추가' */}
          {level === 0
            ? t('LABEL.tree.add', { type: t('LABEL.common.code.category') })
            : t('LABEL.tree.depthAdd', { type: t('LABEL.common.code.category') })}
        </Button>
      </div>
    </div>
  );

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    setSelectedNode(node);
    if (node) {
      setFormMode(FORM_MODE.VIEW);
    } else {
      setFormMode(FORM_MODE.NONE);
    }
  };

  const handleOnSubmit = (data: any) => {
    if (formMode === FORM_MODE.VIEW) {
      const body = {
        name: data.name,
        categoryCode: data.code.fieldValue,
        categoryContent: data.categoryContent,
        id: data.key,
        isUsed: data.isUsed,
      };
      handleUpdate(body);
      return;
    } else if (formMode === FORM_MODE.ADD) {
      const body = {
        name: data.name,
        categoryCode: data.code.fieldValue,
        categoryContent: data.categoryContent,
        categoryType: 'COMMON',
        sortSeq: data.sortSeq,
        parentId: data.parentKey,
        isUsed: data.isUsed,
      };
      handleSave?.(body);
    }
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_MOVE': {
        const nodeInfo = event;
        console.log(event);
        if (nodeInfo.sourceNode.menuId) {
          if (nodeInfo.position === 'INSIDE') {
            const payload = {
              id: nodeInfo.sourceNode.menuId,
              destinationParentId: nodeInfo.targetNode?.menuId,
              sortSeq: 1,
            };
            moveCategory(payload, {
              onSuccess: async (data: any) => {
                if (selectedNode?.categoryId) {
                  await queryClient.invalidateQueries({
                    queryKey: [...queryKeys.detail(Number(selectedNode.categoryId))],
                  });
                }
              },
            });
          } else {
            const targetIndex = nodeInfo.targetIndex!;
            const payload = {
              id: nodeInfo.sourceNode.menuId,
              destinationParentId: nodeInfo.targetNode?.parentKey,
              sortSeq: targetIndex + 1,
            };
            moveCategory(payload, {
              onSuccess: async (data: any) => {
                if (selectedNode?.categoryId) {
                  await queryClient.invalidateQueries({
                    queryKey: [...queryKeys.detail(Number(selectedNode.categoryId))],
                  });
                }
              },
            });
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (formMode === FORM_MODE.NONE) {
      setSelectedNode(null);
      clearAllFormErrors();
      const initData: { [key: string]: any } = {};
      formConfig.builders.forEach((item) => {
        initData[item.name] = item.value;
      });
      fetchData({ ...initData });
    }
  }, [formMode]);

  const getTitle = () => {
    // 카테고리 추가, 하위카테고리 추가
    if (formMode === FORM_MODE.ADD) {
      return selectedNode
        ? `${selectedNode.title} ${t('LABEL.tree.depthAdd', { type: t('LABEL.common.code.category') })}`
        : `${t('LABEL.tree.add', { type: t('LABEL.common.code.category') })}`;
    }
    // ${} 카테고리
    if (formMode === FORM_MODE.VIEW) {
      return selectedNode
        ? `${selectedNode.title} ${t('LABEL.common.code.category')}`
        : t('LABEL.common.code.category');
    }
    return t('LABEL.common.code.category');
  };

  return (
    <>
      <TreeContainer>
        <TreeBox
          title={t('LABEL.list', { type: t('LABEL.commonCategory') })}
          data={treeData}
          treeId={'common-category'}
          expandedKeys={expandedKeys}
          onExpandedKeysChange={handleExpandChange}
          renderNodeButtons={renderNodeButtons}
          onAction={handleTreeAction}
          type={'SAME_LEVEL_ONLY'}
          initLevel={1}
          maxDepth={5}
          handleSelectedNodeChange={handleSelectedNodeChange}
          isSelectableNode={(node: TreeNode) => {
            return node && node.level !== 0;
          }}
          selectedNode={selectedNode}
        />
      </TreeContainer>
      <div className={layoutStyles.inner}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>{getTitle()}</h3>
            <div className={layoutStyles.btn_wrap}>
              <Button
                type="button"
                variant="text"
                size="sm"
                onClick={handleReset}
                disabled={formMode === FORM_MODE.NONE}
                className={layoutStyles.btn_text}
              >
                {t('LABEL.button.reset')}
              </Button>
              <Button
                variant="text"
                size="sm"
                disabled={formMode === FORM_MODE.NONE || formMode === FORM_MODE.ADD}
                onClick={handleDelete}
                className={layoutStyles.btn_text}
                icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
              >
                {t('LABEL.button.delete')}
              </Button>
              <Button
                type="submit"
                variant="save"
                size="sm"
                disabled={formMode === FORM_MODE.NONE || isSubmitting}
              >
                {t('LABEL.button.save')}
              </Button>
            </div>
          </div>
          {/* 폼 필드 - location (비활성화 상태) */}
          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'location'}
                element={<Input disabled={true} hiddenPlaceholder={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'parentMenuName'}
                element={<Input disabled={true} hiddenPlaceholder={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            {/* 폼 필드 - code */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'code'}
                element={
                  <DuplicateCheckInputFormField
                    onDuplicationCheck={duplicateCheck}
                    disabled={formMode === FORM_MODE.NONE}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                    inputType={'alphanumeric'}
                  />
                }
              />
            </ContentsRow>

            {/* 폼 필드 - title */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'name'}
                element={
                  <Input
                    disabled={formMode === FORM_MODE.NONE}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              ></FormRow>
            </ContentsRow>

            {/* 폼 필드 - description */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'categoryContent'}
                element={
                  <Textarea
                    disabled={formMode === FORM_MODE.NONE}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow type="horizontal">
              <FormRow
                provider={provider}
                name="isUsed"
                element={<SwitchFormField disabled={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>
          </div>
        </form>
      </div>
    </>
  );
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'key',
      type: 'text',
      label: 'key',
      value: '',
    },
    {
      name: 'parentKey',
      type: 'text',
      label: 'parentKey',
      value: '',
    },
    {
      name: 'location',
      type: 'text',
      label: t('LABEL.form.input.categoryLocation'),
      value: '',
    },
    {
      label: t('LABEL.form.input.categoryParentName'),
      name: 'parentMenuName',
      type: 'text',
      format: 'string',
      value: '',
    },
    {
      label: t('LABEL.form.input.categoryCode'),
      name: 'code',
      type: 'custom',
      maxLength: 20,
      value: { fieldValue: '', checkState: DuplicateState.needInput },
    },
    {
      label: t('LABEL.form.input.categoryCodeName'),
      name: 'name',
      type: 'text',
      maxLength: 20,
      value: '',
    },
    {
      label: 'sortSeq',
      name: 'sortSeq',
      type: 'hidden',
      maxLength: 50,
      value: 0,
    },
    {
      label: t('LABEL.form.input.description'),
      name: 'categoryContent',
      type: 'textarea',
      maxLength: 50,
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      format: 'boolean',
      label: t('사용 여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
  ],
  validator: {
    code: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.code.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('LABEL.cdId') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.code.checkState === DuplicateState.check ||
            values.code.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('LABEL.cdId') }),
        },
        {
          fn: (values: Record<string, any>) => values.code.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('LABEL.cdId') }),
        },
      ],
    },
    name: {
      required: true,
    },
  },
};
