#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * FSD 아키텍처 위반 사항 검출 스크립트
 *
 * 검출 항목:
 * 1. 계층 간 의존성 위반
 * 2. 같은 레벨 간 import
 * 3. Public API 우회
 * 4. 잘못된 폴더 구조
 */

// FSD 계층 정의 (상위 → 하위)
const FSD_LAYERS = {
  app: 0,
  pages: 1,
  widgets: 2,
  features: 3,
  entities: 4,
  shared: 5,
};

// 색상 출력을 위한 유틸리티
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

class FSDChecker {
  constructor() {
    this.violations = [];
    this.stats = {
      totalFiles: 0,
      violationCount: 0,
      layerViolations: 0,
      sameLayerViolations: 0,
      publicApiViolations: 0,
      structureViolations: 0,
      missingIndexViolations: 0,
    };
  }

  /**
   * 파일에서 import 문을 추출
   */
  extractImports(content) {
    const importRegex = /import\s+(?:(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"])/g;
    const imports = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  /**
   * 파일 경로에서 FSD 계층 추출
   */
  getLayerFromPath(filePath) {
    const srcMatch = filePath.match(/src\/([^/]+)/);
    if (!srcMatch) return null;

    const layer = srcMatch[1];
    return FSD_LAYERS.hasOwnProperty(layer) ? layer : null;
  }

  /**
   * import 경로에서 FSD 계층 추출
   */
  getLayerFromImport(importPath) {
    const match = importPath.match(/^@([^/]+)/);
    if (!match) return null;

    const layer = match[1];
    return FSD_LAYERS.hasOwnProperty(layer) ? layer : null;
  }

  /**
   * 계층 간 의존성 위반 검사
   */
  checkLayerViolation(fromLayer, toLayer) {
    if (!fromLayer || !toLayer) return false;

    const fromLevel = FSD_LAYERS[fromLayer];
    const toLevel = FSD_LAYERS[toLayer];

    // 상위 계층에서 하위 계층으로만 import 가능
    return fromLevel > toLevel;
  }

  /**
   * 같은 레벨 간 import 검사
   */
  checkSameLayerViolation(fromLayer, toLayer, fromPath, importPath) {
    if (!fromLayer || !toLayer || fromLayer !== toLayer) return false;

    // shared는 같은 레벨 간 import 허용
    if (fromLayer === 'shared') return false;

    // 같은 모듈 내부 import는 허용
    const fromModule = this.getModuleFromPath(fromPath);
    const toModule = this.getModuleFromImport(importPath);

    return fromModule !== toModule;
  }

  /**
   * 파일 경로에서 모듈명 추출 (중첩 슬라이스 고려)
   */
  getModuleFromPath(filePath) {
    const match = filePath.match(/src\/([^/]+)\/(.+)/);
    if (!match) return null;

    const [, layer, remainingPath] = match;
    
    // segment 디렉토리를 찾을 때까지 경로를 탐색
    const pathParts = remainingPath.split('/');
    const segmentNames = ['ui', 'api', 'model', 'service', 'lib', 'config'];
    
    // segment를 찾기 전까지의 경로를 모듈로 간주
    for (let i = 0; i < pathParts.length; i++) {
      if (segmentNames.includes(pathParts[i])) {
        return pathParts.slice(0, i).join('/');
      }
    }
    
    // segment를 찾지 못한 경우 전체 경로를 모듈로 간주
    return remainingPath.split('/')[0];
  }

  /**
   * import 경로에서 모듈명 추출 (중첩 슬라이스 고려)
   */
  getModuleFromImport(importPath) {
    const match = importPath.match(/^@([^/]+)\/(.+)/);
    if (!match) return null;

    const [, layer, remainingPath] = match;
    
    // segment 디렉토리를 찾을 때까지 경로를 탐색
    const pathParts = remainingPath.split('/');
    const segmentNames = ['ui', 'api', 'model', 'service', 'lib', 'config'];
    
    // segment를 찾기 전까지의 경로를 모듈로 간주
    for (let i = 0; i < pathParts.length; i++) {
      if (segmentNames.includes(pathParts[i])) {
        return pathParts.slice(0, i).join('/');
      }
    }
    
    // segment를 찾지 못한 경우 전체 경로를 모듈로 간주
    return remainingPath.split('/')[0];
  }

  /**
   * Public API 우회 검사
   */
  checkPublicApiViolation(importPath) {
    // @layer/module/internal-path 형태는 Public API 우회
    const match = importPath.match(/^@([^/]+)\/([^/]+)\/(.+)/);
    if (!match) return false;

    const [, layer, module, internalPath] = match;

    // ui/, api/, model/ 등 내부 구조에 직접 접근하는 경우
    const internalPaths = ['ui/', 'api/', 'model/', 'service/', 'lib/'];
    return internalPaths.some((internal) => internalPath.startsWith(internal));
  }

  /**
   * 슬라이스별 index.ts 파일 존재 여부 검사
   */
  checkMissingIndexFiles() {
    const layers = ['entities', 'features', 'widgets'];

    layers.forEach((layer) => {
      const layerPath = `apps/*/src/${layer}`;
      const sliceDirs = glob.sync(layerPath, { onlyDirectories: true });

      sliceDirs.forEach((sliceDir) => {
        // 재귀적으로 모든 중첩된 슬라이스와 모듈을 검사
        this.checkSliceRecursively(sliceDir);
      });
    });
  }

  /**
   * 재귀적으로 슬라이스 디렉토리를 검사하여 index.ts가 필요한 모듈을 찾음
   */
  checkSliceRecursively(dirPath) {
    const subdirs = glob.sync(`${dirPath}/*`, { onlyDirectories: true });

    // 현재 디렉토리의 하위에 segment들이 있는지 확인
    const hasSegments = subdirs.some((subdir) => this.isSegmentDirectory(subdir));

    if (hasSegments) {
      // segment들이 있다면 현재 디렉토리가 slice의 최종 레벨 -> index.ts 필요
      const indexPath = path.join(dirPath, 'index.ts');
      const indexJsPath = path.join(dirPath, 'index.js');

      if (!fs.existsSync(indexPath) && !fs.existsSync(indexJsPath)) {
        // segment들 중에 실제 파일이 있는지 확인
        const hasFiles = subdirs.some((subdir) => {
          if (this.isSegmentDirectory(subdir)) {
            return glob.sync(`${subdir}/**/*.{ts,tsx,js,jsx}`, {
              ignore: ['**/node_modules/**', '**/dist/**'],
            }).length > 0;
          }
          return false;
        });

        if (hasFiles) {
          this.addViolation({
            type: 'missing_index_violation',
            file: dirPath,
            message: `${dirPath}에 index.ts 파일이 없습니다. segment들을 통합하는 Public API를 위해 index.ts를 추가하세요`,
          });
          this.stats.missingIndexViolations++;
        }
      }
    } else {
      // segment가 없다면 더 깊은 slice 구조 -> 재귀 탐색
      subdirs.forEach((subdir) => {
        this.checkSliceRecursively(subdir);
      });
    }
  }

  /**
   * 디렉토리가 segment인지 판단 (ui, api, model, service, lib 등)
   */
  isSegmentDirectory(dirPath) {
    const dirName = path.basename(dirPath);
    const segmentNames = [
      'ui', 'api', 'model', 'service', 'lib', 'config',
      'hooks', 'store', 'utils', 'types', 'constants',
      'm.ui', 'styles', 'assets', 'components'
    ];
    return segmentNames.includes(dirName);
  }

  /**
   * index.ts 파일의 내용 검사
   */
  checkIndexFileContent(filePath) {
    if (!filePath.endsWith('/index.ts') && !filePath.endsWith('/index.js')) {
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const moduleDir = path.dirname(filePath);

      // 내부 구조 폴더들 확인
      const internalDirs = ['ui', 'api', 'model', 'service', 'lib'];
      const existingDirs = internalDirs.filter((dir) => fs.existsSync(path.join(moduleDir, dir)));

      // 각 내부 디렉토리에 대한 export가 있는지 확인
      existingDirs.forEach((dir) => {
        const exportPattern = new RegExp(`from\\s+['"]\\.\\/${dir}`, 'g');
        const hasExport = exportPattern.test(content);

        if (!hasExport) {
          // 해당 디렉토리에 실제 파일이 있는지 확인
          const hasFiles =
            glob.sync(`${moduleDir}/${dir}/**/*.{ts,tsx,js,jsx}`, {
              ignore: ['**/node_modules/**', '**/dist/**'],
            }).length > 0;

          if (hasFiles) {
            this.addViolation({
              type: 'incomplete_index_violation',
              file: filePath,
              message: `${filePath}에서 ./${dir} 디렉토리의 export가 누락되었습니다`,
            });
            this.stats.missingIndexViolations++;
          }
        }
      });
    } catch (error) {
      // 파일 읽기 오류는 무시
    }
  }

  /**
   * 파일 분석
   */
  analyzeFile(filePath) {
    this.stats.totalFiles++;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = this.extractImports(content);
      const fileLayer = this.getLayerFromPath(filePath);

      // index.ts 파일 내용 검사
      this.checkIndexFileContent(filePath);

      if (!fileLayer) return;

      imports.forEach((importPath) => {
        // 외부 라이브러리나 상대 경로는 건너뛰기
        if (!importPath.startsWith('@') || importPath.startsWith('@learnway')) {
          return;
        }

        const importLayer = this.getLayerFromImport(importPath);

        // 계층 간 의존성 위반 검사
        if (this.checkLayerViolation(fileLayer, importLayer)) {
          this.addViolation({
            type: 'layer_violation',
            file: filePath,
            import: importPath,
            fromLayer: fileLayer,
            toLayer: importLayer,
            message: `${fileLayer} → ${importLayer} import는 FSD 계층 규칙에 위배됩니다`,
          });
          this.stats.layerViolations++;
        }

        // 같은 레벨 간 import 검사
        if (this.checkSameLayerViolation(fileLayer, importLayer, filePath, importPath)) {
          this.addViolation({
            type: 'same_layer_violation',
            file: filePath,
            import: importPath,
            fromLayer: fileLayer,
            toLayer: importLayer,
            message: `같은 ${fileLayer} 계층 간 import는 금지됩니다`,
          });
          this.stats.sameLayerViolations++;
        }

        // Public API 우회 검사
        if (this.checkPublicApiViolation(importPath)) {
          this.addViolation({
            type: 'public_api_violation',
            file: filePath,
            import: importPath,
            message: `Public API를 우회하는 import입니다. index.ts를 통해 import하세요`,
          });
          this.stats.publicApiViolations++;
        }
      });
    } catch (error) {
      console.error(`Error analyzing file ${filePath}:`, error.message);
    }
  }

  /**
   * 위반 사항 추가
   */
  addViolation(violation) {
    this.violations.push(violation);
    this.stats.violationCount++;
  }

  /**
   * 폴더 구조 검사
   */
  checkFolderStructure() {
    const srcPath = path.join(process.cwd(), 'apps');

    // 잘못된 폴더 구조 검사
    const invalidFolders = ['components', 'types', 'utils', 'helpers'];

    glob
      .sync(`${srcPath}/**/src/+(${invalidFolders.join('|')})`, { onlyDirectories: true })
      .forEach((folderPath) => {
        const folderName = path.basename(folderPath);
        this.addViolation({
          type: 'structure_violation',
          file: folderPath,
          message: `'${folderName}' 폴더는 FSD 구조에 맞지 않습니다. shared/ 하위로 이동하세요`,
        });
        this.stats.structureViolations++;
      });
  }

  /**
   * 분석 실행
   */
  run() {
    console.log(`${colors.blue}🔍 FSD 아키텍처 위반 사항 검사를 시작합니다...${colors.reset}\n`);

    // TypeScript/JavaScript 파일 검사
    const files = glob.sync('apps/*/src/**/*.{ts,tsx,js,jsx}', {
      ignore: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', '**/routeTree.gen.ts'],
    });

    files.forEach((file) => this.analyzeFile(file));

    // 폴더 구조 검사
    this.checkFolderStructure();

    // index.ts 파일 존재 여부 검사
    this.checkMissingIndexFiles();

    this.printReport();
  }

  /**
   * 결과 보고서 출력
   */
  printReport() {
    console.log(`${colors.cyan}📊 FSD 아키텍처 검사 결과${colors.reset}`);
    console.log(`${'='.repeat(50)}\n`);

    // 통계 출력
    console.log(`📁 검사한 파일: ${this.stats.totalFiles}개`);
    console.log(`⚠️  총 위반 사항: ${this.stats.violationCount}개\n`);

    if (this.stats.violationCount === 0) {
      console.log(`${colors.green}✅ FSD 아키텍처 위반 사항이 발견되지 않았습니다!${colors.reset}`);
      return;
    }

    // 위반 유형별 통계
    console.log(`${colors.yellow}📋 위반 유형별 통계:${colors.reset}`);
    console.log(`   • 계층 간 의존성 위반: ${this.stats.layerViolations}개`);
    console.log(`   • 같은 레벨 간 import: ${this.stats.sameLayerViolations}개`);
    console.log(`   • Public API 우회: ${this.stats.publicApiViolations}개`);
    console.log(`   • 잘못된 폴더 구조: ${this.stats.structureViolations}개`);
    console.log(`   • index.ts 관련 위반: ${this.stats.missingIndexViolations}개\n`);

    // 위반 사항 상세 출력
    this.printViolationsByType();

    // 개선 제안
    this.printSuggestions();

    // 종료 코드 설정 (CI/CD에서 사용)
    process.exit(this.stats.violationCount > 0 ? 1 : 0);
  }

  /**
   * 위반 유형별 상세 출력
   */
  printViolationsByType() {
    const groupedViolations = this.violations.reduce((acc, violation) => {
      if (!acc[violation.type]) acc[violation.type] = [];
      acc[violation.type].push(violation);
      return acc;
    }, {});

    const typeNames = {
      layer_violation: '🚫 계층 간 의존성 위반',
      same_layer_violation: '🔄 같은 레벨 간 import',
      public_api_violation: '📦 Public API 우회',
      structure_violation: '📁 잘못된 폴더 구조',
      missing_index_violation: '📋 index.ts 파일 누락',
      incomplete_index_violation: '📋 index.ts 내용 불완전',
    };

    Object.entries(groupedViolations).forEach(([type, violations]) => {
      console.log(`${colors.red}${typeNames[type]}:${colors.reset}`);
      violations.forEach((violation) => {
        console.log(`   ${violation.file}`);
        if (violation.import) {
          console.log(`   └── ${violation.import}`);
        }
        console.log(`   └── ${violation.message}\n`);
      });
    });
  }

  /**
   * 개선 제안 출력
   */
  printSuggestions() {
    console.log(`${colors.magenta}💡 개선 제안:${colors.reset}`);
    console.log(`   • CONTRIBUTING.md 문서를 참고하세요`);
    console.log(`   • 계층 간 의존성 규칙을 확인하세요`);
    console.log(`   • Public API(index.ts)를 통해 모듈을 import하세요`);
    console.log(`   • 각 슬라이스에 index.ts 파일을 생성하세요`);
    console.log(`   • index.ts에서 모든 내부 모듈을 적절히 export하세요`);
    console.log(`   • shared/ 계층을 활용하여 공통 코드를 분리하세요\n`);

    console.log(`${colors.blue}🔧 자동 수정 가능한 항목:${colors.reset}`);
    console.log(`   npm run lint:fix`);
    console.log(`   npm run lint:imports\n`);
  }
}

// 스크립트 실행
if (require.main === module) {
  const checker = new FSDChecker();
  checker.run();
}

module.exports = FSDChecker;
