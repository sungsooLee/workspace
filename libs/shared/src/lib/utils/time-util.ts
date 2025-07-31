export const getTimeValueFromHour = (duration: {
  hour: number;
  minute: number;
  second: number;
}): number => {
  const { hour, minute, second } = duration;
  return hour * 60 * 60 + minute * 60 + second;
};

export const getHourValueFromTime = (time: string | number | undefined) => {
  if (typeof time !== 'number') {
    time = isNaN(Number(time)) ? 0 : Number(time);
  }

  const hour = Math.floor(time / (60 * 60));
  const minute = Math.floor((time % (60 * 60)) / 60);
  const second = time % 60;

  return { hour, minute, second };
};

export function formatMinutesToHours(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes < 0) return '0분';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}시간 ${remainingMinutes}분`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else {
    return `${remainingMinutes}분`;
  }
}
