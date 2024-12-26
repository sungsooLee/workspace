import { useEffect } from 'react';
import { useCreation } from 'ahooks';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export function useCreationWithI18n(cb: any, dependencies: any[] = []): any {
  return useCreation(cb, [...dependencies, i18next.language]);
}

export function useEffectWithI18n(cb: any, dependencies: any[] = []): any {
  return useEffect(cb, [...dependencies, i18next.language]);
}
