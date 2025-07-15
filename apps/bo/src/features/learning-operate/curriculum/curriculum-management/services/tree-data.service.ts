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

    // moduleList가 있으면 모듈들을 children으로 추가 (상세조회 응답인 경우)
    if (detailResponse.moduleList && detailResponse.moduleList.length > 0) {
      curriculumNode.children = detailResponse.moduleList.map((module, index: number) => ({
        id: `module-${module.moduleId}`,
        key: `module-${module.moduleId}`,
        name: module.moduleName || `모듈 ${index + 1}`,
        title: module.moduleName,
        mappingCurriculumType: module.mappingCurriculumType, // 모듈 , 레슨 타입 정보
        type: module.isDummy ? 'LESSON' : 'MODULE',
        moduleType: module.moduleType,
        level: 1,
        parentId: curriculumNode.id,
        data: {
          moduleId: module.moduleId,
          moduleName: module.moduleName,
          description: module.description,
          moduleType: module.moduleType,
          sortOrder: module.sortOrder,
          isDummy: module.isDummy,
          mappingCurriculumType: module.mappingCurriculumType,
          moduleIndex: index,
        },
        children: module.lessonList
          ? module.lessonList.map((lesson, lessonIndex: number) => ({
              id: `lesson-${lesson.lessonId}`,
              key: `lesson-${lesson.lessonId}`,
              name: lesson.lessonName || `레슨 ${lessonIndex + 1}`,
              type: 'LESSON',
              level: 2,
              parentId: `module-${module.moduleId}`,
              data: {
                lessonId: lesson.lessonId,
                lessonName: lesson.lessonName,
                description: lesson.description,
                mappingCurriculumType: lesson.mappingCurriculumType,
              },
              children: [],
            }))
          : [],
      }));
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
}

// 편의를 위한 함수 export
export const buildTreeFromCurriculumData = TreeDataService.buildTreeFromCurriculumData;
export const findNodeById = TreeDataService.findNodeById;
export const findParentNode = TreeDataService.findParentNode;
export const generateDefaultNodeName = TreeDataService.generateDefaultNodeName;
export const validateTreeStructure = TreeDataService.validateTreeStructure;
