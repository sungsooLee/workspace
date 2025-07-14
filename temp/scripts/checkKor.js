import fs from 'fs';
import path from 'path';
import * as parser from '@babel/parser';
import { default as tr } from '@babel/traverse';
import translate from 'translate';

/* package.json
 {
  "type": "module",
  "dependencies": {
    "@babel/parser": "^7.27.1",
    "@babel/traverse": "^7.27.1",
    "@babel/types": "^7.27.1",
    "esprima": "^4.0.1",
    "esprima-fb": "^15001.1001.0-dev-harmony-fb",
    "estraverse": "^5.3.0",
    "translate": "^3.0.1"
  }
}
 */

/** 설정 시작 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
translate.engine = 'google';
translate.apiKey = 'AIzaSyCNcA8QFSQsnVNb_ZJdm6izBLQJi8BPKYM';

const mutilingualToKor = false; // true 인 경우 무조건 다국어 원복 처리 함. <-- 가장 우선시 함.
const appendJson = false; // true : jsonFileName 파일만 update, false: 한글을 multilinual key 로 변경
const onlyJsonData = false; // true 인 경우 jsonFileName 에 필드 추가 하지 않고 등록된 한글만 다국어 key로 변경 appendJson 이 false 여야 함.
const jsonFileName = '/Working/git/fe/apps/bo/src/entities/mock/i18n-resource-ko.json';
/** 추가될 json path  */
const jsonRoot = 'LABEL.tenant.page';

const rootPath =
  '/Working/git/fe/apps/bo/src/features/learning-resource/learning-resource-management/ui/learning-resource-table.tsx';
//  "/Working/git/fe/apps/bo/src/features/learning-resource/learning-resource-management/ui/learning-resource-table.tsx";

/** 설정 종료 */

const langFile = fs.readFileSync(jsonFileName, 'utf8');
const langJson = JSON.parse(langFile);
const labelCods = langJson.LABEL;
const pathValue = jsonToPaths(langJson);
const langMap = new Map(
  pathValue
    .filter((item) => item.path.startsWith('LABEL'))
    .map((item) => {
      return [item.path, item.value];
    }),
);
const valueMap = new Map(
  pathValue
    .filter((item) => item.path.startsWith('LABEL'))
    .map((item) => {
      return [item.value, item.path];
    }),
);

const traverse = tr.default;

const fileexts = ['.tsx', '.js'];
let firstworking = true;

await fileCheckAndCall(rootPath, labelCods);

async function fileCheckAndCall(rootPath) {
  const stats = fs.statSync(rootPath);
  if (stats.isFile()) {
    processDataAndFileLang(rootPath);
  } else {
    traverseDirectory(rootPath);
  }
}

async function traverseDirectory(root) {
  const files = fs.readdirSync(root);
  for (const file of files) {
    const filePath = path.join(root, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      traverseDirectory(filePath);
    } else if (fileexts.includes(path.extname(file))) {
      await processDataAndFileLang(filePath);
    }
  }
}

async function replaceJavascript(filePath, changeList) {
  const checkMap = mutilingualToKor ? langMap : valueMap;
  const data = fs.readFileSync(filePath, 'utf8');
  const outData = [];
  let beforInt = 0;

  for (let i = 0; i < changeList.length; i++) {
    const cuData = changeList[i];
    //console.log(cuData);
    outData.push(data.substring(beforInt, cuData.start));
    beforInt = cuData.end;
    if (cuData.parent?.callee?.name == 't') {
      if (checkMap.has(cuData.value)) {
        outData.push(`'${checkMap.get(cuData.value).replace(/\r?\n/g, '\\n')}'`);
      } else {
        outData.push(data.substring(cuData.start, cuData.end));
      }
    } else {
      if (cuData.ptype == 'JSXElement' || cuData.ptype == 'JSXAttribute') {
        let upvalue = checkMap.has(cuData.value) ? checkMap.get(cuData.value) : cuData.value;
        outData.push(`{t('${upvalue}')}`);
      } else {
        outData.push(`t('${cuData.value}')`);
      }
    }
  }
  outData.push(data.substring(beforInt));
  fs.writeFileSync(filePath, outData.join(''), 'utf8');
  return outData;
}

async function processDataAndFileLang(filePath) {
  const { i18KeyList, changeList } = getFileLangPosition(filePath);
  if (mutilingualToKor) {
    if (i18KeyList && i18KeyList.length > 0) {
      console.error('다국어 원복 처리 함.');
      replaceJavascript(filePath, i18KeyList);
    }
    return;
  }
  let updatefile = false;
  if (!onlyJsonData) {
    for (const item of changeList) {
      if (!valueMap.has(item.value)) {
        const text = await translate(item.value, { from: 'ko', to: 'en' });
        const cameltext = toCamelCase(text);
        let root = getNestedValue(langJson, jsonRoot);
        if (!root) {
          langJson.LABEL[jsonRoot] = {};
          root = langJson.LABEL[jsonRoot];
        }
        root[cameltext] = item.value;
        console.log(`key(${cameltext}) : ${item.value} | ${text}`);
        updatefile = true;
      }
    }
  }
  if (appendJson) {
    if (!onlyJsonData && updatefile) {
      const jsonString = JSON.stringify(langJson, null, 2);
      fs.writeFileSync(jsonFileName, jsonString);
    }
  } else {
    if (onlyJsonData) {
      const newChangeList = [];
      for (const item of changeList) {
        if (valueMap.has(item.value)) {
          newChangeList.push(item);
        }
      }
      replaceJavascript(filePath, newChangeList);
    } else {
      if (!updatefile && changeList.length > 0) {
        replaceJavascript(filePath, changeList);
      } else {
        console.log('multilingual key not found or no change list -', changeList);
      }
    }
  }
  // console.log(i18KeyList);
}

function getFileLangPosition(filePath) {
  // 파일 읽기
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const targetFunctionName = 't';
  // 코드 파싱하여 AST 생성
  const ast = parser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const result = [];
  const i18KeyList = [];
  const changeList = [];
  const maxLengthResult = [];
  const exclusionLangPack = true;

  traverse(ast, {
    enter(path) {
      if (path?.node.type === 'JSXText') {
        if (/[ㄱ-ㅣ가-힣]/g.test(path.node.value)) {
          //console.log(path.node);
          changeList.push({
            parent: path.parent,
            ptype: path.parent.type,
            stLineNo: path.node.loc.start.line,
            edLineNo: path.node.loc.end.line,
            value: path.node.value.trim(),
            start: path.node.start,
            end: path.node.end,
          });
        }
      }
      if (path?.node?.type === 'StringLiteral') {
        if (/[ㄱ-ㅣ가-힣]/g.test(path.node.value)) {
          if (exclusionLangPack) {
            /**
             * 해당 노드의 부모노드가
             * CallExpression 이 아니거나
             * CallExpression이라면 LangPack.getText() 가 아닐 경우
             */
            if (
              !(path.parent?.callee?.type === 'Identifier' && path.parent?.callee?.name === 't') &&
              !(
                path.parent?.callee?.object?.name === 'LangPack' &&
                path.parent?.callee?.property?.name === 'getText'
              )
            ) {
              //console.log(path.parent, path.node);

              changeList.push({
                parent: path.parent,
                ptype: path.parent.type,
                stLineNo: path.node.loc.start.line,
                edLineNo: path.node.loc.end.line,
                value: path.node.value,
                start: path.node.start,
                end: path.node.end,
              });
            } else {
              // console.log(" ----", path.parent, "----", path);
              if (path.listKey === 'arguments' && path.key === 0) {
                changeList.push({
                  parent: path.parent,
                  ptype: path.parent.type,
                  stLineNo: path.parent.loc.start.line,
                  edLineNo: path.parent.loc.end.line,
                  value: path.parent.arguments[0].value,
                  start: path.node.start,
                  end: path.node.end,
                });
              }
            }
          } else {
            result.push({
              parent: path.parent,
              ptype: path.parent.type,
              stLineNo: path.node.loc.start.line,
              edLineNo: path.node.loc.end.line,
              value: path.node.value,
              start: path.node.start,
              end: path.node.end,
              // start: path.node.loc.start.column,
              // end: path.node.loc.end.column
            });
          }
        } else if (/LABEL/g.test(path.node.value)) {
          i18KeyList.push({
            parent: path.parent,
            ptype: path.parent.type,
            stLineNo: path.node.loc.start.line,
            edLineNo: path.node.loc.end.line,
            value: path.node.value,
            start: path.node.start,
            end: path.node.end,
          });
        }
      }
      if (path?.node?.type === 'TemplateLiteral') {
        if (path?.node?.quasis) {
          path.node.quasis.forEach((quasi) => {
            if (/[ㄱ-ㅣ가-힣]/g.test(quasi.value.raw)) {
              result.push({
                parent: path.parent,
                ptype: path.parent.type,
                stLineNo: path.node.loc.start.line,
                edLineNo: path.node.loc.end.line,
                value: quasi.value.raw,
                start: path.node.start,
                end: path.node.end,
                // start: path.node.loc.start.column,
                // end: path.node.loc.end.column
              });
            }
          });
        }
      }
      if (path?.node?.type === 'JSXOpeningElement') {
        if (
          path.node.attributes &&
          ['OBTTextField', 'OBTNumberField', 'OBTMultiLineTextField'].includes(
            path.node?.name?.name,
          )
        ) {
          if (!path.node.attributes.some((attr) => attr?.name?.name === 'maxLength')) {
            maxLengthResult.push({
              parent: path.parent,
              ptype: path.parent.type,
              stLineNo: path.node.loc.start.line,
              edLineNo: path.node.loc.end.line,
              text: path.node?.name?.name + ' maxLength 미지정 의심',
              start: path.node.start,
              end: path.node.end,
            });
          }
        }
      }
      if (path?.type === 'ObjectExpression') {
        let colType = '';
        const typeCheck = path?.node?.properties.some((property) => {
          if (
            property?.key?.name === 'type' &&
            ['text', 'number', 'mask'].includes(property?.value?.value)
          ) {
            colType = property?.value?.value;
            return true;
          }
          return false;
        });
        const isCheckColumn =
          typeCheck &&
          !path?.node?.properties.some((property) => property?.key?.name === 'maxLength');

        if (isCheckColumn) {
          maxLengthResult.push({
            ptype: path.parent.type,
            stLineNo: path.node.loc.start.line,
            edLineNo: path.node.loc.end.line,
            text: colType + ' type column내 maxLength 미지정 의심',
            start: path.node.start,
            end: path.node.end,
          });
        }
      }
    },
  });
  //console.log("result", result);
  //console.log("max", maxLengthResult);
  return { i18KeyList, changeList };
}

function jsonToPaths(obj, parentPath = '') {
  const result = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result.push(...jsonToPaths(obj[key], currentPath));
      } else {
        result.push({ path: currentPath, value: obj[key] });
      }
    }
  }

  return result;
}

function toCamelCase(str) {
  const maxLength = 30;
  const retval =
    str
      .toLowerCase()
      .split(' ')
      .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join('')
      .match(/[A-Za-z]+/g)
      ?.join('') || '';

  return retval.length > maxLength ? retval.substring(0, maxLength - 1) : retval;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (!acc?.[key]) {
      acc[key] = {};
    }
    return acc?.[key];
  }, obj);
}
