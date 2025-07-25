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
