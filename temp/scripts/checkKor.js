import fs from "fs";
import path from "path";
import readline from "readline";
import * as parser from "@babel/parser";
import { default as tr } from "@babel/traverse";
import bt from "@babel/types";
import translate from "translate";

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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
translate.engine = "google";
translate.apiKey = "AIzaSyCNcA8QFSQsnVNb_ZJdm6izBLQJi8BPKYM";

const appendJson = true; // true : i18n 파일만 update, false: i18n 파일에 한글이 없으면 종료
const jsonFileName =
  "/Working/git/fe/apps/bo/src/entities/mock/i18n-resource-ko.json";
/** 추가될 json path  */
const jsonRoot = "LABEL.tenant.page";

const rootPath = "/Working/git/fe/apps/bo/src/features/tenant/management/ui";

/** 설정 종료 */

const langFile = fs.readFileSync(jsonFileName, "utf8");
const langJson = JSON.parse(langFile);
const labelCods = langJson.LABEL;
const pathValue = jsonToPaths(langJson);
const langMap = new Map(
  pathValue
    .filter((item) => item.path.startsWith("LABEL"))
    .map((item) => {
      return [item.path, item.value];
    })
);
const valueMap = new Map(
  pathValue
    .filter((item) => item.path.startsWith("LABEL"))
    .map((item) => {
      return [item.value, item.path];
    })
);

const traverse = tr.default;

const fileexts = [".tsx", ".js"];
let firstworking = true;

await fileCheckAndCall(rootPath, labelCods);

async function fileCheckAndCall(rootPath) {
  const stats = fs.statSync(rootPath);
  if (stats.isFile()) {
    replaceFileLang(rootPath);
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
      await replaceFileLang(filePath);
    }
  }
}

async function replaceJavascript(filePath, changeList) {
  return new Promise(function (resolve, reject) {
    const fileStream = fs.createReadStream(filePath);
    const lineReader = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let lines = [];
    let currentLine = 1;
    let currentPos = 0;
    lineReader
      .on("line", function (line) {
        const cuData = changeList[currentPos];
        if (!cuData) {
          lines.push(line);
        } else if (cuData.stLineNo == currentLine) {
          if (cuData.parent.callee.name != "t") {
            const editedLine =
              line.substring(0, cuData.start) +
              `t('${cuData.value}')` +
              line.substring(cuData.end, line.lenght);
            lines.push(editedLine);
          } else {
            if (valueMap.has(cuData.value)) {
              const editedLine =
                line.substring(0, cuData.start) +
                `'${valueMap.get(cuData.value)}'` +
                line.substring(cuData.end, line.lenght);
              lines.push(editedLine);
            } else {
              lines.push(line);
            }
          }
          currentPos++;
        } else {
          lines.push(line);
        }

        currentLine++;
      })
      .on("close", () => {
        fs.writeFileSync(filePath, lines.join("\n"), "utf8");
        resolve(lines);
      })
      .on("error", reject);
  });
}

async function replaceFileLang(filePath) {
  const changeList = getFileLangPosition(filePath);
  let updatefile = false;
  for (const item of changeList) {
    if (!valueMap.has(item.value)) {
      // const text = await translate(item.value, { from: "ko", to: "en" });
      const text = await translate(item.value, { from: "ko", to: "en" });
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
  if (appendJson) {
    if (updatefile) {
      const jsonString = JSON.stringify(langJson, null, 2);
      fs.writeFileSync(jsonFileName, jsonString);
    }
  } else {
    if (!updatefile && changeList.length > 0) {
      replaceJavascript(filePath, changeList);
    } else {
      console.log("not found list", changeList);
    }
  }
}

function getFileLangPosition(filePath) {
  // 파일 읽기
  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);
  const targetFunctionName = "t";
  // 코드 파싱하여 AST 생성
  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const result = [];
  const changeList = [];
  const maxLengthResult = [];
  const exclusionLangPack = true;

  traverse(ast, {
    enter(path) {
      if (path?.node.type === "JSXText") {
        if (/[ㄱ-ㅣ가-힣]/g.test(path.node.value)) {
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
      if (path?.node?.type === "StringLiteral") {
        if (/[ㄱ-ㅣ가-힣]/g.test(path.node.value)) {
          if (exclusionLangPack) {
            /**
             * 해당 노드의 부모노드가
             * CallExpression 이 아니거나
             * CallExpression이라면 LangPack.getText() 가 아닐 경우
             */
            if (
              !(
                path.parent?.callee?.type === "Identifier" &&
                path.parent?.callee?.name === "t"
              ) &&
              !(
                path.parent?.callee?.object?.name === "LangPack" &&
                path.parent?.callee?.property?.name === "getText"
              )
            ) {
              //console.log(path.parent, path.node.value);

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
              // console.log(path.parent);
              changeList.push({
                parent: path.parent,
                ptype: path.parent.type,
                stLineNo: path.parent.loc.start.line,
                edLineNo: path.parent.loc.end.line,
                value: path.parent.arguments[0].value,
                start: path.node.loc.start.column,
                end: path.node.loc.end.column,
              });
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
        }
      }
      if (path?.node?.type === "TemplateLiteral") {
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
      if (path?.node?.type === "JSXOpeningElement") {
        if (
          path.node.attributes &&
          ["OBTTextField", "OBTNumberField", "OBTMultiLineTextField"].includes(
            path.node?.name?.name
          )
        ) {
          if (
            !path.node.attributes.some(
              (attr) => attr?.name?.name === "maxLength"
            )
          ) {
            maxLengthResult.push({
              parent: path.parent,
              ptype: path.parent.type,
              stLineNo: path.node.loc.start.line,
              edLineNo: path.node.loc.end.line,
              text: path.node?.name?.name + " maxLength 미지정 의심",
              start: path.node.start,
              end: path.node.end,
            });
          }
        }
      }
      if (path?.type === "ObjectExpression") {
        let colType = "";
        const typeCheck = path?.node?.properties.some((property) => {
          if (
            property?.key?.name === "type" &&
            ["text", "number", "mask"].includes(property?.value?.value)
          ) {
            colType = property?.value?.value;
            return true;
          }
          return false;
        });
        const isCheckColumn =
          typeCheck &&
          !path?.node?.properties.some(
            (property) => property?.key?.name === "maxLength"
          );

        if (isCheckColumn) {
          maxLengthResult.push({
            ptype: path.parent.type,
            stLineNo: path.node.loc.start.line,
            edLineNo: path.node.loc.end.line,
            text: colType + " type column내 maxLength 미지정 의심",
            start: path.node.start,
            end: path.node.end,
          });
        }
      }
    },
  });
  //console.log("result", result);
  //console.log("max", maxLengthResult);
  return changeList;
}

function jsonToPaths(obj, parentPath = "") {
  const result = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
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
      .split(" ")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("")
      .match(/[A-Za-z]+/g)
      ?.join("") || "";

  return retval.length > maxLength
    ? retval.substring(0, maxLength - 1)
    : retval;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (!acc?.[key]) {
      acc[key] = {};
    }
    return acc?.[key];
  }, obj);
}
