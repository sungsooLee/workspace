import { FC, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';

import {
  Button,
  ContentsRow,
  DynamicFormField,
  findNodePath,
  findParentNode,
  Input,
  RadioGroupFormField,
  TextareaFormField,
  TreeBox,
  TreeEventPayload,
  TreeNode,
  useModal,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { findNodeByApiId } from '../service/program.service';
import { FormRow } from '../../../../shared/ui';
import {
  useFetchProgram,
  useFetchPrograms,
  useProgramHook,
} from '../../../../entities/program/service/program-manage.hook';
import { transformApiDataToApiTreeData } from '../../menu/service/menu.service';
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
  const { confirm: openConfirm } = useModal();

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
          console.log(newNode);
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
            disabled={node.apiNodeType === 'API'}
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
            // sortSeq: nodeInfo.targetIndex ? nodeInfo.targetIndex + 1 : 1,
            sortOrder: 1,
            apiScopeCode: menuScope,
          };
          dnd(payload);
        } else {
          const targetIndex = nodeInfo.targetIndex!;
          const payload = {
            apiUuid: nodeInfo.sourceNode.apiUuid,
            destinationParentId: nodeInfo.targetNode?.parentId,
            sortOrder: targetIndex + 1,
            apiScopeCode: menuScope,
          };
          dnd(payload);
        }
        break;
      }
    }
  };

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    console.log(node);
    setSelectedNode(node);
    if (node) {
      setFormMode(FORM_MODE.VIEW);
    } else {
      setFormMode(FORM_MODE.NONE);
    }
  };

  const handleReset = async () => {
    //
    const isReset = await openConfirm({
      title: t('LABEL.confirm.reset.title'),
    });
    if (isReset) onFormChange();
  };

  const handleOnSubmit = (node: any) => {
    if (formMode === FORM_MODE.VIEW) {
      openConfirm({
        title: t('LABEL.confirm.modify.title'),
        content: t('LABEL.confirm.modify.message'),
        onClose: (value: boolean) => {
          if (value) {
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
          }
        },
      });
    } else if (formMode === FORM_MODE.ADD) {
      openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
        onClose: (value: boolean) => {
          if (value) {
            create(
              { ...node, apiScope: menuScope, sortOrder: 1 },
              {
                onSuccess: (data: any) => {
                  if (data && data.apiId) {
                    setLastCreateApiId(data.apiId.toString());
                  }
                },
              },
            );
          }
        },
      });
    }
  };

  return (
    <SectionLayout contentsRatio={'half'}>
      <TreeBox
        title={menuScope === 'FO' ? t('학습자 API 목록') : t('HRD센터 API 목록')}
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
      />
      <div className={layoutStyles.inner}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>
              {menuScope === 'FO' ? t('학습자 API 정보') : t('HRD센터 API 정보')}
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
                onClick={() => {
                  deleteProgram(selectedNode?.apiUuid);
                }}
              >
                {t('LABEL.button.delete')}
              </Button>
              <Button type="submit" variant="save" size="sm" disabled={FORM_MODE.NONE === formMode}>
                {t('LABEL.button.save')}
              </Button>
            </div>
          </div>
          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow provider={provider} name={'fullPath'} element={<Input disabled={true} />} />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'parentName'}
                element={<Input disabled={true} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider} name={'apiId'} element={<Input disabled={true} />} />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiNodeType'}
                element={<RadioGroupFormField disabled={FORM_MODE.NONE === formMode} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiName'}
                element={<Input disabled={FORM_MODE.NONE === formMode} />}
              />
            </ContentsRow>

            {apiNodeType === 'FOLDER' && (
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'apiDesc'}
                  element={<TextareaFormField disabled={FORM_MODE.NONE === formMode} />}
                />
              </ContentsRow>
            )}
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
                    element={<Input disabled={FORM_MODE.NONE === formMode} />}
                  />
                </ContentsRow>
              </>
            )}
          </div>
        </form>
      </div>
    </SectionLayout>
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
