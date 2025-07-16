export const getTimeValueFromHour = (duration: {
  hour: number;
  minute: number;
  second: number;
}): number => {
  const { hour, minute, second } = duration;
  return hour * 60 * 60 + minute * 60 + second;
};

export const getHourValueFromTime = (contentTime: string | number | undefined) => {
  if (typeof contentTime !== 'number') {
    contentTime = isNaN(Number(contentTime)) ? 0 : Number(contentTime);
  }

  const hour = Math.floor(contentTime / (60 * 60));
  const minute = Math.floor((contentTime % (60 * 60)) / 60);
  const second = contentTime % 60;

  return { hour, minute, second };
};
