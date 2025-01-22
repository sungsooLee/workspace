import i18next from 'i18next';

import { Code, CodeGroup } from '../types';
import { CODE_GROUP } from '../const/code.constant';
import { setConfig, getConfig } from './config.service';

interface CodeByCodeGroup {
  [key: CODE_GROUP]: CodeGroup;
}

interface CodeConfig {
  set: (codes: CodeByCodeGroup) => void;
  get: () => CodeByCodeGroup;
  getCodesByCodeGroup: (codeGroup: CODE_GROUP) => Code[];
  getLabelByCode: (codeGroup: CODE_GROUP, code: string) => string;
}

const I18N_CODE = 'CODE';

function setCodes(codes: CodeByCodeGroup) {
  setConfig('CODE', codes);
}

function getCodes(): CodeByCodeGroup {
  return getConfig()?.CODE;
}

function getCodesByCodeGroup(codeGroup: CODE_GROUP): Code[] {
  const codes = getCodes()?.[codeGroup]?.codes;
  if (!codes?.length) {
    return [];
  }

  return codes.map((codeObject: Code) => {
    return {
      ...codeObject,
      label: i18next.t(`${I18N_CODE}.${codeGroup}.${codeObject.code}`),
    };
  });
}

function getLabelByCode(codeGroup: CODE_GROUP, code: string): string {
  return i18next.t(`${I18N_CODE}.${codeGroup}.${code}`);
}

export const codeConfig: CodeConfig = {
  set: setCodes,
  get: getCodes,
  getCodesByCodeGroup,
  getLabelByCode,
};
