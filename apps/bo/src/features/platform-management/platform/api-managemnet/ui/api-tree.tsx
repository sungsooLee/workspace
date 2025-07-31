import { t } from 'i18next';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { RadioGroupFormField } from '@learnway/ui/form-field';
import {
  CustomDropValidator,
  findNodePath,
  findParentNode,
  TreeBox,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
} from '@learnway/ui/tree-view';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import {
  queryKeys,
  useCreateProgram,
  useDeleteProgram,
  useDndProgram,
  useFetchProgram,
  useFetchPrograms,
  useUpdateProgram,
} from '@entities/program';
import { IcoMinus } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';
import { FormRow, SwitchFormField } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { transformApiDataToApiTreeData } from '../../menu-managemnet';
import { findNodeByApiId } from '../service/api.service';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

const ApiTreeComponent: FC<any> = ({ menuScope }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [lastCreateApiId, setLastCreateApiId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirm: openConfirm, alert: openAlert } = useModal();
  const queryClient = useQueryClient();

  const prevDataRef = useRef(null);

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    clearFormError,
    control,
    setFormError,
  } = useDynamicForm(formConfig);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  const apiNodeType = useWatch({ control, name: 'apiNodeType' });

  // 프로그램 트리 목록 조회
  const { data, isLoading } = useFetchPrograms(menuScope);
  // 프로그램 단건 조회
  const { data: detailData } = useFetchProgram(selectedNode?.apiUuid || '');
  // 프로그램 뮤테이션 훅들
  const { mutate: createProgram } = useCreateProgram(menuScope);
  const { mutate: updateProgram } = useUpdateProgram(menuScope);
  const { mutate: deleteProgram } = useDeleteProgram(menuScope);
  const { mutate: dndProgram } = useDndProgram(menuScope);

  useEffect(() => {
    if (data) {
      prevDataRef.current = data;

      const transformedData = transformApiDataToApiTreeData(data);
      setTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setExpandedKeys(firstLevelKeys);
      }

      if (lastCreateApiId) {
        const newNode = findNodeByApiId(transformedData, lastCreateApiId);
        if (newNode) {
          const nodePath = findNodePath(transformedData, lastCreateApiId);
          if (nodePath) {
            setExpandedKeys((prev) => {
              const combined = [...new Set([...prev, ...nodePath])];
              return combined;
            });

            setSelectedNode(newNode);

            setLastCreateApiId(null);
          }
        }
      }
    }
  }, [data, lastCreateApiId]);

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  useEffect(() => {
    if (detailData) {
      const parentNode = findParentNode(treeData, detailData?.apiId.toString());
      updateFormData({
        ...detailData,
        apiId: detailData?.apiId.toString() || 0,
        parentId: parentNode?.apiId.toString() || '',
      });
      setFormMode(FORM_MODE.VIEW);
    }
  }, [detailData]);

  const addNode = (node: any) => {
    clearAllFormErrors();
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });

    updateFormData({
      ...initData,
      fullPath: node?.fullPath,
      parentName: node?.apiName,
      parentId: node?.apiId.toString() || '',
    });

    setFormMode(FORM_MODE.ADD);
  };

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addNode(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}
          disabled={node.apiNodeType === 'API' || level >= 5}
        >
          {level === 0 ? t('LABEL.add', { type: 'API' }) : t('LABEL.addSub', { type: 'API' })}
        </Button>
      </div>
    </div>
  );

  const calculateSortOrder = (nodeInfo: any) => {
    if (nodeInfo.position === 'INSIDE') {
      // 타겟 노드의 자식으로 이동 - 항상 첫 번째 자식이 되도록
      return 1;
    }

    const sourceNode = nodeInfo.sourceNode;
    const targetNode = nodeInfo.targetNode;

    if (!targetNode || !targetNode.sortOrder) {
      // targetNode의 sortOrder가 없으면 targetIndex 기반으로 계산
      return nodeInfo.position === 'BEFORE' ? nodeInfo.targetIndex + 1 : nodeInfo.targetIndex + 2;
    }

    // 같은 부모 내에서 이동하는 경우, 소스와 타겟의 sortOrder 관계를 고려
    const sourceSortOrder = sourceNode.sortOrder || 0;
    const targetSortOrder = targetNode.sortOrder;
    const sameParent = sourceNode.parentId === targetNode.parentId;

    if (nodeInfo.position === 'BEFORE') {
      // 타겟 노드 앞에 삽입
      if (sameParent && sourceSortOrder < targetSortOrder) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 -1 보정
        return targetSortOrder - 1;
      }
      return targetSortOrder;
    } else {
      // 타겟 노드 뒤에 삽입 (AFTER)
      if (sameParent && sourceSortOrder < targetSortOrder) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 보정 없이 타겟 순서 사용
        return targetSortOrder;
      }
      return targetSortOrder + 1;
    }
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_MOVE': {
        const nodeInfo = event;
        if (nodeInfo) {
          const sortOrder = calculateSortOrder(nodeInfo);

          const payload = {
            apiUuid: nodeInfo.sourceNode.apiUuid,
            destinationParentId:
              nodeInfo.position === 'INSIDE'
                ? nodeInfo.targetNode?.apiId
                : nodeInfo.targetNode?.parentId,
            sortOrder,
            apiScopeCode: menuScope,
            type: nodeInfo.type,
            sourceNode: nodeInfo.sourceNode,
            targetNode: nodeInfo.targetNode,
            position: nodeInfo.position,
          };

          dndProgram(payload, {
            onSuccess: async () => {
              // 낙관적 업데이트 결과 유지
            },
            onError: async () => {
              await queryClient.invalidateQueries({
                queryKey: [...queryKeys.all, menuScope],
              });
            },
          });
        }
        break;
      }
    }
  };

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    setSelectedNode(node);
    if (node) {
      setFormMode(FORM_MODE.VIEW);
    } else {
      setFormMode(FORM_MODE.NONE);
    }
  };

  const handleReset = async () => {
    const isReset = await openConfirm({
      title: t('LABEL.confirm.reset.title'),
    });
    if (isReset) onFormChange();
  };

  const handleOnSubmit = (node: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (formMode === FORM_MODE.VIEW) {
      openConfirm({
        title: t('LABEL.confirm.modify.title'),
        content: t('LABEL.confirm.modify.message'),
        onClose: (value: boolean) => {
          if (value) {
            updateProgram(
              { ...node },
              {
                onSuccess: (data: any) => {
                  if (data && data.apiId) {
                    setLastCreateApiId(data.apiId.toString());
                  }
                  setIsSubmitting(false);
                },
                onError: () => {
                  setIsSubmitting(false);
                },
              },
            );
          } else {
            setIsSubmitting(false);
          }
        },
      });
    } else if (formMode === FORM_MODE.ADD) {
      openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
        onClose: (value: boolean) => {
          if (value) {
            createProgram(
              { ...node, apiScope: menuScope },
              {
                onSuccess: (data: any) => {
                  if (data && data.apiId) {
                    setLastCreateApiId(data.apiId.toString());
                  }
                  setIsSubmitting(false);
                },
              },
            );
          } else {
            setIsSubmitting(false);
          }
        },
      });
    }
  };

  const customDropValidator = useCallback<CustomDropValidator>(({ targetNode, dropPosition }) => {
    if (dropPosition === 'INSIDE' && targetNode.apiNodeType !== 'FOLDER') {
      return false;
    }
    return true;
  }, []);

  const handleDelete = async () => {
    if (selectedNode && selectedNode.isUsed) {
      await openAlert({
        content: t('LABEL.program.checkUsed'),
      });
      return;
    }

    openConfirm({
      title: t('LABEL.confirm.delete.title'),
      content: t('LABEL.confirm.delete.message', { type: t('LABEL.common.tree') }),
      onClose: (value: boolean) => {
        const payload = {
          menuId: selectedNode?.menuId,
        };
        if (value && payload) {
          deleteProgram(selectedNode?.apiUuid, {
            onSuccess: async () => {
              setSelectedNode(null);
              clearAllFormErrors();
              const initData: { [key: string]: any } = {};
              formConfig.builders.forEach((item) => {
                initData[item.name] = item.value;
              });
              updateFormData({ ...initData });
              setFormMode(FORM_MODE.NONE);
            },
          });
        }
      },
    });
  };

  return (
    <>
      <TreeContainer>
        <TreeBox
          title={
            menuScope === 'FO'
              ? t('LABEL.list', { type: t('LABEL.program.learnerApi') })
              : t('LABEL.list', { type: t('LABEL.program.hrdCenterApi') })
          }
          data={treeData}
          treeId={'program-tree'}
          expandedKeys={expandedKeys}
          onExpandedKeysChange={handleExpandChange}
          renderNodeButtons={renderNodeButtons}
          onAction={handleTreeAction}
          type={'DRAG_DROP'}
          selectedNode={selectedNode}
          initLevel={2}
          handleSelectedNodeChange={handleSelectedNodeChange}
          customDropValidator={customDropValidator}
          maxDepth={5}
          isSelectableNode={(node: TreeNode) => {
            return node && node.level !== 0;
          }}
          isLoading={isLoading}
          clientTree={true}
          disableOptimisticUpdate={false} // 클라이언트 트리에서는 낙관적 업데이트 사용
        />
      </TreeContainer>
      <div className={layoutStyles.inner}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>
              {menuScope === 'FO'
                ? t('LABEL.info', { type: t('LABEL.program.learnerApi') })
                : t('LABEL.info', { type: t('LABEL.program.hrdCenterApi') })}
            </h3>
            <div className={layoutStyles.btn_wrap}>
              <Button
                type="button"
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                onClick={handleReset}
                disabled={FORM_MODE.NONE === formMode}
              >
                {t('LABEL.button.reset')}
              </Button>
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                disabled={FORM_MODE.VIEW !== formMode}
                onClick={handleDelete}
                icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
              >
                {t('LABEL.button.delete')}
              </Button>
              <Button
                type="submit"
                variant="save"
                size="sm"
                disabled={FORM_MODE.NONE === formMode || isSubmitting}
              >
                {t('LABEL.button.save')}
              </Button>
            </div>
          </div>
          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'fullPath'}
                element={<Input disabled={true} hiddenPlaceholder={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'parentName'}
                element={<Input disabled={true} hiddenPlaceholder={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiId'}
                element={
                  <Input
                    disabled={true}
                    className="text-left"
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiNodeType'}
                element={
                  <RadioGroupFormField
                    disabled={FORM_MODE.NONE === formMode || FORM_MODE.VIEW === formMode}
                  />
                }
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiName'}
                element={
                  <Input
                    disabled={FORM_MODE.NONE === formMode}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>

            {apiNodeType === 'API' && (
              <>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name={'apiMethodCode'}
                    element={<RadioGroupFormField disabled={FORM_MODE.NONE === formMode} />}
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name={'apiUrl'}
                    element={
                      <Input
                        id="apiUrl"
                        disabled={FORM_MODE.NONE === formMode}
                        hiddenPlaceholder={formMode === FORM_MODE.NONE}
                        type="url"
                        validation={{
                          onError: (msg) => setFormError('apiUrl', msg),
                          onSuccess: () => clearFormError('apiUrl'),
                        }}
                      />
                    }
                  />
                </ContentsRow>
              </>
            )}
            {/* {apiNodeType === 'FOLDER' && ( */}
            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow
                provider={provider}
                name={'isUsed'}
                element={<SwitchFormField disabled={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiDesc'}
                element={
                  <Textarea
                    disabled={FORM_MODE.NONE === formMode}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>
            {/* )} */}
          </div>
        </form>
      </div>
    </>
  );
};

export const ApiTree = ApiTreeComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'apiUuid',
      type: 'text',
      label: () => t('apiUuid'),
      value: '',
    },
    {
      name: 'parentId',
      type: 'text',
      label: () => t('parentId'),
      value: '',
    },
    {
      name: 'fullPath',
      type: 'text',
      label: () => t('LABEL.program.location'),
      value: '',
    },
    {
      name: 'parentName',
      type: 'text',
      label: () => t('LABEL.program.parentApiName'),
      value: '',
    },
    {
      name: 'apiId',
      type: 'number',
      label: () => t('API ID'),
      value: '',
      placeholder: t('저장 시 자동 채번'),
    },
    {
      name: 'apiNodeType',
      type: 'radio-group',
      label: () => t('LABEL.program.type'),
      value: 'FOLDER',
      options: [
        {
          value: 'FOLDER',
          label: t('LABEL.program.folder'),
        },
        {
          value: 'API',
          label: t('LABEL.program.api'),
        },
      ],
    },
    {
      name: 'apiName',
      type: 'text',
      label: () => t('LABEL.program.name'),
      value: '',
      maxLength: 10,
    },
    {
      name: 'apiDesc',
      type: 'textarea',
      label: () => t('LABEL.form.input.description'),
      value: '',
      maxLength: 2000,
    },
    {
      name: 'apiMethodCode',
      type: 'radio-group',
      label: () => t('LABEL.program.apiMethodType'),
      value: 'GET',
      options: [
        {
          value: 'GET',
          label: 'GET',
        },
        {
          value: 'POST',
          label: 'POST',
        },

        {
          value: 'PUT',
          label: 'PUT',
        },
        {
          value: 'DELETE',
          label: 'DELETE',
        },
      ],
    },
    {
      name: 'apiUrl',
      type: 'text',
      label: () => t('API URL'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: () => t('LABEL.program.isUsed'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('LABEL.common.enable') : t('LABEL.common.disable')),
      },
      tooltip:
        '사용여부 변경 시 메뉴관리에서 매핑한 메뉴의 해당 API 사용여부도 같이 변경되니 유의해 주세요.',
    },
  ],
  validator: {
    apiName: {
      required: true,
    },
    apiUrl: {
      required: {
        fn: (values) => {
          return values.apiNodeType === 'API';
        },
      },
    },
    apiMethodCode: {
      required: {
        fn: (values) => {
          return values.apiNodeType === 'API';
        },
      },
    },
  },
};
