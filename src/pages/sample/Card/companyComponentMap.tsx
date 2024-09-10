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
  },
  B: {
    Card: lazy(() =>
      import('./CardSample').then((module) => ({
        default: module.default.CompanyBCard,
      }))
    ),
  },
};

export default companyComponentMap;
