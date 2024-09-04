import { lazy } from 'react';

interface IObjectKeys {
  [key: string]: any;
}

const companyComponentMap: IObjectKeys = {
  companyA: {
    Card: lazy(() =>
      import('./CardSample').then((module) => ({
        default: module.default.CompanyACard,
      }))
    ),
  },
  companyB: {
    Card: lazy(() =>
      import('./CardSample').then((module) => ({
        default: module.default.CompanyBCard,
      }))
    ),
  },
};

export default companyComponentMap;
