import { FC, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';

import {
  Button,
  ContentsRow,
  DynamicFormField,
  findNodePath,
  findParentNode,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  TreeView2,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { findNodeByApiId } from '../service/program.service';
import { transformApiDataToApiTreeData } from '../../menu/service/menu.service';
import { FormRow } from '../../../shared/ui';
import {
  useFetchProgram,
  useFetchPrograms,
  useProgramHook,
} from '../../../entities/program/service/program-manage.hook';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

const handleExpandAll = (treeData: TreeNode[]) => {
  const getAllKeys = (nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllKeys(node.children));
      }

      return keys;
    }, []);
  };
  return getAllKeys(treeData);
};

const getFirstExpandKeys = (treeData: TreeNode[]) => {
  if (treeData && treeData.length > 0) {
    const firstLevelKeys = treeData.map((node: TreeNode) => node.key);
    return firstLevelKeys;
  }
};

const ProgramTreeComponent: FC<any> = ({ menuScope }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [lastCreateApiId, setLastCreateApiId] = useState<string | null>(null);

  const prevDataRef = useRef(null);

  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  const apiNodeType = useWatch({ control, name: 'apiNodeType' });

  // 프로그램 트리 목록 조회
  const { data } = useFetchPrograms(menuScope);
  // 프로그램 단건 조회
  const { data: detailData } = useFetchProgram(selectedNode?.apiUuid || '');
  // 프로그램 생성
  const { create, delete: deleteProgram, update, dnd } = useProgramHook({ apiScope: menuScope });

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
        {level <= 4 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addNode(node);
            }}
            variant="gray2"
            size={'xs'}
            type={'button'}
          >
            {level === 0 ? 'API 추가' : '하위 API 추가'}
          </Button>
        )}
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
            sortSeq: nodeInfo.targetIndex ? nodeInfo.targetIndex + 1 : 1,
          };
          dnd(payload);
        }
        //BEFORE 혹은 AFTER 이면 부모 노드가 타겟 되어야함.
        else {
          console.log(nodeInfo.targetIndex);
          const targetIndex = nodeInfo.targetIndex || 0;
          if (targetIndex >= 0) {
            const payload = {
              apiUuid: nodeInfo.sourceNode.apiUuid,
              destinationParentId: nodeInfo.targetNode?.parentId,
              sortSeq: targetIndex + 1,
            };
            dnd(payload);
          }
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

  const handleOnSubmit = (node: any) => {
    if (formMode === FORM_MODE.VIEW) {
      update(
        { ...node },
        {
          onSuccess: (data: any) => {
            if (data && data.apiId) {
              setLastCreateApiId(data.apiId.toString());
            }
          },
        },
      );
    } else if (formMode === FORM_MODE.ADD) {
      create(
        { ...node, apiScope: menuScope },
        {
          onSuccess: (data: any) => {
            console.log(data);
            if (data && data.apiId) {
              setLastCreateApiId(data.apiId.toString());
            }
          },
        },
      );
    }
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={layoutStyles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'목록'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                if (treeData) {
                  const allKeys = handleExpandAll(treeData);
                  handleExpandChange(allKeys);
                }
              }}
            >
              {'전체펼침'}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                const firstKeys = getFirstExpandKeys(treeData);
                handleExpandChange(firstKeys || []);
              }}
            >
              {'전체닫기'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <TreeView2
              data={treeData}
              treeId={'program-tree'}
              expandedKeys={expandedKeys}
              onExpandedKeysChange={handleExpandChange}
              nodeButtons={renderNodeButtons}
              onAction={handleTreeAction}
              type={'DRAG_DROP'}
              selectedNode={selectedNode}
              onSelectedNodeChange={handleSelectedNodeChange}
            />
          </TreeContainer>
        </div>
      </div>
      <div className={layoutStyles.inner}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>
              {menuScope === 'FO' ? '학습자 API 정보' : 'HRD센터 API 정보'}
            </h3>
            <div className={layoutStyles.btn_wrap}>
              <Button
                type="button"
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                onClick={() => onFormChange()}
                disabled={FORM_MODE.NONE === formMode}
              >
                초기화
              </Button>
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                disabled={FORM_MODE.VIEW !== formMode}
                onClick={() => {
                  deleteProgram(selectedNode?.apiUuid);
                }}
              >
                삭제
              </Button>
              <Button type="submit" variant="save" size="sm" disabled={FORM_MODE.NONE === formMode}>
                저장
              </Button>
            </div>
          </div>
          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'fullPath'} disabled={true} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'parentName'} disabled={true} />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'apiId'} disabled={true} />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'apiNodeType'} disabled={FORM_MODE.NONE === formMode} />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'apiName'} disabled={FORM_MODE.NONE === formMode} />
              </FormRow>
            </ContentsRow>

            {apiNodeType === 'FOLDER' && (
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'apiDesc'} disabled={FORM_MODE.NONE === formMode} />
                </FormRow>
              </ContentsRow>
            )}
            {apiNodeType === 'API' && (
              <>
                <ContentsRow>
                  <FormRow provider={provider}>
                    <DynamicFormField
                      name={'apiMethodCode'}
                      disabled={FORM_MODE.NONE === formMode}
                    />
                  </FormRow>
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider}>
                    <DynamicFormField name={'apiUrl'} disabled={FORM_MODE.NONE === formMode} />
                  </FormRow>
                </ContentsRow>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
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
      label: t('API 위치'),
      value: '',
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('상위 API 명'),
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
      label: t('API 유형'),
      value: 'FOLDER',
      options: [
        {
          value: 'FOLDER',
          label: t('폴더'),
        },
        {
          value: 'API',
          label: t('API'),
        },
      ],
    },
    {
      name: 'apiName',
      type: 'text',
      label: t('API 이름'),
      value: '',
    },
    {
      name: 'apiDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
    },
    {
      name: 'apiMethodCode',
      type: 'radio-group',
      label: t('API Method 구분'),
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
