import { t } from 'i18next';
import { useRef, useState, useEffect } from 'react';
import { FormState } from '../types/form.types';
import { NodeFormRenderer } from '../components/node-form-renderer';
import { useTreeButtons } from '../hooks/use-tree-buttons';
import {
  useCreateCurriculum,
  useCreateFixedModule,
  useCreateGeneralModule,
  useCreateLessonByCurriculum,
  useCreateLessonByModule,
  useGetCurriculumDetail,
  useUpdateCurriculum,
  useUpdateFixedModule,
  useUpdateGeneralModule,
  useUpdateLessonByFixed,
  useUpdateLessonByGeneral,
} from '@entities/curriculum';
import { useDynamicForm2 } from '@learnway/hooks';
import {
  CurriculumResponse,
  FixedModuleUpdateParams,
  GeneralModuleUpdateParams,
  LESSON_TYPE,
  MAPPING_CURRICULUM_TYPE,
  MODULE_TYPE,
} from '@types';
import { buildTreeFromCurriculumData, findParentNode } from '../services';
import { FORM_MODE, FROM_STATUS } from '@shared/const';
import { Button, FormSubTitle, TreeBox, TreeContainer, TreeNode } from '@learnway/ui';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { IcoMinus } from '@learnway/icons';
import { SectionLayout } from '@shared/ui';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { getTimeValueFromHour } from '@learnway/shared';

interface CurriculumDetailProps {
  mode: FORM_MODE;
  curriculumId: number;
  onCurriculumCreated?: (curriculumId: number) => void;
}

const CurriculumDetailComponent = ({
  mode,
  curriculumId,
  onCurriculumCreated,
}: CurriculumDetailProps) => {
  const { data: loginUser } = useFetchAuthUser();
  const [formStatus, setFormStatus] = useState<FROM_STATUS>(FROM_STATUS.NONE);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [formKey, setFormKey] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    activeFormType: null,
    selectedNode: null,
    parentNode: null,
    isEditing: false,
  });

  // 이전 선택 노드 추적용 ref
  const prevSelectedNodeRef = useRef<TreeNode | null>(null);

  const shouldFetchDetail = mode === FORM_MODE.detail && curriculumId > 0;
  const { data: curriculumDetail, isLoading: isLoadingDetail } = useGetCurriculumDetail(
    shouldFetchDetail ? curriculumId : 0,
  );

  const { create: createCurriculum } = useCreateCurriculum({});
  const { update: updateCurriculum } = useUpdateCurriculum({});
  const { create: createCurriculumFixedModule } = useCreateFixedModule({});
  const { create: createCurriculumGeneralModule } = useCreateGeneralModule({});
  const { create: createLessonByCurriculum } = useCreateLessonByCurriculum({});
  const { create: createLessonByModule } = useCreateLessonByModule({});
  const { update: updateCurriculumFixedModule } = useUpdateFixedModule({});
  const { update: updateCurriculumGeneralModule } = useUpdateGeneralModule({});
  const { update: updateLessonByGeneral } = useUpdateLessonByGeneral({});
  const { update: updateLessonByFixed } = useUpdateLessonByFixed({});

  const {
    provider,
    getValues,
    onFormValid,
    updateFormData,
    onFormChange,
    watch,
    clearAllValidators,
  } = useDynamicForm2();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (curriculumDetail) {
      const treeNodes = buildTreeFromCurriculumData(curriculumDetail);
      setTreeData(treeNodes);
    } else if (mode === FORM_MODE.create) {
      setTreeData([]);
      setExpandedKeys([]);
    }
  }, [curriculumDetail, mode]);

  const expandParentNodes = (parentNode: TreeNode | null) => {
    if (!parentNode) return;

    const getParentKeys = (node: TreeNode | null): string[] => {
      if (!node) return [];
      const parentKeys = getParentKeys(findParentNode(treeData, node.parentId));
      return [...parentKeys, node.key];
    };

    const parentKeys = getParentKeys(parentNode);
    setExpandedKeys((prevKeys) => {
      const newKeys = [...new Set([...prevKeys, ...parentKeys])];
      return newKeys;
    });
  };

  const moduleCreateStrategy = {
    [MODULE_TYPE.GENERAL]: (data: any, onSuccess: (response: any) => void) => {
      return createCurriculumGeneralModule(
        {
          ...data,
          curriculumId,
        },
        { onSuccess },
      );
    },
    [MODULE_TYPE.FIXED]: (data: any, onSuccess: (response: any) => void) => {
      return createCurriculumFixedModule(
        {
          ...data,
          curriculumId,
        },
        { onSuccess },
      );
    },
  };
  // 모듈 업데이트
  const moduleUpdateStrategy = {
    [MODULE_TYPE.GENERAL]: (data: any, onSuccess: (response: any) => void) => {
      const updateData: GeneralModuleUpdateParams = {
        moduleId: data.moduleId,
        moduleName: data.moduleName,
        moduleDescription: data.moduleDescription,
      };
      return updateCurriculumGeneralModule(
        {
          ...updateData,
        },
        { onSuccess },
      );
    },
    [MODULE_TYPE.FIXED]: (data: any, onSuccess: (response: any) => void) => {
      const updateData: FixedModuleUpdateParams = {
        moduleId: data.moduleId,
        moduleName: data.moduleName,
        moduleDescription: data.moduleDescription,
        totalTime: getTimeValueFromHour(data.contentDuration),
      };
      return updateCurriculumFixedModule(
        {
          ...updateData,
        },
        { onSuccess },
      );
    },
  };

  const handleAddNode = (nodeType: MAPPING_CURRICULUM_TYPE, parentNode: TreeNode | null) => {
    // 먼저 상태를 클리어하여 이전 폼을 언마운트
    setFormState({
      activeFormType: null,
      selectedNode: null,
      parentNode: null,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.NONE);

    // 이전 폼의 모든 validator와 필드를 완전히 초기화
    clearAllValidators();

    setTimeout(() => {
      setFormState({
        activeFormType: nodeType,
        selectedNode: parentNode,
        parentNode,
        isEditing: false,
      });
      setFormStatus(FROM_STATUS.CREATE);
      setFormKey((prev) => prev + 1); // 폼 리마운트를 위해 키 증가
    }, 10);
  };

  const handleFormSubmit = (data: any) => {
    const { activeFormType, parentNode, isEditing } = formState;
    switch (activeFormType) {
      case MAPPING_CURRICULUM_TYPE.CURRICULUM: {
        const curriculumData = {
          tenantId: loginUser?.activeTenant?.tenantId,
          channelUuid: data.channelUuid,
          curriculumType: data.curriculumType,
          languageCountryCode: data.languageCountryCode,
          curriculumName: data.curriculumName,
          curriculumDescription: data.curriculumDescription,
          coordinatorName: data.coordinatorName,
          coordinatorUuid: data.coordinatorUuid,
          coordinatorTelCountryCode: data.coordinatorTelNo.nationCode,
          coordinatorTelNo: data.coordinatorTelNo.number,
          isVendored: data.isVendored,
          ...(data.isVendored && {
            vendorCode: data.vendorCode,
            vendorName: data.vendorName,
            vendorTelCountryCode: data.vendorTelNo.nationCode,
            vendorTelNo: data.vendorTelNo.number,
            vendorCoordinatorUuid: data.vendorCoordinatorUuid,
            vendorCoordinatorName: data.vendorCoordinatorName,
          }),
        };
        if (isEditing && formState.selectedNode && curriculumDetail) {
          const updateData = {
            ...curriculumData,
            curriculumId: curriculumDetail.curriculumId,
          };
          updateCurriculum(updateData, {
            onSuccess: (updatedCurriculum: CurriculumResponse) => {
              const newNode: TreeNode = {
                id: updatedCurriculum.curriculumId,
                key: `curriculum-${updatedCurriculum.curriculumId}`,
                name: updatedCurriculum.curriculumName || data.curriculumName,
                type: MAPPING_CURRICULUM_TYPE.CURRICULUM,
                parentId: parentNode?.id || null,
                children: [],
                data: updatedCurriculum,
              };
              handleNodeSelect(newNode);
            },
          });
        } else {
          createCurriculum(curriculumData, {
            onSuccess: (createdCurriculum: CurriculumResponse) => {
              onFormChange();

              if (createdCurriculum.curriculumId && onCurriculumCreated) {
                onCurriculumCreated(createdCurriculum.curriculumId);
              }
              const newNode: TreeNode = {
                id: createdCurriculum.curriculumId,
                key: `curriculum-${createdCurriculum.curriculumId}`,
                name: createdCurriculum.curriculumName || data.curriculumName,
                type: MAPPING_CURRICULUM_TYPE.CURRICULUM,
                parentId: parentNode?.id || null,
                children: [],
                data: createdCurriculum,
              };
              handleNodeSelect(newNode);
            },
          });
        }
        break;
      }
      case MAPPING_CURRICULUM_TYPE.MODULE: {
        const moduleType = data.moduleType;
        if (isEditing && formState.selectedNode) {
          const updateModuleFn = moduleUpdateStrategy[moduleType as MODULE_TYPE];
          if (updateModuleFn) {
            updateModuleFn(data, async (updateModule: any) => {
              const updatedNode: TreeNode = {
                id: updateModule.moduleId,
                key: `module-${updateModule.moduleId}`,
                name: updateModule.moduleName,
                type: MAPPING_CURRICULUM_TYPE.MODULE,
                parentId: parentNode?.id || null,
                children: [],
                data: {
                  moduleId: updateModule.moduleId,
                  ...updateModule,
                },
              };

              setTimeout(() => {
                handleNodeSelect(updatedNode, true); // 수정 완료 후 강제 새로고침
              }, 200);
            });
          }
        } else {
          const moduleData = {
            moduleName: data.moduleName,
            moduleType: data.moduleType,
            moduleDescription: data.moduleDescription,
            curriculumId,
            ...(data.moduleType === MODULE_TYPE.FIXED && {
              orgnId: data.orgnId,
              contentUuid: data.contentUuid,
              contentDuration: data.contentDuration,
            }),
          };

          const createModuleFn = moduleCreateStrategy[moduleType as MODULE_TYPE];
          if (createModuleFn) {
            createModuleFn(moduleData, async (createdModuleId: number) => {
              onFormChange();

              const newNode: TreeNode = {
                id: createdModuleId,
                key: `module-${createdModuleId}`,
                name: data.moduleName,
                type: MAPPING_CURRICULUM_TYPE.MODULE,
                parentId: parentNode?.id || null,
                children: [],
                data: {
                  moduleId: createdModuleId,
                  moduleName: data.moduleName,
                  moduleType: data.moduleType,
                  moduleDescription: data.moduleDescription,
                },
              };

              expandParentNodes(parentNode);
              handleNodeSelect(newNode);
            });
          }
        }
        break;
      }
      case MAPPING_CURRICULUM_TYPE.LESSON:
        if (isEditing && formState.selectedNode) {
          //PARENT NODE가 CURRICULUM, GENERAL MODULE 이면 GENERAL UPDATE
          //PARENT NODE가 FIXED MODULE 이면 FIXED UPDATE
          const isParentCurriculum = parentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
          const isParentFixedModule =
            parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
            parentNode?.data.moduleType === MODULE_TYPE.FIXED;
          const isParentGeneralModule =
            parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
            parentNode?.data.moduleType === MODULE_TYPE.GENERAL;
          // lessonId 추출 (formState.selectedNode.id가 "lesson-123" 형태일 수 있음)
          const extractedLessonId = formState.selectedNode?.id
            ? typeof formState.selectedNode.id === 'string'
              ? parseInt(formState.selectedNode.id.replace('lesson-', ''))
              : formState.selectedNode.id
            : data.lessonId;

          const lessonData = {
            lessonId: extractedLessonId,
            lessonName: data.lessonName,
            lessonDescription: data.lessonDescription,
            learningTime: getTimeValueFromHour(
              data.learningTime as {
                hour: number;
                minute: number;
                second: number;
              },
            ),
          };
          if (isParentCurriculum || isParentGeneralModule) {
            updateLessonByGeneral(lessonData, {
              onSuccess: async (updatedLessonId: number) => {
                onFormChange();
                const updatedNode: TreeNode = {
                  id: updatedLessonId,
                  key: `lesson-${updatedLessonId}`,
                  name: data.lessonName,
                  type: MAPPING_CURRICULUM_TYPE.LESSON,
                  parentId: parentNode?.id || null,
                  children: [],
                  data: {
                    lessonId: updatedLessonId,
                    lessonName: data.lessonName,
                    lessonType: data.lessonType || 'TOC',
                    lessonDescription: data.lessonDescription,
                    learningTime: getTimeValueFromHour(data.learningTime),
                  },
                };
                expandParentNodes(parentNode);
                setTimeout(() => {
                  handleNodeSelect(updatedNode, true); // 수정 완료 후 강제 새로고침
                }, 200);
              },
            });
          } else if (isParentFixedModule) {
            updateLessonByFixed(
              { lessonId: extractedLessonId, lessonName: data.lessonName },
              {
                onSUccess: async (updatedLessonId: number) => {
                  onFormChange();
                  const updatedNode: TreeNode = {
                    id: updatedLessonId,
                    key: `lesson-${updatedLessonId}`,
                    name: data.lessonName,
                    type: MAPPING_CURRICULUM_TYPE.LESSON,
                    parentId: parentNode?.id || null,
                    children: [],
                    data: {
                      lessonId: updatedLessonId,
                      lessonName: data.lessonName,
                      lessonType: data.lessonType || 'TOC',
                      lessonDescription: data.lessonDescription,
                      learningTime: getTimeValueFromHour(data.learningTime),
                      moduleId: parentNode?.data.moduleId,
                    },
                  };
                  expandParentNodes(parentNode);
                  setTimeout(() => {
                    handleNodeSelect(updatedNode, true); // 수정 완료 후 강제 새로고침
                  }, 200);
                },
              },
            );
          }
        } else {
          const lessonData = {
            curriculumId: curriculumDetail?.curriculumId,
            lessonName: data.lessonName,
            lessonDescription: data.lessonDescription,
            lessonType: data.lessonType || 'GENERAL',
            learningTime: getTimeValueFromHour(
              data.learningTime as {
                hour: number;
                minute: number;
                second: number;
              },
            ),
          };

          const lessonDataCurriculum = {
            ...lessonData,
            contentUuid: data.contentUuid,
            contentName: data.contentName,
          };

          const saveLessonData =
            data.lessonType === LESSON_TYPE.GENERAL ? lessonData : lessonDataCurriculum;

          // 부모 노드 타입에 따라 다른 API 호출
          const isParentCurriculum = parentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;

          if (isParentCurriculum) {
            // 커리큘럼에 레슨 추가
            createLessonByCurriculum(
              {
                ...saveLessonData,
                curriculumId,
              },
              {
                onSuccess: async (createdLessonId: any) => {
                  onFormChange();

                  const newNode: TreeNode = {
                    id: createdLessonId,
                    key: `lesson-${createdLessonId}`,
                    name: data.lessonName,
                    type: MAPPING_CURRICULUM_TYPE.LESSON,
                    parentId: parentNode?.id || null,
                    children: [],
                    data: {
                      lessonId: createdLessonId,
                      lessonName: data.lessonName,
                      lessonType: data.lessonType || 'GENERAL',
                      lessonDescription: data.lessonDescription,
                      learningTime: getTimeValueFromHour(data.learningTime),
                    },
                  };

                  expandParentNodes(parentNode);
                  handleNodeSelect(newNode);
                },
              },
            );
          } else {
            // 모듈에 레슨 추가
            createLessonByModule(
              {
                ...saveLessonData,
                moduleId: parentNode?.data.moduleId,
              },
              {
                onSuccess: async (createdLessonId: number) => {
                  onFormChange();

                  const newNode: TreeNode = {
                    id: createdLessonId,
                    key: `lesson-${createdLessonId}`,
                    name: data.lessonName,
                    type: MAPPING_CURRICULUM_TYPE.LESSON,
                    parentId: parentNode?.id || null,
                    children: [],
                    data: {
                      lessonId: createdLessonId,
                      lessonName: data.lessonName,
                      lessonType: data.lessonType || 'TOC',
                      lessonDescription: data.lessonDescription,
                      learningTime: getTimeValueFromHour(data.learningTime),
                      moduleId: parentNode?.data.moduleId,
                    },
                  };

                  expandParentNodes(parentNode);
                  handleNodeSelect(newNode);
                },
              },
            );
          }
        }
        break;
    }
  };

  const handleFormCancel = () => {
    // 이전 폼의 모든 validator와 필드를 완전히 초기화
    clearAllValidators();
    onFormChange();

    setFormState({
      activeFormType: null,
      selectedNode: null,
      parentNode: null,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.NONE);
    setFormKey((prev) => prev + 1); // 폼 리마운트를 위해 키 증가
  };

  // 트리 노드 선택 핸들러
  const handleNodeSelect = (node: TreeNode, forceRefresh = false) => {
    // 같은 노드를 다시 클릭한 경우 처리하지 않음 (강제 새로고침이 아닌 경우)
    if (!forceRefresh && prevSelectedNodeRef.current?.id === node.id) {
      return;
    }

    prevSelectedNodeRef.current = node;
    clearAllValidators();

    setFormState({
      activeFormType: node.type as MAPPING_CURRICULUM_TYPE,
      selectedNode: node,
      parentNode: findParentNode(treeData, node.parentId),
      isEditing: true,
    });
    setFormStatus(FROM_STATUS.EDIT);
    setFormKey((prev) => prev + 1); // 폼 리마운트를 위해 키 증가
  };

  const { renderNodeButtons, renderCustomTreeButtons } = useTreeButtons({
    onAddNode: handleAddNode,
    formState,
  });

  const customTreeRenderButton = () => {
    if (mode === FORM_MODE.create) {
      return renderCustomTreeButtons(() => handleAddNode(MAPPING_CURRICULUM_TYPE.CURRICULUM, null));
    }
  };

  const customFormActionButton = () => {
    if (
      formStatus !== FROM_STATUS.NONE &&
      (mode === FORM_MODE.create || mode === FORM_MODE.detail)
    ) {
      return (
        <>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
          >
            {t('LABEL.button.delete')}
          </Button>
          <Button
            type="button"
            variant="save"
            size="sm"
            onClick={async () => {
              const isValid = await onFormValid();
              if (isValid) {
                const formData = watch();
                handleFormSubmit(formData);
              }
            }}
          >
            {t('LABEL.button.save')}
          </Button>
        </>
      );
    }
    return null;
  };
  return (
    <SectionLayout contentsRatio="half">
      <TreeContainer>
        <TreeBox
          treeId={'curriculum-tree'}
          data={treeData}
          selectedNode={formState.selectedNode}
          customButtonNode={customTreeRenderButton()}
          renderNodeButtons={renderNodeButtons}
          handleSelectedNodeChange={handleNodeSelect}
          type="DRAG_DROP"
          title="목차"
          expandedKeys={expandedKeys}
          onExpandedKeysChange={setExpandedKeys}
          emptyMessage={
            mode === FORM_MODE.create
              ? "'신규등록'버튼을 클릭하여 커리큘럼을 추가해주세요."
              : isLoadingDetail
                ? '로딩 중...'
                : '데이터가 없습니다.'
          }
        />
      </TreeContainer>
      <div className={layoutStyles.inner}>
        <FormSubTitle label={'상세 정보'} lineType="dark" actionNode={customFormActionButton()} />
        <form ref={formRef}>
          <NodeFormRenderer
            key={`${formState.activeFormType}-${formState.isEditing ? 'edit' : 'create'}-${formState.selectedNode?.id || 'new'}-${formKey}`}
            formState={formState}
            onFormSubmit={handleFormSubmit}
            onFormCancel={handleFormCancel}
            provider={provider}
            updateFormData={updateFormData}
            watch={watch}
            clearAllValidators={clearAllValidators}
            curriculumData={{
              tenantId: curriculumDetail?.tenantId || loginUser?.activeTenant?.tenantId,
              channelUuid: curriculumDetail?.channelUuid,
              contentType: undefined,
            }}
          />
        </form>
      </div>
    </SectionLayout>
  );
};

export const CurriculumDetail = CurriculumDetailComponent;
