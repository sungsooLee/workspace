import { useQuery } from '@tanstack/react-query';
import { useCreation } from 'ahooks';
import { keyBy } from 'lodash';

import { codeConfig, CODE_GROUP } from '@learnway/config';
import { useCreationWithI18n } from '@learnway/hooks';

import { queryOptions } from './code.queries';

export function useFetchCodeGroups() {
  const { data } = useQuery(queryOptions.all());

  return {
    data: useCreation(() => {
      if (!data) {
        return;
      }
      const codeGroups = keyBy(data, 'groupCode');
      codeConfig.set(codeGroups);
      return codeGroups;
    }, [data]),
  };
}

export function useCodesByCodeGroup(codeGroup: CODE_GROUP) {
  const { data } = useFetchCodeGroups();

  return {
    data: useCreationWithI18n(() => {
      return codeConfig.getCodesByCodeGroup(codeGroup);
    }, [data, codeGroup]),
  };
}

export function useLabelByCode(codeGroup: CODE_GROUP, code: string) {
  return {
    data: useCreationWithI18n(() => {
      return codeConfig.getLabelByCode(codeGroup, code);
    }, [codeGroup, code]),
  };
}
