import licenses from './test-licenses.json'; //'./licenses.json';
//import menuMock from '../../mock/menu.json';

interface License {
  [key: string]: {
    licenses: string;
    repository: string;
    path: string;
    licenseFile: string;
  };
}

export function getLicenses() {
  return licenses as any;
}
