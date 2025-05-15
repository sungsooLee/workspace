const fs = require('fs');
const path = require('path');
// import path from 'path';

// const BO_JSON = '../../apps/bo/src/entities/mock/i18n-resource-ko.json';
// const FO_JSON = '../../apps/fo/src/entities/mock/i18n-resource-ko.json';

const args = process.argv.slice(2);
const isBO = args.includes('--type=bo');

console.log(' isBO ::: ', isBO);

const boJson = require('../../apps/bo/src/entities/mock/i18n-resource-ko.json');
const foJson = require('../../apps/fo/src/entities/mock/i18n-resource-ko.json');

function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// 변환 실행
const flatJson = flattenObject(isBO ? boJson : foJson);

console.log(flatJson);
fs.writeFileSync(
  path.resolve('./', isBO ? 'bo.json' : 'fo.json'),
  JSON.stringify(flatJson, null, 2),
);
