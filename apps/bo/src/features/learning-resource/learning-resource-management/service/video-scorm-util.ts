import { cloneDeep } from 'lodash-es';

export function convertToScormForm(data: any) {
  const _ = cloneDeep(data);
  _.contentUseDate = {
    from: _.contentUseStartDate ? new Date(_.contentUseStartDate) : undefined,
    to: _.contentUseEndDate ? new Date(_.contentUseEndDate) : undefined };
  _.aiSummary = _.aiSummary ?? '';
  _.aiKeyword = _.aiKeyword ?? '';
  return _;
}

export function convertToScormSubmit(data: any) {
  const _ = cloneDeep(data);
  _.contentUseStartDate = _.contentUseDate?.from || null;
  _.contentUseEndDate = _.contentUseDate?.to || null;
  delete _.contentUseDate;
  return _;
}

export const convertToETCForm = convertToScormForm;

export const convertToETCSubmit = convertToScormSubmit;

export function convertToVideoForm(data: any) {
  const _ = convertToScormForm(data);
  _.isSubtitles = Boolean(_.videoSubtitles?.length);
  return _;
}

export function convertToVideoSubmit(data: any) {
  const _ = convertToScormSubmit(data);
  if (!_.isSubtitles) _.videoSubtitles = [];
  return _;
}
