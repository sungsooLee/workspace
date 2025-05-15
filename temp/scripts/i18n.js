import fs from 'fs';
import path from 'path';

const BO_JSON = './apps/bo/src/entities/mock/i18n-resource-ko.json';
const BO_PATH = './apps/bo/src/types/i18next.d.ts';

const FO_JSON = './apps/fo/src/entities/mock/i18n-resource-ko.json';
const FO_PATH = './apps/fo/src/types/i18next.d.ts';

const args = process.argv.slice(2);
const isBO = args.includes('--type=bo');

console.log(' isBO ::: ', isBO);

const rawJson = JSON.parse(fs.readFileSync(path.resolve('./', isBO ? BO_JSON : FO_JSON), 'utf-8'));

function generateType(obj, path = []) {
  let result = '';
  for (const key in obj) {
    const value = obj[key];
    const fullPath = [...path, key];
    if (typeof value === 'object') {
      result += `${'  '.repeat(fullPath.length)}${key}: {\n${generateType(value, fullPath)}${'  '.repeat(fullPath.length)}};\n`;
    } else {
      result += `${'  '.repeat(fullPath.length)}${key}: string;\n`;
    }
  }
  return result;
}

const typeDef = `import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: {
        ${generateType(rawJson, [])}    
      };
    }
  }
}
`;

console.log(typeDef);
fs.writeFileSync(path.resolve('./', isBO ? BO_PATH : FO_PATH), typeDef);
console.log('i18next.d.ts generated!');
