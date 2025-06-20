import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';

import {
  Button,
  ContentsRow,
  CustomDropValidator,
  findNodePath,
  findParentNode,
  Input,
  RadioGroupFormField,
  Textarea,
  TreeBox,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  useModal,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { findNodeByApiId } from '../service/program.service';
import { FormRow, SwitchFormField } from '../../../../shared/ui';
import {
  useFetchProgram,
  useFetchPrograms,
  useCreateProgram,
  useUpdateProgram,
  useDeleteProgram,
  useDndProgram,
} from '../../../../entities/program/service/program-manage.hook';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../../entities/program/service/program-manage.queries';
import { transformApiDataToApiTreeData } from '../../menu/service/menu.service';
import { IcoMinus } from '@learnway/icons';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

const ProgramTreeComponent: FC<any> = ({ menuScope }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [lastCreateApiId, setLastCreateApiId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirm: openConfirm, alert: openAlert } = useModal();
  const queryClient = useQueryClient();

  const prevDataRef = useRef(null);

  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };
  const { showDeleteComplete } = useModal();

  const apiNodeType = useWatch({ control, name: 'apiNodeType' });

  // 프로그램 트리 목록 조회
  const { data } = useFetchPrograms(menuScope);
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
      fetchData({
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

    fetchData({
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

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_MOVE': {
        const nodeInfo = event;
        if (nodeInfo && nodeInfo.position === 'INSIDE') {
          const payload = {
            apiUuid: nodeInfo.sourceNode.apiUuid,
            destinationParentId: nodeInfo.targetNode?.apiId,
            sortOrder: 1,
            apiScopeCode: menuScope,
          };
          dndProgram(payload, {
            onSuccess: async (data: any) => {
              if (selectedNode?.apiUuid) {
                await queryClient.invalidateQueries({
                  queryKey: [...queryKeys.all, selectedNode.apiUuid],
                });
              }
            },
          });
        } else {
          const targetIndex = nodeInfo.targetIndex!;
          const payload = {
            apiUuid: nodeInfo.sourceNode.apiUuid,
            destinationParentId: nodeInfo.targetNode?.parentId,
            sortOrder: targetIndex + 1,
            apiScopeCode: menuScope,
          };
          dndProgram(payload, {
            onSuccess: async (data: any) => {
              if (selectedNode?.apiUuid) {
                await queryClient.invalidateQueries({
                  queryKey: [...queryKeys.all, selectedNode.apiUuid],
                });
              }
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
              { ...node, apiScope: menuScope, sortOrder: 1 },
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

  const customDropValidator = useCallback<CustomDropValidator>(
    ({ sourceNode, targetNode, dropPosition }) => {
      // console.log(`targetNode:`, targetNode);
      // console.log(`dropPosition:`, dropPosition);
      if (dropPosition === 'INSIDE' && targetNode.apiNodeType !== 'FOLDER') {
        return false;
      }
      return true;
    },
    [],
  );

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
            onSuccess: async (data: any) => {
              setSelectedNode(null);
              clearAllFormErrors();
              const initData: { [key: string]: any } = {};
              formConfig.builders.forEach((item) => {
                initData[item.name] = item.value;
              });
              fetchData({ ...initData });
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
                        disabled={FORM_MODE.NONE === formMode}
                        hiddenPlaceholder={formMode === FORM_MODE.NONE}
                        inputType="url"
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

export const ProgramTree = ProgramTreeComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'apiUuid',
      type: 'text',
      label: t('apiUuid'),
      value: '',
    },
    {
      name: 'parentId',
      type: 'text',
      label: t('parentId'),
      value: '',
    },
    {
      name: 'fullPath',
      type: 'text',
      label: t('LABEL.program.location'),
      value: '',
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('LABEL.program.parentApiName'),
      value: '',
    },
    {
      name: 'apiId',
      type: 'number',
      label: t('API ID'),
      value: '',
      placeholder: t('저장 시 자동 채번'),
    },
    {
      name: 'apiNodeType',
      type: 'radio-group',
      label: t('LABEL.program.type'),
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
      label: t('LABEL.program.name'),
      value: '',
      maxLength: 10,
    },
    {
      name: 'apiDesc',
      type: 'textarea',
      label: t('LABEL.form.input.description'),
      value: '',
      maxLength: 2000,
    },
    {
      name: 'apiMethodCode',
      type: 'radio-group',
      label: t('LABEL.program.apiMethodType'),
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
      label: t('API URL'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('LABEL.program.isUsed'),
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
