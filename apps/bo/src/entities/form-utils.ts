import dayjs, { ManipulateType } from 'dayjs';
import { DATE_TIME_FORMAT, getDateTimeFormat } from '@learnway/shared';
interface NowProps {
  unit?: ManipulateType;
  offset?: number;
}
export const formUtils = {
  now: (props?: NowProps) => {
    let now = dayjs();
    if (props) {
      const { unit, offset = 0 } = props;
      now = now.add(offset, unit);
    }
    return now.format(getDateTimeFormat(DATE_TIME_FORMAT.DATE));
  },
};
