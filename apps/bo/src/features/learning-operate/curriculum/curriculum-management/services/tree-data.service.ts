import { TreeNode } from '@learnway/ui';
import { CurriculumDetailResponse, CurriculumResponse } from '@types';

/**
 * 커리큘럼 데이터를 TreeNode 배열로 변환하는 서비스
 */
export class TreeDataService {
  /**
   * 커리큘럼 응답 데이터를 TreeBox에서 사용할 수 있는 TreeNode 구조로 변환
   * @param curriculum - 서버에서 받은 커리큘럼 데이터
   * @returns TreeNode 배열
   */
  static buildTreeFromCurriculumData(
    curriculum: CurriculumDetailResponse | CurriculumResponse | null,
  ): TreeNode[] {
    if (!curriculum) return [];

    const curriculumNode: TreeNode = {
      id: `curriculum-${curriculum.curriculumId}`,
      key: `curriculum-${curriculum.curriculumId}`,
      name: curriculum.curriculumName || '제목 없음',
      title: curriculum.curriculumName || '제목 없음',
      type: 'CURRICULUM',
      level: 0,
      parentId: null,
      data: {
        curriculumId: curriculum.curriculumId,
        curriculumType: curriculum.curriculumType,
        channelUuid: curriculum.channelUuid,
        tenantId: curriculum.tenantId,
        curriculumName: curriculum.curriculumName,
        description: curriculum.curriculumDescription,
        languageCountryCode: curriculum.languageCountryCode,
        coordinatorName: curriculum.coordinatorName,
        coordinatorTelNo: curriculum.coordinatorTelNo,
        isVendored: curriculum.isVendored,
        vendorCoordinatorName: curriculum.vendorCoordinatorName,
        vendorTelNo: curriculum.vendorTelNo,
      },
      children: [],
    };

    // CurriculumDetailResponse인지 확인 (moduleList 속성이 있는지)
    const detailResponse = curriculum as CurriculumDetailResponse;

    // moduleList가 있으면 mappingCurriculumType에 따라 처리 (상세조회 응답인 경우)
    if (detailResponse.moduleList && detailResponse.moduleList.length > 0) {
      curriculumNode.children = detailResponse.moduleList
        .map((item, index: number) => {
          // mappingCurriculumType에 따른 분기 처리
          switch (item.mappingCurriculumType) {
            case 'MODULE':
              return {
                id: `module-${item.moduleId}`,
                key: `module-${item.moduleId}`,
                name: item.moduleName || `모듈 ${index + 1}`,
                title: item.moduleName,
                mappingCurriculumType: item.mappingCurriculumType,
                type: 'MODULE',
                moduleType: item.moduleType,
                level: 1,
                parentId: curriculumNode.id,
                sortOrder: item.sortOrder || index + 1,
                data: {
                  moduleId: item.moduleId,
                  moduleName: item.moduleName,
                  description: item.description,
                  moduleType: item.moduleType,
                  sortOrder: item.sortOrder,
                  isDummy: item.isDummy,
                  mappingCurriculumType: item.mappingCurriculumType,
                  moduleIndex: index,
                },
                children: item.lessonList
                  ? item.lessonList.map((lesson, lessonIndex: number) => ({
                      id: `lesson-${lesson.lessonId}`,
                      key: `lesson-${lesson.lessonId}`,
                      name: lesson.lessonName || `레슨 ${lessonIndex + 1}`,
                      title: lesson.lessonName,
                      type: 'LESSON',
                      level: 2,
                      parentId: `module-${item.moduleId}`,
                      sortOrder: lesson.sortOrder || lessonIndex + 1,
                      data: {
                        lessonId: lesson.lessonId,
                        lessonName: lesson.lessonName,
                        description: lesson.lessonDescription,
                        mappingCurriculumType: lesson.mappingCurriculumType,
                        moduleType: item.moduleType,
                        sortOrder: lesson.sortOrder || lessonIndex + 1,
                      },
                      children: [],
                    }))
                  : [],
              };

            case 'LESSON':
              // moduleList에 있지만 실제로는 레슨인 경우 (커리큘럼 바로 아래 레슨)
              return {
                id: `lesson-${item.lessonId}`,
                key: `lesson-${item.lessonId}`,
                name: item.lessonName || `레슨 ${index + 1}`,
                title: item.lessonName,
                mappingCurriculumType: item.mappingCurriculumType,
                type: 'LESSON',
                level: 1, // 커리큘럼 바로 아래 레슨
                parentId: curriculumNode.id,
                moduleId: item.moduleId,
                sortOrder: item.sortOrder || index + 1,
                data: {
                  lessonId: item.lessonId,
                  lessonName: item.lessonName,
                  lessonType: item.lessonType,
                  contentType: item.contentType,
                  contentUuid: item.contentUuid,
                  learningTime: item.learningTime,
                  description: item.lessonDescription,
                  mappingCurriculumType: item.mappingCurriculumType,
                  sortOrder: item.sortOrder,
                },
                children: [],
              };

            default:
              console.warn(`Unknown mappingCurriculumType: ${item.mappingCurriculumType}`);
              // 기본값으로 기존 로직 사용
              return {
                id: `module-${item.moduleId}`,
                key: `module-${item.moduleId}`,
                name: item.moduleName || `모듈 ${index + 1}`,
                title: item.moduleName,
                mappingCurriculumType: item.mappingCurriculumType,
                type: item.isDummy ? 'LESSON' : 'MODULE',
                moduleType: item.moduleType,
                level: 1,
                parentId: curriculumNode.id,
                sortOrder: item.sortOrder || index + 1,
                data: {
                  moduleId: item.moduleId,
                  moduleName: item.moduleName,
                  description: item.description,
                  moduleType: item.moduleType,
                  sortOrder: item.sortOrder,
                  isDummy: item.isDummy,
                  mappingCurriculumType: item.mappingCurriculumType,
                  moduleIndex: index,
                },
                children: item.lessonList
                  ? item.lessonList.map((lesson, lessonIndex: number) => ({
                      id: `lesson-${lesson.lessonId}`,
                      key: `lesson-${lesson.lessonId}`,
                      name: lesson.lessonName || `레슨 ${lessonIndex + 1}`,
                      title: lesson.lessonName,
                      type: 'LESSON',
                      level: 2,
                      parentId: `module-${item.moduleId}`,
                      sortOrder: lesson.sortOrder || lessonIndex + 1,
                      data: {
                        lessonId: lesson.lessonId,
                        lessonName: lesson.lessonName,
                        description: lesson.lessonDescription,
                        mappingCurriculumType: lesson.mappingCurriculumType,
                        moduleType: item.moduleType,
                        sortOrder: lesson.sortOrder || lessonIndex + 1,
                      },
                      children: [],
                    }))
                  : [],
              };
          }
        })
        .filter(Boolean); // null/undefined 항목 제거
    }

    return [curriculumNode];
  }

  /**
   * TreeNode에서 특정 타입의 노드 찾기
   * @param nodes - TreeNode 배열
   * @param nodeId - 찾을 노드 ID
   * @returns 찾은 노드 또는 null
   */
  static findNodeById(nodes: TreeNode[], nodeId: string): TreeNode | null {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeById(node.children, nodeId);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * TreeNode에서 부모 노드 찾기
   * @param nodes - TreeNode 배열
   * @param parentId - 부모 노드 ID
   * @returns 찾은 부모 노드 또는 null
   */
  static findParentNode(nodes: TreeNode[], parentId: string | null): TreeNode | null {
    if (!parentId) return null;
    return TreeDataService.findNodeById(nodes, parentId);
  }

  /**
   * 노드 타입별 기본 이름 생성
   * @param nodeType - 노드 타입
   * @param parentNode - 부모 노드 (순서 계산용)
   * @returns 기본 이름
   */
  static generateDefaultNodeName(nodeType: string, parentNode?: TreeNode | null): string {
    switch (nodeType) {
      case 'CURRICULUM':
        return '새 커리큘럼';
      // case 'MODULE':
      //   const moduleCount = parentNode?.children?.length || 0;
      //   return `모듈 ${moduleCount + 1}`;
      // case 'UNIT':
      //   const unitCount = parentNode?.children?.length || 0;
      //   return `유닛 ${unitCount + 1}`;
      default:
        return '새 항목';
    }
  }

  /**
   * 트리 구조 검증
   * @param nodes - TreeNode 배열
   * @returns 검증 결과
   */
  static validateTreeStructure(nodes: TreeNode[]): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    const validateNode = (node: TreeNode, expectedLevel: number) => {
      if (node.level !== expectedLevel) {
        errors.push(
          `노드 ${node.name}의 레벨이 올바르지 않습니다. 예상: ${expectedLevel}, 실제: ${node.level}`,
        );
      }

      if (node.children) {
        node.children.forEach((child) => {
          if (child.parentId !== node.id) {
            errors.push(`자식 노드 ${child.name}의 parentId가 올바르지 않습니다.`);
          }
          validateNode(child, expectedLevel + 1);
        });
      }
    };

    nodes.forEach((node) => validateNode(node, 0));

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * TreeNode 배열에서 특정 ID의 노드를 찾고 드래그 관련 정보를 추출
   * @param treeNodes - TreeNode 배열
   * @param nodeId - 찾을 노드 ID
   * @returns 노드와 드랍 위치 정보
   */
  static findNodeForDnd(
    treeNodes: TreeNode[],
    nodeId: string | number,
  ): { node: TreeNode; dropPosition: 'BEFORE' | 'AFTER' | 'INSIDE' } | null {
    const node = TreeDataService.findNodeById(treeNodes, nodeId.toString());
    if (!node) return null;

    // 기본적으로 INSIDE로 설정 (필요시 로직 수정 가능)
    return {
      node,
      dropPosition: 'INSIDE',
    };
  }
}

// 편의를 위한 함수 export
export const buildTreeFromCurriculumData = TreeDataService.buildTreeFromCurriculumData;
export const findNodeById = TreeDataService.findNodeById;
export const findParentNode = TreeDataService.findParentNode;
export const generateDefaultNodeName = TreeDataService.generateDefaultNodeName;
export const validateTreeStructure = TreeDataService.validateTreeStructure;
export const findNodeForDnd = TreeDataService.findNodeForDnd;
