import i18next from 'i18next';

import { CODE_GROUP } from '../const/code.constant';
import { setConfig, getConfig } from './config.service';

const I18N_CODE = 'CODE';

function setCodes(codes: any) {
  setConfig('CODE', codes);
}

function getCodes() {
  return getConfig()?.CODE;
}

function getCodesByCodeGroup(codeGroup: CODE_GROUP) {
  const codes = getCodes()?.[codeGroup]?.codes;
  if (!codes?.length) {
    return [];
  }

  return codes.map((codeObject: any) => {
    return {
      ...codeObject,
      label: i18next.t(`${I18N_CODE}.${codeGroup}.${codeObject.code}`),
    };
  });
}

function getLabelByCode(codeGroup: CODE_GROUP, code: string) {
  return i18next.t(`${I18N_CODE}.${codeGroup}.${code}`);
}

export const codeConfig = {
  set: setCodes,
  get: getCodes,
  getCodesByCodeGroup,
  getLabelByCode,
};
