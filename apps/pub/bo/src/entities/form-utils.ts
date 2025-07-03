import { ManipulateType } from 'dayjs';
import { dateCalculator, getDateToString } from '@learnway/shared';

interface NowProps {
  unit?: ManipulateType;
  offset?: number;
}
export const formUtils = {
  now: (props?: NowProps) => {
    let now = new Date();
    if (props) {
      const { unit = 'day', offset = 0 } = props;
      now = dateCalculator(now, unit, offset);
    }
    return getDateToString(now);
  },
};
