import { lazy } from 'react';

interface IObjectKeys {
  [key: string]: any;
}

const companyComponentMap: IObjectKeys = {
  A: {
    Card: lazy(() =>
      import('./CardSample').then((module) => ({
        default: module.default.CompanyACard,
      }))
    ),
    Form: lazy(() =>
      import('../InputForm/CompanyAForm').then((module) => ({
        default: module.default,
      }))
    ),
  },
  B: {
    Card: lazy(() =>
      import('./CardSample').then((module) => ({
        default: module.default.CompanyBCard,
      }))
    ),
    Form: lazy(() =>
      import('../InputForm/CompanyBForm').then((module) => ({
        default: module.default,
      }))
    ),
  },
};

export default companyComponentMap;
