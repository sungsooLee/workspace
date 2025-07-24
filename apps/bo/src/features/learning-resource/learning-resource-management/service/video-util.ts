import { cloneDeep } from 'lodash';

export function convertToVideoForm(data: any) {
  const _ = cloneDeep(data);
  _.contentUseDate = {
    from: _.contentUseStartDate ? new Date(_.contentUseStartDate) : undefined,
    to: _.contentUseEndDate ? new Date(_.contentUseEndDate) : undefined,
  };
  _.isSubtitles = Boolean(_.videoSubtitles?.length);
  _.aiSummary = _.aiSummary ?? '';
  _.aiKeyword = _.aiKeyword ?? '';
  return _;
}

export function convertToVideoSubmit(data: any) {
  const _ = cloneDeep(data);
  _.contentUseStartDate = _.contentUseDate?.from || null;
  _.contentUseEndDate = _.contentUseDate?.to || null;
  delete _.contentUseDate;
  if (!_.isSubtitles) _.videoSubtitles = [];
  return _;
}
