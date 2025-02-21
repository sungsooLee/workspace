import { API_FIXED_URI, API_BO_URI, API_SSO_URI } from '../const/config.constant';

export interface LearnwayConfiguration {
  CODE: any;
  HTTP_PORT?: number;
  // API
  APP_API_URI?: string;
  PMS_API_PREFIX?: string;
  LMS_API_PREFIX?: string;
  CMS_API_PREFIX?: string;
  OAuth_API_PREFIX?: string;
  SSO_API_PREFIX?: string;
}

export function setConfig(key: string, value: any) {
  const config = (window as any)['LEARNWAY_CONFIG'];
  if (!config) {
    (window as any)['LEARNWAY_CONFIG'] = {};
  }
  (window as any)['LEARNWAY_CONFIG'][key] = value;
}

export function getConfig(): LearnwayConfiguration {
  return (window as any).LEARNWAY_CONFIG || {};
}

export function PMSApiPrefix(): string {
  return `/pms-module${getConfig()?.APP_API_URI || API_BO_URI}${API_FIXED_URI}`;
}
export function CMSApiPrefix(): string {
  return `/cms-module${getConfig()?.APP_API_URI || API_BO_URI}${API_FIXED_URI}`;
}
export function LMSApiPrefix(): string {
  return `/lms-module${getConfig()?.APP_API_URI || API_BO_URI}${API_FIXED_URI}`;
}
export function OAuthApiPrefix(): string {
  return getConfig()?.OAuth_API_PREFIX || `/pms-module${API_FIXED_URI}`;
}
export function SSOApiPrefix(): string {
  return getConfig()?.SSO_API_PREFIX || `/pms-module${API_SSO_URI}`;
}
