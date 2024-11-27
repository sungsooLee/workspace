import { API_FIXED_URI, API_BO_URI } from '../const/config.constant';

export interface LearnwayConfiguration {
  HTTP_PORT?: number;
  // API
  PMS_API_PREFIX?: string;
  LMS_API_PREFIX?: string;
  CMS_API_PREFIX?: string;
}

export function setConfig(key: string, value: any): LearnwayConfiguration {
  const config = (window as any).LEARNWAY_CONFIG || {};
  config[key] = value;
  return config;
}

export function getConfig(): LearnwayConfiguration {
  return (window as any).LEARNWAY_CONFIG || {};
}

export function PMSApiPrefix(): string {
  return getConfig()?.PMS_API_PREFIX || `/pms-module${API_BO_URI}${API_FIXED_URI}`;
}
export function CMSApiPrefix(): string {
  return getConfig()?.CMS_API_PREFIX || `/cms-module${API_BO_URI}${API_FIXED_URI}`;
}
export function LMSApiPrefix(): string {
  return getConfig()?.LMS_API_PREFIX || `/lms-module${API_BO_URI}${API_FIXED_URI}`;
}
