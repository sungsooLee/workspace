#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-this-alias */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const yaml = require('js-yaml');
const mkdirp = require('mkdirp');

// 한글 문자 감지 (유니코드 범위: AC00-D7A3)
const KOREAN_REGEX = /[\uAC00-\uD7A3]/;

// CLI 명령어 처리
const args = process.argv.slice(2);
const command = args[0];
let appName = null;

// --app 파라미터 파싱
for (let i = 1; i < args.length; i++) {
  if (args[i].startsWith('--app=')) {
    appName = args[i].split('=')[1];
    break;
  }
}

// 앱 경로 설정
let configPath = 'i18n-automation.config.yaml';
let basePath = './';

if (appName) {
  configPath = `apps/${appName}/i18n-automation.config.yaml`;
  basePath = `apps/${appName}/`;
  console.log(`Running for app: ${appName}`);
}

// 설정 파일 읽기
function loadConfig() {
  if (!fs.existsSync(configPath)) {
    return {
      runOn: 'vite', // default: vite (react-i18next)
      extract: {
        targetPaths: [`${basePath}src`],
        outputPath: `${basePath}public/locales`,
        locales: ['ko', 'en'],
        namespaces: ['common'],
      },
      tWrap: {
        targetPaths: [`${basePath}src`],
        ignorePaths: [],
      },
    };
  }

  return yaml.load(fs.readFileSync(configPath, 'utf8'));
}

// 설정 값 로드
const config = loadConfig();
const importModuleName = config.runOn === 'vite' ? 'react-i18next' : 'next-i18next';

// 파일 경로가 무시 경로에 포함되는지 확인
function isPathIgnored(filePath, ignorePaths) {
  return ignorePaths.some((ignorePath) => filePath.includes(ignorePath));
}

// 모든 대상 파일 목록 생성
function getTargetFiles(targetPaths, ignorePaths = []) {
  const files = [];

  targetPaths.forEach((targetPath) => {
    // basePath와 targetPath를 결합
    const fullPath = path.join(basePath, targetPath);
    console.log(`Looking in: ${fullPath}`);

    // 패턴 설정
    const pattern = path.join(fullPath, '**/*.{js,jsx,ts,tsx}');
    console.log(`Search pattern: ${pattern}`);

    const matchedFiles = glob.sync(pattern, { ignore: ['**/node_modules/**'] });
    console.log(`Found ${matchedFiles.length} files matching pattern`);

    if (matchedFiles.length > 0) {
      console.log(`Sample files:`, matchedFiles.slice(0, 3));
    }

    matchedFiles.forEach((file) => {
      if (!isPathIgnored(file, ignorePaths)) {
        files.push(file);
      } else {
        console.log(`Ignoring file: ${file}`);
      }
    });
  });

  return files;
}

// AST에서 특정 노드 타입을 찾는 함수
function find(ast, predicate) {
  const paths = [];

  traverse(ast, {
    enter(path) {
      if (predicate(path.node)) {
        paths.push(path);
      }
    },
  });

  return paths;
}

// 노드에서 특정 조건을 만족하는 자식 노드가 있는지 확인
function has(path, predicate) {
  let result = false;

  traverse(
    path.node,
    {
      enter(childPath) {
        if (predicate(childPath.node)) {
          result = true;
          childPath.stop();
        }
      },
    },
    path.scope,
    path,
  );

  return result;
}

// 한글 문자를 포함하는지 확인
function hasKorean(text) {
  return KOREAN_REGEX.test(text);
}

// t로 감싸는 클래스
class TWrapTransformer {
  constructor() {
    this.importModuleName = importModuleName;
    this.isWrappedByT = false;
  }

  // 함수형 컴포넌트, 화살표 함수, 일반 함수 추출
  getFunctionLikes(ast) {
    return [
      ...find(ast, t.isArrowFunctionExpression),
      ...find(ast, t.isFunctionDeclaration),
      ...find(ast, t.isFunctionExpression),
    ].filter(this.needTranslation.bind(this));
  }

  // 번역이 필요한지 확인 (JSX요소 또는 Hook 포함)
  needTranslation(path) {
    const isJSXElement = has(path, (node) => t.isJSXElement(node));
    const isHook =
      path.node.id && t.isIdentifier(path.node.id) && /use[A-Z][a-zA-Z0-9]/.test(path.node.id.name);

    return isJSXElement || isHook;
  }

  // 최상위 함수인지 확인
  isTopLevelFunction(path) {
    return !path.findParent(
      (parent) =>
        t.isArrowFunctionExpression(parent.node) ||
        t.isFunctionDeclaration(parent.node) ||
        t.isFunctionExpression(parent.node),
    );
  }

  // 화살표 함수의 암시적 반환을 명시적 반환으로 변환
  makeBlockStatement(functionLikes) {
    functionLikes.forEach((path) => {
      if (t.isArrowFunctionExpression(path.node) && !t.isBlockStatement(path.node.body)) {
        const returnStatement = t.returnStatement(path.node.body);
        const blockStatement = t.blockStatement([returnStatement]);
        path.node.body = blockStatement;
      }
    });
  }

  // StringLiteral을 t함수로 래핑 - 개선된 버전
  wrapStringLiteral(functionLikes) {
    const self = this;
    functionLikes.forEach((path) => {
      const visitor = {
        StringLiteral(stringPath) {
          const { value } = stringPath.node;

          if (
            hasKorean(value) &&
            !stringPath.findParent(
              (p) =>
                (t.isCallExpression(p.node) &&
                  t.isIdentifier(p.node.callee) &&
                  p.node.callee.name === 't') ||
                t.isImportDeclaration(p.node) ||
                t.isJSXAttribute(p.node),
            )
          ) {
            // 숫자 패턴 체크
            const hasNumberPattern = /\d+[가-힣]+/.test(value);
            const hasRangePattern = /\d+[가-힣]+\s*~\s*\d+[가-힣]+/.test(value);

            if (hasRangePattern) {
              // 범위 패턴 (예: "1일 ~ 2일")
              const pattern = /(\d+)([가-힣]+)\s*~\s*(\d+)([가-힣]+)/;
              const matches = value.match(pattern);

              if (matches) {
                const [_, num1, unit1, num2, unit2] = matches;
                const templateKey = `{{number1}}${unit1} ~ {{number2}}${unit2}`;

                const callExpression = t.callExpression(t.identifier('t'), [
                  t.stringLiteral(templateKey),
                  t.objectExpression([
                    t.objectProperty(t.identifier('number1'), t.numericLiteral(parseInt(num1))),
                    t.objectProperty(t.identifier('number2'), t.numericLiteral(parseInt(num2))),
                  ]),
                ]);

                stringPath.replaceWith(callExpression);
              }
            } else if (hasNumberPattern) {
              // 단일 숫자 패턴 (예: "1개월")
              const pattern = /(\d+)([가-힣]+)/;
              const matches = value.match(pattern);

              if (matches) {
                const [_, number, unit] = matches;
                const templateKey = `{{number}}${unit}`;

                const callExpression = t.callExpression(t.identifier('t'), [
                  t.stringLiteral(templateKey),
                  t.objectExpression([
                    t.objectProperty(t.identifier('number'), t.numericLiteral(parseInt(number))),
                  ]),
                ]);

                stringPath.replaceWith(callExpression);
              }
            } else {
              // 일반 문자열
              const callExpression = t.callExpression(t.identifier('t'), [t.stringLiteral(value)]);

              stringPath.replaceWith(callExpression);
            }
          }
        },
      };

      traverse(path.node, visitor, path.scope, path);
    });
  }

  // JSXText를 t함수로 래핑
  wrapJSXText(functionLikes) {
    functionLikes.forEach((path) => {
      const visitor = {
        JSXText(jsxPath) {
          const text = jsxPath.node.value.trim();

          if (text && hasKorean(text)) {
            const callExpression = t.jsxExpressionContainer(
              t.callExpression(t.identifier('t'), [t.stringLiteral(text)]),
            );

            jsxPath.replaceWith(callExpression);
          }
        },
      };

      // traverse의 올바른 사용법
      traverse.default
        ? traverse.default(path.node, visitor, path.scope, path)
        : traverse(path.node, visitor, path.scope, path);
    });
  }

  // JSX 속성의 문자열 값을 t함수로 래핑
  wrapJSXAttribute(functionLikes) {
    functionLikes.forEach((path) => {
      const visitor = {
        JSXAttribute(jsxAttrPath) {
          const { value } = jsxAttrPath.node;

          if (t.isStringLiteral(value) && hasKorean(value.value)) {
            // 직접 노드 값을 교체하지 않고 새로운 JSXExpressionContainer 생성
            const newValue = t.jsxExpressionContainer(
              t.callExpression(t.identifier('t'), [t.stringLiteral(value.value)]),
            );

            jsxAttrPath.node.value = newValue;
          }
        },
      };

      traverse(path.node, visitor, path.scope, path);
    });
  }

  // 조건부 표현식의 결과를 t함수로 래핑
  wrapConditionalExpression(functionLikes) {
    functionLikes.forEach((path) => {
      const visitor = {
        ConditionalExpression(condPath) {
          ['consequent', 'alternate'].forEach((prop) => {
            const node = condPath.node[prop];

            if (t.isStringLiteral(node) && hasKorean(node.value)) {
              condPath.node[prop] = t.callExpression(t.identifier('t'), [
                t.stringLiteral(node.value),
              ]);
            }
          });
        },
      };
      traverse.default
        ? traverse.default(path.node, visitor, path.scope, path)
        : traverse(path.node, visitor, path.scope, path);
    });
  }

  // 템플릿 리터럴을 t함수로 래핑
  wrapTemplateLiteral(functionLikes) {
    functionLikes.forEach((path) => {
      const visitor = {
        TemplateLiteral(templatePath) {
          if (
            !templatePath.findParent(
              (p) =>
                t.isCallExpression(p.node) &&
                t.isIdentifier(p.node.callee) &&
                p.node.callee.name === 't',
            )
          ) {
            const { quasis, expressions } = templatePath.node;

            // 템플릿에 한글이 있는지 확인
            const hasKoreanInTemplate = quasis.some((quasi) => hasKorean(quasi.value.cooked));

            if (hasKoreanInTemplate) {
              // 템플릿을 i18next 형식으로 변환
              let templateKey = '';
              const interpolations = [];

              for (let i = 0; i < quasis.length; i++) {
                templateKey += quasis[i].value.cooked;

                if (i < expressions.length) {
                  const expr = expressions[i];
                  let varName;

                  if (t.isIdentifier(expr)) {
                    varName = expr.name;
                  } else if (t.isMemberExpression(expr)) {
                    varName = generate(expr).code;
                  } else {
                    varName = `var${i}`;
                  }

                  templateKey += `{{${varName}}}`;

                  if (t.isIdentifier(expr)) {
                    interpolations.push(t.objectProperty(t.identifier(varName), expr));
                  } else {
                    interpolations.push(t.objectProperty(t.stringLiteral(varName), expr));
                  }
                }
              }

              const callExpressionArgs = [t.stringLiteral(templateKey)];

              if (interpolations.length > 0) {
                callExpressionArgs.push(t.objectExpression(interpolations));
              }

              const callExpression = t.callExpression(t.identifier('t'), callExpressionArgs);

              templatePath.replaceWith(callExpression);
            }
          }
        },
      };
      traverse.default
        ? traverse.default(path.node, visitor, path.scope, path)
        : traverse(path.node, visitor, path.scope, path);
    });
  }

  // useTranslation 훅 삽입
  insertTranslationHook(functionLikes) {
    const self = this;
    functionLikes
      .filter(self.isTopLevelFunction.bind(self))
      .filter((path) => has(path, (node) => t.isIdentifier(node) && node.name === 't'))
      .forEach((path) => {
        const blockStatement = path.node.body;
        const insertionIndex = 0;

        const declarator = t.variableDeclarator(
          t.objectPattern([t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)]),
          t.callExpression(t.identifier('useTranslation'), []),
        );

        const declaration = t.variableDeclaration('const', [declarator]);
        blockStatement.body.splice(insertionIndex, 0, declaration);
      });
  }

  // import 구문 추가
  insertImportDeclaration(ast) {
    //한글이 포함된 파일인지 확인 (t 함수가 사용되었는지 확인)
    const hasTFunction = find(ast, t.isProgram).some((path) =>
      has(
        path,
        (node) =>
          t.isCallExpression(node) && t.isIdentifier(node.callee) && node.callee.name === 't',
      ),
    );

    if (hasTFunction) {
      find(ast, t.isProgram)
        .filter(
          (path) =>
            !has(
              path,
              (node) =>
                t.isImportDeclaration(node) &&
                node.source.value === this.importModuleName &&
                node.specifiers.some(
                  (spec) =>
                    t.isImportSpecifier(spec) &&
                    t.isIdentifier(spec.imported) &&
                    spec.imported.name === 'useTranslation',
                ),
            ),
        )
        .forEach((path) => {
          this.isWrappedByT = true;

          const importDeclaration = t.importDeclaration(
            [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
            t.stringLiteral(this.importModuleName),
          );

          // 다른 import 구문들 다음에 추가
          const lastImportIndex = path.node.body.findLastIndex((node) =>
            t.isImportDeclaration(node),
          );
          path.node.body.splice(lastImportIndex + 1, 0, importDeclaration);
        });
    }
  }

  wrapByT(code) {
    this.isWrappedByT = false;

    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy'],
    });

    const functionLikes = this.getFunctionLikes(ast);
    const self = this;

    [
      self.makeBlockStatement,
      self.wrapStringLiteral,
      self.wrapJSXText,
      self.wrapJSXAttribute,
      self.wrapConditionalExpression,
      self.wrapTemplateLiteral,
      self.insertTranslationHook,
    ].forEach(function (process) {
      process.call(self, functionLikes);
    });

    this.insertImportDeclaration(ast);

    const output = generate(ast, {
      retainLines: true,
      concise: false,
      retainFunctionParens: true,
      compact: false,
      jsescOption: {
        minimal: true,
      },
    }).code;

    return { code: output, isWrappedByT: this.isWrappedByT };
  }

  // 한글 텍스트 추출 메인 함수
  extractKorean(code, namespace = 'common') {
    try {
      const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript', 'decorators-legacy'],
      });

      this.processStringLiterals(ast, namespace);
      this.processJSXText(ast, namespace);
      this.processJSXAttributes(ast, namespace);
      this.processTemplateLiterals(ast, namespace);
    } catch (error) {
      console.error('Error parsing code:', error);
    }
  }

  // 일반 문자열 처리
  processStringLiterals(ast, namespace) {
    traverse(ast, {
      StringLiteral: (path) => {
        const { value } = path.node;

        if (hasKorean(value)) {
          this.addTranslation(value, namespace);
        }
      },
    });
  }

  // JSX 텍스트 처리
  processJSXText(ast, namespace) {
    traverse(ast, {
      JSXText: (path) => {
        const text = path.node.value.trim();

        if (text && hasKorean(text)) {
          this.addTranslation(text, namespace);
        }
      },
    });
  }

  // JSX 속성 처리
  processJSXAttributes(ast, namespace) {
    traverse(ast, {
      JSXAttribute: (path) => {
        const { value } = path.node;

        if (t.isStringLiteral(value) && hasKorean(value.value)) {
          this.addTranslation(value.value, namespace);
        }
      },
    });
  }

  // 템플릿 리터럴 처리
  processTemplateLiterals(ast, namespace) {
    traverse(ast, {
      TemplateLiteral: (path) => {
        const { quasis, expressions } = path.node;

        // 한글이 포함된 템플릿인지 확인
        const hasKoreanInTemplate = quasis.some((quasi) => hasKorean(quasi.value.cooked));

        if (hasKoreanInTemplate) {
          let templateKey = '';

          for (let i = 0; i < quasis.length; i++) {
            templateKey += quasis[i].value.cooked;

            if (i < expressions.length) {
              const expr = expressions[i];
              let varName;

              if (t.isIdentifier(expr)) {
                varName = expr.name;
              } else if (t.isMemberExpression(expr)) {
                varName = generate(expr).code;
              } else {
                varName = `var${i}`;
              }

              templateKey += `{{${varName}}}`;
            }
          }

          this.addTranslation(templateKey, namespace);
        }
      },
    });
  }

  // 추출된 텍스트를 번역 객체에 추가
  addTranslation(text, namespace) {
    this.locales.forEach((locale) => {
      if (!this.translations[locale][namespace]) {
        this.translations[locale][namespace] = {};
      }

      // 한글 원문을 key로 사용
      this.translations[locale][namespace][text] = locale === 'ko' ? text : '';
    });
  }

  // 번역 파일 저장
  saveTranslations() {
    this.locales.forEach((locale) => {
      this.namespaces.forEach((namespace) => {
        const outputDir = path.join(this.outputPath, locale);
        const outputFile = path.join(outputDir, `${namespace}.json`);

        // 디렉토리가 없으면 생성
        if (!fs.existsSync(outputDir)) {
          mkdirp.sync(outputDir);
        }

        // 알파벳 순으로 정렬하여 저장
        const sortedTranslations = {};
        const keys = Object.keys(this.translations[locale][namespace]).sort();

        keys.forEach((key) => {
          sortedTranslations[key] = this.translations[locale][namespace][key];
        });

        fs.writeFileSync(outputFile, JSON.stringify(sortedTranslations, null, 2));
        console.log(`Translation file saved: ${outputFile}`);
      });
    });
  }
}

// 한글 추출 클래스
class Extractor {
  constructor(locales, namespaces, outputPath) {
    this.locales = locales;
    this.namespaces = namespaces;
    this.outputPath = outputPath;
    this.translations = {};

    // 번역 데이터 구조 초기화
    this.locales.forEach((locale) => {
      this.translations[locale] = {};
      this.namespaces.forEach((namespace) => {
        this.translations[locale][namespace] = this.loadExistingTranslations(locale, namespace);
      });
    });
  }

  processPatterns(text) {
    // 숫자 + 단위 패턴 (예: "1개월", "2시간")
    let processedText = text.replace(/(\d+)([가-힣]+)/g, (match, number, unit) => {
      return `{{number}}${unit}`;
    });

    // 범위 패턴 (예: "1일 ~ 2일")
    processedText = processedText.replace(
      /(\d+)([가-힣]+)\s*~\s*(\d+)([가-힣]+)/g,
      (match, num1, unit1, num2, unit2) => {
        return `{{number1}}${unit1} ~ {{number2}}${unit2}`;
      },
    );

    return processedText;
  }

  // 기존 번역 파일이 있다면 로드
  loadExistingTranslations(locale, namespace) {
    const filePath = path.join(this.outputPath, locale, `${namespace}.json`);

    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (error) {
        console.warn(`Error loading existing translations from ${filePath}:`, error);
      }
    }

    return {};
  }

  // 한글 텍스트 추출 메인 함수
  extractKorean(code, namespace = 'common') {
    try {
      const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript', 'decorators-legacy'],
      });

      this.processStringLiterals(ast, namespace);
      this.processJSXText(ast, namespace);
      this.processJSXAttributes(ast, namespace);
      this.processTemplateLiterals(ast, namespace);
    } catch (error) {
      console.error('Error parsing code:', error);
    }
  }

  // 일반 문자열 처리
  processStringLiterals(ast, namespace) {
    traverse(ast, {
      StringLiteral: (path) => {
        const { value } = path.node;

        if (hasKorean(value)) {
          this.addTranslation(value, namespace);
        }
      },
    });
  }

  // JSX 텍스트 처리
  processJSXText(ast, namespace) {
    traverse(ast, {
      JSXText: (path) => {
        const text = path.node.value.trim();

        if (text && hasKorean(text)) {
          this.addTranslation(text, namespace);
        }
      },
    });
  }

  // JSX 속성 처리
  processJSXAttributes(ast, namespace) {
    traverse(ast, {
      JSXAttribute: (path) => {
        const { value } = path.node;

        if (t.isStringLiteral(value) && hasKorean(value.value)) {
          this.addTranslation(value.value, namespace);
        }
      },
    });
  }

  // 템플릿 리터럴 처리
  processTemplateLiterals(ast, namespace) {
    traverse(ast, {
      TemplateLiteral: (path) => {
        const { quasis, expressions } = path.node;

        // 한글이 포함된 템플릿인지 확인
        const hasKoreanInTemplate = quasis.some((quasi) => hasKorean(quasi.value.cooked));

        if (hasKoreanInTemplate) {
          let templateKey = '';

          for (let i = 0; i < quasis.length; i++) {
            templateKey += quasis[i].value.cooked;

            if (i < expressions.length) {
              const expr = expressions[i];
              let varName;

              if (t.isIdentifier(expr)) {
                varName = expr.name;
              } else if (t.isMemberExpression(expr)) {
                varName = generate(expr).code;
              } else {
                varName = `var${i}`;
              }

              templateKey += `{{${varName}}}`;
            }
          }

          this.addTranslation(templateKey, namespace);
        }
      },
    });
  }

  // 추출된 텍스트를 번역 객체에 추가
  addTranslation(text, namespace) {
    const processedText = this.processPatterns(text);

    this.locales.forEach((locale) => {
      if (!this.translations[locale][namespace]) {
        this.translations[locale][namespace] = {};
      }

      // 원본 텍스트도 저장 (추적을 위해)
      if (text !== processedText) {
        this.translations[locale][namespace][`_ORIGINAL_${text}`] = processedText;
      }

      // 처리된 텍스트를 키로 사용
      this.translations[locale][namespace][processedText] = locale === 'ko' ? processedText : '';
    });
  }

  // 번역 파일 저장
  saveTranslations() {
    this.locales.forEach((locale) => {
      this.namespaces.forEach((namespace) => {
        const outputDir = path.join(this.outputPath, locale);
        const outputFile = path.join(outputDir, `${namespace}.json`);

        // 디렉토리가 없으면 생성
        if (!fs.existsSync(outputDir)) {
          mkdirp.sync(outputDir);
        }

        // 알파벳 순으로 정렬하여 저장
        const sortedTranslations = {};
        const keys = Object.keys(this.translations[locale][namespace]).sort();

        keys.forEach((key) => {
          sortedTranslations[key] = this.translations[locale][namespace][key];
        });

        fs.writeFileSync(outputFile, JSON.stringify(sortedTranslations, null, 2));
        console.log(`Translation file saved: ${outputFile}`);
      });
    });
  }
}

// 메인 명령어 처리 부분
function runTWrap() {
  const { targetPaths, ignorePaths } = config.tWrap;
  const transformer = new TWrapTransformer();
  const files = getTargetFiles(targetPaths, ignorePaths);
  let modifiedCount = 0;

  files.forEach((file) => {
    const code = fs.readFileSync(file, 'utf8');
    const { code: transformedCode, isWrappedByT } = transformer.wrapByT(code);

    if (isWrappedByT) {
      fs.writeFileSync(file, transformedCode);
      modifiedCount++;
      console.log(`✅ t-wrap applied: ${file}`);
    }
  });

  console.log(`\nTotal files processed: ${files.length}`);
  console.log(`Files modified: ${modifiedCount}`);
}

function runExtract() {
  const { targetPaths } = config.extract;
  const { outputPath, locales, namespaces } = config.extract;
  console.log(targetPaths);
  const files = getTargetFiles(targetPaths);
  const extractor = new Extractor(locales, namespaces, outputPath);

  files.forEach((file) => {
    const code = fs.readFileSync(file, 'utf8');
    extractor.extractKorean(code);
    console.log(`✅ Extracted from: ${file}`);
  });

  extractor.saveTranslations();
  console.log(`\nTotal files processed: ${files.length}`);
  console.log(`Translation files saved to: ${outputPath}`);
}

// CLI 명령어 처리
if (command === 't-wrap') {
  runTWrap();
} else if (command === 'extract') {
  runExtract();
} else if (command === 'init') {
  // i18n-automation.config.yaml 파일 생성
  const defaultConfig = `# i18n-automation 설정
runOn: vite  # vite: react-i18next, next: next-i18next

extract:
  targetPaths:
    - ./src
  outputPath: ./public/locales
  locales:
    - ko
    - en
  namespaces:
    - common

tWrap:
  targetPaths:
    - ./src
  ignorePaths:
    - test
    - stories
    - __tests__
`;

  fs.writeFileSync('i18n-automation.config.yaml', defaultConfig);
  console.log('✅ Created i18n-automation.config.yaml');

  // package.json에 스크립트 추가 안내
  console.log('\nAdd these scripts to your package.json:');
  console.log(`
"scripts": {
  "i18n:wrap": "i18n-automation t-wrap",
  "i18n:extract": "i18n-automation extract"
}
`);
} else {
  console.log(`
i18n-automation - React/Next.js 프로젝트 국제화 자동화 도구

사용법:
  i18n-automation init       - 설정 파일 생성
  i18n-automation t-wrap     - 한글 텍스트를 t() 함수로 래핑
  i18n-automation extract    - 한글 텍스트 추출 및 번역 파일 생성

자세한 설정은 i18n-automation.config.yaml 파일을 참조하세요.
`);
}
